"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Loader from '@/component/loader/loader'
import { apiConnector } from '@/services/apiconnector'
import { CareerAPI } from '@/services/apis'
import Sidebar from '../sidebar/sidebar'
import '../../../public/css/globals.css'
import { useRouter } from 'next/navigation'



const ManageCareer = () => {
    const admin = useSelector((state) => state.admin);
    const router=useRouter();
  
    useEffect(() => {
      if (!admin._id) {
        router.push('/admin/login-panel');
      }
    }, [admin, router]);

    const [jobData, setJobData] = useState({ position: '', count: '', salary: '', status: true, link: '' })
    const [requirementArray, setRequirementArray] = useState([''])
    const [responsibilityArray, setResponsibilityArray] = useState([''])

    const handleRequirementChange = (index, event) => {
        const newRequirement = [...requirementArray];
        newRequirement[index] = event.target.value;
        setRequirementArray(newRequirement);
    }

    const handleAddRequirementInput = (e) => {
        e.preventDefault();
        if (requirementArray.length < 20) {
            setRequirementArray([...requirementArray, '']);
        }
    };

    const handleRemoveRequirementInput = (e) => {
        e.preventDefault();
        if (requirementArray.length < 20) {
            requirementArray.pop()
            setRequirementArray([...requirementArray]);
        }
    };

    const handleResponsibilityChange = (index, event) => {
        const newRequirement = [...responsibilityArray];
        newRequirement[index] = event.target.value;
        setResponsibilityArray(newRequirement);
    }


    const handleAddResponsibilityInput = (e) => {
        e.preventDefault();

        if (responsibilityArray.length < 20) {
            setResponsibilityArray([...responsibilityArray, '']);
        }
    };


    const handleRemoveResponsibilityInput = (e) => {
        e.preventDefault();
        if (responsibilityArray.length < 20) {
            responsibilityArray.pop()
            setRequirementArray([...responsibilityArray]);
        }
    };

    const [loading, setLoading] = useState(false)

    const [allJobs, setAllJobs] = useState([])

    const ChangeHandler = (e) => {
        setJobData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }
    // Token
    

    const fetchAllJobs = async () => {
        try {
            const response = await apiConnector({ method: "GET", url: CareerAPI.fetchAllListedJosbs })
            setAllJobs(response.data.data)
            console.log(allJobs)

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }


    const createJob = async () => {
        setLoading(true)
        try {
            const response = await apiConnector({ method: "POST", url: CareerAPI.listNewJob_API, bodyData: { ...jobData, requirementArray: requirementArray, responsibilityArray: responsibilityArray }, headers: { token: admin.token } })
            toast.success("Job Successfully Created")
            console.log(response)

            setJobData({ position: '', count: '', salary: '', status: true, link: '' })
            setRequirementArray(['', ''])
            setResponsibilityArray(['', ''])

            fetchAllJobs();

        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
        setLoading(false)
    }

    const deleteJob = async (id) => {
        try {
            await apiConnector({ method: "DELETE", url: CareerAPI.deleteJob + `/${id}`, headers: { token: admin.token } })
            toast.success("Job Deleted Successfully")
            fetchAllJobs();
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const updateHiringStatus = async (id) => {
        try {
            await apiConnector({ method: "PUT", url: CareerAPI.updateListedJob + `/${id}`, headers: { token: admin.token } })
            toast.success("Job Status Updated Successfully")
            fetchAllJobs();
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createJob();
    }

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await apiConnector({ method: "GET", url: CareerAPI.fetchAllListedJosbs })
                setAllJobs(response.data.data)

            } catch (error) {
                toast.error(error?.response?.data?.message)
            }
        }
        fetchAllJobs();
    }, [admin])


    return (
        <Sidebar>
            <div className='flex flex-col justify-between gap-8'>
                <section className="bg-gray-50">
                    <div className="flex flex-col items-center justify-center md:px-6 py-8 mx-auto ">
                        <div className="w-[90%] md:w-[80%] bg-white rounded-lg shadow mx-auto overflow-x-hidden">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Create a Job Opening
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900  text-start">Job Position<span className='ml-1 text-red-600'>*</span></label>
                                        <input type="text" name="position" id="position" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Job Title" required={true} autoComplete="off" onChange={(e) => ChangeHandler(e)} value={jobData.position} />
                                    </div>
                                    <div>
                                        <label htmlFor="count" className="block mb-2 text-sm font-medium text-gray-900  text-start">Openings<span className='ml-1 text-red-600'>*</span></label>
                                        <input type="number" name="count" id="count" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Number of Opening" required={true} autoComplete="off" onChange={(e) => ChangeHandler(e)} value={jobData.count} />
                                    </div>
                                    <div>
                                        <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900  text-start">Salary<span className='ml-1 text-red-600'>*</span></label>
                                        <input type="text" name="salary" id="salary" placeholder="Enter The Offering Salary" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required={true} autoComplete="off" onChange={(e) => ChangeHandler(e)} value={jobData.salary} />
                                    </div>

                                    <div>
                                        <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900  text-start">Link to Apply<span className='ml-1 text-red-600'>*</span></label>
                                        <input type="text" name="link" id="link" placeholder="Enter Form Link" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required={true} autoComplete="off" onChange={(e) => ChangeHandler(e)} value={jobData.link} />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="requirementArray" className="block mb-2 font-medium text-gray-900 font-[Roboto]">
                                            Requirements<span className='ml-1 text-red-600'>*</span>
                                        </label>

                                        <div className="flex items-center flex-wrap gap-4" >
                                            {
                                                requirementArray.map((value, index) => (
                                                    <input key={index} value={value} onChange={(e) => handleRequirementChange(index, e)} type={"text"} className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none focus:outline-none font-[Rubik] mb-2" />
                                                ))
                                            }
                                        </div>
                                        {
                                            requirementArray.length < 20 && (
                                                <div className='w-[100%] flex gap-4'>
                                                    <button onClick={handleAddRequirementInput} className="px-2 py-2 bg-black text-white text-sm rounded-lg">Add More </button>
                                                    {
                                                        requirementArray.length > 1 ? (<button onClick={handleRemoveRequirementInput} className="px-2 py-2 bg-black text-white text-sm rounded-lg">Remove </button>) : (<></>)
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="requirementArray" className="block mb-2 font-medium text-gray-900 font-[Roboto]">
                                            Responsibility<span className='ml-1 text-red-600'>*</span>
                                        </label>
                                        <div className="flex items-center flex-wrap gap-4">
                                            {
                                                responsibilityArray.map((value, index) => (
                                                    <input key={index} value={value} onChange={(e) => handleResponsibilityChange(index, e)} type={"text"} className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none focus:outline-none font-[Rubik] mb-2" />
                                                ))
                                            }
                                        </div>
                                        {
                                            responsibilityArray.length < 20 && (
                                                <div className='w-[100%] flex gap-4'>
                                                    <button onClick={handleAddResponsibilityInput} className="px-2 py-2 bg-black text-white text-sm rounded-lg">Add More </button>
                                                    {
                                                        responsibilityArray.length > 1 ? (<button onClick={handleRemoveResponsibilityInput} className="px-2 py-2 bg-black text-white text-sm rounded-lg">Remove </button>) : (<></>)
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>

                                    <button type="submit" className="w-[100%] md:w-[40%] text-white grid place-items-center bg-[#2463eb] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{loading ? <Loader color={"#fff"} /> : "Create Job Opening"}</button>
                                </form>
                            </div>
                        </div>
                        {
                            loading ? (<div><Loader /></div>) : allJobs.length === 0 ? (<p className='my-4 text-[3rem] text-center font-[Rubik] mt-8'>No Current Openings</p>) : (
                                <div className='w-[100%] gap-4 py-8 mt-6 flex flex-col'>
                                    <h2 className='my-4 text-[2rem] md:text-[3rem] text-center font-[Rubik]'>All Current Openings</h2>
                                    {
                                        allJobs.map((job, index) => {
                                            return (
                                                <div key={index} className='w-[100%] bg-[#0c3a7c] mt-8' style={{ borderRadius: "80px 0px 130px 50px" }}>
                                                    <div className='flex flex-col items-start  bg-white md:flex-col md:border py-8' style={{ borderRadius: "100px 0px 150px 20px" }}>
                                                        <div className='flex flex-col gap-2 py-8 px-14'>
                                                            <h2 className='font-[Rubik] font-bold text-[#000] text-2xl'>{job.position}</h2>
                                                            <p className='font-[Roboto]'>No. Of Opening : {job.count} </p>
                                                            <p className='font-[Roboto] font-bold'>Salary : {job.salary} </p>
                                                        </div>
                                                        <div className='w-[100%] flex flex-col justify-around items-start md:flex-row'>
                                                            <div className='flex flex-col gap-2 py-8 md:px-14'>
                                                                <p className='font-[Rubik] font-semibold '>Requirements : </p>
                                                                <ul className='list-disc font-[Rubik] space-y-4 bg-[#0c3a7c] shadow-2xl p-4 text-white' style={{ borderRadius: "70px 70px 20px 20px" }}>
                                                                    {
                                                                        job.requirementArray.map((requirement, index) => {
                                                                            return (
                                                                                <li key={index} className='ml-8'>{requirement}</li>
                                                                            )
                                                                        })

                                                                    }
                                                                </ul>
                                                            </div>
                                                            <div className='flex flex-col gap-2 py-8 md:px-14'>
                                                                <p className='font-[Rubik] font-semibold '>Responsibility : </p>
                                                                <ul className='list-disc font-[Rubik] space-y-4 bg-[#0c3a7c] shadow-2xl p-4 text-white' style={{ borderRadius: "20px 20px 70px 70px" }}>
                                                                    {
                                                                        job.responsibilityArray.map((responsibility, index) => {
                                                                            return (
                                                                                <li key={index} className='ml-8'>{responsibility}</li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col justify-between items-center gap-2 md:flex-row'>
                                                            <div>
                                                                {
                                                                    job.status === "true" ? (<button className='px-14 py-2 ml-8 bg-[#0c3a7c] text-white rounded-lg text-sm font-[Rubik] mt-8 transition-all duration-300 hover:shadow-lg hover:scale-x-[1.05] ' onClick={() => updateHiringStatus(job._id)}>Activily Hiring</button>) : (<button className='px-14 py-2 ml-8 bg-[#1a3777] text-white rounded-lg text-sm font-[Rubik] mt-8 transition-all duration-300 hover:shadow-lg hover:scale-x-[1.05] ' onClick={() => updateHiringStatus(job._id)}>Hiring Closed</button>)
                                                                }

                                                            </div>
                                                            {/* <button className='px-14 py-2 ml-8 bg-[#1a3777] text-white rounded-lg text-sm font-[Rubik] mt-8 transition-all duration-300 hover:shadow-lg hover:scale-x-[1.05] animate-bounce'>Open Form</button> */}
                                                            <Link target="_blank"href={job.link} className='px-14 py-2 ml-8 bg-[#0c3a7c] text-white rounded-lg text-sm font-[Rubik] mt-8 transition-all duration-300 hover:shadow-lg hover:scale-x-[1.05]'>Open Form</Link>
                                                            <button className='px-14 py-2 ml-8 bg-[#0c3a7c] text-white rounded-lg text-sm font-[Rubik] mt-8 transition-all duration-300 hover:shadow-lg hover:scale-x-[1.05] ' onClick={() => deleteJob(job._id)}>Delete Job</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            )
                        }
                    </div>
                </section>

            </div>
        </Sidebar>
    )
}

export default ManageCareer
