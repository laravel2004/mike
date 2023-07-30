import Image from "next/image";
import Link from "next/link";
import React from "react";

const ButtonImg = (props) => {
    return(
        <div onClick={props.onClick}>
            <button
                className={`flex gap-4 ${props.backGround} rounded-full ${props.btnWidth} ${props.padding} items-center`}
            >
                <div className= {` flex justify-center ${props.className}`}>
                    <Image src={props.img} className={`${props.imgWidth}`} alt="image"/>
                </div>
                <p className={`${props.textColor} ${props.textSize}`}>{props.title}</p>
            </button>
        </div>
    )
}

export default ButtonImg;