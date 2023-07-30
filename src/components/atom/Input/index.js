import React from "react";


const Input = (props) => {
    return (
        <>
        <div className="mb-6">
            <input type={props.type} value={props.value} onChange={props.onChange} className="bg-secondary-gray border border-primary-teal text-teal text-base rounded-full block w-full h-16 py-4 pl-10 focus:outline-none dark:bg-primary-dark dark:border dark:border-secondary-teal dark:text-secondary-teal dark:placeholder:text-secondary-teal" placeholder={props.placeholder} required/>
        </div>
        </>
    )
}

export default Input