import React, { useState } from "react";
import TypewriterComponent from "typewriter-effect";
import translateText from "@/service/translate";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MessageBubble = (props) => {
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

  return (
    <>
      <div className={props.width}>
        <div
          className={`flex flex-col ${props.background} md:px-2 md:py-2 py-0 px-1 rounded-xl shadow-md max-w-2xl`}
        >
          <div className={props.user}>
            <span className="md:text-base text-sm" style={{ color: `${props.style}` }} >
              {props.username}
            </span>
          </div>
          <div className={`${props.fontSize} font-medium ${props.fontColor}`}>
            {value}
          </div>
      </div>
      </div>
    </>
  );
};

export default MessageBubble;
