"use client";
import React, { useState } from "react";
import "./sidebar.css";
import { FaCircleChevronRight } from "react-icons/fa6";
import { logoutAdmin } from "@/features/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../../public/css/globals.css";
import Link from "next/link";

const Sidebar = ({ children }) => {


  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const admin = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin(null));
    window.location.href = "/admin/login-panel";
  };

  const menuItem = [
    {
      path: "/admin/welcome",
      name: "Welcome",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/manage-admins",
      name: "Manage Admins",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["clinicH", "superAdmin"],
    },
    {
      path: "/admin/manage-users",
      name: "Manage Users",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/manage-blogs",
      name: "Manage Blogs",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/manage-sessions",
      name: "Manage Sessions",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/manage-testimonials",
      name: "Manage Testimonial",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/manage-careers",
      name: "Manage Career",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/contact-page-data",
      name: "Contact Page Data",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/navbar-slider-text",
      name: "Navbar Slider Text",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
    {
      path: "/admin/manage-gallery",
      name: "Manage Gallery System",
      icon: "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279037/Admin/Dashboard/1_r8sijc.svg",
      role: ["superAdmin", "clinicH"],
    },
  ];
  return (
    <div className="mainContainer relative manageuser_bg" style={{ height: '100%'}}>
      <div style={{ minWidth: isOpen ? "280px" : "50px", height: '100%'}} className="sidebar ">
        <div
          className={`top_section ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="font-[Poppins] tracking-wider font-[500] ml-3 text-3xl text-white "
          >
            WeAvecU
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaCircleChevronRight
              className={`text-2xl ${isOpen && "rotate-180"} duration-200`}
              onClick={toggle}
            />
          </div>
        </div>
        {menuItem.map((item, index) => {
          return (
            item?.role?.includes(admin?.role) && (
              <Link href={item.path} key={index} className="link" activeclassname="active">
                                <img className="h-8 w-8" alt="icon-sidebar" src={item.icon} />
                                <div className={`text-sm tracking-wide font-[Nunito] ${isOpen ? "block" : "hidden"}`}>{item.name}</div>
                            </Link>
            )
          );
        })}
        <div
          className="link"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <img
            className="imgg"
            src={
              "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279040/Admin/Dashboard/8_ebaovq.svg"
            }
            alt="icon-sidebar"
          />
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="text-sm tracking-wide font-[Nunito]"
          >
            Logout
          </div>
        </div>
      </div>
      <main className="manageuser_bg relative content">{children}</main>
      <div
        className="rounded-full fixed p-2 bg-gray-200 border-2 border-gray-400 top-2 right-2 flex justify-center items-center"
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        <img
          className="h-6 w-6"
          src={
            "https://res.cloudinary.com/dpalqjwiy/image/upload/v1695279040/Admin/Dashboard/8_ebaovq.svg"
          }
          alt="icon-sidebar"
        />
      </div>
    </div>
  );
};

export default Sidebar;
