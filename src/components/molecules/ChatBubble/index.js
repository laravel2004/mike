import React, { useEffect } from "react";
import Image from "next/image";
import MessageBubble from "@/components/atom/MessageBubble";
import translateText from "@/service/translate";
import { useState } from "react";
import { useRouter } from "next/router";

const ChatBubble = (props) => {
    const [value, setValue] = useState("");
    const router = useRouter()
    const lang = router.query.lang

    const translate = async () => {
        const result = await translateText(props.message, lang);
        setValue(result);
    };
    const notTranslate = () => {
        const result = props.message
        setValue(result)
    }
    useEffect(() => {
        if(lang) {
          translate()
        }
        else {
          notTranslate()
        }
    }, [props.message])
  
    return(
        <>
        <div className="justify-start">
            <div className="flex flex-row gap-2 md:gap-x-4">
                <div className="flex flex-shrink-0">
                    <Image src={props.img} className="rounded-full w-8 h-8 md:w-16 md:h-16" alt="profile"/>
                </div>
                <MessageBubble 
                    background="bg-secondary-gray"
                    user={`font-bold text-lg ${props.usercolor}`}
                    username={props.username}
                    message={value}
                    fontSize={props.fontSize}
                />
            </div>
        </div>
        </>
    )
}

export default ChatBubble