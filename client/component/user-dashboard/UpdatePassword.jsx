"use client"
import React, { useState ,useContext} from 'react'
import { useSelector } from 'react-redux';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import { apiConnector } from '@/services/apiconnector';
import { UserAuthAPI } from '@/services/apis';
import { toast } from 'react-hot-toast';
import './Updatepass.css';


const UpdatePassword = () => {
    const user = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpSend, setOtpSend] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const sendCode = async () => {
        setLoading(true);
        try {
            const res = await apiConnector({
                method: 'GET',
                url: UserAuthAPI.userSendOTP_API + `?email=${user?.email}`,
            })
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setOtpSend(true);
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
    }

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({
                method: 'POST',
                url: UserAuthAPI.userVerifyOTP_API,
                bodyData: {
                    email: user.email,
                    OTP: otp,
                }
            })
            // console.log(res.data)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setVerify(true);
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
    }

    const UpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({
                method: 'PUT',
                url: UserAuthAPI.userUpdatePassword_API + `/${user?.email}`,
                bodyData: {
                    newPassword: password,
                    OTP: otp,
                },
            })
            // console.log(res.data)
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setPassword('');
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
    }



    return (
        <>
            {/* <Button colorScheme="blue" size="sm" onClick={onOpen} ref={btnRef}>
                <p className='font-custom font-[400] tracking-wider'
                >
                    Update Password</p>
            </Button>

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
                        <p className='font-custom text-center text-sm border-b border-gray-400 pb-1 px-4'>
                            UPDATE PASSWORD
                        </p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='flex flex-col gap-3'>
                            {!verify ?
                                <>
                                    {!otpSend &&
                                        <>
                                            <p className='tracking-wide text-center font-custom font-[500] text-gray-900 text-sm' >
                                                Send verification code to{" "}
                                                <span className='text-violet-500 underline italic'>{user.email}</span>
                                            </p>
                                            <div className='flex justify-center items-center'>
                                                <Button isLoading={loading} isDisabled={loading} colorScheme="blue" size="sm" onClick={sendCode}>
                                                    <p className='font-custom font-[400] tracking-wider'
                                                    >
                                                        Send Code
                                                    </p>
                                                </Button>
                                            </div>
                                        </>
                                    }
                                    {
                                        otpSend &&
                                        <form onSubmit={handleOtpVerify} className=''>
                                            <h2 className='font-custom text-center font-[500] pb-4 text-sm tracking-wide'>Enter OTP send to {" "}
                                                <span className='text-violet-500 italic underline'>{user?.email}</span>
                                            </h2>

                                            <div className='mb-4 flex flex-col'>
                                                <label htmlFor="otp" className='text-sm font-custom font-[500]'>OTP</label>
                                                <input onChange={(e) => setOtp(e.target.value)} autoComplete="otp" value={otp} name="otp" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                            </div>

                                            <div className='flex justify-center items-center mt-4'>
                                                <Button isLoading={loading} isDisabled={loading} colorScheme="teal" size="sm" type='submit' >
                                                    <p className='font-custom font-[400] tracking-wider'
                                                    >
                                                        Verify OTP
                                                    </p>
                                                </Button>
                                            </div>


                                        </form>
                                    }
                                </>
                                :
                                <>
                                    <form onSubmit={UpdatePassword} className=''>
                                        <h2 className='font-custom text-center font-[500] pb-4 text-sm tracking-wide'>
                                            Enter Your New Password
                                        </h2>

                                        <div className='mb-4 flex flex-col'>
                                            <input onChange={(e) => setPassword(e.target.value)} autoComplete="password" value={password} name="password" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                        </div>

                                        <div className='flex justify-center items-center mt-4'>
                                            <Button isLoading={loading} isDisabled={loading} colorScheme="teal" size="sm" type='submit' >
                                                <p className='font-custom font-[400] tracking-wider'
                                                >
                                                    Update Password
                                                </p>
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" size="sm" onClick={onClose}>
                            <p className='font-custom font-[400] tracking-wider'
                            >
                                Close</p>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}

<button onClick={openModal} className='btn-pass'>
                Update Password
            </button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p>UPDATE PASSWORD</p>
                            <button className='btn-pass' onClick={closeModal}>Close</button>
                        </div>
                        <div className="modal-body">
                            {!verify ?
                                <>
                                    {!otpSend &&
                                        <>
                                            <p className='tracking-wide text-center font-custom font-[500] text-gray-900 text-sm' >
                                                Send verification code to{" "}
                                                <span className='text-violet-500 underline italic'>{user.email}</span>
                                            </p>
                                            <div className='flex justify-center items-center'>
                                                <Button className='btn-pass' isLoading={loading} isDisabled={loading} colorScheme="blue" size="sm" onClick={sendCode}>
                                                    <p className='font-custom font-[400] tracking-wider'
                                                    >
                                                        Send Code
                                                    </p>
                                                </Button>
                                            </div>
                                        </>
                                    }
                                    {
                                        otpSend &&
                                        <form onSubmit={handleOtpVerify} className=''>
                                            <h2 className='font-custom text-center font-[500] pb-4 text-sm tracking-wide'>Enter OTP send to {" "}
                                                <span className='text-violet-500 italic underline'>{user?.email}</span>
                                            </h2>

                                            <div className='mb-4 flex flex-col'>
                                                <label htmlFor="otp" className='text-sm font-custom font-[500]'>OTP</label>
                                                <input onChange={(e) => setOtp(e.target.value)} autoComplete="otp" value={otp} name="otp" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                            </div>

                                            <div className='flex justify-center items-center mt-4'>
                                                <Button className='btn-pass' isLoading={loading} isDisabled={loading} colorScheme="teal" size="sm" type='submit' >
                                                    <p className='font-custom font-[400] tracking-wider'
                                                    >
                                                        Verify OTP
                                                    </p>
                                                </Button>
                                            </div>


                                        </form>
                                    }
                                </>
                                :
                                <>
                                    <form onSubmit={UpdatePassword} className=''>
                                        <h2 className='font-custom text-center font-[500] pb-4 text-sm tracking-wide'>
                                            Enter Your New Password
                                        </h2>

                                        <div className='mb-4 flex flex-col'>
                                            <input onChange={(e) => setPassword(e.target.value)} autoComplete="password" value={password} name="password" type="text" className='text-sm border-2 border-violet-500 outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
                                        </div>

                                        <div className='flex justify-center items-center mt-4'>
                                            <Button className='btn-pass' isLoading={loading} isDisabled={loading} colorScheme="teal" size="sm" type='submit' >
                                                <p className='font-custom font-[400] tracking-wider'
                                                >
                                                    Update Password
                                                </p>
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            }
                       
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdatePassword