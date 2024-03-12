"use client";
import { useEduorContext } from "@/context/EduorContext";
import Link from "next/link";
import React from "react";
// url('https://img.freepik.com/premium-photo/portrait-schoolgirl-with-backpack-books-student-girl-looks-into-camera-smiles-white-background-place-text-academic-year-semester-exam-science_444187-1189.jpg')
const BannerSection = () => {
  const { handleVideoShow } = useEduorContext();
  return (
    <section className="tf__banner">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8">
            <div className="tf__banner_text wow fadeInUp">
              {/* <h5>Welcome to We Avec U!</h5> */}
              <h3>
                {/* Building Stronger <span>Minds,</span> Together! */}
                Reaching the unreachable, one stop solution for all psychological, life sciences, educational, and research services.
              </h3>
              {/* <p>
              We are committed to creating a stigma-free environment with empathy, support, and guidance for your mental health needs.
              </p> */}
              {/* <ul className="d-flex flex-wrap align-items-center">
                <li>
                  <Link className="common_btn" href="/sign-in">
                    Book Session
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
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
