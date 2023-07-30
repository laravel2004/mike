import CircleCard from "@/components/molecules/CircleCard";
import React from "react";
import Image from "next/image";

const CardComplex = (props) => {
    return (
        <div className="card card-compact w-80 md:w-80 bg-secondary-gray dark:bg-slate-800 shadow-xl">
            <Image src={props.link} alt="Shoes" className="w-auto" />
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <CircleCard
                        img = {props.profil}
                        style = "md:w-12 w-12"
                    />
                    <div className="text-xs flex flex-col">
                        <h2 className="text-primary-teal font-bold dark:text-primary-sky">{props.title}</h2>
                        <p className="font-semibold dark:text-white mt-2">{props.name}</p>
                        <p className="text-slate-400 font-semibold">{props.profesi}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardComplex;