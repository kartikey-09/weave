"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { BASE_URL } from "@/services/apis";
import Image from "next/image";

const TestimonialSlider2 = () => {

  const [testimonialData, setTestimonialData] = useState([]);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/fetchAllTestimonial`
        );
        setTestimonialData(response.data.data);
        console.log(testimonialData)
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <Slider
      className="row testi_slider_2"
      slidesToShow={3} 
      infinite={true}
      dots={true}
      autoplay={true}
      arrows={false}
      slidesToScroll={1} 
      responsive={[
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {testimonialData.map((item) => (
          <div className="testimonialSlider text-black bg-white rounded-lg p-3 md:h-[250px]" key={item._id}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="">
              <div className="flex items-center">
                <Image src={item.imgUrl} alt="client" style={{width:"30px !important"}} width={30} height={30} />
                <div className="ml-5">
                  <h3 className="text-md font-bold">{item.name}</h3>
                  <span className="text-sm text-gray-500">1 Reviews</span>
                  <div className="my-2 text-yellow-400">
                {Array.from({ length: item.rating }, (_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
                {Array.from({ length: 5 - item.rating }, (_, index) => (
                  <i key={index + item.rating} className="far fa-star text-yellow-500"></i>
                ))}
              </div>
                </div>
              </div>
              {/* <div className="my-2 text-yellow-400">
                {Array.from({ length: item.rating }, (_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
                {Array.from({ length: 5 - item.rating }, (_, index) => (
                  <i key={index + item.rating} className="far fa-star text-yellow-500"></i>
                ))}
              </div> */}
              <p className="p-2">{item.description.length > 185 ? 
    <>{item.description.substring(0, 185)} <span className="text-blue-500">...more</span></> : 
    item.description
  }</p>
              {item.description.length > 185 && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {/* ...more */}
              </a>
               )}
              {/* <div className="my-2 flex"> */}
              
                <i className="fa fa-thumbs-up p-2"></i>
                <i className="fa fa-share-nodes ml-5"></i>
                
              {/* </div> */}
            </a>
          </div>
        ))}
    </Slider>
  );
};

export default TestimonialSlider2;
