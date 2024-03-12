"use client"
import { Button } from '@chakra-ui/react'
import React, { useEffect, useState ,useContext} from 'react'
import toast from 'react-hot-toast'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import Loader from '@/component/loader/loader'
import { apiConnector } from '@/services/apiconnector'
import { Testimonial_API } from '@/services/apis'
import Sidebar from '../sidebar/sidebar'
import TestimonialCard from './testimonialCard'
import '../../../public/css/globals.css'
import { useRouter } from 'next/navigation'

const ManageTestimonial = () => {

    const [allTestimonials, setAllTestimonials] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [dataLoading, setDataLoading] = useState(false);

    const admin = useSelector((state) => state.admin);
  const router=useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push('/admin/login-panel');
    }
  }, [admin, router]);
    const [formData, setFormData] = useState({ date: '', name: '', description: '', imgUrl: '', rating: '' })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const getAllTestimonial = async (pageNo = 1, pageSize = 15) => {
        setDataLoading(true);
        try {
            const response = await apiConnector({ method: "GET", url: Testimonial_API.AllTestimonial_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, })
            setAllTestimonials(response.data.data)
            setTotalPages(Math.ceil(response.data.count / pageSize))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setDataLoading(false);
    }

    const increasePageNo = (pageNo) => {
        if (pageNo < totalPages && pageNo > 0) {
            setPageNo(pageNo = pageNo + 1)
            getAllTestimonial(pageNo)
        }
    }

    const descreasePageNo = (pageNo) => {
        if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
            setPageNo(pageNo = pageNo - 1)
            getAllTestimonial(pageNo)
        }
    }


    const changeHandler = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }



    const deleteTestimonial = async (id) => {
        setLoading(true)
        try {
            await apiConnector({ method: "DELETE", url: Testimonial_API.DeleteTestimonial_API + `/${id}`, headers: { token: admin.token } })
            toast.success("Testimonial Deleted Successfully")
            getAllTestimonial();
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        const getAllTestimonial = async (pageNo = 1, pageSize = 15) => {
            setDataLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: Testimonial_API.AllTestimonial_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
                setAllTestimonials(response.data.data)
                setTotalPages(Math.ceil(response.data.count / pageSize))
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
            setDataLoading(false);
        }

        getAllTestimonial();
    }, [admin]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await apiConnector({ method: "POST", url: Testimonial_API.CreateTestimonial_API, bodyData: formData, headers: { token: admin.token } })
            toast.success(response?.data?.message)
            setFormData({ date: '', name: '', description: '', imgUrl: '', rating: '' });
            getAllTestimonial()

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }
    return (
        <Sidebar>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>

                    {/* form to create testimonial */}
                    <div className='flex justify-center items-center px-8 pt-4'>
                        <div className='flex justify-center items-center w-full max-md:px-4'>
                            <div className='bg-white p-4 rounded-xl w-[99%] pt-6 pb-12 text-gray-900'>
                                <form onSubmit={handleSubmit} className=''>
                                    <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>Create Testimonial</h2>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="date" className='text-sm font-[Poppins] font-[500]'>Date</label>
                                        <input onChange={changeHandler} autoComplete="date" value={formData.date} max={new Date().toISOString().split('T')[0]} name="date" type="date" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="name" className='text-sm font-[Poppins] font-[500]'>Name</label>
                                        <input onChange={changeHandler} autoComplete="name" value={formData.name} name="name" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="description" className='text-sm font-[Poppins] font-[500]'>Desc</label>
                                        <input onChange={changeHandler} autoComplete="description" value={formData.description} name="description" type="description" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>
                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="imgUrl" className='text-sm font-[Poppins] font-[500]'>Image URL</label>
                                        <input onChange={changeHandler} autoComplete="imgUrl" value={formData.imgUrl} name="imgUrl" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="rating" className='text-sm font-[Poppins] font-[500]'>Rating</label>
                                        <select onChange={changeHandler} value={formData.rating} name="rating" type="rating" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1'>
                                            <option value={"1"}>1</option>
                                            <option value={"2"}>2</option>
                                            <option value={"3"}>3</option>
                                            <option value={"4"}>4</option>
                                            <option value={"5"}>5</option>
                                        </select>
                                    </div>


                                    <div className='mb-4 mt-8 flex flex-col relative'>
                                        <button type='submit' className='border-2 border-violet-500 bg-violet-500 text-white rounded-lg mx-auto px-8 py-1 text-sm font-[Poppins] hover:bg-violet-600 duration-100 transition-all flex justify-center items-center tracking-wider'>
                                            {
                                                loading ? <Loader /> : "CREATE"
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='w-[100%] flex flex-col justify-between gap-4 bg-white'>
                        {
                            allTestimonials.length === 0 ? (<h2 className='text-[3rem] font-extrabold font-[Questrial] text-center pt-4'>No Testimonial Found</h2>) : (<h2 className='text-[3rem] font-extrabold font-[Questrial] text-center pt-4'>All Testimonial</h2>)
                        }
                        {allTestimonials.length < 1 ? (<></>) : dataLoading ? <Loader color={"black"} /> :
                            <div className="px-3 md:px-32 py-4 md:py-4">
                                <div className='my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-8'>
                                    {
                                        allTestimonials.map((testimonial, index) => (
                                            <TestimonialCard name={testimonial?.name} description={testimonial?.description} img={testimonial?.imgUrl} deleteTestimonial={deleteTestimonial} _id={testimonial._id} rating={testimonial?.rating} key={index} />
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>

                    <div className='w-[100%] bg-gray-200 mt-5'>
                        <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
                            <div className='flex justify-between items-center gap-6'>
                            <button className='bg-green-500 text-white rounded-lg' onClick={() => descreasePageNo(pageNo)}>
                                    <p className='font-[Poppins] font-[400] flex justify-center items-center p-2'><AiOutlineLeft className='mr-2' />Prev </p>
                                </button>
                                <button className='bg-green-500 text-white rounded-lg' onClick={() => increasePageNo(pageNo)}>
                                    <p className='font-[Poppins] font-[400] flex justify-center items-center p-2'>Next <AiOutlineRight className='ml-2' /></p>
                                </button>
                            </div>
                            <div>
                                <p className='text-gray-900  font-[Poppins]'>{pageNo} of {totalPages}</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </Sidebar>
    )
}

export default ManageTestimonial
