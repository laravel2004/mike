import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";

import Error from "@/assets/image-error.png";
import Button from "@/components/atom/Button";

const AccessModal = () => {

    const router = useRouter();

    return(
        <>
        <div className=" fixed top-0 right-0 w-full h-full flex justify-content-center items-center bg-slate-600/50 backdrop-blur-lg z-[500]">
            <div className="w-1/2 mx-auto ">
                <div className="bg-white w-full h-full p-8 rounded-3xl dark:bg-primary-dark">
                    <div className="flex flex-col gap-y-4 items-center">
                        <Image
                            src={Error}
                            alt="Access Needed"
                            className="w-72 h-72 rounded-full"
                        />

                        <div>
                            <h1 className='text-5xl font-bold text-center dark:text-white'>Oops!</h1>
                            <p className='mt-4 text-lg dark:text-white'>Kamu membutuhkan izin dari owner untuk memasuki room ini 😉</p>
                        </div>

                        <Button
                            title="Kembali ke Home" 
                            className="bg-primary-teal font-medium text-white text-xs dark:bg-secondary-teal"
                            onClick={() => router.push('/')}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AccessModal;