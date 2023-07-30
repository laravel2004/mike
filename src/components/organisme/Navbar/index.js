import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = (props) => {
  const router = useRouter();
  const [isSidebar, setIsSidebar] = useState(false)

  const isActive = (href) => {
    return router.pathname === href
      ? "text-gray-700 border-b-4 border-gray-700 dark:font-semibold dark:text-white dark:border-b-4 dark:border-primary-dark"
      : "text-gray-700 dark:text-slate-400 dark:hover:text-secondary-teal";
  };

  const sidebar = () => {
    setIsSidebar(!isSidebar)
  }

  return (
    <>
      <nav className="bg-white fixed z-50 py-4 px-2 sm:px-4 w-full top-0 left-0 border-b drop-shadow-lg border-gray-200 dark:bg-primary-dark dark:border-slate-700">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex w-full md:w-96 justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="font-bold text-3xl text-primary-teal dark:text-secondary-teal">
                Tulibot V2
              </h1>
            </Link>

            {/* Toggle */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              onClick={sidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-full md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className={` md:flex gap-x-5 md:order-2 hidden `}>
                {/* Link Link */}
                <Link href="/auth/login">
                <button
                    type="button"
                    className=" text-white md:inline bg-primary-gray hover:ring-1 hover:ring-primary-teal focus:ring-1 focus:ring-primary-teal font-medium rounded-full text-lg px-11 py-3 text-center mr-3 md:mr-0"
                >
                    <span className="text-primary-teal">Join Now</span>
                </button>
                </Link>
                <button
                type="button"
                className=" text-white md:inline bg-secondary-teal hover:ring-1 hover:ring-secondary-gray focus:ring-1 focus:ring-secondary-gray font-medium rounded-full text-lg px-11 py-3 text-center mr-3 md:mr-0 dark:bg-primary-teal"
                >
                Get started
                </button>
          </div>
          
          {/* Nav menu */}
          <div
            className={`items-center absolute md:relative transition-all justify-between w-full md:flex md:w-auto md:order-1 ${isSidebar ? "top-14 md:top-0 right-0 left-0" : "-top-[1000px] md:-top-0"}`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-primary-dark">
              <li>
                <Link
                  href="/"
                  className={`block py-8 px-3 ${isActive("/")}`}
                  aria-current="page"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/organizations/education"
                  className={`block py-8 px-3 ${isActive(
                    "/organizations/education"
                  )}`}
                >
                  For Organizations
                </Link>
              </li>
              <li>
                <Link
                  href="/for-individu"
                  className={`block py-8 px-3 ${isActive("/for-individu")}`}
                >
                  For Individuals
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={`block py-8 px-3 ${isActive("/pricing")}`}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block py-8 px-3 ${isActive("/about")}`}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
