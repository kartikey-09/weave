"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Phonepayment_API } from '@/services/apis';;
import '../../public/css/globals.css'

const Phonepe = () => {
    const [loading2, setLoading2] = useState(false);
    const [name,setName]=useState('')
    const [number,setNumber]=useState('')

    const handlePayment = (e)=>{
        e.preventDefault();
        setLoading2(true);
        const data ={
            name: name,
            amount: 1,
            number: number,
            MUID: "MUID" + Date.now(),
            transactionId: 'T' + Date.now(),
        }
        axios.post(Phonepayment_API.NewPayment_API, {...data}).then(res => {  
        setTimeout(() => {
            setLoading2(false);
        }, 1500);
        })
        .catch(error => {
            setLoading2(false)
            console.error(error);
        });   
    }
  return (
    <>
    <div className='h-screen flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
            {/* <img width={300} src={Img} alt="" /> */}
            <h2 className='fs-4 mt-2'><span className='text-danger fw-bold'>PAY</span> now to book your session</h2>
        </div>
        <div className='card px-5 py-4 mt-5'>
        <form onSubmit={handlePayment} className="mx-auto max-w-md p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-lg font-bold mb-1"></label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-bold mb-1"></label>
        <input
          id="number"
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <p className="text-lg font-bold mb-1">Amount: 1 Rs</p>
      </div>
      {!loading2 ? (
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-[#f87f43f9] hover:bg-[#f87f43e2] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
          >
            Pay Now
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-gray"
            disabled
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Wait...</span>
            </div>
          </button>
        </div>
      )}
    </form>

        </div>
    </div>

    </>
  )
}

export default Phonepe
