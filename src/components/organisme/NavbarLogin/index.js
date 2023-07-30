import React from "react"
import Link from "next/link"

const NavbarLogin = (props) => {
    return (
        <>   
        <nav className="py-6 px-4 border-gray-200 bg-white rounded drop-shadow-lg dark:bg-primary-dark dark:border-slate-700">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
            <h1 className="font-bold text-3xl text-primary-teal dark:text-secondary-teal">Tulibot</h1>
        </Link>
        </div>
        </nav>
        </>
    )
}

export default NavbarLogin