"use client";
import React from "react";
import Navbar from "@/component/Navbar2/Navbar";
import FooterSection from "../footer/FooterSection";
import ScrollToTopButton from "../utils/ScrollToTopButton";
import UpperNavbar from "../uppernavbar/uppernavbar.js";
import "../../public/css/globals.css";
const Layout = ({ children }) => {
  return (
    <>
    <div>

      <UpperNavbar />
    </div>
      <Navbar class1="" topDistance="" logo="images/logo.png" />
      {children}
      <ScrollToTopButton style="" />
      <FooterSection />
    </>
  );
};

export default Layout;
