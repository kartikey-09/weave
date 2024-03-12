"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "@/services/apiconnector";
import Sidebar from "../sidebar/sidebar";
import toast from "react-hot-toast";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Loader from "@/component/loader/loader";
import moment from "moment";
import ViewMessage from "./viewMessage";
import { Contact_API } from "@/services/apis";
import "../../../public/css/globals.css";
import { useRouter } from "next/navigation";
import '../manage-users/manageUsers.css'
const ContactPageData = () => {
  const admin = useSelector((state) => state.admin);
  const router = useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push("/admin/login-panel");
    }
  }, [admin, router]);

  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [dataLoading, setDataLoading] = useState(false);

  const getData = async (pageNo = 1, pageSize = 15) => {
    setDataLoading(true);
    try {
      const response = await apiConnector({
        method: "GET",
        url:
          Contact_API.AllContact_API +
          `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
        headers: { token: admin.token },
      });
      // console.log(response.data);
      if (response.data.success) {
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setDataLoading(false);
  };

  useEffect(() => {
    const getData = async (pageNo = 1, pageSize = 15) => {
      setDataLoading(true);
      try {
        const response = await apiConnector({
          method: "GET",
          url:
            Contact_API.AllContact_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
          headers: { token: admin.token },
        });
        // console.log(response.data);
        if (response.data.success) {
          setData(response.data.data);
          setTotalPages(Math.ceil(response.data.count / pageSize));
        }
      } catch (error) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
      setDataLoading(false);
    };

    getData();
  }, [admin]);

  const deleteContact = async (id) => {
    try {
      const res = await apiConnector({
        method: "DELETE",
        url: Contact_API.DeleteContact_API + `/${id}`,
        headers: { token: admin.token },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    getData(pageNo);
  };

  const UpdateContact = async (id, isContacted) => {
    try {
      const res = await apiConnector({
        method: "PUT",
        url: Contact_API.UpdateCotact_API + `/${id}`,
        bodyData: { isContacted: !isContacted },
        headers: { token: admin.token },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    getData(pageNo);
  };

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo((pageNo = pageNo + 1));
      getData(pageNo);
    }
  };

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo((pageNo = pageNo - 1));
      getData(pageNo);
    }
  };

  return (
    <Sidebar>
      <div className="w-full min-h-screen relative">
        <div className="flex flex-col justify-between gap-8 py-4">
          {/* table to show admin */}
          <div className="w-full px-4">
            <h2 className="text-2xl font-[Poppins] text-center text-white font-[500] py-4 tracking-wide">
              Contact Page Form Data
            </h2>

            {dataLoading ? (
              <div className="w-full flex items-center justify-center mt-10">
                {" "}
                <Loader width={"100"} height={"80"} />{" "}
              </div>
            ) : data?.length === 0 ? (
              <p className="text-center text-white py-6 font-[Poppins] font-[500] tracking-wide text-3xl">
                No Data Found
              </p>
            ) : (
              <div className="bg-white rounded-xl">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>Received On</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.length > 0 &&
                      data?.map((item, index) => {
                        return (
                          <tr className="" key={index}>
                            <td>
                              <p className="font-Poppins text-sm text-500 text-black tracking-wide">
                                {moment(item.date).format("Do MMM YYYY, dddd")}
                              </p>
                            </td>
                            <td>
                              <p className="font-Poppins text-sm text-500 text-black tracking-wide">
                                {item.name}
                              </p>
                            </td>
                            <td>
                              <p className="font-Poppins font-500 tracking-wide text-red-500 ml-5 md-ml-0">
                                {item.email}
                              </p>
                            </td>
                            <td>
                              <p className="font-Poppins text-sm text-500 text-black tracking-wide">
                                {item.subject}
                              </p>
                            </td>
                            <td>
                              <ViewMessage item={item} />
                            </td>
                            <td>
                              <div className="flex justify-center items-center gap-3 mr-4">
                              <button class={item.isContacted ? "custom-button green" :" custom-button red"}
                                  onClick={() => {
                                    UpdateContact(item._id, item.isContacted);
                                  }}
                                >
                                  <p className="font-Poppins font-[400] tracking-wider">
                                    {item.isContacted
                                      ? "Contacted"
                                      : "Not Contacted"}
                                  </p>
                                </button>
                              </div>
                            </td>
                            <td>
                              {item.isContacted ? (
                                <div className="flex justify-center items-center gap-3 mr-4">
                                  <button
                                    class='custom-button red'
                                    onClick={() => {
                                      deleteContact(item._id);
                                    }}
                                  >
                                    <p className="font-[Poppins] font-[400] tracking-wider">
                                      {" "}
                                      Delete
                                    </p>
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="w-[90%] mx-auto flex justify-between items-center px-4 py-4 ">
            <div className="flex justify-between items-center gap-6">
              <button
                className='bg-green-500 text-white rounded-lg'
                onClick={() => descreasePageNo(pageNo)}
              >
                <p className="font-[Poppins] font-[400] flex justify-center items-center p-2">
                  <AiOutlineLeft className="mr-2" />
                  Prev{" "}
                </p>
              </button>
              <button
                className='bg-green-500 text-white rounded-lg'
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

export default ContactPageData;
