"use client";
import React from "react";
import AdminLoginForm from "../form/AdminLoginForm";
import Link from "next/link";

const Adminloginsec = () => {
  return (
    // <section className="tf__login mt_195 xs_mt_95">
      <div className="container pt-2">
        <div className="row wow fadeInUp">
          <div className="col-xxl-5 col-xl-6 col-md-9 col-lg-7 m-auto">
            <div className="tf__login_area">
              <h2>Welcome to We Avec U Admin Panel</h2>
              <p>sign in to continue</p>
              <AdminLoginForm/>
              
             {/* <ul className="d-flex">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
              </ul> 
               */}
            </div>
          </div>
        </div>
      </div>
    // </section>
  );
};

export default Adminloginsec;
