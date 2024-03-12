"use client";
import React from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Link from "next/link";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#00306e" : "#308fe8",
  },
}));
const AboutSection2 = () => {
  return (
    <section className="tf__home_2_about pt_100 pb_100">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 wow fadeInLeft">
            <div className="tf__home_2_about_img">
              <Image
                src="images/about2.jpg"
                alt="about us"
                className="img-fluid w-100"
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 wow fadeInRight">
            <div className="tf__home_2_about_text">
              <div className="tf__heading_area tf__heading_area_left mb_25">
                <h5>OUR About Us</h5>
                <h2>You Matter to Us,
And We're Here to Help</h2>
              </div>
              <p>
              At We Avec U, we are committed to promoting mental wellness and breaking the stigma associated with mental health. {" "}
              </p>

              <div className="tf__skills_bar_single">
                <div className="tipWrap d-flex">
                  <p>Confidentiality & Privacy</p>
                  <span className="tip">70%</span>
                </div>
                <div id="bar1" className="barfiller mb_20">
                  <span className="fill" data-percentage="70">
                    <BorderLinearProgress variant="determinate" value={70} />
                  </span>
                </div>
              </div>
              <div className="tf__skills_bar_single">
                <div className="tipWrap d-flex">
                  <p>Inclusive Therapists</p>
                  <span className="tip">85%</span>
                </div>
                <div id="bar2" className="barfiller mb_20">
                  <span className="fill" data-percentage="85">
                    <BorderLinearProgress variant="determinate" value={85} />
                  </span>
                </div>
              </div>
              <div className="tf__skills_bar_single">
                <div className="tipWrap d-flex">
                  <p>Expert Practitioners</p>
                  <span className="tip">50%</span>
                </div>
                <div id="bar3" className="barfiller mb_20">
                  <span className="fill" data-percentage="50">
                    <BorderLinearProgress variant="determinate" value={50} />
                  </span>
                </div>
              </div>
              <div className="tf__skills_bar_single">
                <div className="tipWrap d-flex">
                  <p>Global Certification</p>
                  <span className="tip">60%</span>
                </div>
                <div id="bar4" className="barfiller mb_20">
                  <span className="fill" data-percentage="60">
                    <BorderLinearProgress variant="determinate" value={60} />
                  </span>
                </div>
              </div>

              <Link className="common_btn_2" href="/about">
                ABOUT MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;
