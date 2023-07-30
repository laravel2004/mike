import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import { deleteCookie, setCookie, getCookie } from "cookies-next";
import { useTheme } from "next-themes";

import NavbarChat from "@/components/organisme/NavbarChat";
import ButtonImg from "@/components/molecules/ButtonImg";
import Button from "@/components/atom/Button";
import ButtonIcon from "@/components/atom/ButtonIcon";
import ChatBubble from "@/components/molecules/ChatBubble";
import MessageBubble from "@/components/atom/MessageBubble";
import SliderRange from "@/components/molecules/SliderRange";
import Toggle from "@/components/molecules/Toggle";
import AccessModal from "@/components/organisme/AccessModal";
import ChatProfile from "@/components/organisme/ChatProfile";

import UserImg from "@/assets/ImagePricing.png";

import transcripsi from "@/assets/icon-transcript.png"
import question from "@/assets/icons-question.png"
import send from "@/assets/icon-send-chat.png";
import cc from "@/assets/icon-cc.png";
import elbow from "@/assets/icon-elbow.png";
import keyboard from "@/assets/icon-keyboard.png";
import mikwhite from "@/assets/icon-mikrofon-white.png";
import speaker from "@/assets/speaker-wave.png";

import { RootContext } from "@/service/context/Context";
import { Action } from "@/service/enum/enumReducer";
import { Permission, Role, Query, ID } from "appwrite";
import { selectionColor } from "@/service/socket/selectionColor";
import {useSocketIo} from "@/service/socket/useSocketIo";
import {useAccount} from "@/service/appwrite/query/useAccount";
import {useDocument} from "@/service/appwrite/query/useDocument";
import { setDarkMode } from "@/utils/darkmode";
import { language } from "@/service/translate/utils";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { microphone, switchMicrophone } from "@/service/selectMicrophone";
import { languageSpeech } from "@/utils/utils";
import SpeechRecognition from "react-speech-recognition";
import { useSpeechRecognition } from "react-speech-recognition";


