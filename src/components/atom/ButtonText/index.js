import React from "react"
import Link from "next/link"

const ButtonText = (props) => {
    return(
        <span className="font-medium text-base text-gray-700 dark:text-slate-400">{props.title} <Link href={props.url} className="text-primary-sky">{props.link}</Link></span>
    )
}

export default ButtonText