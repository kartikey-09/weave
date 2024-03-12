"use client"
import React from "react";
import { apiConnector } from "@/services/apiconnector";
import { CareerAPI } from "@/services/apis";
import toast from "react-hot-toast";
import Loader from "../loader/loader";
import { Button } from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Career = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState();

  const fetchCareerPageData = async (pageNo = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await apiConnector({
        method: "GET",
        url: CareerAPI.fetchAllListedJosbs + `?dateDescSort=true&isActive=true`,
      });
      setData(response.data.data);
      // console.log(response.data.data);
      setTotalPages(Math.ceil(response.data.count / pageSize));
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  React.useEffect(() => {
    fetchCareerPageData();
  }, []);

  const increasePageNo = (pageNo) => {
    if (pageNo < totalPages && pageNo > 0) {
      setPageNo((pageNo = pageNo + 1));
      fetchCareerPageData(pageNo);
    }
  };

  const descreasePageNo = (pageNo) => {
    if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
      setPageNo((pageNo = pageNo - 1));
      fetchCareerPageData(pageNo);
    }
  };

  return (
    <>
      
      <div className="w-[100%] mt-16 flex flex-col gap-28">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[#1a3777] font-custom text-5xl font-bold">
            Join Us
          </h2>
          <p className="text-[#000] font-[Roboto] font-semibold">
            Start your Career with WeAvecU Today!
          </p>
        </div>

        <div className="w-[100%] flex flex-col gap-4 justify-between items-center py-4 px-8">
          <div className=" flex flex-col items-center gap-4">
            <h2 className="text-[#243b77] font-custom text-5xl font-bold">
              Featured Roles
            </h2>
            <p className="text-black font-custom text-sm">
              Please provide a brief self-introduction, and we'll contact you if
              there's a suitable position available.
            </p>
          </div>
          <div className="w-[100%] gap-4 py-8">
           
            {
              loading ? (
              <div className="flex items-center justify-center">
                <Loader color={"black"} height={100} width={100} />
              </div>
            ) : (
              <>
                {data &&
                  data.map((d, ind) => (
                    <div
                      className="w-[100%] bg-[#243c778d] mt-8"
                      style={{ borderRadius: "80px 0px 130px 50px" }}
                    >
                      <div
                        className="flex flex-col items-start  bg-white md:flex-col md:border py-8"
                        style={{ borderRadius: "100px 0px 150px 20px" }}
                      >
                        <div className="flex flex-col gap-2 py-8 px-14">
                          <h2 className="font-custom font-bold text-[#000] text-2xl">
                            {d?.position}
                          </h2>
                          <p className="font-[Roboto]">
                            No. Of Opening : {d?.count}{" "}
                          </p>
                          <p className="font-[Roboto]">Salary : {d?.salary} </p>
                        </div>
                        <div className="w-[100%] flex flex-col justify-around items-start md:flex-row">
                          <div className="flex flex-col gap-2 py-8 md:px-14">
                            <p className="font-custom font-semibold ">
                              Requirements :{" "}
                            </p>
                            <ul
                              className="list-disc font-custom space-y-4 bg-[#1a3777] shadow-2xl p-4 text-white"
                              style={{ borderRadius: "70px 70px 20px 20px" }}
                            >
                              {d?.requirementArray?.map((requirement, ind1) => (
                                <li className="ml-8">{requirement}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-col gap-2 py-8 md:px-14">
                            <p className="font-custom font-semibold ">
                              Responsibility :{" "}
                            </p>
                            <ul
                              className="list-disc font-custom space-y-4 bg-[#1a3777] shadow-2xl p-4 text-white"
                              style={{ borderRadius: "20px 20px 70px 70px" }}
                            >
                              {d?.responsibilityArray?.map(
                                (responsibility, ind2) => (
                                  <li className="ml-8">{responsibility}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                        {
                          d?.link &&
                        <button
                          className="px-14 py-2 ml-8 bg-[#1a3777] text-white rounded-lg text-sm font-custom mt-8 transition-all duration-300 hover:shadow-lg hover:scale-x-[1.05] animate-bounce"
                          onClick={() => {
                            const openLinkInNewTab = (link) => {
                              window.open(link, "_blank");
                            };
                            openLinkInNewTab(d.link); 
                          }}
                        >
                          Apply Now
                       </button>
                        }
                      </div>
                    </div>
                  ))}
              </>
            )
            }

          </div>
        </div>
      </div>
      
      <div className="w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="w-[90%] mx-auto flex justify-between items-center px-4 py-4 ">
          <div className="flex justify-between items-center gap-6">
            <Button
              isDisabled={loading}
              colorScheme="green"
              size="sm"
              onClick={() => descreasePageNo(pageNo)}
            >
              <p className="font-custom font-[400] flex justify-center items-center">
                <AiOutlineLeft className="mr-2" />
                Prev{" "}
              </p>
            </Button>
            <Button
              isDisabled={loading}
              colorScheme="green"
              size="sm"
              onClick={() => increasePageNo(pageNo)}
            >
              <p className="font-custom font-[400] flex justify-center items-center">
                Next <AiOutlineRight className="ml-2" />
              </p>
            </Button>
          </div>
          <div>
            <p className="text-black  font-custom">
              {pageNo} of {totalPages}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;