const Chat = (props) => {
    const { socket } = props;
    const {io} = props;
    const [user, setUser] = useState("")
    const [sliderval, setSliderval] = useState(40);
    const [chatsize, setChatsize] = useState("");
    const contex = useContext(RootContext)
    const {state, dispatch} = contex
    const [isListening, setIsListening] = useState(false)
    const [userColor, setUserColor] = useState("");
    const [isOwner, setIsOwner] = useState(true); // state to control access modal
    const [mounted, setMounted] = useState(false); // (https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch)
    const {theme, setTheme} = useTheme();

    const member = useRef()
    const memberIds = useRef([])
    const sessionIds = useRef([])
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const currentActiveSession = useRef()
    const [isSidebar, setisSidebar] = useState(false)

    const {getUserData, updateName, logout} = useAccount()
    const router = useRouter()
    const {nama} = router.query;
    const {createDocument, listDocuments} = useDocument()

    const [transText, setTransText] = useState(router.query.lang)
    const [detectedMic, setDetectedMic] = useState([])
    const [deviceId, setDeviceId] = useState('')
    const [speechLanguage, setSpeechLanguage] = useState(router.query.speech )
    const [sr, setSr] = useState("")

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [synth, setSynth] = useState({});
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
        if(isListening) {
            SpeechRecognition.startListening({continuous : false, language : router.query.speech})
        }
    }, [isListening, listening])

    console.log(interimTranscript)

    let index = useRef(Math.floor(Math.random() * 1000))
    // emit result speech to socket and store in temp message
    const storeTemp = useCallback(() => {
        let data = {
            senderName : user.name,
            senderId : user.$id,
            idMessage : index.current,
            message : transcript,
            finalTranscript : finalTranscript,
            room : router.query.ownerId,
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
    console.log(interimTranscript)

    useEffect(() => {
        socket.emit("join-room", router.query.ownerId)
    }, [router.query.mikeId])

    useEffect(() => {
        storeTemp()
        console.log(state)
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
        console.log(state)
    }, [storeFinal])

    useEffect(() => {
        // Mic Available Selected
        const mic = async() => {
            const data = await microphone()
            setDetectedMic(data)
            console.log(data)
        }
        mic()
        switchMicrophone(deviceId)
    }, [deviceId])

    // console.log(member.current)

    useEffect(() => {
        // setup darkmode
        setDarkMode(theme);
    }, [theme]);

    useEffect(() => {
        socket.emit("join-room", router.query.ownerId)
        console.log(router.query.mikeId)
    }, [router.query.mikeId])

    const lastRef = useRef(null)
    useEffect(() => {
        setMounted(true)

        // connect to socket
        fetch('/api/socket').then(() => {
            console.log("Socket connected: " + socket.id)
        })
        

        // get user color
        const userColor = selectionColor();
        setUserColor(userColor);
        console.log(userColor)

        // get user data
        getData();
        // setup speech synth
        if('speechSynthesis' in window) {
            setSynth(window.speechSynthesis);
            
        } else {
            alert('Speech synthesis is not supported');
        }
      console.log("current theme: " + theme);
    },[])

    useEffect(() => {
        const scroll = () => {
            if(lastRef.current) {
                lastRef.current.scrollIntoView()
            }
        }
        scroll()
    }, [state.finalMessages])

    useEffect(() => {
        // Checking user access
        if (router.query.ownerId && user.$id) {
            // join socket roo

            if (router.query.ownerId !== user.$id) {  // If current user is not the owner
                console.log('Current user is not the owner.')

                getMember([
                    Query.equal('ownerId', [router.query.ownerId]),
                    Query.equal('userId', [user.$id])
                ]).then((data) => {
                    console.log(data);

                    if (data.total > 0) {
                        member.current = data.documents[0];
                        console.log(member.current)

                        getSessions().then((res) => {
                            if (res.total > 0) {
                                console.log(res);

                                sessionIds.current = res.documents.map((item) => item.sessionId);
                                const activeSession = res.documents.find((item) => item.isActive); // TODO: all session is currently active at
                                console.log(sessionIds.current)
                                if (activeSession) {
                                    currentActiveSession.current = activeSession;
                                    console.log(currentActiveSession)
                                    getMessages([
                                        Query.equal('sessionId', sessionIds.current)
                                    ]);
                                } else {
                                    alert('No active session!')
                                    createSession().then((session) => {
                                        console.log(session)
                                        currentActiveSession.current = session
                                    });
                                }
                            }
                            else {
                                console.log(res)
                                alert('First time huh?')

                                createSession().then((session) => {
                                    console.log(session)
                                    currentActiveSession.current = session
                                });
                                // TODO: Create new session
                                // check session date and time if it has been over, if it is over, then create new session
                            }
                        })
                    } else {
                        // display modal
                        setIsOwner(false);
                    }
                })
            } else {
                console.log('Current user is the owner.')
                setIsOwner(true);

                getMember([
                    Query.equal('ownerId', [router.query.ownerId]),
                ]).then((data) => {
                    console.log(data)

                    // First time owner open the room
                    if (data.total === 0) {
                        const permissions = [
                            Permission.read(Role.user(user.$id))
                        ]
                        createMember(permissions).then((res) => {
                            member.current = res
                            console.log(member.current)
                            console.log('Owner membership created!')
                        })
                    } else {
                        member.current = data.documents.filter((item) => item.ownerId === item.userId)[0]
                        memberIds.current = data.documents.map((item) => item.$id); // BEFORE: item.$id
                        console.log(member.current);
                        console.log(memberIds.current);
                    }
                    
                    // ADJUSTMENT: Get session for owner to save message
                    getSessions().then((res) => {
                        console.log(res)
                        sessionIds.current = res.documents.map((item) => item.sessionId);
                        const activeSession = res.documents.find((item) => item.isActive); // TODO: all session is currently active at
                        console.log(sessionIds.current)
                        if (activeSession) {
                            currentActiveSession.current = activeSession;
                            console.log(currentActiveSession)
                        } else {
                            alert('No active session!')
                            createSession().then((session) => {
                                console.log(session)
                                currentActiveSession.current = session
                            });
                        }
                    })

                    getMessages([
                        Query.equal('memberId', memberIds.current)
                    ]);
                })
            }

        }
    }, [router.query, user])

    const getMember = (queries) => {
        console.log(queries)
        return listDocuments("member", queries )
    }
    
    const getSessions = () => {
        return listDocuments(
            "session",
            [
                Query.equal('memberId', [member.current.$id]) // BEFORE: $id
            ]
        )
    }

    const createMember = (permissions) => {
        return createDocument(
            "member",
            {
                ownerId: router.query.ownerId,
                userId: user.$id
            },
            permissions
        )
    }

    const createSession = () => {
        return createDocument(
            "session",
            {
                memberId: member.current.$id,
                sessionId: ID.unique()
            },
            [
                Permission.read(Role.users("verified")),
                Permission.update(Role.users("verified"))
            ]
        )
    }

    const getMessages = (queries) => {
        console.log(queries)
        listDocuments("message", queries)
            .then((data) => {
                console.log(data)
                setMessages(data.documents)
            })
    }

    const getData = () => {
        try {
            getUserData().then((response) => {
                setUser(response)
                console.log(response)
                dispatch({type:Action.ADD_PROFIL, payload:response})
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    const saveMessage = (message) => {
        // TODO: Error undefined currentActiveSession (currentActiveSession only defined on non-owner)
        
        return createDocument(
            "message",
            {
                memberId: member.current.$id,
                message: message,
                sessionId: currentActiveSession.current.sessionId
            },
            [
                Permission.read(Role.user(user.$id)),
                Permission.update(Role.user(user.$id)),
                Permission.read(Role.user(router.query.ownerId)),
                Permission.update(Role.user(router.query.ownerId)),
            ]
        )
    }

    // Save chats to database
    const saveMessages = async () => {
        // save transcripts
        for (const result of state.sr_conf.transcript_results) {
            saveMessage(result.message).catch((e) => {
                console.log(e);
            });
        }

        // save messages and synths
        for (const result of state.received_messages) {
            saveMessage(result.message).catch((e) => {
                console.log(e);
            });
        }
        if (message !== '') {
            saveMessage(message).then(() => setMessage(''));
        }
    }

    // TODO: Send chat from text input to other client using socket
    const sendMessage = () => {
        const data = {
            senderName: user.name,
            senderId: user.$id,
            room: router.query.ownerId,
            finalTranscript : Math.floor(Math.random() * 1000),
            data : {
                idMessage : Math.floor(Math.random() * 1000),
                message: message,
            }
        }
        console.log(data)
        socket.emit("created-message", data);
        setMessage('');
    }

    const handleKeypress = (e) => {
        if (e.keyCode === 13) {
            if (message !== '') {
                sendMessage(e)
            }
        }
    };

    // Send and speak the chat
    const sendSpeak = () => {
        const synthesis = synth;
        
        const data = {
            senderName: user.name,
            senderId: user.$id,
            room: router.query.ownerId,
            finalTranscript : Math.floor(Math.random() * 1000),
            data : {
                idMessage : Math.floor(Math.random() * 1000),
                message: message,
            }
        }
        socket.emit("created-message", data);
        setMessage('');

        if(synthesis && !isSpeaking) {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.addEventListener('start', handleSpeechStart);
            utterance.addEventListener('end', handleSpeechEnd);
            synthesis.speak(utterance);
        } else {
            alert('Speech synthesis is not available');
        }
    };

    const handleSpeechStart = () => {
        setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
        setIsSpeaking(false);
    };

    const handleSliderChange = (e) => {
        setSliderval(e.target.value)

        if(sliderval >= 1 && sliderval <= 20) {
            setChatsize("text-xs")
            console.log("fontsize updated")
        } else if (sliderval > 20 && sliderval <= 40) {
            setChatsize("text-sm")
            console.log("fontsize updated sm")
        }  else if (sliderval > 40 && sliderval <= 60) {
            setChatsize("text-base")
            console.log("fontsize updated base")
        } else if (sliderval > 60 && sliderval <= 80) {
            setChatsize("text-lg")
            console.log("fontsize updated lg")
        } else if (sliderval > 80 && sliderval <= 100) {
            setChatsize("text-xl")
            console.log("fontsize updated xl")
        } else {
            setChatsize("text-base")
            console.log("fontsize updated default")
        }
    }

    const handleLogout = () => {
        deleteCookie('logged');
        logout().then(() => router.push("/"));
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const handleTransText = (result) => {
        setTransText(result);
        console.log(result)
        router.push({
            pathname : "/chat/" + router.query.ownerId,
            query : {
                lang : result,
                speech : speechLanguage
            }
        })
    }

    const handleSpeechLang = (result) => {
        setSpeechLanguage(result);
        console.log(result)
        router.push({
            pathname : "/chat/" + router.query.ownerId,
            query : {
                lang : transText,
                speech : result
            }
        })
    }

    const activeSidebar = () => {
        setisSidebar(!isSidebar)
    }

    if(!mounted) return null;

    console.log(isSidebar)

    return(
        <>
            {/* modal here */}
            {!isOwner && <AccessModal />}

            

            <NavbarChat onClick={activeSidebar} roomid = {user.$id}/>
            <div className="flex flex-row h-full overflow-y-hidden">
                <div className="flex w-full relative z-40">
                <div className={`flex flex-col ${isSidebar ? "px-6" : ""}  absolute md:relative bg-white dark:bg-primary-dark pt-36 md:pt-24 py-12 shadow-2xl no-scrollbar z-40 overflow-x-hidden overflow-y-auto h-screen ${isSidebar ? " w-full md:w-5/6 lg:w-1/3 transition-all" : "w-[0px] transition-all"}`}>
                    <div className="flex pr-20 gap-x-7 items-center mb-24">
                        <div className="flex flex-shrink-0">
                            <Image src={UserImg} className="w-24 h-24 rounded-full" alt="profile picture" />
                        </div>
                        <div className="flex flex-col text-base font-medium">
                            <ChatProfile 
                                name = {user.name}
                                email = {user.email}
                            />
                        </div>
                    </div>

                    <div className="flex mb-5 gap-x-16 items-center">
                        <SliderRange
                            sliderValue={sliderval}
                            sliderOnChange={handleSliderChange}
                        />
                    </div>

                    <div className="flex mb-5 justify-between items-center">
                        <Toggle
                            labelTitle="Sembunyikan Kata Kotor"
                        />
                    </div>

                    <div className="flex mb-5 justify-between items-center">
                        <Toggle
                            labelTitle="Mode Gelap"
                            checked={theme === 'dark'}
                            onClick={toggleTheme}
                        />
                    </div>

                    <div className="flex mb-5 gap-x-5 justify-between items-center">
                        <div className="">
                            <p className="text-lg text-slate-700 dark:text-slate-400">Bahasa</p>
                        </div>
                        <div className="w-full">
                            <select value={transText} onChange={(result) => handleTransText(result.target.value)} className="select select-bordered w-full max-w-xs">
                                {
                                    language.map((items, index) => (
                                        <option key={index} value={items.code} >{items.language}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex mb-5 gap-x-5 justify-between items-center">
                        <div className="">
                            <p className="text-lg">Speech</p>
                        </div>
                        <div className="w-full">
                            <select value={speechLanguage} onChange={(result) => handleSpeechLang(result.target.value)} className="select select-bordered w-full max-w-xs">
                                {
                                    languageSpeech.map((items, index) => (
                                        <option key={index} value={items.code}  >{items.language}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex mb-5 gap-x-5 justify-between items-center">
                        <div className="">
                            <p className="text-lg">Microphone</p>
                        </div>
                        <div className="w-full">
                            <select value={deviceId} onChange={result => setDeviceId(result.target.value)} className="select select-bordered w-full max-w-xs">
                                {
                                    detectedMic.map((items, index) => (
                                        <option key={index} value={items.deviceId}  >{items.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col mt-20 justify-center">
                        <div className="flex flex-col px-20 gap-y-4 mb-6">
                            <div className="">
                                <ButtonImg
                                    backGround="bg-primary-gray"
                                    btnWidth="w-full"
                                    padding = "p-4"
                                    img={transcripsi}
                                    textColor="text-primary-teal"
                                    textSize=""
                                    title="Unduh Transkrip"
                                />
                            </div>
                            <div className="">
                                <ButtonImg
                                    backGround="bg-primary-gray"
                                    btnWidth="w-full"
                                    padding = "p-4"
                                    img={question}
                                    textColor="text-primary-teal"
                                    textSize=""
                                    title="Bantuan"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-6 justify-center items-center">
                            <div className="">
                                <Button
                                    className="bg-primary-teal text-secondary-gray dark:bg-secondary-teal"
                                    title="Download Aplikasi"
                                />
                            </div>
                            <div className="">
                                <Button
                                    className="bg-tulibot-orange text-secondary-gray"
                                    title="Kembali ke Halaman Awal"
                                />
                            </div>
                            <div className="">
                                <Button
                                    className="bg-tulibot-cream text-black"
                                    onClick={handleLogout}
                                    title="Logout"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-auto p-4  md:p-10 w-full overflow-y-hidden h-screen ">
                    <div className="flex flex-row h-full mb-6 md:pt-12 pt-24">
                        <div className="w-full flex">
                            <div className="flex flex-col min-h-full w-11/12 overflow-y-scroll no-scrollbar px-1 md:px-4">
                                <div className="flex flex-col gap-y-5 overflow-x-hidden overflow-y-auto no-scrollbar pb-24">
                                    {/* Transcription results sent from current user's device */}
                                    {state.finalMessages.map((item, i) => (
                                        item.senderId === user.$id ?
                                            <MessageBubble
                                                key={i}
                                                width="flex justify-end"
                                                user = "text-slate-900 font-bold w-full text-end"
                                                background="bg-primary-gray dark:bg-primary-dark"
                                                fontColor="text-slate-700 dark:text-white"
                                                message={item.data.message}
                                                fontSize={chatsize}
                                                lang = {transText}
                                            /> :
                                            <ChatBubble
                                                key={i}
                                                img={UserImg}
                                                usercolor={userColor}
                                                background="bg-secondary-gray dark:bg-primary-dark"
                                                fontColor={`text-slate-700 dark:text-[${userColor}]`}
                                                username={item.senderName}
                                                message={item.data.message}
                                                fontSize={chatsize}
                                                lang = {transText}
                                            />
                                    ))}
                                    <span ref={lastRef} id="last"></span>
                                </div>
                            </div>

                            <div className="no-scrollbar relative">
                                <div className="absolute z-10 flex flex-col gap-3 -left-11 top-2 md:top-0 md:-left-4 lg:-left-0">
                                    <div className="mx-auto">
                                        <ButtonIcon onClick={handleListen} className="bg-secondary-sky flex justify-center items-center rounded-full w-20 h-20 dark:bg-secondary-teal" img={isListening ? cc : mikwhite} />
                                    </div>
                                    <div className="mx-auto hidden md:inline">
                                        <ButtonIcon className="bg-secondary-sky flex justify-center items-center rounded-full w-20 h-20 dark:bg-secondary-teal" img={keyboard} />
                                    </div>
                                    <div className="mx-auto hidden md:inline">
                                        <ButtonIcon onClick={saveMessages} className="bg-secondary-sky flex justify-center items-center rounded-full w-20 h-20 dark:bg-secondary-teal" img={send} />
                                    </div>
                                    <div className="mx-auto hidden md:inline">
                                        <ButtonIcon className="bg-[#C4C4C4] flex justify-center items-center rounded-full w-20 h-20 dark:bg-slate-600" img={cc} />
                                    </div>
                                    <div className="mx-auto hidden md:inline">
                                        <ButtonIcon className="bg-[#C4C4C4] flex justify-center items-center rounded-full w-20 h-20 dark:bg-slate-600" img={elbow} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-x-5 relative mb-5 w-full">
                        <div className={`fixed w-full flex gap-1 md:gap-4 bottom-3 bg-white dark:bg-primary-dark ${isSidebar ? "" : "justify-center"}`}>
                            <div className={`${isSidebar ? "lg:w-6/12 w-1/3" : "lg:w-9/12 w-6/12"}`}>
                                <input type="text" id="email" className="bg-secondary-gray border border-primary-teal text-primary-teal text-sm rounded-full block w-full md:h-16 h-12 py-2 md:py-4 pl-10 focus:outline-none dark:bg-primary-dark dark:border-2 dark:border-secondary-teal dark:text-white" placeholder="ketik di sini"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyUp={handleKeypress}
                                />
                            </div>
                            <div className="" onClick={sendSpeak} disabled={isSpeaking}>
                                <ButtonIcon className="bg-secondary-teal lg:p-5 p-3 rounded-full" img={speaker}/>
                            </div>
                            <div className="" onClick={sendMessage}>
                                <ButtonIcon className="bg-secondary-teal lg:p-5 p-3 rounded-full" img={send}/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Chat