import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "@/service/appwrite/query/useAccount";

import SmallInput from "@/components/atom/SmallInput";
import Button from "@/components/atom/Button";

const ProfileTab = () => {
    const { updateName } = useAccount();
    const router = useRouter();
    const [name, setName] = useState("")

    const handleClick = () => {
        updateName(name).then((res) => {
            console.log(res);
            // force refresh after renaming
            router.reload(window.location.pathname);
        })
    }

    return(
        <>
        <div className="flex flex-col">
            <SmallInput 
            type="text" 
            placeholder="Ketikkan namamu disini" 
            value={name}
            onChange={(e) => setName(e.target.value)} />

            <Button 
            title="Ubah Nama" 
            className="bg-primary-teal font-medium text-white text-xs dark:bg-secondary-teal"
            onClick={handleClick}/>
        </div>
        </>
    )
}

export default ProfileTab;