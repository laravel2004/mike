import React from 'react';

const TabButton = (props) => {
    return(
        <>
        <div className={`w-1/2 px-4 ${props.background} rounded-t-lg content-center`} onClick={props.onClick}>
            <p className={`${props.textColor} text-sm`}>{props.tabName}</p>
        </div>
        </>
    )
}

export default TabButton;