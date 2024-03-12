"use client";
import React from "react";
import CountUp from "react-countup";
import TestimonialSlider2 from "../slider/TestimonialSlider2";
const TestimonialSection2 = () => {
  return (
    <div>
      <section className="tf__testimonial_2 mt_100 pb_45">
        {/* <div className="tf__counter_2 wow fadeInUp"> */}
          {/* Remove extra div */}
          {/* <div className="tf__counter_area mt_95"> */}
            {/* <div className="tf__counter2_overlay"></div>
          </div> */}
        {/* </div> */}
        <div className="tf__testimonial_2_area tf__testimonial_2">
          <div className="container">
            {/* Remove the extra row and adjust margin */}
            <div className="row wow fadeInUp mb-4">
              <div className="col-xl-6 col-xxl-5 col-md-8 col-lg-6 m-auto">
                <div className="tf__heading_area mb_25 ">
                  <h2 className="md:mb-10">Our Testimonials</h2>
                </div>
              </div>
            </div>
            <TestimonialSlider2 />
          </div>
        </div>
      </section>
    </div>
      
  );
};

export default TestimonialSection2;
