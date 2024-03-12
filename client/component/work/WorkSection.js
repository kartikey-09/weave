"use client";
import React from "react";
import WorkSlider from "../slider/WorkSlider";

const WorkSection = () => {
  return (
    <section className="tf__work pt_95">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-8 col-lg-6 m-auto wow fadeInUp">
            <div className="tf__heading_area mb_35 md_margin">
              {/* <h5>Our Psychologist</h5> */}
              <h2>Our Pillars</h2>
              {/* <p>Our counseling professionals have extensive experience in diverse specializations and provide personalized care to help clients achieve mental wellness and personal growth</p> */}
            </div>
          </div>
        </div>
        <WorkSlider />
      </div>
    </section>
  );
};

export default WorkSection;
