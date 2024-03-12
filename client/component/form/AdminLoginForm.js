"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {  useEffect,useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye } from 'react-icons/ai'
import { SessionContext } from '@/context/sessionContext'; 
import Link from "next/link";
import { loginAdmin } from "@/features/AdminSlice";

const AdminLoginForm = () => {
  const router=useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // State for loading indicator

  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    if (admin._id) {
      router.push('/admin/welcome');
      toast.success('Login successful');
    }
}, [router,admin])

useEffect(() => {
    window.scrollTo(0, 0);
}, [])

  const changeHandler = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

    if (formData.email.trim() === '') {
      toast.error('Enter a valid Email');
      setLoading(false); // Stop loading when there's an error
      return;
    }
    if (formData.password.trim() === '') {
      toast.error('Enter a valid Password');
      setLoading(false); // Stop loading when there's an error
      return;
    }

    // Dispatch login action
    try {
      // Dispatch login action
      await dispatch(loginAdmin(formData));
      setLoading(false); // Stop loading when login is successful
     
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false); // Stop loading when there's an error during login
      toast.error('Please try again later');
    }
  };

  return (
    <>
      
      <form onSubmit={handleSubmit} >
<div className="flex justify-center">
  <img
    src="https://weavecu.com/wp-content/uploads/2023/03/We-Avec-U-logo-PNG.png"
    alt="logo"
    style={{ maxWidth: "185px", maxHeight: "200px" }}
  />
</div>
<div className="row">
<div className="col-xl-12">
      <label className="text-sm font-custom font-[500]">email</label>
    <div className="tf__login_imput" style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={changeHandler}
        className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
      />
      <div style={{ height: '24px', width: '24px' }}>
       
      </div>
    </div>
  </div>
  <div className="col-xl-12">
<label className="text-sm font-custom font-[500]">Password</label>
<div className="tf__login_imput" style={{ display: 'flex', alignItems: 'center' }}>
<input
type={showPassword ? "text" : "password"}
placeholder="Password"
name="password"
value={formData.password}
onChange={changeHandler}
className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
/>
<div
className={`cursor-pointer ${
  showPassword ? "text-green-500" : "text-gray-800"
} `}
onClick={() => setShowPassword((prev) => !prev)}
style={{ marginLeft: '8px' }}
>
<AiFillEye />
</div>
</div>
</div>
        <div className="col-xl-12">
          <div className="tf__login_imput">
            <button type="submit" className="common_btn">
              {loading ? 'Loading...' : 'SIGN IN'} {/* Display loading indicator or text */}
            </button>
          </div>
        </div>
        </div>
      </form>
      <div>
        <Link href="/">
          <button className="border-2 border-[#26394c] bg-[#26394c] text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-[#000] duration-100 transition-all flex justify-center items-center tracking-wider">
            {'Back to Home'}
          </button>
        </Link>
      </div>
 
    </>
  )
};

export default AdminLoginForm;

  
