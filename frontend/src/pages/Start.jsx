import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmljJTIwbGlnaHR8ZW58MHx8MHx8fDA=)] h-screen pt-8 w-full flex justify-between flex-col bg-red-200'>
        {/* Corrected Image Path */}
        <img className='w-25 ml-6' src='/vmax.png' alt='VMax Logo' />

        <div className='bg-white px-4 pb-7 py-4 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold'>Get Started with VMax</h2>

            {/* Fixed items-center typo */}
            <Link to='/login' className='flex items-center justify-center w-full rounded-lg mt-5 bg-black text-white py-3'>
              Continue
            </Link>
        </div>
    </div>
  )
}

export default Start
