"use client"
import React, { useEffect, useState ,useContext} from 'react'
import { apiConnector } from '@/services/apiconnector';
import { ClinicBookingRequest } from '@/services/apis';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';


const Clinic = () => {
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [dataLoading, setDataLoading] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getAllBookings = async (pageNo = 1, pageSize = 15) => {
      setDataLoading(true);
      try {
        const response = await apiConnector(
          {
            method: "GET",
            url: ClinicBookingRequest.userFetchReqForAllOfTheOwnClinicSessions_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`,
            headers: { token: user.token }
          }
        )
        setData(response.data.data)
        console.log(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize))
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
      setDataLoading(false);
    }

    getAllBookings();
  }, [user]);

  return (
    <div className='w-full rounded-2xl'>
      <h2 data-aos="fade-up" data-aos-duration="2000" className='font-custom text-base text-gray-700 tracking-wide font-[500] mb-4 ml-4 md:ml-4'>
        Previous Bookings
      </h2>
      {
        data?.map((item, i) => (
          <div key={i} className="p-2 w-auto min-h-[10rem] my-4 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 ml-4 mr-4">

            <div className='flex gap-2 items-center'>
              <div className='flex-[20%] justify-start items-center flex'>
                <p className='font-[Rubik] text-gray-800 font-[500] text-sm'>
                  Name
                </p>
              </div>
              <div className='flex-[80%] justify-start items-center flex'>
                <p className='font-[Rubik] text-blue-700 font-[400] text-sm'>
                  {item?.name}
                </p>
              </div>
            </div>


            <div className='flex gap-2 items-center'>
              <div className='flex-[20%] justify-start items-center flex'>
                <p className='font-[Rubik] text-gray-800 font-[500] text-sm'>
                  Email
                </p>
              </div>
              <div className='flex-[80%] justify-start items-center flex'>
                <p className='font-[Rubik] text-blue-700 font-[400] text-sm'>
                  {item?.email}
                </p>
              </div>
            </div>

            <div className='flex gap-2 items-center'>
              <div className='flex-[20%] justify-start items-center flex'>
                <p className='font-[Rubik] text-gray-800 font-[500] text-sm'>
                  Contact Info
                </p>
              </div>
              <div className='flex-[80%] justify-start items-center flex'>
                <p className='font-[Rubik] text-blue-700 font-[400] text-sm'>
                  {item?.whatsappNo}
                </p>
              </div>
            </div>

            <div className='flex gap-2 items-center'>
              <div className='flex-[20%] justify-start items-center flex'>
                <p className='font-[Rubik] text-gray-800 font-[500] text-sm'>
                  Age
                </p>
              </div>
              <div className='flex-[80%] justify-start items-center flex'>
                <p className='font-[Rubik] text-blue-700 font-[400] text-sm'>
                  {item?.age}
                </p>
              </div>
            </div>

            <div className='flex gap-2 items-center'>
              <div className='flex-[20%] justify-start items-center flex'>
                <p className='font-[Rubik] text-gray-800 font-[500] text-sm'>
                  Mode
                </p>
              </div>
              <div className='flex-[80%] justify-start items-center flex'>
                <p className='font-[Rubik] text-blue-700 font-[400] text-sm'>
                  {item?.mode}
                </p>
              </div>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default Clinic