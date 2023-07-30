import React, { useEffect } from "react";

const Toast = ({message, onClose}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [onClose])

    return (
        <>
        <div id="toast" className="fixed bottom-5 left-5 bg-white shadow-md flex rounded-md dark:bg-primary-dark">
            <div className="bg-primary-teal p-3 rounded-l-md"></div>
            <div className="px-8 py-3 text-sm font-semibold text-primary-teal dark:text-white">
                {message}
            </div>
        </div>
        </>
    )
}

export default Toast;