import Grid from "@/components/atom/Grid";
import ImagePrimary from "@/components/molecules/Image/Image";
import Layout from "@/components/molecules/Layout";
import Footer from "@/components/organisme/Footer";
import Navbar from "@/components/organisme/Navbar";
import Image from "next/image";
import React from "react";
import ImagePricing from "@/assets/ImagePricing.png"
import TextTitle from "@/components/molecules/TextTitlte";
import Button from "@/components/atom/Button";

const Pricing = () => {
    return(
        <div className="overflow-x-hidden">
            <Navbar />
            <Layout className = "mt-24">
                <Grid>
                <ImagePrimary
                    link = {ImagePricing}
                    alt = "Pricing"
                />
                <TextTitle
                    title = "Tulibot Premium"
                    body = "Penerjemah dengan fitur lengkap untuk interaksi yang lebih baik, dengan harga yang baik untuk kinerja optimal"
                >
                    <div className="flex md:flex-row flex-col gap-3 mt-10 items-center gap-x-16"> 
                        <Button
                            title = "Beli Sekarang"
                            className = "text-white bg-secondary-teal font-semibold text-sm md:text-base dark:bg-primary-teal"
                        />
                        <Button
                            title = "Coba gratis 1 bulan"
                            className = "bg-primary-gray text-secondary-teal font-semibold text-sm md:text-base"
                        />
                    </div>
                </TextTitle>
                </Grid>
                <div className="flex justify-center">
                    <div className="text-center mt-10 w-1/2">
                        <p>Anda juga bisa menyalurkan donasi untuk kebaikan kami dan penderita tunarungu Indonesia</p>
                        <Button
                            title = "Beri Donasi"
                            className = "bg-secondary-teal font-semibold text-white mt-8 text-sm md:text-base dark:bg-primary-teal"
                        />
                    </div>
                </div>
            </Layout>
            <Footer/>
        </div>
    )
}

export default Pricing;