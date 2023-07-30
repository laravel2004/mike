import React from "react";

const Layout = (props) => {
    return (
        <div className={`mx-4 md:mx-36 py-10 ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Layout