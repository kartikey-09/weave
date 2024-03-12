"use client";
import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { UserAuthAPI } from "../../../services/apis";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { apiConnector } from "@/services/apiconnector";
import Sidebar from "../sidebar/sidebar";
import Loader from "@/component/loader/loader";
import { toast } from "react-hot-toast";
import { Button } from "@chakra-ui/react";
import './manageUsers.css';
import "../../../public/css/globals.css";
import { useRouter } from "next/navigation";

const ManageUsers = () => {
  const admin = useSelector((state) => state.admin);
  const router = useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push("/admin/login-panel");
    }
  }, [admin, router]);

  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [isOpen, setIsOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsOpen(true);
}

    // Function to close the modal
    const closeModal = () => {
        setIsOpen(false);
    }

  const btnRef = React.useRef(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [serviceCategory, setServiceCategory] = useState("");

  const [totalUsers, setTotalUsers] = useState("");

  const [hallFormData, setHallFormData] = useState({
    hallName: "",
    hallLink: "",
  });

  const getData = async (pageNo = 1, pageSize = 15) => {
    try {
      const response = await apiConnector({
        method: "GET",
        url:
          UserAuthAPI.viewAllUsers_API +
          `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&serviceCategory=${serviceCategory}`,
        headers: { token: admin.token },
      });
      // console.log(response.data);
      if (response.data.success) {
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
        setTotalUsers(response?.data?.count);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    const getData = async (pageNo = 1, pageSize = 15) => {
      window.scroll(0, 0);
      setDataLoading(true);
      try {
        const response = await apiConnector({
          method: "GET",
          url:
            UserAuthAPI.viewAllUsers_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true&serviceCategory=${serviceCategory}`,
          headers: { token: admin.token },
        });
        console.log(response.data);
        if (response.data.success) {
          setData(response.data.data);
          setTotalPages(Math.ceil(response.data.count / pageSize));
          setTotalUsers(response?.data?.count);
        }
      } catch (error) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
      setDataLoading(false);
    };

    getData();
  }, [admin, serviceCategory]);

  const deleteAccount = async (id) => {
    setLoading(true);
    try {
      const res = await apiConnector({
        method: "DELETE",
        url: UserAuthAPI.deleteUnVerifiedUser_API + `/${id}`,
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
    setLoading(false);
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

  const changeHandler = (e) => {
    setHallFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Sidebar>
      <div className="w-full min-h-screen relative">
        <div className="flex flex-col justify-between gap-8 py-4">
          {/* table to show admin */}
          <div className="w-full px-4">
            <h2 className="text-2xl font-[Poppins] text-center text-white font-[600] py-4 tracking-wide">
              Manage Users
            </h2>

            {
              <div className="bg-white rounded-xl p-4">
                <div className="flex flex-col md:flex-row p-4 justify-start w-full items-center">
                  <div>
                    <p className="flex-[20%] font-[Poppins] font-[500] tracking-wide">
                      Total Users :{" "}
                      <span className="text-blue-600 tracking-wider">
                        {totalUsers}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex flex-col md:flex-row items-center justify-start gap-x-4 gap-y-2">
                  <label className="text-sm font-[Poppins] font-[500]">
                    Filter
                  </label>
                  <select
                    className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md w-full md:w-[60%]"
                    onChange={(e) => setServiceCategory(e.target.value)}
                    value={serviceCategory}
                  >
                    <option value="">Show All Users</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Institute">Institute</option>
                    <option value="Research">Research</option>
                    <option value="Corporate Wellbeing">
                      Corporate Wellbeing
                    </option>
                  </select>
                </div>

                {/* {
                                    dataLoading ? (<div className='w-full flex items-center justify-center mt-10 py-6'> <Loader color={"black"} width={"80"} height={"60"} /> </div>) : (
                                        data?.length > 0 ? (data?.map((item, index) => {
                                            return (
                                                <div key={index} className='flex my-6 justify-center md:justify-start items-center md:items-start flex-col md:flex-row gap-6 w-full border-2 border-gray-400 rounded-xl shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] '>


                                                    <div className=' p-4 w-full  flex flex-col justify-center items-center md:block'>
                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Name</p>
                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0'>
                                                                {item?.name?.firstname}{" "}{item?.name?.lastname}
                                                            </p>
                                                        </div>

                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3'>
                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                Email
                                                            </p>
                                                            <p className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-red-500 ml-5 md:ml-0'>{item?.email}</p>
                                                        </div>

                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3 items-start  md:items-center'>
                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                Service Category
                                                            </p>

                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                <Button
                                                                    colorScheme={"teal"}
                                                                    size="sm">
                                                                    <p className='font-[Poppins] font-[400] tracking-wider'>{item?.serviceCategory}</p>
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className='text-gray-900 flex w-full my-2 flex-col md:flex-row text-sm  md:gap-3 items-start  md:items-center'>
                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>
                                                                Email Verified
                                                            </p>

                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0  '>
                                                                <Button
                                                                    colorScheme={item?.isVerified ? "green" : "red"}
                                                                    size="sm">
                                                                    <p className='font-[Poppins] font-[400] tracking-wider'
                                                                    >
                                                                        {item?.isVerified ? "Verified" : "Not Verified"}
                                                                    </p>
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className='text-gray-900 flex w-full my-2 flex-col  md:flex-row text-sm  md:gap-3'>


                                                            <p className='flex-[20%] font-[Poppins] font-[500] tracking-wide'>Delete Account</p>

                                                            <div className='flex-[80%] font-[Poppins] font-[500] tracking-wide text-violet-500 ml-5 md:ml-0 items-center '>
                                                                <Button colorScheme="red" size="sm"
                                                                    onClick={() => deleteAccount(item._id)}>
                                                                    <p className='font-[Poppins] font-[400] tracking-wider'
                                                                    >
                                                                        Delete
                                                                    </p>
                                                                </Button>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            )
                                        })) : (
                                            <p className='font-[Rubik] text-2xl text-center text-red-500  font-semibold py-6'>No Data Found</p>
                                        )
                                    )

                                } */}

                {dataLoading ? (
                  <div className="w-full flex items-center justify-center mt-10 py-6">
                    {" "}
                    <Loader color={"black"} width={"80"} height={"60"} />{" "}
                  </div>
                ) : (
                  <table class="custom-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Service Category</th>
                        <th>Email Verified</th>
                        <th>Mobile Number</th>
                        <th>Actions</th>
                        <th>Delete Account</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        return (
                          <tr className="" key={index}>
                            <td>
                <p class="font-Poppins text-sm text-500 text-black tracking-wide">{item?.name?.firstname}{" "}{item?.name?.lastname}</p>
            </td>
            <td>
                <p class="font-Poppins font-500 tracking-wide text-red-500 ml-5 md-ml-0">{item.email}</p>
            </td>
            <td>
                <button class="custom-button">{item?.serviceCategory}</button>
            </td>
            <td>
                <button class={item?.isVerified ? "custom-button green" :" custom-button red"}>
                    <p className="font-Poppins font-[400] tracking-wider">
                                    {item?.isVerified
                                      ? "Verified"
                                      : "Not Verified"}
                                  </p></button>
            </td>
            <td>
                <p class="font-Poppins font-500 tracking-wide text-red-500 ml-5 md-ml-0">{item.mobileNo}</p>
            </td>
            <td>
                {item.serviceCategory === "Research" ? (
                <button className="custom-button" onClick={openModal}>Create Hall</button>
              ):(<p></p>)}
            </td>
            <td>
                <button class="custom-button red" onClick={() => deleteAccount(item._id)}>Delete</button>
            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            }
          </div>
        </div>

        <div className="sticky bottom-0 w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="w-[90%] mx-auto flex justify-between items-center px-4 py-4 ">
            <div className="flex justify-between items-center gap-6">
              <button className='bg-green-500 text-white rounded-lg'
                size="sm"
                onClick={() => descreasePageNo(pageNo)}
              >
                <p className="font-[Poppins] font-[400] flex justify-center items-center p-2">
                  <AiOutlineLeft className="mr-2" />
                  Prev{" "}
                </p>
              </button>
              <button
              className='bg-green-500 text-white rounded-lg'
                size="sm"
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

        {/* Hall Booking Research Modal */}
        {isOpen &&
                <div  className="custom-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="header-label">Create Hall</p>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="hallName">Hall Name</label>
                                <input type={"text"}
                    name="hallName"
                    value={hallFormData.hallName}
                    onChange={changeHandler} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hallLink">Hall Link</label>
                                <input type={"text"}
                    name="hallLink"
                    value={hallFormData.hallLink}
                    onChange={changeHandler} className="form-control" />
                            </div>

                            {loading ? (
                  <></>
                ) : (
                            <button className="custom-button">Book Meeting</button>)}
                        </div>
                        <div className="modal-footer">
                            {/* Button to close the modal */}
                            <button id="closeButton" className="custom-button" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            }
      </div>
    </Sidebar>
  );
};

export default ManageUsers;
