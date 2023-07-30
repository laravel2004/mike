import React, { use, useCallback, useContext, useEffect, useRef, useState } from "react";
import {useRouter} from "next/router";

import { RootContext } from "@/service/context/Context";
import { Action } from "@/service/enum/enumReducer";
import { selectionColor } from "@/service/socket/selectionColor";
import {useSocketIo} from "@/service/socket/useSocketIo";
import SpeechRecognition from "react-speech-recognition";
import { useSpeechRecognition } from "react-speech-recognition";


const Mike = (props) => {
    const { socket } = props;
    const {io} = props;
    const [user, setUser] = useState({
        $id : null,
        name : null,
    })
    const contex = useContext(RootContext)
    const {state, dispatch} = contex
    const [isListening, setIsListening] = useState(false)
    const router = useRouter()
    const {transcript, listening, resetTranscript, finalTranscript, interimTranscript} = useSpeechRecognition()

    useSocketIo(socket)
  
    const handleListen = () =>  {
        if (isListening) {
            // Stop speech recognition logic here
            setIsListening(false);
            SpeechRecognition.stopListening()
            resetTranscript()
        } else {
            // Start speech recognition logic here
            setIsListening(true);
        }
    };

    useEffect(() => {
        setUser({
            $id : Math.floor(Math.random() * 100000),
            name : router.query.username
        })
    }, [router.query])
    
    useEffect(() => {
        if(isListening) {
            SpeechRecognition.startListening({continuous : false, language : router.query.speeh})
        }
    }, [isListening, listening])

    let index = useRef(Math.floor(Math.random() * 1000))
    // emit result speech to socket and store in temp message
    const storeTemp = useCallback(() => {
        let data = {
            senderName : user.name,
            senderId : user.$id,
            idMessage : index.current,
            message : transcript,
            finalTranscript : finalTranscript,
            room : router.query.mikeId,
        }
        if(transcript !== "") {
            if(finalTranscript !== "") {
                socket.emit("createdSpeech", data)
                index.current = Math.floor(Math.random() * 1000)
            }
            else if(listening === false) {
                data.finalTranscript = transcript
                data.message = transcript
                index.current = Math.floor(Math.random() * 1000)
            }
            else {
                socket.emit("createdSpeech", data)
            }
        }
    }, [transcript, listening])

    useEffect(() => {
        socket.emit("join-room", router.query.mikeId)
    }, [router.query.mikeId])

    useEffect(() => {
        storeTemp()
    }, [storeTemp])

    // contex to store in final message
    const addFinalMessage = (message) => {
        dispatch({type:Action.FINAL_MESSAGES.ADD, payload:message})
    }

    // pop contex temp message
    const setTempMessage = () => {
        dispatch({type:Action.TEMP_MESSAGES.SET})
    }

    // store in final message to view in page
    const storeFinal = useCallback((messages) => {

        let arrayTempResult = ""
        for(const data of messages) {
            const dataFinal = {
                senderName : data.senderName,
                senderId : data.senderId,
                finalTranscript : data.finalTranscript,
                data : {
                    idMessage : data.idMessage,
                    message : arrayTempResult
                }
            }
            if(data.finalTranscript !== "") {
                arrayTempResult = data.finalTranscript
                dataFinal.data.message = arrayTempResult
                addFinalMessage(dataFinal)
                arrayTempResult = ""
                setTempMessage()
            }
            else {
                arrayTempResult = data.message
                dataFinal.data.message = arrayTempResult
                addFinalMessage(dataFinal)
            }
        }
    }, [state.tempMessages])

    useEffect(() => {
        storeFinal(state.tempMessages)
    }, [storeFinal])

    useEffect(() => {
        // connect to socket
        fetch('/api/socket').then(() => {
            console.log("Socket connected: " + socket.id)
        })
    },[])

    return(
        <>
            <button id="start" onClick={handleListen} >Start Captioning</button>
            <button id="stop" onClick={handleListen}>Stop Captioning</button>
        </>
    )
}

export default Mike