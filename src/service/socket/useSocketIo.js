import {useContext, useEffect} from "react";
import {Action} from "@/service/enum/enumReducer";
import {RootContext} from "@/service/context/Context";


export const useSocketIo = (socket) => {
    const {dispatch} = useContext(RootContext)

    const addTranscriptResults = (transcripts) => {
        dispatch({type:Action.TEMP_MESSAGES.ADD, payload: transcripts})
    };

    const addReceivedMessages = (message) => {
        dispatch({type:Action.FINAL_MESSAGES.ADD, payload: message})
    };

    useEffect(() => {
        console.log("use socket io!")
        // Listen to transcription result
        socket.on("update-transcript-result", (transcripts) => { // Callback twice
            addTranscriptResults(transcripts)
            console.log("update-transcript-result")
            console.log(transcripts)
        })

        // Listen to message from text input
        socket.on("incoming-message", (message) => {
            // Save to "received_messages" state to be displayed
            console.log(message)

            addReceivedMessages(message)
        })
        
        // Listen to transcription result
        socket.on("incomingSpeech", (message) => {
            console.log(message)
            addTranscriptResults(message)
            console.log("text speech track")
        })

        return () => {
            socket.off("update-transcript-result");
            socket.off("incoming-message");
            socket.off("created-message");
            socket.off("transcriptResultChange");
        }
    }, []);

    return {
    }
}