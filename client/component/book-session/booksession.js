"use client";
import Link from "next/link";
import Loader from "../loader/loader";
import { toast } from "react-hot-toast";
import "./booksession.css";
import { apiConnector } from "@/services/apiconnector";
import { ClinicBookingRequest } from "@/services/apis";
import { useState, useEffect,useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"
import Layout from "../layout/Layout";
const BookSession = () => {
  const router=useRouter();
  const [formData, setFormData] = useState({ email: '', name: '', age: '', whatsappNo: '', mode: '', description: ''})
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const changeHandler = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
          return {
              ...prev,
              [name]: value
          }
      })
  }

  useEffect(() => {
      window.scroll(0, 0)
  }, []);


  const handleSubmit = async (e) => {
      setLoading(true)
      e.preventDefault()
      try {
          let response = await apiConnector({
              method: "POST",
              url: ClinicBookingRequest.CreateClinicRequest_API,
              bodyData: {
                  email: formData.email,
                  name: formData.name,
                  age: formData.age,
                  whatsappNo: formData.whatsappNo,
                  mode: formData.mode,
                  description: formData.description,
              },
              headers: { token: user.token }
          });
          if (response?.data?.success) {
              toast.success(response?.data?.message)
              setFormData({ email: '', name: '', age: '', whatsappNo: '', mode: '', description: '' });
              if (formData.mode === 'online') {
                  router.push('/payment');
              }
              else{
                  navigate('/user-dashboard');
              }
          }
      } catch (error) {
          if (error?.response?.data?.message) {
              toast.error(error?.response?.data?.message);
          }
      }
      setLoading(false)
  }


  return (
    
      <Layout>
        {/* <div className="relative bookSession_bg "> */}
          {/* <div className="h-[100px] md:h-[100px]"></div> */}

          <div className=" px-3 md:px-32 py-4 md:py-12 min-h-[80vh]  flex justify-center items-center">
            <div className=" flex justify-center items-center w-full max-md:px-4">
              <div className="bg-[#e9f7fa] p-4 rounded-xl w-[32rem] py-12 border-2 border-blue">
                <form onSubmit={handleSubmit} className="">
                  <h2 className="text-2xl text-[#f87f43e2] font-custom text-center font-[500] pb-3 tracking-wide">
                    Book A Session
                  </h2>

                  <div className="col-xl-12 flex">
                  <div className="tf__login_imput mr-2">
                    <label
                      htmlFor="name"
                      className="ml-1 text-sm font-custom font-[500]"
                    >
                      Name
                    </label>
                    <input
                      onChange={changeHandler}
                      autoComplete="name"
                      value={formData.name}
                      name="name"
                      type="text"
                      className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                    />
                  </div>
                  <div className="tf__login_imput ml-2">
                    <label
                      htmlFor="email"
                      className="ml-1 text-sm font-custom font-[500]"
                    >
                      Email
                    </label>
                    <input
                      onChange={changeHandler}
                      autoComplete="email"
                      value={formData.email}
                      name="email"
                      type="text"
                      className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                    />
                  </div>
                  </div>
                  <div className="col-xl-12 flex">
                  <div className="tf__login_imput mr-2 flex-1">
                    <label
                      htmlFor="whatsappNo"
                      className="ml-1 text-sm font-custom font-[500]"
                    >
                      Whatsapp Number
                    </label>
                    <input
                      onChange={changeHandler}
                      autoComplete="tel"
                      value={formData.whatsappNo}
                      name="whatsappNo"
                      type="number"
                      className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                    />
                  </div>
                  <div className="tf__login_imput ml-2 flex-1">
                    <label
                      htmlFor="age"
                      className="ml-1 text-sm font-custom font-[500]"
                    >
                      Age
                    </label>
                    <input
                      onChange={changeHandler}
                      autoComplete="age"
                      value={formData.age}
                      name="age"
                      type="number"
                      className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                    />
                  </div>
                  </div>

                  

                  

                  

                  <div className="mb-3 flex flex-col">
                    <label
                      htmlFor="mode"
                      className="text-sm font-custom font-[500]"
                    >
                      Mode
                    </label>
                    <select
                      name="mode"
                      id="mode"
                      className="border-2 border-[#f87f43e2] outline-none focus:outline-none px-2 py-1 font-[Roboto] tracking-wide mt-1 text-sm rounded-md"
                      onChange={changeHandler}
                      value={formData.mode}
                    >
                      <option value="">Select Mode</option>
                      <option value="online">Online</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>

                  <div className="mb-3 flex flex-col">
                    <label
                      htmlFor="description"
                      className="text-sm font-custom font-[500]"
                    >
                      Description
                    </label>
                    <textarea
                      onChange={changeHandler}
                      value={formData.description}
                      name="description"
                      type="text"
                      className="text-sm border-2 border-[#f87f43e2] outline-none focus:outline-none rounded-md py-1 px-2 font-[Roboto] tracking-wide mt-1"
                      rows={5}
                    />
                  </div>

                  <div className="mb-4 mt-8 flex flex-col relative">
                    {user?._id ? (
                      <button
                        type="submit"
                        className="border-2 border-[#f87f43e2] bg-[#f87f43e2] text-black rounded-lg mx-auto px-8 py-1 text-sm font-custom hover:bg-[#f87f43f9] duration-100 transition-all flex justify-center items-center tracking-wider"
                      >
                        {loading ? <Loader /> : "SUBMIT"}
                      </button>
                    ) : (
                      <Link
                        href="/sign-in"
                        className="border-2 border-[#f87f43e2] bg-[#f87f43e2] text-black rounded-lg mx-auto px-8 py-1 text-sm font-custom hover:bg-[#f87f43f9] duration-100 transition-all flex justify-center items-center tracking-wider"
                      >
                        SUBMIT
                      </Link>
                    )}
                  </div>
                </form>
              </div>
            </div>
          {/* </div> */}
        </div>
      </Layout>
  );
};

export default BookSession;
