"use client"
import React, { useState } from 'react';
import { UserAuthAPI } from '@/services/apis';
import { toast } from 'react-hot-toast';
import { apiConnector } from '@/services/apiconnector';

const ForgotPassword = () => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = React.useRef(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const [otpSend, setOtpSend] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');

    const [verify, setVerify] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const sendCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({
                method: 'GET',
                url: UserAuthAPI.userSendOTP_API + `?email=${email}`,
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
                    email: email,
                    OTP: otp,
                }
            })
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
                url: UserAuthAPI.userUpdatePassword_API + `/${email}`,
                bodyData: {
                    newPassword: password,
                    OTP: otp,
                },
            })
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
            <p
                style={{
                    fontFamily: 'Poppins',
                    fontSize: '0.875rem',
                    color: '#DC2626',
                    fontWeight: '500',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                }}
                onClick={openModal}
            >
                Forgot Password?
            </p>

            {isOpen && (
                <div
                    style={{
                        display:'flex',
                        position: 'fixed',
                        zIndex: '1000',
                        top: '0',
                        left: '0',
                        right:'0',
                        bottom:'0',
                        width: '100%',
                        height: 'auto',
                        overflow: 'auto',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        justifyContent: 'center',
                        alignItems:'center'

                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fefefe',
                            margin: '15% auto',
                            padding: '20px',
                            border: '1px solid #888',
                            width: '50%',
                            borderRadius: '10px',
                        }}
                    >
                        <span
                            style={{
                                color: '#aaa',
                                float: 'right',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                            onClick={closeModal}
                        >
                            &times;
                        </span>
                        <div style={{ textAlign: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                            <p
                                style={{
                                    fontFamily: 'Poppins',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    borderBottom: '1px solid #ccc',
                                    paddingBottom: '5px',
                                    paddingLeft: '4px',
                                    paddingRight: '4px',
                                }}
                            >
                                FORGOT PASSWORD
                            </p>
                        </div>
                        <div style={{ padding: '20px' }}>
                            {!verify ? (
                                <>
                                    {!otpSend && (
                                        <>
                                            <p
                                                style={{
                                                    fontSize: '0.875rem',
                                                    color: '#3B82F6',
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '500',
                                                    fontStyle: 'italic',
                                                    textDecoration: 'underline',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Enter Your Email Id
                                            </p>
                                            <div style={{ marginBottom: '10px' }}>
                                                <input
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    autoComplete="email"
                                                    value={email}
                                                    name="email"
                                                    type="email"
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        border: '2px solid #34D399',
                                                        borderRadius: '5px',
                                                        outline: 'none',
                                                    }}
                                                />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <button
                                                    disabled={loading}
                                                    style={{
                                                        backgroundColor: '#3B82F6',
                                                        color: 'white',
                                                        padding: '8px 20px',
                                                        borderRadius: '5px',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={sendCode}
                                                >
                                                    {loading ? 'Loading...' : 'Send Code'}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                    {otpSend && (
                                        <div>
                                            <h2
                                                style={{
                                                    fontSize: '0.875rem',
                                                    color: '#3B82F6',
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '500',
                                                    marginBottom: '10px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Enter OTP send to{' '}
                                                <span
                                                    style={{
                                                        color: '#2563EB',
                                                        fontStyle: 'italic',
                                                        textDecoration: 'underline',
                                                    }}
                                                >
                                                    {email}
                                                </span>
                                            </h2>

                                            <div style={{ marginBottom: '10px' }}>
                                                <label
                                                    htmlFor="otp"
                                                    style={{
                                                        fontSize: '0.875rem',
                                                        color: '#2563EB',
                                                        fontFamily: 'Poppins',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    OTP
                                                </label>
                                                <input
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    autoComplete="otp"
                                                    value={otp}
                                                    name="otp"
                                                    type="text"
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        border: '2px solid #34D399',
                                                        borderRadius: '5px',
                                                        outline: 'none',
                                                    }}
                                                />
                                            </div>

                                            <div style={{ textAlign: 'center' }}>
                                                <button
                                                    disabled={loading}
                                                    style={{
                                                        backgroundColor: '#4ADE80',
                                                        color: 'white',
                                                        padding: '8px 20px',
                                                        borderRadius: '5px',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={handleOtpVerify}
                                                >
                                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h2
                                            style={{
                                                fontSize: '0.875rem',
                                                color: '#3B82F6',
                                                fontFamily: 'Poppins',
                                                fontWeight: '500',
                                                marginBottom: '10px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Enter Your New Password
                                        </h2>

                                        <div style={{ marginBottom: '10px' }}>
                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="password"
                                                value={password}
                                                name="password"
                                                type="password"
                                                style={{
                                                    width: '100%',
                                                    padding: '8px',
                                                    border: '2px solid #34D399',
                                                    borderRadius: '5px',
                                                    outline: 'none',
                                                }}
                                            />
                                        </div>

                                        <div style={{ textAlign: 'center' }}>
                                            <button
                                                disabled={loading}
                                                style={{
                                                    backgroundColor: '#4ADE80',
                                                    color: 'white',
                                                    padding: '8px 20px',
                                                    borderRadius: '5px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={UpdatePassword} 
                                            >
                                                {loading ? 'Updating...' : 'Update Password'}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ForgotPassword;