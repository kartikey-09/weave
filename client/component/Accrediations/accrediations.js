"use client";
// import React from "react"

// const Section5 = () => {
//   const imageSources = [
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355685/logos/logo-sfn_p79rwb.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355685/logos/download_eslsvc.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/NCDA-featured_xsqwm3.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/the_british_psychological_society_i4wdry.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/aata_logo_lkqxsy.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/American_Psychiatric_Association_logo_2015_ugnoy0.webp',

//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/Association_for_Psychological_Science_Logo_-_PNG_uaoz5e.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/download-1_orw3jl.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/iso2015-1024x395-1_p8svan.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/nsdc-logo-ss_jzavpq.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/logoNCS-1_wk1cfn.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355799/logos/download-2_cocjgp.webp',

//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355912/logos/logo-wfmh_excp83.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355911/logos/MSME_es8zzk.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355911/logos/accredited-purple_m4p9uw.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355909/logos/4b548d_1569430eaaae494c8e9d0c2e06e2fa34_mv2-1_u9bquk.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355909/logos/logo-1_dbv3io.webp',
//     'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355909/logos/iacaet-jpeg-s-1_ngseno.webp',
//   ]

//   return (
//     <div className="testisection">
//     <div >
//       <h1 style={{color:'white',display:'flex',justifyContent:'center',alignItems:'center'}}>Accreditations and Affiliations</h1>
//     <div className="image-container">
      
//       {imageSources.map((src, index) => (
//         <Image key={index} src={src} alt={`Image ${index + 1}`} className="image" />
//       ))}
//       </div></div></div>
//   );  
// }

// export default Section5

//New

import React from "react"
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./lol.css"
const Section5 = () => {
  const imageSources = [
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355685/logos/logo-sfn_p79rwb.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355685/logos/download_eslsvc.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/NCDA-featured_xsqwm3.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/the_british_psychological_society_i4wdry.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/aata_logo_lkqxsy.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355684/logos/American_Psychiatric_Association_logo_2015_ugnoy0.webp',

    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/Association_for_Psychological_Science_Logo_-_PNG_uaoz5e.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/download-1_orw3jl.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/iso2015-1024x395-1_p8svan.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/nsdc-logo-ss_jzavpq.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355800/logos/logoNCS-1_wk1cfn.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355799/logos/download-2_cocjgp.webp',

    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355912/logos/logo-wfmh_excp83.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355911/logos/MSME_es8zzk.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355911/logos/accredited-purple_m4p9uw.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355909/logos/4b548d_1569430eaaae494c8e9d0c2e06e2fa34_mv2-1_u9bquk.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355909/logos/logo-1_dbv3io.webp',
    'https://res.cloudinary.com/dqtuuuvbg/image/upload/v1699355909/logos/iacaet-jpeg-s-1_ngseno.webp',
  ]
  
  const settings = {
    infinite: true,
    speed: 10000,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay:true,
    arrows:false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

return (
    <div className="testisection">
      <div>
        <h2 className=" text-white text-center text-[36px] mb-10">
          Accreditations and Affiliations
        </h2>
        <div className="">
          <Slider {...settings}>
            {imageSources.map((src, index) => {
             return  <div key={index} className="">
                <Image src={src} alt={`Image ${index + 1}`} className="image" width={190} height={190}/>
              </div>
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Section5
  
