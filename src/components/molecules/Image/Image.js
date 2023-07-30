import Image from "next/image";
import React from "react";

const ImagePrimary = (props) => {
    return(
        <div className="rounded-xl">
            <Image className="rounded-2xl" src={props.link} alt = {props.alt} />
        </div>
    )
}

export default ImagePrimary;