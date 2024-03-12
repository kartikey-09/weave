"use client";
import React, { useState, useEffect, useContext } from "react";
import { AiFillEye } from "react-icons/ai";
import { useEduorContext } from "@/context/EduorContext";
import { apiConnector } from "../../services/apiconnector";
import { UserAuthAPI } from "../../services/apis";
import { toast } from "react-hot-toast";
import { SessionContext } from "@/context/sessionContext";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../loader/loader";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobileNo: "",
    serviceCategory: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState("");
  // const user = useSelector((state) => state.user);
  const { user } = useContext(SessionContext);
  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (user._id) {
      router.push("/dashboard");
    }
  }, [router, user]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(formData);
    try {
      let response = await apiConnector({
        method: "POST",
        url: UserAuthAPI.registerNewUser_API,
        bodyData: {
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          mobileNo: formData.mobileNo,
          email: formData.email,
          password: formData.password,
          serviceCategory: formData.serviceCategory,
        },
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOtpSend(true);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setLoading(false);
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await apiConnector({
        method: "POST",
        url: UserAuthAPI.userAccountOTPVerification_API,
        bodyData: {
          email: formData.email,
          otp: otp,
        },
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        router.push("/sign-in");
        // setOtpSend(true);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setLoading(false);
  };
  return (
    <>
      {otpSend ? (
        <form onSubmit={handleOtpVerify} className="">
          <h2 className="text-lg font-[Poppins] text-center font-[500] pb-4 tracking-wide">
            Enter OTP send to{" "}
            <span className="text-green-500 italic underline">
              {formData?.email}
            </span>
          </h2>

          <div className="mb-4 flex flex-col">
            <label htmlFor="otp" className="text-sm font-[Poppins] font-[500]">
              OTP
            </label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              autoComplete="otp"
              value={otp}
              name="otp"
              type="text"
              className="text-sm border-2 border-green-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
            />
          </div>

          <div className="mb-4 mt-8 flex flex-col relative">
            <button
              type="submit"
              className="border-2 border-blue-500 bg-blue-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-blue-600 duration-100 transition-all flex justify-center items-center tracking-wider"
            >
              {loading ? <Loader /> : "VERIFY"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-xl-12 flex">
              <div className="tf__login_imput mr-2">
                <label className="ml-1 text-sm font-custom font-[500]">
                  First Name
                </label>
                <input
                  onChange={changeHandler}
                  autoComplete="given-name"
                  value={formData.firstname}
                  name="firstname"
                  type="text"
                  className=" text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                />
              </div>

              <div className="tf__login_imput ml-2">
                <label className="ml-1 text-sm font-custom font-[500]">
                  last Name
                </label>
                <input
                  onChange={changeHandler}
                  autoComplete="family-name"
                  value={formData.lastname}
                  name="lastname"
                  type="text"
                  className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                />
              </div>
            </div>
            <div className="col-xl-12 flex ">
              <div className="tf__login_imput flex-1 mr-2 ">
                <label className=" ml-1 text-sm font-custom font-[500]">
                  Email
                </label>
                <input
                  onChange={changeHandler}
                  autoComplete="email"
                  value={formData.email}
                  name="email"
                  type="email"
                  className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                />
              </div>
              <div className="tf__login_imput flex-1 ml-2 ">
                <label className="ml-1 text-sm font-custom font-[500]">
                  Mobile Number
                </label>
                <input
                  onChange={changeHandler}
                  autoComplete="tel"
                  value={formData.mobileNo}
                  name="mobileNo"
                  type="text"
                  className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                />
              </div>
            </div>

            <div className="col-xl-12 flex">
              <div
                className="tf__login_imput flex-1 mr-2"
              >
                <label className="ml-1 text-sm font-custom font-[500]">
                  password
                </label>
                <div className="flex ">
                  <div className="w-90 ">
                <input
                  onChange={changeHandler}
                  value={formData.password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className=" text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                  autoComplete="current-password"
                />
                </div>
                <div
                  className={`cursor-pointer w-10 mt-2 ${
                    showPassword ? "text-green-500" : "text-gray-800"
                  } `}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ marginLeft: "8px" }}
                >
                  <AiFillEye />
                </div>
                </div>
              </div>
              <div className="tf__login_imput flex-1 ml-2">
                <label className="ml-1 text-sm font-custom font-[500]">
                  Service Category
                </label>
                <select
                  name="serviceCategory"
                  id="serviceCategory"
                  className=" text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                  onChange={changeHandler}
                  value={formData.serviceCategory}
                >
                  <option value="">Select Category</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Institute">Institute</option>
                  <option value="Research">Research</option>
                  <option value="Corporate Wellbeing">
                    Corporate Wellbeing
                  </option>
                </select>
              </div>
            </div>
            

            <div className="col-xl-12">
              <div className="tf__login_imput">
                <button type="submit" className="common_btn">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
