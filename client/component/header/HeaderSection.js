import Link from "next/link";
import React from "react";

const HeaderSection = () => {
  return (
    <header className="tf__header d-none d-lg-block">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tf__header_text">
              <Link href="/">
                <img
                  src="images/logo.png"
                  alt="Eduor"
                  className="img-fluid w-100"
                />
              </Link>
              <ul>
                <li>
                  <div className="icon">
                    <i className="fa fa-phone-alt"></i>
                  </div>
                  <div className="text">
                    <h4>+91-9169179918</h4>
                    <p>Requesting a Call:</p>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <i className="fa fa-clock"></i>
                  </div>
                  <div className="text">
                    <h4>09.00 - 21.00</h4>
                    <p>Monday - Saturday</p>
                  </div>
                </li>
                <li>
                  <div className="icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div className="text">
                    <h4>E-maile</h4>
                    <p>info@weavecu.org</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
