"use client"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState ,useContext } from 'react'
import toast from 'react-hot-toast'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import Loader from '@/component/loader/loader';
import { apiConnector } from '@/services/apiconnector';
import { Gallery_API, HandleImagesAPI } from '@/services/apis'
import { MdDelete } from "react-icons/md";
import Sidebar from '../sidebar/sidebar';
import '../../../public/css/globals.css'
import { useRouter } from 'next/navigation';

const ManageGallery = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading, setLoading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState()
    // Token
    const admin = useSelector((state) => state.admin);
    const router=useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push('/admin/login-panel');
    }
  }, [admin, router]);


    const [formData, setFormData] = useState({ category: "", batchName: "" })
    const [newCategoryForm, setNewCategoryForm] = useState(false)
    const [newBatchName, setNewBatchName] = useState(false)

    const [allCategoryData, setAllCategoryData] = useState([])
    const [batchNameData, setBatchNameData] = useState([])

    // image handling
    // file input handle

    const fileInputRef = useRef();
    const [selectedImages, setSelectedImages] = useState([]);


    const handleImageChange = (e) => {
        const files = e.target.files;
        setSelectedImages([...selectedImages, ...files]);
    };

    const createGalleryData = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const formImageData = new FormData();
            selectedImages.forEach((image) => {
                formImageData.append('images', image);
            });
            formImageData.append('category', formData.category);
            formImageData.append('batchName', formData.batchName);
            let res = await apiConnector({
                method: "POST",
                url: Gallery_API.CreateGalleryData_API,
                bodyData: formImageData,
                headers: { token: admin.token },
            });

            console.log(res);
            if (res?.data?.success) {
                setSelectedImages([]);
                setFormData({ category: "", batchName: "" });
                fileInputRef.current.value = '';
                toast.success(res?.data?.message);
                fetchAllGalleryData();
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const fetchAllGalleryData = async (req, res) => {
        setLoading(true)
        try {
            const res = await apiConnector({ method: "GET", url: Gallery_API.GetAllGalleryData_API })
            console.log("res", res.data.data)
            setAllCategoryData(res?.data?.data)

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }

    const fetchSingleGalleryData = async (categoryName) => {
        try {
            const res = await apiConnector({ method: "GET", url: Gallery_API.GetSingleGalleryData_API + `?categoryName=${categoryName}` })
            console.log("res single batch", res.data.data)
            setBatchNameData(res?.data?.data)

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const increasePageNo = (pageNo) => {
        if (pageNo < totalPages && pageNo > 0) {
            setPageNo(pageNo = pageNo + 1)
        }
    }

    const descreasePageNo = (pageNo) => {
        if (pageNo !== 0 && pageNo > 0 && pageNo !== 1) {
            setPageNo(pageNo = pageNo - 1)
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


    // Handling the UI of the showing categories
    const [showSingleBatch, setShowSingleBatch] = useState(false)
    const [singleBatchID, setSingleBatchID] = useState()
    const [singleBatchData, setSingleBatchData] = useState()

    function handleSingleBatchView(batchId) {
        getSingleBatchData(batchId);
        setSingleBatchID(batchId)
        setShowSingleBatch(true)
        console.log("batcId", batchId)
    }

    const getSingleBatchData = async (batchId) => {
        try {
            const res = await apiConnector({ method: "GET", url: Gallery_API.GetSingleBatchData_API + `/${batchId}` })
            console.log("res single batch data", res?.data?.data)
            setSingleBatchData(res?.data?.data)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const deleteSingleImgFromBatch = async (batchId, imgUrlToDelete) => {
        try {
            const res = await apiConnector({ method: "DELETE", url: Gallery_API.DeleteSingleImageFromBatch + `/${batchId}/${imgUrlToDelete}` })
            toast.success("Image Deleted Successfully ")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }



    const deleteSingleBatch = async (batchId) => {
        try {
            const res = await apiConnector({ method: "DELETE", url: Gallery_API.DeleteSingleBatch + `/${batchId}` })
            toast.success("Batch Deleted Successfully")
            fetchAllGalleryData()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }



    useEffect(() => {
        fetchAllGalleryData();
    }, []);
    return (
        <Sidebar>
            <div className='w-full min-h-screen relative'>
                <div className='flex flex-col justify-between gap-8 py-4'>
                    {/* from to create admin */}
                    <div className='flex justify-center items-center relative'>
                        <div className='flex justify-center items-center w-full max-md:px-4'>
                            <div className='bg-white p-4 rounded-xl w-[44rem] pt-6 pb-12'>
                                <form className='' onSubmit={createGalleryData}>
                                    <h2 className='text-2xl font-[Poppins] text-center font-[500] pb-4 tracking-wide'>Gallery System</h2>

                                    <div className='mb-4 flex flex-col'>
                                        {
                                            newCategoryForm ? (<></>) : (
                                                <>
                                                    <label htmlFor="category" className='text-sm font-[Poppins] font-[500]'>Select Your Category</label>
                                                    <select onChange={changeHandler} value={formData.category} name="category" type="text" className="text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1">
                                                        <option value={""}>Select</option>
                                                        {
                                                            allCategoryData.length > 0 ? allCategoryData.map((categoryData, index) => {
                                                                return (
                                                                    <option key={index} value={categoryData.category} >{categoryData.category}</option>
                                                                )
                                                            }) : (<></>)
                                                        }
                                                    </select>

                                                    {
                                                        formData.category === "" ? newCategoryForm ? (<></>) : (<p className='px-4 py-2 bg-black text-white w-fit rounded-lg mt-2 text-sm ml-auto cursor-pointer' onClick={() => setNewCategoryForm(true)} >Create New Category</p>) : (<></>)
                                                    }

                                                    {
                                                        formData.category != "" ? (
                                                            <>
                                                                {
                                                                    newBatchName ? (
                                                                        <>
                                                                            <label htmlFor="batchName" className='text-sm font-[Poppins] font-[500] mt-4'>Batch Name</label>
                                                                            <input onChange={changeHandler} required={true} autoComplete="batchName" value={formData.batchName} name="batchName" type="text" className='text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <label htmlFor="batchName" className='text-sm font-[Poppins] font-[500] mt-4'>Select Your Batch Name</label>
                                                                            <select onClick={() => fetchSingleGalleryData(formData.category)} onChange={changeHandler} value={formData.batchName} name="batchName" type="text" className="text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1">
                                                                                <option value={""}>Select</option>
                                                                                {
                                                                                    batchNameData.length > 0 ? batchNameData[0].batch?.map((batchName, index) => {
                                                                                        return (
                                                                                            <option key={index} value={batchName.batchName}>{batchName.batchName}</option>
                                                                                        )
                                                                                    }) : (<></>)
                                                                                }
                                                                            </select>
                                                                        </>
                                                                    )

                                                                }

                                                                {
                                                                    formData.batchName === "" ? newBatchName ? (<p className='px-4 py-2 bg-green-600 text-white w-fit rounded-lg mt-2 text-sm ml-auto cursor-pointer' onClick={() => setNewBatchName(false)} >Select From Existing Batches</p>) : (<p className='px-4 py-2 bg-black text-white w-fit rounded-lg mt-2 text-sm ml-auto cursor-pointer' onClick={() => setNewBatchName(true)} >Create New Batch Name</p>) : (<></>)
                                                                }

                                                                {/* Select Images */}

                                                                <div className='mb-4 flex flex-col'>
                                                                    <label htmlFor="images" className='text-sm font-[Poppins] font-[500] mt-4'>Select Images</label>
                                                                    {/* <input type="file" ref={fileInputRef} multiple accept='image/*' onChange={handleImageChange} className='text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' /> */}
                                                                    <input
                                                                        className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-blue-400 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                                                                        type="file"
                                                                        multiple
                                                                        id="formFileMultiple"
                                                                        accept='image/*'
                                                                        onChange={handleImageChange}
                                                                        ref={fileInputRef}
                                                                    />
                                                                </div>
                                                                {
                                                                    loading ? (<Loader color={"blue"} width="40" height={"40"} />) : (<button type='submit' className="mt-2 bg-black text-white rounded-lg py-2 px-4 text-center cursor-pointer hover:scale-[1.05] duration-200 transition-all font-[Rubik] w-fit">Create</button>)
                                                                }

                                                            </>
                                                        ) : (<></>)
                                                    }
                                                </>
                                            )
                                        }

                                    </div>

                                    {
                                        newCategoryForm ? (
                                            <>
                                                <p className='px-4 py-2 bg-green-600 text-white w-fit rounded-lg mt-2 text-sm ml-auto cursor-pointer' onClick={() => setNewCategoryForm(false)} >Select From Existing Categories</p>
                                                <div className='mb-4 flex flex-col'>
                                                    <label htmlFor="category" className='text-sm font-[Poppins] font-[500]'>Category Name</label>
                                                    <input onChange={changeHandler} required={true} autoComplete="category" value={formData.category} name="category" type="text" className='text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                </div>
                                                <div className='mb-4 flex flex-col'>
                                                    <label htmlFor="batchName" className='text-sm font-[Poppins] font-[500]'>Batch Name</label>
                                                    <input onChange={changeHandler} required={true} autoComplete="batchName" value={formData.batchName} name="batchName" type="text" className='text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                                </div>

                                                <div className='mb-4 flex flex-col'>
                                                    <label htmlFor="images" className='text-sm font-[Poppins] font-[500]'>Select Images</label>
                                                    {/* <input type="file" ref={fileInputRef} multiple accept='image/*' onChange={handleImageChange} className='text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' /> */}
                                                    <input
                                                        className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-violet-500 bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                                                        type="file"
                                                        multiple
                                                        id="formFileMultiple"
                                                        accept='image/*'
                                                        onChange={handleImageChange}
                                                        ref={fileInputRef}
                                                    />
                                                </div>
                                                {
                                                    loading ? (<Loader color={"black"} width="40" height={"40"} />) : (<button type='submit' className="mt-2 bg-black text-white rounded-lg py-2 px-4 text-center cursor-pointer hover:scale-[1.05] duration-200 transition-all font-[Rubik]">Create</button>)
                                                }
                                            </>
                                        ) : (<></>)

                                    }


                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    allCategoryData?.length > 0 ? (
                        <p className='text-4xl font-[Rubik] text-white text-center flex justify-center items-center mt-14 mb-8'>All Categories Images</p>
                    ) : (<p className='text-4xl font-[Rubik] text-white text-center flex justify-center items-center mt-14 mb-8'>No Data found</p>)
                }

                {
                    showSingleBatch ? (
                        <div className='px-4 md:px-12 py-6 md:py-12 bg-white'>
                            <div>
                                <h2 data-aos="fade-up" data-aos-duration="2000" className='font-[Poppins] text-2xl md:text-3xl text-black tracking-wide font-[600] inline border-b-[3px] border-green-500 pb-[0.4rem] md:pb-[0.7rem] my-3'>
                                    {singleBatchData?.batchName}
                                    {" "}
                                </h2>

                                <PhotoProvider>
                                    <div className="my-8 grid grid-cols-1 max-md:place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {singleBatchData?.imgUrls?.map((item, index) => (
                                            <div key={index} className='border relative cursor-pointer h-[15rem] w-[20rem] rounded-2xl group my-14'>
                                                <PhotoView key={index}
                                                    src={item} >
                                                    <img src={item} alt="" className='h-full w-full object-cover ' />
                                                </PhotoView>
                                                <p className='bg-red-600 text-white px-4 py-2 w-fit rounded-lg mt-2' onClick={() => deleteSingleImgFromBatch(singleBatchID, index)}>Delete</p>
                                            </div>
                                        ))}
                                    </div>
                                </PhotoProvider>
                            </div>

                        </div>
                    ) :
                        allCategoryData?.length > 0 ? allCategoryData.map((categoryData, index) => (
                            categoryData?.batch?.length > 0 ?
                                (<div key={index} className='px-4 md:px-12 py-6 md:py-12 bg-white'>
                                    <div>
                                        <h2 data-aos="fade-up" data-aos-duration="2000" className='font-[Poppins] text-2xl md:text-3xl text-black tracking-wide font-[600] inline border-b-[3px] border-green-500 pb-[0.4rem] md:pb-[0.7rem] my-3'>
                                            {categoryData.category}
                                            {" "}
                                        </h2>
                                        <div className='grid grid-cols-1 max-md:place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-12 md:mt-12 gap-x-6 gap-y-3 gap-4'>
                                            {
                                                categoryData?.batch?.map((e, index) => (
                                                    <div key={index} className='relative cursor-pointer  h-[15rem] w-[20rem] rounded-2xl overflow-hidden group hover:scale-[1.02] duration-700'>
                                                        <MdDelete className='text-red-500 absolute right-2 top-2 bg-white text-2xl rounded-full hover:scale-[1.3] duration-200' onClick={() => deleteSingleBatch(e._id)} />
                                                        <img onClick={() => handleSingleBatchView(e._id)} src={e?.imgUrls?.[0]} alt="" className='h-full w-full object-cover ' />
                                                        <div className='absolute bottom-[-8px] left-0 h-[3.5rem] w-full bg-black bg-opacity-50 flex justify-center items-start '>
                                                            <p className='font-[Rubik] pt-3 tracking-wider text-white font-[500]'>
                                                                {e.batchName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>)
                                :
                                <></>
                        )) : (<></>)
                }

                <div className='w-full h-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-2'>
                    <div className='w-[90%] mx-auto flex justify-between items-center px-4 py-4 '>
                        <div className='flex justify-between items-center gap-6'>
                            <button className='bg-green-500 text-white rounded-lg' onClick={() => descreasePageNo(pageNo)}>
                                <p className='font-[Poppins] font-[400] flex justify-center items-center p-2'><AiOutlineLeft className='mr-2' />Prev </p>
                            </button>
                            <button className='bg-green-500 text-white rounded-lg' onClick={() => increasePageNo(pageNo)}>
                                <p className='font-[Poppins] font-[400] flex justify-center items-center p-2'>Next <AiOutlineRight className='ml-2' /></p>
                            </button>
                        </div>
                        <div >
                            <p className='text-white  font-[Poppins]'>{pageNo} of {totalPages}</p>
                        </div>
                    </div>
                </div>

            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody className='my-4'>
                        <p className='font-[Poppins] text-lg font-semibold'>Do you want to delete the entire batch?</p>
                        <p className='font-[Poppins] text-xs'>It will delete all the images inside the batch</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={2} className="" onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='green' onClick={(batchId) => deleteSingleBatch(batchId)}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Sidebar>
    )
}

export default ManageGallery
