import React from "react";

const TextTitle = (props) => {
    return (
        <div className={`${props.className}`}>
            <h3 className="text-4xl font-semibold dark:text-white">{props.title}</h3>
            <p className="mt-5 text-justify dark:text-slate-400">{props.body}</p>
            <ul className="list-disc ml-5 mt-3">
                {props.children}
            </ul>
        </div>

    )
}
export default TextTitle;