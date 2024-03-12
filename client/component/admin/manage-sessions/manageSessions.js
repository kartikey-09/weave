"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClinicBookingRequest, UserAuthAPI } from "@/services/apis";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { apiConnector } from "@/services/apiconnector";
import Sidebar from "../sidebar/sidebar";
import Loader from "@/component/loader/loader";
import { toast } from "react-hot-toast";
import { Button } from "@chakra-ui/react";
import "../../../public/css/globals.css";
import { useRouter } from "next/navigation";
import '../manage-users/manageUsers.css'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
// import Datetime from 'react-datetime';

const ManageSessions = () => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSlotOpen,
    onOpen: onSlotOpen,
    onClose: onSlotClose,
  } = useDisclosure();
  const btnRef = React.useRef(null);
  const [dataLoading, setDataLoading] = useState(false);

  const [totalUsers, setTotalUsers] = useState("");

  const [currentModalData, setCurrentModalData] = useState({
    name: "",
    email: "",
    slotProvided: "",
    paymentStatus: "",
    mode: "",
    mobileNo: "",
    age: "",
  });

  useEffect(() => {
    const getAllClinicRequest = async (pageNo = 1, pageSize = 15) => {
      setDataLoading(true);
      try {
        const response = await apiConnector({
          method: "GET",
          url:
            ClinicBookingRequest.ViewAllClinicRequest_API +
            `?pageNo=${pageNo}&pageSize=${pageSize}`,
          headers: { token: admin.token },
        });
        console.log("RESPONSE", response);
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
        setTotalUsers(response?.data?.count);
      } catch (error) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
      setDataLoading(false);
    };

    getAllClinicRequest();
  }, [admin]);

  const deleteAccount = async (id) => {
    setDataLoading(true);
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
    setDataLoading(false);
    getAllClinicRequest(pageNo);
  };

  const [sNoValue, setSNoValue] = useState(1);

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setSNoValue(sNoValue + 15);
      setPageNo((pageNo = pageNo + 1));
      getAllClinicRequest(pageNo);
    }
  };

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setSNoValue(sNoValue - 15);
      setPageNo((pageNo = pageNo - 1));
      getAllClinicRequest(pageNo);
    }
  };

  const getAllClinicRequest = async (pageNo = 1, pageSize = 15) => {
    setDataLoading(true);
    try {
      const response = await apiConnector({
        method: "GET",
        url:
          ClinicBookingRequest.ViewAllClinicRequest_API +
          `?pageNo=${pageNo}&pageSize=${pageSize}`,
        headers: { token: admin.token },
      });
      console.log("RESPONSE", response);
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setTotalUsers(response?.data?.count);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setDataLoading(false);
  };

  return (
    <Sidebar>
      <div className="w-full min-h-screen relative overflow-x-scroll">
        <div className="flex flex-col justify-between gap-8 py-4">
          {/* table to show admin */}
          <div className="w-full px-4">
            <h2 className="text-2xl font-[Poppins] text-center text-white font-[500] py-4 tracking-wide">
              Manage Clinic Booking Sessions
            </h2>

            {
              <div className="bg-white rounded-xl p-4">
                <div className="flex flex-col md:flex-row p-4 justify-start w-full items-center">
                  <div>
                    <p className="flex-[20%] font-[Poppins] font-[500] tracking-wide">
                      Total Request :{" "}
                      <span className="text-blue-600 tracking-wider">
                        {totalUsers}
                      </span>
                    </p>
                  </div>
                </div>

                {/* <div className='mb-4 flex flex-col md:flex-row items-center justify-start gap-x-4 gap-y-2'>
                                    <label className='text-sm font-[Poppins] font-[500]'>Filter</label>
                                    <select className="border-2 border-violet-500 outline-none focus:outline-none px-3 py-2 font-[Roboto] tracking-wide mt-1 text-sm rounded-md w-full md:w-[60%]" onChange={(e) =>
                                        setServiceCategory(e.target.value)} value={serviceCategory} >
                                        <option value="">Show All Users</option>
                                        <option value="Clinic">Clinic Sessions</option>
                                        <option value="Institute">Institute Sessions</option>
                                        <option value="Research">Research Sessions</option>
                                        <option value="Corporate Wellbeing">Corporate Wellbeing Sessions</option>
                                    </select>
                                </div> */}

                {dataLoading ? (
                  <div className="w-full flex items-center justify-center mt-10 py-6">
                    {" "}
                    <Loader color={"black"} width={"80"} height={"60"} />{" "}
                  </div>
                ) : (
                  <table class="custom-table">
                    <thead>
                      <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Slot Provided</th>
                        <th>Payment Status</th>
                        <th>Mode</th>
                        <th>Actions</th>
                        <th>Delete Request</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        return (
                          <tr className="" key={index}>
                            <td>
                            <p class="font-Poppins text-sm text-500 text-black tracking-wide">
                                {index + sNoValue}
                              </p>
                            </td>
                            <td>
                            <p class="font-Poppins text-sm text-500 text-black tracking-wide">
                                {item?.name}
                              </p>
                            </td>
                            <td>
                            <p class="font-Poppins font-500 tracking-wide text-red-500 ml-5 md-ml-0">
                                {item.email}
                              </p>
                            </td>
                            <td>
                            <button class={item?.isSlotProvided ? "custom-button green" :" custom-button yellow"}>
                                {item?.isSlotProvided ? (
                                  <p className="font-Poppins font-[400] tracking-wider">
                                    View Slot
                                  </p>
                                ) : (
                                  <p
                                    className="font-Poppins font-[400] tracking-wider"
                                    onClick={onSlotOpen}
                                  >
                                    Provide Slot
                                  </p>
                                )}
                              </button>
                            </td>
                            <td>
                            <button class={item?.isPaymentDone ?  "custom-button green" :" custom-button red"}>
                                <p className="font-Poppins font-[400] tracking-wider">
                                  {item?.isPaymentDone ? "Done" : "Failed"}
                                </p>
                              </button>
                            </td>
                            <td>
                              <button className='custom-button yellow'>
                                <p className="font-Poppins font-[400] tracking-wider capitalize">
                                  {item?.mode}
                                </p>
                              </button>
                            </td>
                            <td>
                            <button className='custom-button'
                                onClick={() =>
                                  setCurrentModalData({
                                    name: item.name,
                                    email: item.email,
                                    slotProvided: item?.isSlotProvided,
                                    paymentStatus: item?.isPaymentDone,
                                    mode: item?.mode,
                                    mobileNo: item?.sessionBookedBy?.mobileNo,
                                    age: item?.age,
                                    description: item?.description,
                                  })
                                }
                              >
                                <p
                                  className="font-Poppins font-[400] tracking-wider capitalize"
                                  onClick={onOpen}
                                >
                                  View More
                                </p>
                              </button>
                            </td>
                            <td>
                              <button
                                className="custom-button red"
                                onClick={() => deleteAccount(item._id)}
                              >
                                <p className="font-Poppins font-[400] tracking-wider">
                                  Delete
                                </p>
                              </button>
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

        {/* More Details Booking Research Modal */}
        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior="outside"
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <p className="font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4">
                Clinic Session Details
              </p>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col gap-3">
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Name</p>
                  <p className="py-2 pl-2 bg-transparent border border-black rounded-lg">
                    {currentModalData.name}
                  </p>
                </div>

                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Email</p>
                  <p className="py-2 pl-2 bg-transparent border border-black rounded-lg">
                    {currentModalData.email}
                  </p>
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Mobile No</p>
                  <p className="py-2 pl-2 bg-transparent border border-black rounded-lg">
                    {currentModalData.mobileNo}
                  </p>
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Age</p>
                  <p className="py-2 pl-2 bg-transparent border border-black rounded-lg">
                    {currentModalData.age}
                  </p>
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Description</p>
                  <p className="py-2 pl-2 bg-transparent border border-black rounded-lg">
                    {currentModalData?.description}
                  </p>
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Payment Status</p>
                  {/* <input type={"text"} name="paymentStatus" value={currentModalData.paymentStatus} className="py-2 pl-2 bg-transparent border border-black rounded-lg" /> */}
                  <Button
                    colorScheme={
                      currentModalData?.paymentStatus ? "green" : "red"
                    }
                    size="sm"
                    className="w-fit"
                  >
                    <p className="font-[Poppins] font-[400] tracking-wider">
                      {currentModalData?.paymentStatus ? "Done" : "Failed"}
                    </p>
                  </Button>
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Slot Provided</p>
                  {/* <input type={"text"} name="paymentStatus" value={currentModalData.paymentStatus} className="py-2 pl-2 bg-transparent border border-black rounded-lg" /> */}
                  <Button
                    colorScheme={
                      currentModalData?.slotProvided ? "green" : "red"
                    }
                    size="sm"
                    className="w-fit"
                  >
                    <p className="font-[Poppins] font-[400] tracking-wider">
                      {currentModalData?.slotProvided
                        ? "View Slot"
                        : "Provide Slot"}
                    </p>
                  </Button>
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Mode</p>
                  <Button className="w-fit" colorScheme={"telegram"} size="sm">
                    <p className="font-[Poppins] font-[400] tracking-wider capitalize">
                      {currentModalData?.mode}
                    </p>
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" size="sm" onClick={onClose}>
                <p className="font-[Poppins] font-[400] tracking-wider">
                  Close
                </p>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Slot Booking Modal */}
        <Modal
          onClose={onSlotClose}
          finalFocusRef={btnRef}
          isOpen={isSlotOpen}
          scrollBehavior="outside"
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <p className="font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4">
                Clinic Slot Booking
              </p>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col gap-3">
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Date</p>
                  <input
                    type={"date"}
                    name="date"
                    className="py-2 pl-2 bg-transparent border border-black rounded-lg"
                  />
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Session Start Time</p>
                  <input
                    type={"time"}
                    name="startTime"
                    className="py-2 pl-2 bg-transparent border border-black rounded-lg"
                  />
                </div>
                <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                  <p className="font-[800] text-blue-600">Session End Time</p>
                  <input
                    type={"time"}
                    name="endTime"
                    className="py-2 pl-2 bg-transparent border border-black rounded-lg"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" size="sm" onClick={onSlotClose}>
                <p className="font-[Poppins] font-[400] tracking-wider">
                  Close
                </p>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </Sidebar>
  );
};

export default ManageSessions;
