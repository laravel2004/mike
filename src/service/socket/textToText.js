import { useContext, useEffect, useRef, useState } from "react";
import { RootContext } from "../context/Context";
import { Action } from "../enum/enumReducer";


export const UseTextToText = (messages) => {

  const contex = useContext(RootContext)
  const {state, dispatch} = contex
  
  const finalTranscript = useRef(
    {
      senderId: null,
      data: {
        idMessage : null,
        message: null,
      },
    }
  )

  // Get ID Message from reducer
  const getIdMessage = (message) => {
    dispatch({type:Action.GETID.GET, payload:message})
  }

  // Save Speech and text messages in final reducer
  const addFinalMessages = (message) => {
    dispatch({type:Action.FINAL_MESSAGES.ADD, payload:message})
  }
  
  let tempText = ''
  const isFinal = useRef(false)
  let idMessage = useRef(Math.floor(Math.random() * 1000))

  // let idMessage = 0;
  if(messages) {
    Array.from(messages).forEach((data) => {
      if(tempText.localeCompare(data.data.message)=== 0 || tempText.localeCompare(data.data.message) == 1) {
        tempText = data.data.message.toLowerCase()
        isFinal.current = false
      }
      else if(tempText.localeCompare(data.data.message) == -1) {
        if((data.data.message.toLowerCase()).match(tempText)) {
          isFinal.current = false
          tempText = data.data.message.toLowerCase()
          finalTranscript.current = {
            senderId : data.senderId,
            data : {
              idMessage : idMessage.current,
              message : tempText
            }
          }
        }
        else if(tempText == "") {
          // const random = Math.floor(Math.random() * 1000)
          // getIdMessage(random) 
          idMessage.current = Math.floor(Math.random() * 1000)

        }
        else {
          isFinal.current = true
          idMessage.current = Math.floor(Math.random() * 1000)
          // idMessage = tempId
          finalTranscript.current = {
            senderId : data.senderId,
            data : {
              idMessage : idMessage.current,
              message : tempText
            }
          }
          tempText = ""
        }
      }
    })
    // idMessage.current = Math.floor(Math.random() * 1000)
    // console.log(finalTranscript.current)
    // console.log(idMessage.current)
    // useEffect(() => {
    //   const random = Math.floor(Math.random() * 1000)
    //   getIdMessage(random) 
    // }, [isFinal.current])
  }


  
  useEffect(() => {
    if(tempText !== "") {
      addFinalMessages(finalTranscript.current)
    }
    // if(isFinal) {
    //   const random = Math.floor(Math.random() * 1000)
    //   getIdMessage(random) 
    // }
  }, [tempText])

};
