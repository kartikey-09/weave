import Link from "next/link";
import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="tf__about mt_250 xs_mt_195">
      <div className="container">
        <div className="tf__about_top wow fadeInUp">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="tf__about_top_img">
                <Image
                  src="images/bche.jpg"
                  alt="about"
                  className="img-fluid w-100"
                />
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="tf__about_top_text">
                <div className="tf__about_top_text_center">
                  {/* <h4>Study Off Flexibly</h4> */}
                  <p>
                  We strive to create awareness about mental health and provide effective solutions to help individuals lead a happier, healthier life. Whether you’re struggling with anxiety, depression, or any other mental health challenge, we’re here to help you every step of the way.
                  </p>
                </div>
                <a href="#" className="common_btn">
                  read more
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-md-9 col-lg-6 wow fadeInLeft">
            <div className="tf__about_text">
              <div className="tf__heading_area tf__heading_area_left mb_25">
              <h5>About We Avec U</h5>
                <h2>You Matter to Us,
And We're Here to Help</h2>
              </div>
              
              <p>
              Welcome to We Avec U, your gateway to unparalleled digital excellence! 
              </p>
              
              <ul>
                <li>Confidentiality & Privacy</li>
                <li>Expert Practitioners</li>
                <li>Inclusive Therapists</li>
                <li>Global Certification</li>
                <li>Holistic Methods</li>
                <li>Personalized Practicum</li>
              </ul>
              <Link href="/about" className="common_btn">
                about more
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-sm-9 col-md-8 col-lg-6 wow fadeInRight">
            <div className="tf__about_img">
              <Image
                src="images/bcha.jpg"
                alt="about"
                className="img-fluid w-100"
              />
              <div className="text">
                <i className="far fa-check-circle"></i>
                <h3>183k+</h3>
                <p>Complete Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
