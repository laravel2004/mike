import Layout from "@/components/molecules/Layout";
import TextTitle from "@/components/molecules/TextTitlte";
import CardComplex from "@/components/organisme/CardComplex";
import Footer from "@/components/organisme/Footer";
import Navbar from "@/components/organisme/Navbar";
import React from "react";
import Image1 from "@/assets/ImagePricing.png";

const dummy = [
    {
        title : "Tunarungu Bisa berkomunikasi",
        name : "Dani bin deni",
        profesi : "Consulttant",
    },
    {
        title : "Tunarungu Bisa berkomunikasi",
        name : "Dani bin deni",
        profesi : "Consulttant",
    },
    {
        title : "Tunarungu Bisa berkomunikasi",
        name : "Dani bin deni",
        profesi : "Consulttant",
    },
    {
        title : "Tunarungu Bisa berkomunikasi",
        name : "Dani bin deni",
        profesi : "Consulttant",
    },
    {
        title : "Tunarungu Bisa berkomunikasi",
        name : "Dani bin deni",
        profesi : "Consulttant",
    },
    {
        title : "Tunarungu Bisa berkomunikasi",
        name : "Dani bin deni",
        profesi : "Consulttant",
    },
]

console.log(dummy)

const ForIndividu = () => {
    return(
        <div className="overflow-x-hidden">
            <Navbar />
            <Layout className = "mt-24">
                <div className="flex justify-center">
                    <TextTitle
                        title = "Tingkatkan pemahamanmu"
                        className = "text-center md:w-1/2"
                    > 
                        <p className="text-center">MyGlasses meningkatkan pemahaman tunarungu dalam diskusi minimal 50%</p>
                    </TextTitle>
                </div>
                <div className="mt-10 grid grid-col-2 lg:grid-cols-3 gap-4 justify-center content-center">
                    {dummy.map((items, index) => {
                        return(
                            <div key={index} className="flex justify-center md:pb-10">
                                <CardComplex 
                                    link = {Image1}
                                    profil = {Image1}
                                    title  = {items.title}
                                    name = {items.name}
                                    profesi = {items.profesi}
                                />
                            </div>
                        )
                    })}

                </div>
                <div className="flex justify-center gap-8 flex-wrap mt-36">
                    <TextTitle className = "bg-tulibot-orange rounded-2xl pb-5 pr-5 text-slate-50">
                        <div className="p-5">
                            <h3 className="font-semibold text-sm">Tertarik Atas Solusi kami?</h3>
                            <p className="text-sm mt-2">Cari tahu lebih dalam</p>
                        </div>
                    </TextTitle>
                    <TextTitle className = "bg-primary-sky rounded-2xl pb-5 pr-3 text-slate-50">
                        <div className="p-5">
                            <h3 className="font-semibold text-sm">Bantu kami menjangkau pengguna</h3>
                            <p className="text-sm mt-2">Beri tahu mereka tentang MyGlasses</p>
                        </div>
                    </TextTitle>
                </div>
            </Layout>
            <Footer />
        </div>
    )
}

export default ForIndividu;