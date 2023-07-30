import React from "react";
import Image from "next/image";

const CircleCard = (props) => {
    return (
        <div className={`avatar flex flex-col ${props.className}`}>
            <div className={`rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex justify-center ${props.style}`}>
                <Image src={props.img} alt="image"/>
            </div>
            <h4 className="text-center mt-4 font-semibold dark:text-white">{props.title}</h4>
            <p className={`text-center ${props.bodyWidth}  dark:text-slate-400`}>{props.body}</p>
        </div>
    )
}

export default CircleCard;