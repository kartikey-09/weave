import React from "react";
import Image from "next/image";

const AboutSection3 = ({ style }) => {
  return (
    <div className={`${style} tf__about_2_area`}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 wow fadeInLeft">
            <div className="tf__about_2_img">
              <div className="tf__about_small">
                <Image
                  src="https://eduor.vercel.app/images/about_2_img_2.jpg"
                  alt="about us"
                  className="img-fluid w-100"
                />
              </div>
              <div className="tf__about_large">
                <Image
                  src="https://eduor.vercel.app/images/about_2_img_1.jpg"
                  alt="about us"
                  className="img-fluid w-100"
                />
              </div>
              <p>
                <span>8+</span> Years of Experience
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 wow fadeInRight">
            <div className="tf__about_2_text">
              <div className="tf__heading_area tf__heading_area_left mb_25">
                <h5>About We Avec U</h5>
                <h2>You Matter to Us,
And We're Here to Help</h2>
              </div>
              <p>
              Welcome to We Avec U, your gateway to unparalleled digital excellence! {" "}
              </p>


              <ul>
                <li>
                  <span className="icon">
                    <Image
                      src="images/about_2_icon_1.jpg"
                      alt="about"
                      className="img-fluid w-100"
                    />
                  </span>
                  <span className="text">
                    <h4>Confidentiality & Privacy</h4>
                    {/* <p>
                      Business tailored it design, management support services.
                    </p> */}
                  </span>
                </li>
                <li>
                  <span className="icon">
                    <Image
                      src="images/about_2_icon_2.jpg"
                      alt="about"
                      className="img-fluid w-100"
                    />
                  </span>
                  <div className="text">
                    <h4>Expert Practitioners</h4>
                    {/* <p>
                      Business tailored it design, management support services.
                    </p> */}
                  </div>
                </li>
                <li>
                  <span className="icon">
                    <Image
                      src="images/about_2_icon_3.jpg"
                      alt="about"
                      className="img-fluid w-100"
                    />
                  </span>
                  <span className="text">
                    <h4>Inclusive Therapists</h4>
                    {/* <p>
                      Business tailored it design, management support services.
                    </p> */}
                  </span>
                </li>
                <li>
                  <span className="icon">
                    <Image
                      src="images/about_2_icon_4.jpg"
                      alt="about"
                      className="img-fluid w-100"
                    />
                  </span>
                  <span className="text">
                    <h4>Global Certification</h4>
                    {/* <p>
                      Business tailored it design, management support services.
                    </p> */}
                  </span>
                </li>
               
              </ul>
              
            </div>
          </div>
          <div className="col-12 mt_110 xs_mt_100 wow fadeInUp">
            {/* <div className="tf__about_us_counter d-flex flex-wrap align-items-center"> */}
              {/* <p>
                <span className="counter">27,0000</span> More Students courde
                youn do best !
              </p>
              <a href="#">Export All</a> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection3;
