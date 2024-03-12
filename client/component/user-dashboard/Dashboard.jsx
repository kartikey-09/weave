"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Profile from './Profile';
import ComingSoon from './ComingSoon';
import ICIAHP from './ICIAHP';
import Clinic from './Clinic';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const user = useSelector(state => state?.user);
    const router=useRouter();

    console.log("hii",user._id);
    useEffect(() => {
        if (!user._id) {
            router.push('/sign-in');
        }
    }, [user, router]);
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div className='overflow-x-hidden bg-white'>
    
            <div className=''>

                <h2 data-aos="fade-up" data-aos-duration="2000" className='font-custom text-center text-3xl md:text-4xl text-black tracking-wide font-[600] my-4'>
                    View
                    {" "}
                    <span className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent'>
                        Dashboard
                    </span>
                </h2>

                <div data-aos="fade-up" data-aos-duration="2000" className='min-h-[30vh] w-[95%] my-6 rounded-2xl mx-auto border-2 border-orange-500 overflow-hidden'>
                    <div className='flex justify-center items-center text-gray-600'>


                        <div className='hidden md:block w-full'>
                            <Tabs isFitted variant='enclosed' className='mt-2 w-[100%] md:w-[100%]'>
                                <TabList mb='1em' className='border-b border-gray-300 pb-2'>
                                    <Tab _selected={{ color: 'white', bg: '#f97316',padding:"6px",borderRadius:"6px" }} className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>PROFILE</p>
                                    </Tab>

                                    <Tab _selected={{ color: '#fff', bg: '#f97316',padding:"6px",borderRadius:"6px"}} className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>Clinic</p>
                                    </Tab>

                                    <Tab _selected={{ color: 'white', bg: '#f97316',padding:"6px",borderRadius:"6px" }}className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>Institute</p>
                                    </Tab>
                                    <Tab _selected={{ color: '#fff', bg: '#f97316' ,padding:"6px",borderRadius:"6px"}} className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>Research</p>
                                    </Tab>
                                </TabList>
                                <TabList mb='1em' className='border-b border-gray-300 pb-2'>
                                    <Tab _selected={{ color: 'white', bg: '#f97316' ,padding:"6px",borderRadius:"6px"}} className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>Corporate Wellbeing</p>
                                    </Tab>
                                    <Tab _selected={{ color: '#fff', bg: '#f97316' ,padding:"6px",borderRadius:"6px"}} className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>Learning Nexus</p>
                                    </Tab>

                                    <Tab _selected={{ color: 'white', bg: '#f97316' ,padding:"6px",borderRadius:"6px"}} className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>Conference</p>
                                    </Tab>

                                    <Tab _selected={{ color: 'white', bg: '#f97316',padding:"6px",borderRadius:"6px" }} className="ml-20">
                                        <p className='font-bold text-sm md:text-base tracking-wide '>ICIAHP 2023</p>
                                    </Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel className='flex justify-start items-center'>
                                        <Profile />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <Clinic />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>
                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ICIAHP />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>

                        <div className='block md:hidden w-full'>
                            <Tabs isFitted variant='enclosed' className='w-[100%] md:w-[100%]'>
                                <TabList mb='1em'>
                                    <Tab _selected={{ color: 'white', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>PROFILE</p>
                                    </Tab>

                                    <Tab _selected={{ color: '#fff', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>Clinic</p>
                                    </Tab>

                                    <Tab _selected={{ color: 'white', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>Institute</p>
                                    </Tab>
                                </TabList>
                                
                                <TabList mb='1em' className="border-b border-gray-300">
                                    <Tab _selected={{ color: '#fff', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>Research</p>
                                    </Tab>
                                    <Tab _selected={{ color: 'white', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>Corporate Wellbeing</p>
                                    </Tab>
                                    <Tab _selected={{ color: '#fff', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>Learning Nexus</p>
                                    </Tab>
                                </TabList>
                                <TabList mb='1em'>
                                    <Tab _selected={{ color: 'white', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>Conference</p>
                                    </Tab>

                                    <Tab _selected={{ color: 'white', bg: '#f97316' }}>
                                        <p className='font-custom text-sm md:text-base font-[500] tracking-wide '>ICIAHP 2023</p>
                                    </Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel className='flex justify-start items-center'>
                                        <Profile />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <Clinic />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>
                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>
                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ComingSoon />
                                    </TabPanel>

                                    <TabPanel className='flex justify-start items-center'>
                                        <ICIAHP />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard