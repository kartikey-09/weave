import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import './manageAdmin.css'
import { Admins } from '@/services/apis';
import { apiConnector } from '@/services/apiconnector';

const UpdatePassword = ({ email }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const admin = useSelector((state) => state.admin);
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const btnRef = React.useRef(null);

    const updatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiConnector({ method: "PUT", url: Admins.UpdatePassword_API + `/${email}`, bodyData: { password }, headers: { token: admin.token } })
            if (res.data.success) {
                toast.success(res.data.message);
                setPassword('');
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false);
    }

    return (
        <>
            <button onClick={onOpen} ref={btnRef}>
                <p className='label p-2'>Update Password</p>
            </button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-overlay" onClick={onClose}></div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className='header-label'>Update Password</p>
                    
                        </div>
                        <div className="modal-body">
                            <form onSubmit={updatePassword}>
                                <input type="text" value={password} required={true}
                                    className='input'
                                    onChange={e => setPassword(e.target.value)} placeholder='Enter new password' />
                                <button className="update-button" type='submit' disabled={loading}>
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="close-button" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdatePassword
