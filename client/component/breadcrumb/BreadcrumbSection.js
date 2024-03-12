"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const BreadcrumbSection = ({ header, title }) => {
  return (
    <section className="pt-5 pb-16">
      <div className="container">
        <div className="row">
          <div className="col-12 flex justify-around items-center">
            <div className="tf__breadcrumb_text">
              <h2>{header}</h2>
              <div className="text-align: left;">
                <p>
                  Welcome to We Avec U, where we are passionate to reach the
                  unreached, and provide a holistic one-stop 
                  destination for psychological, life sciences, educational, and
                  research services. Explore our platform,
                  
                  where every solution is tailored to illuminate your journey
                  toward mental well-being, academic growth,
                  and scientific exploration.
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
                <Image src="https://img.freepik.com/premium-photo/portrait-schoolgirl-with-backpack-books-student-girl-looks-into-camera-smiles-white-background-place-text-academic-year-semester-exam-science_444187-1189.jpg" 
                alt="snow"
                className="max-w-[600px]"
                width={600}
                height={600}
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbSection;
