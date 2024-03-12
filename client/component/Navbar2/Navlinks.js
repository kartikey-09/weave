import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import subLink  from "./MyLinks";


const NavLinks = ({ topDistance = "top-32", textColor, navbar }) => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    return (
        <>
            {subLink && subLink.map((link) => {
                return <div key={link.name}>
                <div className="text-left md:cursor-pointer group">
                    <h1
                        className={`py-4 flex justify-between items-center md:px-0 px-3 group
                        font-[Poppins] font-[500] md:font-normal  group-hover:tracking-wide group-hover:font-[500] duration-200
                         ${navbar ? "text-gray-900" : textColor}
                        `}
                        onClick={() => {
                            heading !== link.name ? setHeading(link.name) : setHeading("");
                            setSubHeading("");
                        }}
                    >
                        {link.name}
                        <span className="md:hidden inline">
                            {heading === link.name ?<FaAngleUp />:<FaAngleDown/>}
                        </span>
                        <span className="md:mt-1 md:ml-1  md:block hidden group-hover:rotate-180 group-hover:-mt-1">
                        <FaAngleDown/>
                        </span>
                    </h1>
                    {link.submenu && (
                        <div>
                            <div className={`absolute ${navbar ? "top-20" :topDistance} hidden group-hover:md:block hover:md:block`}>
                                <div className="py-2">
                                </div>
                                {link?.sublinks?.length > 1 ?
                                    <div className="bg-[#FBBF77] p-5 grid grid-cols-3 gap-4  rounded-xl mr-4 z-10 relative right-[40%]">
                                        {link.sublinks.map((mysublinks) => (
                                            <div key={mysublinks.Head}>
                                                <h1 className="text-xl font-[Poppins] tracking-wide font-[500] hover:text-[#81422C]">
                                                    {mysublinks.Head}
                                                </h1>
                                                <div className="border-b-2 border-white mb-2">

                                                </div>
                                                {mysublinks.sublink.map((slink) => (
                                                    <li className="text-sm font-[Poppins] tracking-normal text-black my-1.5" key={slink.name}>
                                                        <Link
                                                            href={slink.link}
                                                            className="cool-link hover:text-primary hover:text-[#81422C] hover:font-[500]"
                                                        >
                                                            {slink.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div className="z-10 relative bg-[#FBBF77] p-4 min-w-[10rem] rounded-xl  mr-4">
                                        {link.sublinks.map((mysublinks) => (
                                            <div key={mysublinks.Head} className="" >
                                                {mysublinks.sublink.map((slink) => (
                                                    <li className="text-sm font-[Poppins] tracking-normal  py-1" key={slink.name}>
                                                        <Link
                                                            href={slink.link}
                                                            className="hover: hover:text-[#81422C] duration-200 bg-[#f87f43e2] text-white px-5 flex justify-center items-center py-1.5 rounded-xl"
                                                        >
                                                            {slink.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>
                {/* Mobile menus */}

                {
                    link?.sublinks?.length > 1 ?
                        <div
                            className={`
        ${heading === link.name ? "md:hidden" : "hidden"}
      `}
                        >
                            {/* sublinks */}
                            {link.sublinks.map((slinks) => (
                                <div key={slinks.Head}>
                                    <div>
                                        <h1
                                            onClick={() =>
                                                subHeading !== slinks.Head
                                                    ? setSubHeading(slinks.Head)
                                                    : setSubHeading("")
                                            }
                                            className="py-3 mx-3 pl-7 pr-3 font-[Poppins] font-[500] group-hover:text-blue-600 group-hover:tracking-wide group-hover:font-[500] duration-200 flex justify-between items-center border-b-2 border-gray-500"
                                        >
                                            {slinks.Head}

                                            <span className="md:mt-1 md:ml-2 inline">
                                                {/* <ion-icon
                                                    name={`${subHeading === slinks.Head
                                                        ? "chevron-up"
                                                        : "chevron-down"
                                                        }`}
                                                ></ion-icon> */}
                                                  {subHeading === slinks.Head ?<FaAngleUp />:<FaAngleDown/>}
                                            </span>
                                        </h1>
                                        <div
                                            className={`${subHeading === slinks.Head ? "md:hidden" : "hidden"
                                                }`}
                                        >
                                            {slinks.sublink.map((slink) => (
                                                <li className="py-2 pl-14 pr-2 font-[Poppins] font-[500] group-hover:text-blue-600 group-hover:tracking-wide group-hover:font-[500] duration-200  border-b-2 border-blue-600 mx-4" key={slink.name}>
                                                    <Link href={slink.link} >{slink.name}</Link>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div
                            className={`
        ${heading === link.name ? "lg:hidden" : "hidden"}
      `}
                        >

                            {/* sublinks */}
                            {link.sublinks.map((slinks) => (
                                <div key={slinks.Head}>
                                    <div>
                                        <div>
                                            {slinks.sublink.map((slink) => (
                                                <li className="py-2 ml-8 border-b-2 border-gray-500 dark:border-gray w-4/5" key={slink.name}>
                                                    <Link href={slink.link} className="text-gray-900 dark:text-black" >{slink.name}</Link>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
            </div>
            })}
        </>
    );
};

export default NavLinks;

