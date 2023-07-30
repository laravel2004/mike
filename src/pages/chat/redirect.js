import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {useAccount} from "@/service/appwrite/query/useAccount";

const Redirect = () => {
    const router = useRouter();
    const {getUserData} = useAccount();
    useEffect(() => {
        try {
            getUserData().then((response) => {
                console.log(response)
                router.push({
                    pathname : "/chat/[ownerId]",
                    query : {
                        ownerId: response.$id,
                        lang : "",
                        speech : "id"
                    }
                })
            })
        } catch(e) {
            console.log(e);
        }
    }, [])


    return(
        <>
        <p>redirecting...</p>
        </>
    )
}

export default Redirect
