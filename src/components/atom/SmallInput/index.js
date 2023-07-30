import React from "react";


const SmallInput = (props) => {
    return (
        <>
        <div className="mb-6">
            <input type="text" value={props.value} onChange={props.onChange} className="bg-secondary-gray border border-primary-teal text-primary-teal text-xs rounded-full w-full h-8 p-4 focus:outline-none dark:text-white dark:bg-slate-600 dark:border-2 dark:border-secondary-teal" placeholder={props.placeholder} required/>
        </div>
        </>
    )
}

export default SmallInput