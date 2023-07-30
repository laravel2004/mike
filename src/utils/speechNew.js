import { useEffect, useState, useRef } from "react"
import Timer from "@/utils/timer";
import { RootContext } from "@/service/context/Context";
import { useContext } from "react";
import { Action } from "@/service/enum/enumReducer";

let sr_timer = 0; // replace from this.timer
const timer = new Timer();

export const useSpeech = (isListening, socket, user, langSpeech) => {
  const [tempSpeech, setTempSpeech] = useState("");
  const { state, dispatch } = useContext(RootContext);
  const sr_ref = useRef(state.sr);

  const setSr = (newData) => {
    sr_ref.current = newData;
    dispatch({ type: Action.SR.SET, payload: sr_ref.current });
  };

  useEffect(() => {
    let sr = null;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // Inisilalize
    sr = new Recognition()

    // Configurate Speech
    sr.lang = langSpeech
    sr.continuous = true;
    sr.interimResults = true;

    // on Start 
    sr.onstart = () => {
      timer.start();
      console.log("SR Started")
    }

    // on End
    sr.onend = async(e) => {
      if(isListening) {
        console.log(e)
        await sr.onstart()
      }
      timer.stop();
    }

    // on Result
    sr.onresult = (e) => {
      // console.log(e)
      setTempSpeech(e)
      clearTimeout(sr_timer)
    }

    // on error
    sr.onerror = (event) => {
      console.log(event.error);
    };

    setSr(sr);

  }, [user, langSpeech])

  return tempSpeech
}