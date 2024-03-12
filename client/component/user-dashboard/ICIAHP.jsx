"use client"
import React, { useEffect, useState ,useContext} from 'react'
import { apiConnector } from '@/services/apiconnector';
import { UserAuthAPI } from '@/services/apis';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ICIAHP = () => {
  const user = useSelector((state) => state.user);
  // const { user } = useContext(SessionContext);
  const [data, setData] = useState({});


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await apiConnector({
          method: 'GET',
          url: UserAuthAPI.userGetMyProfile_API,
          headers: {
            token: user.token
          }
        })
        if (res?.data?.success) {
          setData((prev) => {
            return {
              ...prev,
              userData: res?.data?.data
            }
          });
        console.log(res.data);
        }
      }
      catch (err) {
        toast.error(err?.response?.data?.message);
      }
    };
    getData();
  },[user]);

  return (
    <div className='ml-4'>ICIAHP</div>
  )
}


export default ICIAHP;