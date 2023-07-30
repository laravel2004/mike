import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ButtonImg from "@/components/molecules/ButtonImg"
import TabButton from "@/components/atom/TabButton"
import InviteTab from "@/components/molecules/InviteTab"
import JoinRoomTab from "@/components/molecules/JoinRoomTab"
import burger from "@/assets/icons8-burger-chat.png"
import people from "@/assets/icons8-people-chat.png"
import addpeople from "@/assets/icons8-add-people-chat.png"

const NavbarChat = (props) => {
    const [tab, setTab] = useState('invite')

    function selectTab(nextTab) {
        setTab(nextTab)
    }

    return(
        <>
        <nav className="bg-white border-slate-300 md:px-10 py-2.5 w-full top-0 left-0 border-b drop-shadow-lg dark:bg-primary-dark dark:border-slate-700 fixed z-50" >
            <div className="flex items-center gap-4 md:gap-0 justify-evenly px-2">
                <div className="flex justify-between  w-full">
                    <div className="flex gap-2 md:gap-x-11 items-center">
                        <Image src={burger} className="" onClick = {props.onClick} alt="burger-menu"/>
                        {/* <Image src={people} className="" alt="people-menu"/> */}
                    </div>
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <h1 className="font-bold text-3xl text-primary-teal dark:text-secondary-teal">Tulibot</h1>
                        </Link>
                    </div>
                </div>
                <div className="dropdown dropdown-end w-full flex justify-center md:justify-end ">
                    <div tabIndex={0}>
                        <ButtonImg 
                            img={addpeople} title="Undang partisipan" backGround="bg-primary-teal dark:bg-secondary-teal" textColor="text-secondary-gray" padding="md:p-4 p-2 text-sm md:text-base"
                        />
                    </div>
                    <div tabIndex={0} className="rounded-lg">
                        <div className="dropdown-content flex flex-col card card-compact w-72 md:w-96 bg-white shadow-2xl dark:bg-slate-600">
                            <div className="flex flex-row border-b-2">
                                <TabButton 
                                    background={tab == "invite" ? "bg-primary-teal dark:bg-secondary-teal" : ""}
                                    textColor={tab == "invite" ? "text-white" : "text-slate-900 dark:text-slate-400"}
                                    tabName="Invite a Friend"
                                    onClick={() => selectTab('invite')}
                                />
                                <TabButton
                                    background={tab == "join" ? "bg-primary-teal dark:bg-secondary-teal" : ""}
                                    textColor={tab == "join" ? "text-white" : "text-slate-900 dark:text-slate-400"}
                                    tabName="Join a Room"
                                    onClick={() => selectTab('join')}
                                />
                            </div>
                            <div className="p-4 pb-20">
                                { tab === 'invite' && <InviteTab roomid = {props.roomid}/> }
                                { tab === 'join' && <JoinRoomTab/> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        
        </>
    )
}

export default NavbarChat