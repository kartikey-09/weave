"use client"
import React from 'react'

const DisplayTextLinkInput = ({ textLink, onChange, onDelete, totalLength }) => {

    const handleChange = (field, value) => {
        onChange({ ...textLink, [field]: value });
    };
    console.log("total length", totalLength)
    return (
        <div>
            <div className='mb-4 flex flex-col'>
                <label htmlFor="displayText" className='text-sm font-[Poppins] font-[500]'>Display Text Center</label>
                <input onChange={(e) => handleChange('displayText', e.target.value)} required={true} autoComplete="displayText" value={textLink.displayText} name="displayText" type="text" className='text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
            </div>

            <div className='mb-4 flex flex-col'>
                <label htmlFor="link" className='text-sm font-[Poppins] font-[500]'>Link Center</label>
                <input onChange={(e) => handleChange('link', e.target.value)} required={true} autoComplete="link" value={textLink.link} name="link" type="text" className='text-sm border-2 border-[#5fa5f9] outline-none focus:outline-none rounded-md py-2 px-3 font-[Roboto] tracking-wide mt-1' />
            </div>
            {
                totalLength > 1 ? (<p onClick={onDelete} className="px-4 py-2 bg-red-700 text-white rounded-lg text-xs w-fit mb-4">Delete</p>) : (<></>)
            }
        </div>
    )
}

export default DisplayTextLinkInput
