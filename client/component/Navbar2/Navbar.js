"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import "./navbar.css";
import NavLinks from "./Navlinks";
import { MdOutlineLogin } from "react-icons/md";

const Navbar = ({ class1, topDistance, textColor = "text-black" }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const user = { _id: "" };

  const handleLogout = () => {
    router.push("/sign-in");
  };

  const [navbarState, setNavbar] = useState(false);
  const changeBackground = () => {
    // console.log(window.scrollY)
    if (window.scrollY >= 200) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <nav
      className={`${
        navbarState ? "fixed top-[36px]  left-0 w-full z-20" : class1
      }  duration-500   bg-white transition-all ease-in-out`}
    >
      <div className="flex items-center font-medium justify-between px-3 lg:px-24">
        <div className="lg:w-auto w-full flex justify-between h-full items-center">
          <Link href="/" className="my-1">
            <Image
              src="https://weavecu.com/wp-content/uploads/2023/03/We-Avec-U-logo-PNG.png"
              alt="logo"
              className="md:cursor-pointer"
              style={{ maxWidth: "85px" }}
              width={85}
              height={100}
            />
          </Link>
          <div
            className={`text-3xl lg:hidden ${textColor} `}
            onClick={() => setOpen(!open)}
          >
            {open ? <RxCross2 /> : <RxHamburgerMenu />}
          </div>
        </div>

        <ul className="lg:flex hidden items-center gap-12">
          <li>
            <div>
              <Link
                href="/book-session"
                className="text-sm font-[500] mb-2 py-2 rounded-xl px-4 custom_colors  
                      bg-[#f87f43e2]  text-white "
              >
                BOOK A SESSION
              </Link>
            </div>
          </li>

          <li>
            <Link
              href="/"
              className={`${
                navbarState ? "text-gray-2000" : textColor
              } inline-block mb-1  font-[Poppins] font-normal
                         hover:tracking-wide hover:font-[500] duration-200 `}
            >
              Home
            </Link>
          </li>


          <li>
            <Link
              href="/about"
              className={`${
                navbarState ? "text-gray-2000" : textColor
              } inline-block mb-1  font-[Poppins] font-normal
                         hover:tracking-wide hover:font-[500] duration-200 `}
            >
              About Us
            </Link>
          </li>

          <NavLinks
            topDistance={topDistance}
            navbar={navbarState}
            textColor={textColor}
          />

          <li>
            <Link
              href="/contact"
              className={`${
                navbarState ? "text-gray-2000" : textColor
              } inline-block mb-1  font-[Poppins] font-normal
                         hover:tracking-wide hover:font-[500] duration-200 `}
            >
              Contact Us
            </Link>
          </li>

          <li>
            <div>
              <Link
                href="/sign-in"
                className="text-sm font-[500]  mb-2 py-2 rounded-xl px-4 custom_colors 
                      bg-[#f87f43e2]  text-white "
              >
                LOGIN / SIGNUP
              </Link>
            </div>
          </li>
          {/* {user?._id && (
            <li>
              <div>
                <Link
                  href="/team"
                  className="text-sm font-[500] mb-2 py-2 rounded-xl px-4 text-[#81422C] border-2 border-[#81422C] bg-[#81422C] cursor-pointer hover:bg-[#81422C] hover:text-[#81422C] transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide hidden md:flex shadow-2xl"
                >
                  DASHBOARD
                </Link>
              </div>
            </li>
          )} */}
          {/* <li>
            <div>
              {user?._id ? (
                <>
                  <div
                    onClick={handleLogout}
                    className="text-sm font-[500] bg-white mb-2 py-2 rounded-xl px-4 text-blue-500 border-2 border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide hidden md:flex shadow-2xl"
                  >
                    LOGOUT{" "}
                    <MdOutlineLogin className="ml-1 text-xl animate-bounce " />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm font-[500] bg-white mb-2 py-2 rounded-xl px-4 text-[#81422C] border-2 border-[#81422C]  hover:text-white hover:bg-[#81422C]  transition-all duration-300 ease-in-out justify-center items-center font-[Poppins] tracking-wide hidden md:flex shadow-2xl"
                  >
                    SIGN IN{" "}
                    <MdOutlineLogin className="ml-1 text-xl animate-bounce " />
                  </Link>
                </>
              )}
            </div>
          </li> */}
        </ul>

        {/* Mobile nav */}
        <ul
          className={`
        lg:hidden z-[9990]  fixed w-4/5 bg-white top-0 overflow-y-auto bottom-0 py-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}`}
        >
          <li className="flex justify-center items-center pb-1 dark:border-b-2 ">
            <Link href="/" className="my-1">
              <Image
                src="https://weavecu.com/wp-content/uploads/2023/03/We-Avec-U-logo-PNG.png"
                alt="logo"
                className="md:cursor-pointer"
                style={{ maxWidth: "60px" }}
                width={60}
              height={100}
              />
            </Link>
          </li>

          <li>
            <Link
              href="/book-session"
              className="text-sm font-[500]  m-2 mb-2 py-2 rounded-xl px-4 custom_colors 
              bg-[#f87f43e2]  text-white "
            >
              Book a Session
            </Link>
          </li> 

          <li>
            <Link
              href="/"
              className="px-3 py-3 inline-block font-[Poppins] font-[500] text-black"
            >
              Home
            </Link>
          </li>

          {/* <NavLinks /> */}

          <li>
            <Link
              href="/about"
              className="px-3 py-3 inline-block font-[Poppins] font-[500] text-black"
            >
              About Us 
            </Link>
          </li>

          <NavLinks
            topDistance={topDistance}
            navbar={navbarState}
            textColor={textColor}
          />

          <li>
            <Link
              href="/contact"
              className="px-3 py-3 inline-block font-[Poppins] font-[500] text-black"
            >
              Contact Us
            </Link>
          </li>

          <li>
            <Link
              href="/sign-in"
              className="text-sm font-[500]  m-2 mb-2 py-2 rounded-xl px-4 custom_colors 
              bg-[#f87f43e2]  text-white "
            >
              Login / Signup
            </Link>
          </li>


          {/* <li>
            <Link
              href="/contact-us"
              className="px-3 py-3 inline-block font-[Poppins] font-[500]"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              href="/sign-in"
              className="text-sm font-[500]  m-2 mb-2 py-2 rounded-xl px-4 custom_colors  
              bg-[#f87f43e2]  text-white"
            >
              Login / Signup
            </Link>
          </li> */}
           {user?._id && (
            <li>
              <Link
                href="/user-dashboard"
                className="px-3 py-3 inline-block font-[Poppins] font-[500]"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            {user?._id &&(
              <div
                onClick={handleLogout}
                className="cursor-pointer px-3 py-3 inline-block font-[Poppins] font-[500]"
              >
                Logout
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
