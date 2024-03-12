"use client";
import { courseDataArray } from "@/data/Data";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import axios from "axios";
import { BASE_URL } from "@/services/apis";

const CourseSlider = () => {
  const [workforceData, setWorkforceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/fetchAllWorkforce`
        );
        setWorkforceData(response.data.data); // Assuming the workforce data is in response.data.data
      } catch (error) {
        console.error("Error fetching workforce data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Slider
      className="row event_slider"
      slidesToShow={3} // Set the number of slides to show
      infinite={true}
      dots={true}
      arrows={false}
      autoplay={true}
      slidesToScroll={1} // Set to 1 to scroll one slide at a time
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
      {workforceData.map((item) => (
        <div className="col-xl-4 wow fadeInUp" key={item._id}>
          <div className="tf__single_courses">
            <div className="tf__single_courses_img">
              <Image
                src={item.imgUrlModelDBId.urls[0]} // Assuming the image URL is the first item in the 'urls' array
                alt="courses"
                className="img-fluid w-100"
                width={397}
                height={280}
                layout="responsive"
              />
              {/* You can customize the display based on your item properties */}
              {/* <span>{item.pronoun}</span> */}
            </div>
            <div className="tf__single_courses_text">
              <p className="description">{item.name} ({item.pronoun})</p>
              <p className="description">{item.designation}</p>
              <p className="description">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CourseSlider;
