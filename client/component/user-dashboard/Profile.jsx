"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import UpdatePassword from './UpdatePassword'
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/features/UserSlice';
import { Button } from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
const Profile = () => {
    const user = useSelector((state) => state.user);
    
    const dispatch = useDispatch();
 
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logoutUser(null))
        router.push('/sign-in')
    }
    return (
        <div className='flex justify-center md:justify-start items-center  flex-col md:flex-row gap-6 w-full p-2'>


            <div className='p-1 rounded-sm flex justify-center items-center h-[10rem] md:w-[15rem] w-[10rem] md:h-[15rem] relative'>
                <img
                    src={`https://ui-avatars.com/api/?name=${user.name.firstname}+${user.name.lastname}&background=f97316&rounded=true&bold=true&color=ffffff`}
                    alt=""
                    className='h-auto object-contain w-full'
                />
            </div>

            <div className='md:border-l-2 border-orange-500 p-4 w-full  md:ml-12 md:pl-12 flex flex-col justify-center items-center md:block'>
                <div className='text-gray-900 flex w-full md:w-[60%] my-2 justify-between flex-row text-sm  md:gap-3'>
                    <p className='flex-[40%] font-custom font-[500] tracking-wide'>First Name</p>
                    <p className='flex-[60%] font-custom font-[500] tracking-wide text-blue-600  md:ml-0'>{user?.name?.firstname}</p>
                </div>
                <div className='text-gray-900 flex w-full  md:w-[60%] justify-between my-2 flex-row text-sm md:gap-3'>
                    <p className='flex-[40%] font-custom font-[500]'>Last Name</p>
                    <p className='flex-[60%] font-custom font-[500] tracking-wide text-blue-600  md:ml-0'>{user?.name?.lastname}</p>
                </div>
                <div className='text-gray-900 flex w-full  md:w-[60%] justify-between my-2 flex-row text-sm md:gap-3'>
                    <p className='flex-[40%] font-custom font-[500]'>Email</p>
                    <p className='flex-[60%] font-custom font-[500] tracking-wide text-blue-600  md:ml-0'>{user?.email}</p>
                </div>

                <div className='text-gray-900 flex justify-center mt-6 md:justify-end w-full my-2'>
                    <Button colorScheme="teal" size="sm" onClick={handleLogout}>
                        <p className='font-custom font-[400] tracking-wider'
                        >
                            Logout</p>
                    </Button>
                </div>

                <div className='text-gray-900 flex justify-center mt-3 md:justify-end w-full my-2'>
                    <UpdatePassword />
                </div>

            </div>

        </div>
    )
}

export default Profile