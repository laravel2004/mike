import React, { useState } from "react";
import {useRouter} from "next/router";

import SmallInput from "@/components/atom/SmallInput";
import Button from "@/components/atom/Button";

const JoinRoomTab = () => {
    const [ roomid, setRoomid ] = useState("");
    const router = useRouter()

    const handleClick = () => {
        if (roomid !== '') {
            router.push('/chat/' + roomid);
        }
    }

    return(
        <>
        <div className="flex flex-col">
            <SmallInput 
            type="text" 
            placeholder="Link" 
            value={roomid}
            onChange={(e) => setRoomid(e.target.value)} />

            <Button 
            title="Join Room" 
            className="bg-primary-teal font-medium text-white text-xs dark:bg-secondary-teal"
            onClick={handleClick}/>
        </div>
        </>
    )
}

export default JoinRoomTab;