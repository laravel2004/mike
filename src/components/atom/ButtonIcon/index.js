import React from "react";
import Image from "next/image";

const ButtonIcon = (props) => {
    return(
        <>
        <button type="submit" className={props.className} onClick={props.onClick}>
            <Image src={props.img}/>
        </button>
        </>
    )
}

export default ButtonIcon