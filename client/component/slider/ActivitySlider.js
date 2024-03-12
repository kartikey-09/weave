"use client";
import { useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import { activitiesData } from "@/data/Data";
import CountUp from 'react-countup';
import React from "react";
import Slider from "react-slick";

const ActivitySlider = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    
    <Slider
      className="row popular_service_slider wow fadeInUp"
      slidesToShow={4} // Set the number of slides to show
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
            slidesToShow: 3,
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
            slidesToShow: 2,
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
      
        {activitiesData.map((item) => (
        <div className="col-xl-3" key={item.id}>
          <div className={`tf__activities_item ${item.color}  h-[200px] mx-12 md:h-[250px] md:mx-2`}>
            <span>
              {" "}
              <i className={item.iClassName}></i>{" "}
            </span>

            <div className="removeStyleFromSpan">
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                {counterOn && item?.count && (
                  <CountUp
                    start={0}
                    end={item?.count}
                    duration={1}
                    delay={0}
                  />
                )}
                <span>{item.title}</span>
              </ScrollTrigger>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ActivitySlider;
