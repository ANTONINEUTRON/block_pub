'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WalletButton from "./wallet_button";
import { FaBars } from 'react-icons/fa';
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  var path = usePathname();
  const [cPath,setPath] = useState(null);
  useEffect(()=>{
    if(path){
      setPath(path);
    }
  }, [path]
  );


  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 bg-[#16145d]">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed flex items-center mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              <Logo />
              BlockPub
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
              <FaBars/>
            </button>
          </div>
          <div
            className={
              "md:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col md:flex-row list-none md:ml-auto">
              <li className="nav-item">
                <Link
                  className={"flex px-3 py-2 items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 "+ (cPath === "/" ? "border-b-2" : "")}
                  href="/"
                >
                  <span className="mx-auto">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={"flex px-3 py-2  items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 "+ (cPath === "/publish" ? "border-b-2" : "")}
                  href="/publish"
                >
                  <span className="mx-auto">Publish</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={"flex px-3 py-2  items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 "+ (cPath === "/explore" ? "border-b-2" : "")}
                  href="/explore"
                >
                  <span className="mx-auto">Explore</span>
                </Link>
              </li>
              <li className="nav-item">
                <WalletButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

function Logo() {
    return (
      <motion.svg
          className="text-black dark:text-white h-[25px] md:h-[37px]"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{
              opacity: 0,
              pathLength: 0,
            }}
            animate={{
              opacity: 1,
              pathLength: 1,
            }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 50,
            }}
            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM11.5 17.25C11.5 17.61 11.14 17.85 10.81 17.71C9.6 17.19 8.02 16.71 6.92 16.57L6.73 16.55C6.12 16.47 5.62 15.9 5.62 15.28V7.58C5.62 6.81 6.24 6.24 7 6.3C8.25 6.4 10.1 7 11.26 7.66C11.42 7.75 11.5 7.92 11.5 8.09V17.25ZM18.38 15.27C18.38 15.89 17.88 16.46 17.27 16.54L17.06 16.56C15.97 16.71 14.4 17.18 13.19 17.69C12.86 17.83 12.5 17.59 12.5 17.23V8.08C12.5 7.9 12.59 7.73 12.75 7.64C13.91 6.99 15.72 6.41 16.95 6.3H16.99C17.76 6.3 18.38 6.92 18.38 7.69V15.27Z"
            fill="#ffffff"
          />
        </motion.svg>
    );
  }