import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FaAngleRight, FaHome, FaRegClock } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker,faPhone,faEnvelope,faClock} from '@fortawesome/free-solid-svg-icons';

const FooterSection = () => {
  return (
    <footer className="tf__footer mt_100">
      <div className="tf__footer_overlay pt_75">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-3 col-sm-10 col-md-7 col-lg-6">
              <div className="tf__footer_logo_area">
                <Link className="footer_logo" href="/">
                  { <Image
                    src="/images/logo.png"
                    alt="Eduor"
                    className="md:cursor-pointer  w-10"
                    style={{ filter: 'drop-shadow(4px -1px 15px white)', maxWidth: '150px', maxHeight: '90px' }}
                    width={150}
                    height={90}
                  /> }
                </Link>
                <p>
                We’re here to provide you with a safe space to share your stories & seek support from a community that understands & empathizes with their struggles.
                </p>
                {/* <ul className="d-flex flex-wrap">
                  <li>
                    <a href="https://www.facebook.com/weAvecUofficial">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/weavecu_official">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/avec_we?s=09">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/we-avec-u/">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://api.whatsapp.com/message/734MKRELI32IM1?autoload=1&app_absent=0">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="col-xl-2 col-sm-10 col-md-5 col-lg-5">
              <div className="tf__footer_content xs_mt_50">
                <h3>Useful Links</h3>
                <ul>
                  <li>
                    <Link href="/courses">Home</Link>
                  </li>
                  <li>
                    <Link href="/events">About Us</Link>
                  </li>
                  <li>
                    <Link href="/about">Gallery</Link>
                  </li>
                  <li>
                    <Link href="/contact">Book Session</Link>
                  </li>
                  <li>
                    <Link href="/contact">Blog</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-sm-10 col-md-7 col-lg-col-lg-6">
              <div className="tf__footer_content xs_mt_30">
                <h3>GET IN TOUCH</h3>
                 {/* <p><FaHome className='flex-[10%]' /> 2305, 23rd Floor, Supertech E-Square, Sector 96, Noida, Uttar Pradesh 201303</p>
                <p>
                  <span> <FontAwesomeIcon icon={faPhone} size="sm" height={15} />  +91-7300960642
                  </span>
                </p>
                <p>
                  <span><FontAwesomeIcon icon={faEnvelope} className='flex-[10%]'/>  abc@weavecu.com</span>
                </p> 
                <p>
                  <span><FontAwesomeIcon icon={faClock} size="sm" height={15} />  10AM to 8PM - Sun Closed</span>
                </p>  */}
                 <ul>
            <li>
              <p className='flex gap-2 items-start'> <FaHome className='flex-[10%]' />
                <span className='flex-[90%]'>
                  2305, 23rd Floor, Supertech <br></br> E-square,Sector 96, Noida,<br />Uttar Pradesh 201303
                </span>
              </p>
            </li>
            <li>
              <p className='flex gap-2 items-start'> <BsTelephoneFill className='flex-[10%]' />
                <span className='flex-[90%]'>
                  +91 7300960642
                </span>
              </p>
            </li>
            <li>
              <p className='flex gap-2 items-start'> <MdEmail className='flex-[10%]' />
                <span className='flex-[90%]'>
                  abc@weavecu.com
                </span>
              </p>
            </li>
            <li>
              <p className='flex gap-2 items-start'> <FaRegClock className='flex-[10%]' />
                <span className='flex-[90%]'>
                  10AM to 8PM - Sun Closed
                </span>
              </p>
            </li>
            </ul>
                  </div>
            </div>
            <div className="col-xl-3 col-sm-10 col-md-5 col-lg-4 col-lg-5">
              <div className="tf__footer_content xs_mt_45">
                <h3>OUR LOCATION</h3>
                {/* <p>
                  Our approach to itis unique around know work an we know Get
                  hands on the you like
                </p>
                <form>
                  <input type="text" placeholder="Your Email" />
                  <button>send</button>
                </form> */}
                <div className='h-[13rem] w-full '>
                <iframe loading="lazy" src="https://maps.google.com/maps?q=we%20avecu&#038;t=m&#038;z=13&#038;output=embed&#038;iwloc=near" title="we avecu" aria-label="we avecu" className='h-full w-full'></iframe>
                </div>
              </div>
            </div>
          </div>
           <div className="row">
            <div className="col-12">
              <div className="tf__copyright">
                <p>Copyright 2023 © All Right Reserved We Avec U Organization</p>
                <ul className="d-flex flex-wrap">
                  <li>
                    <Link href="/privacy-policy">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="/about">Refund Policy</Link>
                  </li>
                  <li>
                    <Link href="/about">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
