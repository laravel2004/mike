import React from "react";

const Button = (props) => {
  return(
    <div >
      <button className={`p-4 px-8  rounded-full ${props.className}`} onClick ={props.onClick}>{props.title}</button>
    </div>
  )
}

export default Button;