"use client";
import React from "react";
import { useEduorContext } from "@/context/EduorContext";
import Navlink from "./Navlink";
import SubNavlink from "./SubNavlink";

const NavigationSection = ({ position, btnPosition, navRef }) => {
  const { isMobileNavOpen } = useEduorContext();
  return (
    <div
      ref={navRef}
      className={`collapse navbar-collapse ${isMobileNavOpen ? "show" : ""}`}
      id="navbarNav"
    >
      
      <ul className={`navbar-nav ${position}`}>
      {btnPosition ? null : (
          <li className="nav-item">
            <a className="nav-link common_btn" href="/sign-in">
              Book a Session
            </a>
          </li>
        )}
        <li className="nav-item">
        <Navlink href="/">Home</Navlink>
        </li>
        <li className="nav-item">
          <Navlink href="/about">about us</Navlink>
        </li>
        <li className="nav-item">
          <Navlink href="/courses">services</Navlink>
        </li>
        {/* <li className="nav-item">
          <Navlink href="/blog">blogs</Navlink>
        </li> */}
        <li className="nav-item">
        
              <Navlink href="#">More</Navlink>
            {/* <ul className="tf__droap_menu">
              <li>
              <SubNavlink href="/blog/learn-with-these-award-winning-best-blog-collage-courses">
                blog details
              </SubNavlink>
              </li>
            </ul> */}
          <ul className="tf__droap_menu"> 
            <li>
              <SubNavlink href="/team">
                Gallery
              </SubNavlink>
            </li>
            <li>
              <SubNavlink href="/blog/learn-with-these-award-winning-best-blog-collage-courses">
                Blogs
              </SubNavlink>
            </li>
             {/* <li> 
              <SubNavlink href="/events">event</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/events/outdoor-this-games">
                event details
              </SubNavlink>
            </li>
            <li>
              <SubNavlink href="/team">team</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/team/john-smith">team details </SubNavlink>
            </li>
            <li>
              <SubNavlink href="/faq">FAQs</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/sign-in">sign in</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/sign-up">sign up</SubNavlink>
            </li>
            <li>
              <SubNavlink href="/terms-condition">
                terms and condition
              </SubNavlink>
            </li>
            <li>
              <SubNavlink href="/privacy-policy">privacy policy</SubNavlink>
            </li> */}
          </ul>
          </li>
        <li className="nav-item">
          <Navlink href="/contact">contact us</Navlink>
        </li>
        {/* <li className="nav-item">
          <Navlink href="/sign-in">Login / Signup</Navlink>
        </li> */}
        {/* <li className="nav-item">
          <Navlink href="/sign-up">Sign-up</Navlink>
        </li> */}
        {btnPosition ? null : (
          <li className="nav-item">
            <a className="nav-link common_btn" href="/sign-in">
              Login / Signup
            </a>
          </li>
        )}
      </ul>
      {/* {btnPosition ? (
        <a className="common_btn_2 ms-auto" href="sign-in">
          Book a Session
        </a>
      ) : null} */}
    </div>
  );
};

export default NavigationSection;
