import React from "react";
import CourseSlider from "../slider/CourseSlider";
import { colors } from "@mui/material";

const CourseSection = ({ style }) => {
  return (
    <section className={`${style} mt_95`}>
      <div className="container">
        <div className="row wow fadeInUp">
          <div className="col-xl-7 col-xxl-6 col-md-8 col-lg-6 m-auto">
            <div className="tf__heading_area mb_45">
              {/* <h5>OUR WORKFORCE</h5> */}
              <h2>Our Workforce</h2>
            </div>
          </div>
        </div>
        <CourseSlider />
        
      </div>
      
      <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
  <button className="nav-link common_btn">
    <h5 style={{color:'white', fontWeight: 'bold'}}>Join Our Team</h5>
  </button>
</div>
</div>
    </section>
  );
};

export default CourseSection;
