import Link from "next/link";
import React from "react";

const Errorsection = () => {
  return (
    <section className="tf__error_page mt_195 xs_mt_100">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 m-auto wow fadeInUp">
            <div className="tf__error_text">
              <h4> Page not found</h4>
              <p>Sorry Page Not found</p>
              <Link className="common_btn" href="/">
                go back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Errorsection;
