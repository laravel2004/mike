import React, { useEffect } from "react";
import Image from "next/image";
import {useRouter} from "next/router";

import Button from "@/components/atom/Button";
import Error404 from "@/assets/image-404.png";


const PageNotFound = () => {
  const router = useRouter();

  return(
    <>
    <div className="fixed top-0 right-0 w-full h-full flex justify-content-center items-center">
            <div className=" mx-auto dark:bg-primary-dark">
                <div className="bg-white w-full h-full p-8 rounded-3xl dark:bg-primary-dark">
                    <div className="flex flex-col gap-y-4 items-center">
                        <Image
                            src={Error404}
                            alt="404 Page not found"
                            className="w-96 h-96 rounded-full"
                        />

                        <div>
                            <h1 className='text-5xl font-bold text-center dark:text-white'>Oops!</h1>
                            <p className='mt-4 text-lg dark:text-white'>Halaman yang kamu cari tidak ditemukan 😔</p>
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

export default PageNotFound;