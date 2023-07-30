import React, { useEffect, useState } from "react";
import SmallInput from "@/components/atom/SmallInput";
import Button from "@/components/atom/Button";
import {useAccount} from "@/service/appwrite/query/useAccount";

import Toast from "@/components/atom/Toast";

const InviteTab = (props) => {
    const [ showToast, setShowToast ] = useState(false);

    const copyLink = () => {
        navigator.clipboard.writeText(props.roomid);
        setShowToast(true);
    }

    const handleCloseToast = () => {
        setShowToast(false);
    }

    return(
        <>
        <div className="flex flex-col">
            <SmallInput 
            type="text" 
            placeholder="Link" 
            value={props.roomid}
            />

            <Button 
            title="Copy Link" 
            className="bg-primary-teal font-medium text-white text-xs dark:bg-secondary-teal"
            onClick={copyLink} />

            {showToast && <Toast message="Berhasil copy link ✅" onClose={handleCloseToast}/>}
        </div>
        </>
    )
}

export default InviteTab;