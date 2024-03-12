"use client";
import '../manage-users/manageUsers.css'
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Loader from "@/component/loader/loader";
import { apiConnector } from "@/services/apiconnector";
import {
  NavbarCenterSliderText_API,
  NavbarSliderText_API,
} from "@/services/apis";
import Sidebar from "../sidebar/sidebar.js";
import DisplayTextLinkInput from "./displayTextLinkInput.js";
import ViewCenterText from "./viewCentreText.js";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const NavbarSliderText = () => {
  const admin = useSelector((state) => state.admin);
  const router = useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push("/admin/login-panel");
    }
  }, [admin, router]);

  const [formData, setFormData] = useState({
    textPosition: "",
    displayText: "",
    link: "",
  });

  const [textNLink, setTextNLink] = useState([{ displayText: "", link: "" }]);

  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [allnavbarSliderTextData, setAllNavbarSliderTextData] = useState([]);
  const [allnavbarCenterSliderTextData, setAllNavbarCenterSliderTextData] =
    useState([]);

  const handleAddMoreTextNLink = () => {
    setTextNLink([...textNLink, { displayText: "", link: "" }]);
  };

  const handleDeleteTextNLink = (index) => {
    const updatedTextNLink = [...textNLink];
    updatedTextNLink.splice(index, 1);
    setTextNLink(updatedTextNLink);
  };

  const changeHandler = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo((pageNo = pageNo + 1));
      fetchAllNavbarSliderText(pageNo);
    }
  };

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo((pageNo = pageNo - 1));
      fetchAllNavbarSliderText(pageNo);
    }
  };
  const fetchAllNavbarSliderText = async (pageNo = 1, pageSize = 15) => {
    try {
      const res = await apiConnector({
        method: "GET",
        url:
          NavbarSliderText_API.fetchAllNavbarSliderText +
          `?pageNo=${pageNo}&pageSize=${pageSize}`,
      });
      console.log("response", res?.data?.data);
      setAllNavbarSliderTextData(res?.data?.data);
      setTotalPages(Math.ceil(res?.data.count / pageSize));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchAllNavbarCenterSliderText = async (pageNo = 1, pageSize = 15) => {
    try {
      const res = await apiConnector({
        method: "GET",
        url:
          NavbarCenterSliderText_API.fetchAllNavbarCenterSliderText +
          `?pageNo=${pageNo}&pageSize=${pageSize}`,
      });
      console.log("response", res?.data?.data);
      setAllNavbarCenterSliderTextData(res?.data?.data);
      setTotalPages(Math.ceil(res?.data.count / pageSize));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const deleteNavbarSliderText = async (id) => {
    try {
      await apiConnector({
        method: "DELETE",
        url: NavbarSliderText_API.deleteNavbarSliderText + `/${id}`,
      });
      toast.success("NavbarSlider Text Deleted");
      fetchAllNavbarSliderText();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    fetchAllNavbarSliderText(pageNo);
  };

  const deleteNavbarSliderCenterText = async (id) => {
    try {
      await apiConnector({
        method: "DELETE",
        url: NavbarCenterSliderText_API.deleteNavbarCenterSliderText + `/${id}`,
      });
      toast.success("NavbarCenterSlider Text Deleted");
      fetchAllNavbarSliderText();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    fetchAllNavbarCenterSliderText(pageNo);
  };

  const deleteNavbarSingleText = async (objectId, index) => {
    try {
      await apiConnector({
        method: "DELETE",
        url:
          NavbarCenterSliderText_API.deleteNavbarCenterSingleObjectText +
          `/${objectId}/${index}`,
      });
      toast.success("NavbarCenterSlider Text Deleted");
      fetchAllNavbarCenterSliderText();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCreateSliderText = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.textPosition === "Left" || formData.textPosition === "Right") {
      console.log("Normal Display Text and input Object : ", formData);
      try {
        const response = await apiConnector({
          method: "POST",
          url: NavbarSliderText_API.makeNavbarSliderText,
          bodyData: formData,
        });

        console.log("navbar slider text", response);

        setFormData({ textPosition: "", displayText: "", link: "" });
        toast.success(response?.data?.message);
        fetchAllNavbarSliderText();
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      console.log("Center Navbar Slider Text Array of Object: ", textNLink);
      try {
        const response = await apiConnector({
          method: "POST",
          url: NavbarCenterSliderText_API.makeNavbarCenterSliderText,
          bodyData: { textNLink },
        });
        toast.success(response?.data?.message);
        setTextNLink([{ displayText: "", link: "" }]);
        fetchAllNavbarCenterSliderText();
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchAllNavbarSliderText = async (pageNo = 1, pageSize = 15) => {
      try {
        const res = await apiConnector({
          method: "GET",
          url:
            NavbarSliderText_API.fetchAllNavbarSliderText +
            `?pageNo=${pageNo}&pageSize=${pageSize}`,
        });
        console.log("response", res?.data?.data);
        setAllNavbarSliderTextData(res?.data?.data);
        setTotalPages(Math.ceil(res?.data.count / pageSize));
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    const fetchAllNavbarCenterSliderText = async (
      pageNo = 1,
      pageSize = 15
    ) => {
      try {
        const res = await apiConnector({
          method: "GET",
          url:
            NavbarCenterSliderText_API.fetchAllNavbarCenterSliderText +
            `?pageNo=${pageNo}&pageSize=${pageSize}`,
        });
        console.log("response", res?.data?.data);
        setAllNavbarCenterSliderTextData(res?.data?.data);
        setTotalPages(Math.ceil(res?.data.count / pageSize));
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchAllNavbarSliderText();
    fetchAllNavbarCenterSliderText();
  }, []);

  return (
    <Sidebar>
      <div className="w-full min-h-screen relative">
        <div className="flex flex-col justify-between gap-8 py-4">
          {/* from to create admin */}
          <div className="flex justify-center items-center relative">
            <div className="flex justify-center items-center w-full max-md:px-4">
              <div className="bg-white p-4 rounded-xl w-[44rem] pt-6 pb-12">
                <form onSubmit={handleCreateSliderText} className="">
                  <h2 className="text-2xl font-[Poppins] text-center font-[500] pb-4 tracking-wide">
                    Create Navbar Slider Text
                  </h2>

                  <div className="mb-4 flex flex-col">
                    <label
                      htmlFor="displayText"
                      className="text-sm font-[Poppins] font-[500]"
                    >
                      Select Text Position
                    </label>
                    <select
                      onChange={changeHandler}
                      value={formData.textPosition}
                      name="textPosition"
                      type="text"
                      className="text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                    >
                      <option value={""}>Select</option>
                      <option value={"Left"}>Left</option>
                      <option value={"Right"}>Right</option>
                      <option value={"Center"}>Center</option>
                    </select>
                  </div>

                  {formData.textPosition === "Left" ||
                  formData.textPosition === "Right" ? (
                    <>
                      <div className="mb-4 flex flex-col">
                        <label
                          htmlFor="displayText"
                          className="text-sm font-[Poppins] font-[500]"
                        >
                          Display Text
                        </label>
                        <input
                          onChange={changeHandler}
                          required={true}
                          autoComplete="displayText"
                          value={formData.displayText}
                          name="displayText"
                          type="text"
                          className="text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                        />
                      </div>

                      <div className="mb-4 flex flex-col">
                        <label
                          htmlFor="link"
                          className="text-sm font-[Poppins] font-[500]"
                        >
                          Link
                        </label>
                        <input
                          onChange={changeHandler}
                          required={true}
                          autoComplete="link"
                          value={formData.link}
                          name="link"
                          type="text"
                          className="text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1"
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {formData.textPosition === "Center" ? (
                    <div>
                      {textNLink.map((textLink, index) => {
                        return (
                          <DisplayTextLinkInput
                            key={index}
                            textLink={textLink}
                            onChange={(newtextLink) => {
                              const updatedTextNLink = [...textNLink];
                              updatedTextNLink[index] = newtextLink;
                              setTextNLink(updatedTextNLink);
                            }}
                            onDelete={() => handleDeleteTextNLink(index)}
                            totalLength={textNLink.length}
                          />
                        );
                      })}
                      <div
                        onClick={handleAddMoreTextNLink}
                        className="px-4 py-2 bg-black text-white rounded-lg w-fit ml-auto"
                      >
                        Add More Fields
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  {formData.textPosition === "" ? (
                    <></>
                  ) : (
                    <div className="mb-4 mt-8 flex flex-col relative">
                      <button
                        type="submit"
                        className="border-2 border-[#000] bg-[#000000] text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-[#191919] duration-100 transition-all flex justify-center items-center tracking-wider"
                      >
                        {loading ? <Loader /> : "CREATE"}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* table to show all Text */}

          <div className="w-full px-4">
            {loading ? (
              <div className="w-full flex items-center justify-center mt-10">
                {" "}
                <Loader width={"100"} height={"80"} />{" "}
              </div>
            ) : allnavbarSliderTextData.length === 0 &&
              allnavbarCenterSliderTextData.length === 0 ? (
              <p className="text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-3xl">
                No Data Found
              </p>
            ) : (
              <div className="bg-white rounded-xl">
                <h2 className="text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-2xl">
                  All Slider Text Data
                </h2>

                <table class="custom-table">
                    <thead>
                      <tr>
                        <th>Text Position</th>
                        <th>Display Text</th>
                        <th>Link</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allnavbarSliderTextData.map(
                        (navbarsliderText, index) => {
                          return (
                            <tr className="" key={index}>
                              <td>
                                <p className="font-[Poppins] text-sm text-[500] text-black tracking-wide">
                                  {navbarsliderText.textPosition}
                                </p>
                              </td>
                              <td>
                                <p className="font-[Poppins] text-sm text-[500] text-black tracking-wide">
                                  {navbarsliderText.displayText}
                                </p>
                              </td>
                              <td>
                                <a
                                  href={navbarsliderText.link}
                                  rel="noreferrer"
                                  target="_blank"
                                  className="font-[Poppins] text-sm text-[500] text-black tracking-wide"
                                >
                                  {navbarsliderText.link}
                                </a>
                              </td>
                              <td>
                                <p
                                  className="font-[Poppins] text-xs bg-red-600 text-white w-fit px-2 py-1 rounded-lg cursor-pointer"
                                  onClick={() =>
                                    deleteNavbarSliderText(navbarsliderText._id)
                                  }
                                >
                                  Delete
                                </p>
                              </td>
                            </tr>
                          );
                        }
                      )}
                      {allnavbarCenterSliderTextData.map(
                        (navbarCenterSliderText, index) => {
                          return (
                            <tr className="" key={index}>
                              <td>
                                <p className="font-Poppins text-sm text-[500] text-black tracking-wide">
                                  Center
                                </p>
                              </td>
                              <td>
                                <ViewCenterText
                                  item={navbarCenterSliderText}
                                  deleteNavbarSingleText={
                                    deleteNavbarSingleText
                                  }
                                />
                              </td>
                              <td></td>
                              <td>
                                <p
                                  className="font-[Poppins] text-xs bg-red-600 text-white w-fit px-2 py-1 rounded-lg cursor-pointer"
                                  onClick={() =>
                                    deleteNavbarSliderCenterText(
                                      navbarCenterSliderText._id
                                    )
                                  }
                                >
                                  Delete All
                                </p>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
        
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="w-[90%] mx-auto flex justify-between items-center px-4 py-4 ">
            <div className="flex justify-between items-center gap-6">
              <button className='bg-green-500 text-white rounded-lg'
                onClick={() => descreasePageNo(pageNo)}
              >
                <p className="font-[Poppins] font-[400] flex justify-center items-center p-2">
                  <AiOutlineLeft className="mr-2" />
                  Prev{" "}
                </p>
              </button>
              <button className='bg-green-500 text-white rounded-lg'
                onClick={() => increasePageNo(pageNo)}
              >
                <p className="font-[Poppins] font-[400] flex justify-center items-center p-2">
                  Next <AiOutlineRight className="ml-2" />
                </p>
              </button>
            </div>
            <div>
              <p className="text-white  font-[Poppins]">
                {pageNo} of {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default NavbarSliderText;
