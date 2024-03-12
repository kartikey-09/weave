"use client";
import { useEduorContext } from "@/context/EduorContext";
import Link from "next/link";
import React from "react";

const BannerSection2 = () => {
  const { handleVideoShow } = useEduorContext();
  return (
    <section className="tf__banner_2">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="tf__banner_text tf__banner_2_text wow fadeInUp">
              <h5>Welcome to We Avec U</h5>
              <h1>
                Building Strong <span>Minds</span> Together!
              </h1>
              <p>
              We are committed to creating a stigma-free environment with empathy, support, and guidance for your mental health needs.
              </p>
              <ul className="d-flex flex-wrap align-items-center">
                <li>
                  <Link className="common_btn_2" href="/courses">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <a
                    className="venobox play_btn"
                    role="button"
                    onClick={handleVideoShow}
                  >
                    <i className="fas fa-play"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection2;
