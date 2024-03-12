"use client"
import React, { useState} from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';
import JoditEditor from 'jodit-react';
import { apiConnector } from '@/services/apiconnector';
import { Blogs,HandleImagesAPI } from '@/services/apis';
import Loader from '@/component/loader/loader';
import Sidebar from '../sidebar/sidebar';
import BlogCard from './blogCard';
import { Button } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import '../../../public/css/globals.css'
import { useRouter } from 'next/navigation';



const ManageBlogs = () => {
    const [formData, setFormData] = useState({ date: '', title: '', shortDesc: '', briefDesc: '' })
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef();
    const editor = useRef(null);
    const admin = useSelector((state) => state.admin);
  const router=useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push('/admin/login-panel');
    }
  }, [admin, router]);
      

    const [selectedImages, setSelectedImages] = useState([]);

    const [allBlogs, setAllBlogs] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [dataLoading, setDataLoading] = useState(false);

    const handleImageChange = (e) => {
        const files = e.target.files;
        setSelectedImages([...selectedImages, ...files]);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const getAllBlogs = async (pageNo = 1, pageSize = 15) => {
        setDataLoading(true);
        try {
            const response = await apiConnector({ method: "GET", url: Blogs.ViewAllBlogs_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, })
            setAllBlogs(response.data.data)
            setTotalPages(Math.ceil(response.data.count / pageSize))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setDataLoading(false);
    }

    const increasePageNo = (pageNo) => {
        if (pageNo < totalPages && pageNo > 0) {
            setPageNo(pageNo = pageNo + 1)
            getAllBlogs(pageNo)
        }
    }

    const descreasePageNo = (pageNo) => {
        if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
            setPageNo(pageNo = pageNo - 1)
            getAllBlogs(pageNo)
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



    const deleteBlog = async (id) => {
        setLoading(true)
        try {
            await apiConnector({ method: "DELETE", url: Blogs.DeleteBlog_API + `/${id}`, headers: { token: admin.token } })
            toast.success("Blog Deleted Successfully")
            getAllBlogs();
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        const getAllBlogs = async (pageNo = 1, pageSize = 15) => {
            setDataLoading(true);
            try {
                const response = await apiConnector({ method: "GET", url: Blogs.ViewAllBlogs_API + `?pageNo=${pageNo}&pageSize=${pageSize}&dateDescSort=true`, headers: { token: admin.token } })
                setAllBlogs(response.data.data)
                setTotalPages(Math.ceil(response.data.count / pageSize))
            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
            setDataLoading(false);
        }

        getAllBlogs();
    }, [admin]);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        let images;
        try {
            const formImageData = new FormData();
            selectedImages.forEach((image) => {
                formImageData.append('images', image);
            });
            let response = await apiConnector({
                method: "POST",
                url: HandleImagesAPI.UploadImage_API,
                bodyData: formImageData,
            });
            if (response.data.success) {
                images = response?.data?.data?._id;
            }
            if (images) {
                response = await apiConnector({
                    method: "POST",
                    url: Blogs.CreateBlog_API,
                    bodyData: {
                        imgUrlModelDBId: images,
                        title: formData.title,
                        date: formData.date,
                        shortDescription: formData.shortDesc,
                        briefDescription: formData.briefDesc,
                    },
                    headers: { token: admin.token }
                });
                if (response?.data?.success) {
                    toast.success(response?.data?.message)
                    setFormData({ date: '', title: '', shortDesc: '', briefDesc: '' });
                    setSelectedImages([]);
                    fileInputRef.current.value = '';
                    getAllBlogs();
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
        <Sidebar>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>

                    {/* form to create blog */}
                    <div className='flex justify-center items-center px-8 pt-4'>
                        <div className='flex justify-center items-center w-full max-md:px-4'>
                            <div className='bg-white p-4 rounded-xl w-[99%] pt-6 pb-12 text-gray-900'>
                                <form onSubmit={handleSubmit} className=''>
                                    <h2 className='text-2xl font-[Poppins] text-center text-gray-900 font-[500] pb-4 tracking-wide'>Create Blogs</h2>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="thumbnail" className='text-sm font-[Poppins] font-[500]'>Thumbnail</label>
                                        <input
                                            className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-violet-500 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                                            type="file"
                                            id="formFileMultiple"
                                            accept='image/*'
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                        />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="date" className='text-sm font-[Poppins] font-[500]'>Date</label>
                                        <input onChange={changeHandler} autoComplete="date" value={formData.date} max={new Date().toISOString().split('T')[0]} name="date" type="date" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="title" className='text-sm font-[Poppins] font-[500]'>Title</label>
                                        <input onChange={changeHandler} autoComplete="title" value={formData.title} name="title" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="shortDesc" className='text-sm font-[Poppins] font-[500]'>Short Desc</label>
                                        <input onChange={changeHandler} autoComplete="shortDesc" value={formData.shortDesc} name="shortDesc" type="shortDesc" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                    </div>

                                    <div className='mb-4 flex flex-col'>
                                        <label htmlFor="briefDesc" className='text-sm font-[Poppins] font-[500] mb-1'>Brief Desc</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={formData.briefDesc}
                                            tabIndex={1}
                                            onChange={newContent => setFormData((prevFormData) => {
                                                return {
                                                    ...prevFormData,
                                                    briefDesc: newContent
                                                }
                                            })}
                                            onBlur={newContent => setFormData((prevFormData) => {
                                                return {
                                                    ...prevFormData,
                                                    briefDesc: newContent
                                                }
                                            })}
                                        />
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
                            allBlogs.length === 0 ? (<h2 className='text-[3rem] font-extrabold font-[Questrial] text-center pt-4'>No Blogs Found</h2>) : (<h2 className='text-[3rem] font-extrabold font-[Questrial] text-center pt-4'>All Blogs</h2>)
                        }
                        {allBlogs.length < 1 ? (<></>) : dataLoading ? <Loader color={"black"} /> :
                            <div className="px-3 md:px-32 py-4 md:py-4">
                                <div className='my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-8'>
                                    {
                                        allBlogs.map((blog, index) => (
                                            <BlogCard title={blog?.title} shortDesc={blog?.shortDescription} img={blog?.imgUrlModelDBId?.urls[0]} deleteBlog={deleteBlog} _id={blog._id} key={index} />
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

export default ManageBlogs
