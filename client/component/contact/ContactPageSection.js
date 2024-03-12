import React from "react";
import ContactForm from "../form/ContactForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faMapMarker} from '@fortawesome/free-solid-svg-icons';


const ContactPageSection = () => {
  return (
    <section className="tf__contact_page mt_190 xs_mt_95">
      <div className="container">
        <div className="row">
          <div className="col-xxl-8 col-xl-7 col-lg-6 wow fadeInLeft">
            <div className="tf__contact_form">
              <div className="tf__heading_area tf__heading_area_left mb_25">
                <h5>OUR contact Us</h5>
                <h2>Get In Touch</h2>
              </div>
              <p>
              Don’t hesitate to reach out to us via phone, email, or the contact form below. We’re looking forward to hearing from you and providing you with the support you need.
              </p>
              <ContactForm />
            </div>
          </div>
          <div className="col-xxl-4 col-xl-5 col-lg-6 wow fadeInRight">
            <div className="tf__contact_text">
              <div className="tf__contact_single">
                <div className="icon blue">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="text">
                  <h3>Call Us</h3>
                  <a href="callto:+880254615566">+91-9169179918</a>
                  {/* <a href="callto:+826542556455">+826542556455</a> */}
                </div>
              </div>
              <div className="tf__contact_single">
                <div className="icon orange">
                <FontAwesomeIcon icon={faEnvelope} size="sm" height={15} /> 
                </div>
                <div className="text">
                  <h3>Email Us</h3>
                  <a href="mailto:neta@eobi.com">info@weavecu.org</a>
                  {/* <a href="mailto:coraty@bara.com">coraty@bara.com</a> */}
                </div>
              </div>
              <div className="tf__contact_single">
                <div className="icon green">
                <FontAwesomeIcon icon={faMapMarker} size="sm" height={15} />  
                </div>
                <div className="text">
                  <h3>Address</h3>
                  <p>2305, 23rd Floor, Supertech E-Square, Sector 96, Noida, Uttar Pradesh 201303</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-12 wow fadeInUp">
            <div className="tf__contact_map mt_100">
              <iframe
                src="https://maps.google.com/maps?q=we%20avecu&#038;t=m&#038;z=13&#038;output=embed&#038;iwloc=near"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageSection;
