"use client";
import { useEduorContext } from "@/context/EduorContext";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker,faPhone,faEnvelope,faClock} from '@fortawesome/free-solid-svg-icons';

const FooterSection2 = ({ style, logo }) => {
  const { handleVideoShow } = useEduorContext();
  return (
    <footer className={style}>
      <div className="container">
        <div className="tf__footer_apply">
          <div className="tf__footer_apply_overlay">
            <a className="venobox" role="button" onClick={handleVideoShow}>
              <i className="fas fa-play"></i>
            </a>
            <h3>Elevate your career with our expert-led training and certification programs</h3>
            <p>
            Join our internship program for hands-on experience and certification
            </p>
            <a className="apply_btn" href="#">
              Consultation Now
            </a>
          </div>
        </div>
      </div>

      <div className="tf__footer">
        <div className="tf__footer_overlay pt_225">
          <div className="container">
            <div className="tf__footer_2_content_area">
              <div className="row justify-content-between">
                <div className="col-xl-3 col-md-7 col-lg-3">
                  <div className="tf__footer_logo_area">
                    <Link className="footer_logo" href="/">
                      <img src={logo} alt="Eduor" className="img-fluid w-100" style={{ filter: 'drop-shadow(4px -1px 15px white)', maxWidth: '150px', maxHeight: '90px' }}/>
                    </Link>
                    <p>
                    We’re here to provide you with a safe space to share your stories & seek support from a community that understands & empathizes with their struggles.
                    </p>
                    <ul className="d-flex flex-wrap">
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
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-google-plus-g"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-2 col-md-5 col-lg-3">
                  <div className="tf__footer_content">
                    <h3>Quick Links</h3>
                    <ul>
                      <li>
                        <Link href="/courses">Home</Link>
                      </li>
                      <li>
                        <Link href="/events">About Us</Link>
                      </li>
                      <li>
                        <Link href="/about">Blogs</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link href="/contact">Make An Appointment</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-3 col-md-7 col-lg-3">
                  <div className="tf__footer_content">
                    <h3>Our Contacts</h3>
                    <p><FontAwesomeIcon icon={faMapMarker} size="sm" height={15} /> 2305, 23rd Floor, Supertech E-Square, Sector 96, Noida, Uttar Pradesh 201303</p>
                    <p>
                      <span><FontAwesomeIcon icon={faPhone} size="sm" height={15} /> +91-9169179918</span>
                      {/* <span>Fax: +8 846512 456 788</span> */}
                    </p>
                    <p>
                      <span><FontAwesomeIcon icon={faEnvelope} size="sm" height={15} /> info@weavecu.org</span>
                      {/* <span>Website: yourwebsite.com</span> */}
                    </p>
                    <p>
                      <span>
                      <FontAwesomeIcon icon={faClock} size="sm" height={15} /> 10AM to 8PM - Sun Closed
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-xl-3 col-md-5 col-lg-3">
                  <div className="tf__footer_content">
                    <h3>OUR LOCATION</h3>
                    {/* <p>
                      Our approach to itis unique around know work an we know
                      Get hands on the you like
                    </p> */}
                    <div className='h-[13rem] w-full '>
                <iframe loading="lazy" src="https://maps.google.com/maps?q=we%20avecu&#038;t=m&#038;z=13&#038;output=embed&#038;iwloc=near" title="we avecu" aria-label="we avecu" className='h-full w-full'></iframe>
                </div>
                    {/* <form>
                      <input type="text" placeholder="Your Email" />
                      <button>send</button>
                    </form> */}
                  </div>
                </div>

                <div className="col-12">
                  <div className="tf__copyright">
                    <p>Copyright 2023 © All Right Reserved We Avec U Organization</p>
                    <ul className="d-flex flex-wrap">
                      <li>
                        <a href="#">Privacy policy</a>
                      </li>
                      <li>
                        <a href="#">Refund Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection2;
