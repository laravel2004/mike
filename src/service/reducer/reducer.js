import { Action } from "../enum/enumReducer";

export const initialState = {
  items : [],
  idMessage : 0,
  user: {},
  finalMessages : [],
  tempMessages : [],
  sr: ()=>{},
  received_messages: [],
  sr_conf: {
    temp_final_transcript_texts: [],
    temp_final_transcripts : [],
    temp_transcripts : [],
    transcript_results : [],
    transcript_results_final : [],
  },
  recorder: {
    isRecording: false,
    isPause: false,
    isStopped: false,
    mediaRecorder: {},
    audioRecordedChunks: [],
    audioFormat: 'mp3',  // TODO: Add custom audio format feature
    duration: 0,
  }
};

export const Reducer = (state = initialState, action) => {
  switch(action.type) {
    // Save data speech and text message
    case Action.FINAL_MESSAGES.ADD:
      const existingIndex = state.finalMessages.findIndex(finalMessage => (
        (finalMessage.data.idMessage == action.payload.data.idMessage) && 
        (finalMessage.finalTranscript == action.payload.finalTranscript)) || 
        ((finalMessage.data.idMessage !== action.payload.data.idMessage) && 
        (finalMessage.data.message == action.payload.data.message)) || 
        ((finalMessage.data.idMessage == action.payload.data.idMessage) && 
        (finalMessage.finalTranscript !== action.payload.finalTranscript)) || 
        ((finalMessage.data.idMessage == action.payload.data.idMessage) &&
        finalMessage.finalTranscript == "" ));
      if (existingIndex !== -1) {
        const updatedFinalMessages = [...state.finalMessages];
        updatedFinalMessages[existingIndex] = action.payload;
        return {
          ...state,
          finalMessages: updatedFinalMessages
        };
      }
      else {
        return {
          ...state,
          finalMessages: [...state.finalMessages, action.payload]
        };
      }

    case Action.TEMP_MESSAGES.SET :
      return {
        ...state,
        tempMessages : []
      }

    case Action.TEMP_MESSAGES.ADD :
      const Index = state.tempMessages.findIndex(tempMessage => tempMessage.message === action.payload.message);
      if (Index !== -1) {
        const updatedTempMessages = [...state.tempMessages];
        updatedTempMessages[Index] = action.payload;
        return {
          ...state,
          tempMessages: updatedTempMessages
        };
      }
      else {
        return {
          ...state,
          tempMessages: [...state.tempMessages, action.payload]
        };
      }

    case Action.GETID.GET :
      console.log("Get ID")
      return {
        ...state,
        idMessage : action.payload
      }

    case Action.ADD_PROFIL:
      console.log("ADD PROFILE")
      return {
        ...state,
        items : [...state.items, action.payload]
      }

    case Action.SET_PROFILE:
      console.log("SET PROFILE")
      return {
        ...state,
        user : action.payload
      }

    // Speech Recognition Actions
    case Action.SR.SET:
      console.log("SET SR")

      return {
        ...state,
        sr : action.payload
      }

    case Action.SR.RESET:
      console.log("RESET SR")

      return {
        ...state,
        sr_conf : action.payload
      }

    case Action.SR.TEMP_RESULT.SET_TEMP_TRANSCRIPT:
      return {
        ...state,
        sr_conf: {
          ...state.sr_conf,
          temp_transcripts: action.payload,
        }
      }

    case Action.SR.TEMP_RESULT.ADD_TEMP_TRANSCRIPT:
      console.log("ADD TEMP TRANSCRIPT")

      return {
        ...state,
        sr_conf: {
          ...state.sr_conf,
          temp_transcripts : [...state.sr_conf.temp_transcripts, action.payload]
      }
      }

    case Action.SR.TEMP_RESULT.SET_FINAL_TRANSCRIPT_TEXT:  // temp_final_transcript_texts
      return {
        ...state,
        sr_conf: {
          ...state.sr_conf,
          temp_final_transcript_texts: action.payload,
        }
      }

    case Action.SR.TEMP_RESULT.ADD_FINAL_TRANSCRIPT_TEXT:  // temp_final_transcript_texts
      return {
        ...state,
        sr_conf: {
          ...state.sr_conf,
          temp_final_transcript_texts: [...state.sr_conf.temp_final_transcript_texts, action.payload],
        }
      }

    case Action.SR.TEMP_RESULT.SET_FINAL_TRANSCRIPT:  // temp_final_transcripts
      console.log("SET TEMP FINAL TRANSCRIPT")
      console.log(action.payload)

      return {
        ...state,
        sr_conf: {
          ...state.sr_conf,
          temp_final_transcripts: action.payload,
        }
      }

    case Action.SR.TEMP_RESULT.ADD_FINAL_TRANSCRIPT:  // temp_final_transcripts
      console.log("ADD TEMP FINAL TRANSCRIPT")
      console.log(action.payload)

      return {
        ...state,
        sr_conf: {
          ...state.sr_conf,
          temp_final_transcripts: [...state.sr_conf.temp_final_transcripts, action.payload],
        }
      }

    case Action.SR.RESULT.ADD:  // transcript_results
      console.log("ADD FINAL TRANSCRIPT RESULT")

      return {
        ...state,
        sr_conf : {
          transcript_results : [...state.sr_conf.transcript_results, action.payload]
        }
        // sr_conf: {
        //   ...state.sr_conf,
        //   transcript_results: [...state.sr_conf.transcript_results, ...action.payload],
        // },
      }

    case Action.MESSAGE.ADD:  // temp_final_transcripts
      console.log("RECEIVED MESSAGE ADDED")
      console.log(action.payload)

      return {
        ...state,
        received_messages: [...state.received_messages, action.payload],
      }
  }
}