"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../sidebar/sidebar'
import './welcome.css'
import '../../../public/css/globals.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const Welcome = () => {
  const admin = useSelector((state) => state.admin)
  const router=useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push('/admin/login-panel');
    }
  }, [admin, router]);
  return (
   
    <Sidebar>
       <div className='w-full h-screen flex justify-center items-center'>
    <div className='flex justify-center items-center'>
      <img src="https://weavecu.com/wp-content/uploads/2023/03/We-Avec-U-logo-PNG.png" alt="logo" className="md:cursor-pointer w-10 h-auto mx-4 logoImage" />
          </div>
          <h2 className='text-4xl text-center font-[Poppins] text-white font-[500] py-6 px-1'>
            Welcome to Admin Panel
          </h2>
          <div className='flex justify-center items-center'>
      <img src="https://weavecu.com/wp-content/uploads/2023/03/We-Avec-U-logo-PNG.png" alt="logo" className="md:cursor-pointer w-10 h-auto mx-4 logoImage" />
          
          </div>

        </div>
   
    </Sidebar>
   
  )
}

export default Welcome
