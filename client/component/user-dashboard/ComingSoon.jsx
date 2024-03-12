"use client"
import React from 'react'

const ComingSoon = () => {
  return (
    <div className='flex justify-center items-center h-[14rem] md:h-[20rem] w-full'>
          <h2 data-aos="fade-up" data-aos-duration="2000" className='font-custom text-center text-3xl md:text-4xl text-black tracking-wide font-[600] my-4'>
              Coming
              {" "}
              <span className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent'>
                  Soon
              </span>
          </h2>
    </div>
  )
}

export default ComingSoon