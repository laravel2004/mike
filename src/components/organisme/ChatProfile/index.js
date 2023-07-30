import React, { useEffect, useState } from "react";
import { useAccount } from "@/service/appwrite/query/useAccount";

import ProfileTab from "@/components/molecules/ProfileTab";

const ChatProfile = (props) => {
    return(
        <>
        <div className="dropdown dropdown-right">
            <div tabIndex={0} className="flex flex-col">
                <span className="text-slate-700 dark:text-white font-semibold">{props.name}</span>
                <span className="text-slate-400 mb-3">{props.email}</span>
                <span className="text-slate-400">MyGlasses</span>
            </div>
            <div tabIndex={0} className="rounded-lg">
                <div className="dropdown-content flex flex-col card card-compact w-96 bg-white shadow-2xl dark:bg-slate-600">
                    <div className="p-4 text-lg font-medium dark:text-white">
                        Siapa namamu?
                    </div>
                    <div className="p-4 pb-14">
                        <ProfileTab />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ChatProfile;