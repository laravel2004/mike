import Timer from "@/utils/timer";
import { useContext, useEffect, useRef, useState } from "react";
import { Action } from "@/service/enum/enumReducer";
import { RootContext } from "@/service/context/Context";
import translateText from "@/service/translate";

let sr_timer = 0; // replace from this.timer
const timer = new Timer();
const delay = 1000;

export const useSpeechRecognition = (isListening, socket, user, langSpeech) => {
  const { state, dispatch } = useContext(RootContext);
  const sr_ref = useRef(state.sr);
  const transcript_results_ref = useRef(state.sr_conf.transcript_results);
  const temp_transcripts_ref = useRef(state.sr_conf.temp_transcripts);
  const temp_final_transcripts_ref = useRef(
    state.sr_conf.temp_final_transcripts
  );
  const temp_final_transcript_texts_ref = useRef(
    state.sr_conf.temp_final_transcript_texts
  );

  // sr
  const setSr = (newData) => {
    sr_ref.current = newData;
    dispatch({ type: Action.SR.SET, payload: sr_ref.current });
  };

  // transcript_results
  const addTranscriptResults = () => {
    dispatch({
      type: Action.SR.RESULT.ADD,
      payload: temp_final_transcripts_ref.current,
    });
  };
  // temp_transcripts
  const setTempTranscripts = (newData) => {
    temp_transcripts_ref.current = newData;
    dispatch({
      type: Action.SR.TEMP_RESULT.SET_TEMP_TRANSCRIPT,
      payload: newData,
    });
  };

  const addTempTranscripts = (newData) => {
    temp_transcripts_ref.current = [...temp_transcripts_ref.current, newData];
    dispatch({
      type: Action.SR.TEMP_RESULT.ADD_TEMP_TRANSCRIPT,
      payload: newData,
    });
  };

  // temp_final_transcripts
  const setTempFinalTranscripts = (newData) => {
    temp_final_transcripts_ref.current = newData;
    dispatch({
      type: Action.SR.TEMP_RESULT.SET_FINAL_TRANSCRIPT,
      payload: newData,
    });
  };

  const addTempFinalTranscripts = (newData) => {
    temp_final_transcripts_ref.current = [
      ...temp_final_transcripts_ref.current,
      newData,
    ];
    dispatch({
      type: Action.SR.TEMP_RESULT.ADD_FINAL_TRANSCRIPT,
      payload: newData,
    });
  };

  // temp_final_transcript_texts
  const setTempFinalTranscriptTexts = (newData) => {
    temp_final_transcript_texts_ref.current = newData;
    dispatch({
      type: Action.SR.TEMP_RESULT.SET_FINAL_TRANSCRIPT_TEXT,
      payload: newData,
    });
  };

  const addTempFinalTranscriptTexts = (newData) => {
    temp_final_transcript_texts_ref.current = [
      ...temp_final_transcript_texts_ref.current,
      newData,
    ];
    dispatch({
      type: Action.SR.TEMP_RESULT.ADD_FINAL_TRANSCRIPT_TEXT,
      payload: newData,
    });
  };

  const resetStates = () => {
    setTempFinalTranscriptTexts([]);
    setTempFinalTranscripts([]);
    setTempTranscripts([]);
  };

  useEffect(() => {
    console.log("useSpeechRecognition!");
    let sr = null;

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    sr = new Recognition();

    sr.lang = langSpeech; // TODO: Get local user preferences when login
    sr.continuous = true;
    sr.interimResults = true;
    console.log(langSpeech)
    // On start event
    sr.onstart = () => {
      timer.start();
      console.log("SR Started!");
    };

    // On end event
    sr.onend = async (e) => {
      console.log(e);

      if (isListening) {
        await sr.start();
      }

      // Set delay to make sure all the transcript results that are final is included
      setTimeout(() => {
        let data = [
          ...state.sr_conf.transcript_results,
          ...temp_final_transcripts_ref.current,
        ];
        socket.emit("transcriptResultChange", data); // Send to other clients, will be displayed from "messages" state

        // Automatically add temp_final_transcripts_ref as data, and display it from "transcript_results" state
        // to current user's device
        addTranscriptResults();

        timer.stop();
        resetStates();
      }, delay);

      console.log("SR Stopped!");
    };

    // On result event
    sr.onresult = (e) => {
      console.log(e);
      clearTimeout(sr_timer);
      saveTemporaryTranscriptionResult(
        e,
        temp_final_transcripts_ref,
        addTempFinalTranscriptTexts,
        addTempFinalTranscripts,
        addTempTranscripts,
        setTempTranscripts,
        user
      );
    };

    sr.onerror = (event) => {
      console.log(event.error);
    };

    setSr(sr);
  }, [user, langSpeech]);
};

const capitalizeFirstLetter = (sentence) => {
  if (typeof sentence !== "string" || sentence.length === 0) {
    return sentence;
  }

  const trimmedSentence = sentence.trim();
  const firstLetter = trimmedSentence.charAt(0).toUpperCase();
  const restOfSentence = trimmedSentence.slice(1);

  return firstLetter + restOfSentence;
};

const saveTemporaryTranscriptionResult = (
  e,
  temp_final_transcripts_ref,
  addTempFinalTranscriptTexts,
  addTempFinalTranscripts,
  addTempTranscripts,
  setTempTranscripts,
  user
) => {
  const count = 0;

  setTempTranscripts([]);

  let ids = [];
  let concatenated_text = "";
  let stop_time = new Date().toLocaleTimeString();
  let textTranslate = "";

  sr_timer = setTimeout(() => {
    Array.from(e.results).forEach((value, index) => {
      const isExist = temp_final_transcripts_ref.current.some(
        (res) => res.ids.indexOf(index) !== -1
      );
      console.log("== TES ==");
      console.log(value)
      if (value.isFinal) {
        if (!isExist) {
          // Will not save the final result that already saved from the previous result
          ids.push(index);
          let text = capitalizeFirstLetter(value[0].transcript);
          concatenated_text += text + ". ";
        }
      }
    });
    if (concatenated_text !== "") {
      // temp_final_transcript_texts
      addTempFinalTranscriptTexts(concatenated_text);
      // temp_final_transcripts
      addTempFinalTranscripts({
        ids: ids,
        senderId: user.$id,
        message: concatenated_text,
        timestamp: 0,
        endTime: count,
        stop_time: stop_time,
      });
    }
  }, delay);

  Array.from(e.results).forEach((value) => {
    if (!value.isFinal) {
      // temp_transcripts
      addTempTranscripts({
        senderId: user.$id,
        message: value[0].transcript,
        timestamp: 0,
        endTime: count,
        mark: "",
        stop_time: new Date().toLocaleTimeString(),
      });
    }
  });
};
