import Image from "next/image";
import tt from "@/assets/icon-textsize.png";

const SliderRange = (props) => {
    return(
        <>
        <div className="">
            <label htmlFor="default-range" className="block mb-2 dark:text-white"><Image src={tt}  alt="text size" /></label>
        </div>
        <div className="flex items-center w-full">
            <input 
                id="default-range" 
                type="range" 
                value={props.sliderValue} 
                className="w-full h-2 bg-secondary-gray rounded-lg appearance-none accent-primary-teal cursor-pointer dark:bg-slate-600 dark:accent:primary-teal dark:hover:accent-secondary-teal" 
                onChange={props.sliderOnChange}
            />
        </div>
        </>
    )
}

export default SliderRange