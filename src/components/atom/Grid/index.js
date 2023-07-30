import React from "react";

const Grid = (props) => {
    return (
        <div className={`${props.mt} ${props.mb} grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 justify-center`}>
            {props.children}
        </div>
    )
}

export default Grid;