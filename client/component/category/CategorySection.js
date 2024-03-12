import React from "react";

const CategorySection = () => {
  return (
    <section className="tf__categories mt_95 mt-8 md:mt-20">
      <div className="container mb-11">
        <div className="row">
          <div className="col-xl-6 col-md-8 col-lg-6 m-auto wow fadeInUp">
            <div className="tf__heading_area mb_15">
              <h5>Our Services</h5>
              <h2>We're here to listen, and provide guidance</h2>
              <p>Our team of experts is committed to actively listening, understanding, and providing you with personalized guidance to
support you navigate life’s challenges.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category light_blue">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Clinic</h3>
                {/* <p>We can provide you with a handyan in London.</p> */}
                <div>
                <ul className='text-sm font-custom font-[500] text-black tracking-wide flex flex-col gap-2 mt-2 list-disc pl-4'>
                <li>- Counselling and therapy sessions</li>
                <li>- Career guidance</li>
                <li>- Supervision and mentorship</li>
                <li>- Psychometric testing</li>
                
              </ul>
              </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category blue">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Institute</h3>
                <div><ul className='text-sm font-custom font-[500] text-black tracking-wide flex flex-col gap-2 mt-2 list-disc pl-4'>
                <li>- Training-cum-internship</li>
                <li>- Certification and diploma courses</li>
                <li>- Workshops and webinars</li>
                
              </ul></div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category green">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Research</h3>
                <div><ul className='text-sm font-custom font-[500] text-black tracking-wide flex flex-col gap-2 mt-2 list-disc pl-4'>
                
                <li>- Research upgradation</li>
                <li>- Research assistance</li>
                <li>- Journal and publishing services</li>
              </ul></div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category gray">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Corporate well-being</h3>
                <div><ul className='text-sm font-custom font-[500] text-black tracking-wide flex flex-col gap-2 mt-2 list-disc pl-4'>
                <li>- Employee well-being</li>
                <li>- Workshops and webinars</li>
              </ul></div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category orange">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>We Avec U Academy</h3>
                <div><ul className='text-sm font-custom font-[500] text-black tracking-wide flex flex-col gap-2 mt-2 list-disc pl-4'>
                <li>- Coaching for competitive exams</li>
                <li>- Tuition classes</li>
              </ul></div>
              </div>
            </div>
          </div>
          {/* <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category red">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Conference</h3>
                <div><ul className='text-sm font-custom font-[500] text-black tracking-wide flex flex-col gap-2 mt-2 list-disc pl-4'><li>- Coming Soon..</li>
                <li>- Coming Soon</li></ul></div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;