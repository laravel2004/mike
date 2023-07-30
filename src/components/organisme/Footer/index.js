import InputGroup from "@/components/molecules/InputGroup";
import React from "react";

const Footer = () => {
    return(
        <div className="bg-footer dark:bg-slate-700">
            <div className="pb-12">
                <div className="flex md:justify-between lg:flex-row flex-col gap-16 mx-2 lg:px-36 pt-16 mt-10">
                    <div>
                        <h2 className="text-2xl text-slate-50 text-center lg:text-justify">Ikuti Kami</h2>
                        <p className="text-slate-100 mt-3 text-center">Kami percaya akan interaksi yang lebih baik dan ramah</p>
                    </div>
                    <InputGroup/>
                </div>
            </div>
            <hr/>
            <div className="flex md:gap-16 gap-8 flex-col md:flex-row md:mx-12 lg:mx-36 justify-between mt-10 text-slate-50">
                <p className="md:w-80 text-center md:text-justify">
                Tulibot layak diimplementasikan sebagai solusi Indonesia yang Inklusif dan ramah disabilitas.
                </p>
                <div className="flex md:gap-8 gap-4 justify-between text-sm pb-10 mx-2">
                    <ul>
                        <li className="font-semibold mb-8">Product</li>
                        <li>How it Works</li>
                        <li>Download</li>
                        <li>Suggest A Feature</li>
                        <li>Sign In / Sign Up</li>
                    </ul>
                    <ul>
                        <li className="font-semibold mb-8">Solutions</li>
                        <li>For Organizations</li>
                        <li>For Individuals</li>
                    </ul>
                    <ul>
                        <li className="font-semibold mb-8">Company</li>
                        <li>About</li>
                        <li>Princing</li>
                        <li>Get Started</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;