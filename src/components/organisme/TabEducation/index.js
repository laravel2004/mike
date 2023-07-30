import Image from "next/image"
import education from "@/assets/icons8-online-group-studying-90.png"
import Link from "next/link"

const TabEducation = () => {
    return(
        <>
        <ul class="flex justify-center flex-wrap -mb-px text-sm font-medium text-center">
                <li class="mr-40">
                    <Link href="../../organizations/office" class="inline-flex p-3.5 rounded-t-lg text-slate-400 text-2xl font-medium hover:text-gray-700 dark:hover:text-secondary-sky">
                            Office and Remote Work
                    </Link>
                </li>
                <li class="mr-40">
                    <Image src={education} className="" alt="Education Logo" />
                </li>
                <li class="">
                    <Link href="#" class="inline-flex p-3.5 border-b-8 border-primary-teal rounded-t-lg text-gray-700 text-2xl font-medium dark:text-white">
                            Education and Online Learning
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default TabEducation