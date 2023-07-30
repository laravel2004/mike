import Grid from "@/components/atom/Grid";
import CircleCard from "@/components/molecules/CircleCard";
import ImagePrimary from "@/components/molecules/Image/Image";
import Layout from "@/components/molecules/Layout";
import TextTitle from "@/components/molecules/TextTitlte";
import React from "react";
import ImageAbout from "./../assets/imageAbout.png"
import Isyarat from "@/assets/Isyarat.png"
import Mic from "@/assets/mic.png";
import Bahasa from "@/assets/bahasa.png";
import Profil from "@/assets/profileAlan.png"
import Image from "next/image";
import Footer from "@/components/organisme/Footer";
import Navbar from "@/components/organisme/Navbar";

const About = () => {
    return(
        
        <div className="overflow-x-hidden">
            <Navbar />
            <Layout className = "mt-24">
                <Grid>
                    <ImagePrimary
                        link = {ImageAbout}
                        alt = "Tunarungu"
                    />
                    <TextTitle 
                        title = "Penyandang Tunarungu"
                        body = "26,7% penyandang disabilitas disabilitas di Indonesia adalah pengangguran, 17% diantaranya(13.306) penyandang tunarungu"
                        className = "mt-16"
                    >
                        <p className="my-6">Tunarungu sering mengalami kesulitan dalam berkomunikasi diantaranya</p>
                        <li>Memahami materi yang disampaikan pembicara seminar</li>
                        <li>Memahami percakapan pada saat diskusi kelompok</li>
                        <li>Memahami gerakan bibir lawan bicara yang menggunakan masker</li>
                    </TextTitle>
                </Grid>
                <div className="mt-10">
                    <TextTitle 
                        title ="Identifikasi Solusi"
                        body = "Dari permasalahan yang ada, terdapat berbagai solusi yang bisa diterapkan"
                    />
                    <div className="flex md:gap-16 gap-6 justify-evenly mt-14">
                        <CircleCard 
                            img = {Isyarat}
                            title = "Bahasa Isyarat"
                            style = "md:w-44 w-20"
                            className="items-center gap-y-2"
                        />
                        <CircleCard 
                            img = {Mic}
                            title = "Penerjemah Isyarat"
                            style = "md:w-44 w-20"
                            className="items-center gap-y-2"
                        />
                        <CircleCard 
                            img = {Bahasa}
                            title = "Bahasa Isyarat"
                            style = "md:w-44 w-20"
                            className="items-center gap-y-2"
                        />
                    </div>
                </div>
                <div className="flex mt-36 justify-center gap-4 ">
                    <Image
                        src={Profil}
                        alt = "Founder"
                        className="w-48"
                    />
                    <div className="flex flex-col gap-6 justify-center">
                        <h2 className="font-bold text-xl dark:text-white">Penyusun</h2>
                        <p className="font-semibold dark:text-white">Muhammad Alan Nur</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <TextTitle
                        title = "Referensi"
                        className = "w-80 mt-5"
                    >
                        <li>Undang-undang Republik Indonesia Nomor 8 Tahun 2016 Tentang Penyandang Disabilitas</li>
                        <li>Who.int (2020, 1 Maret). Deafness and Hearing Loss</li>
                        <li>Icons by Icons8.com</li>
                        <li>Image by Pixabay</li>
                    </TextTitle>
                </div>
            </Layout>
            <Footer />
        </div>
    )
}

export default About