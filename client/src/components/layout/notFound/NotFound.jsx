import React from 'react'

const NotFound = () => {
  return (
    <div className='min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-195px)] w-full text-black flex flex-col gap-4 md:gap-8 text-center items-center justify-center font-michroma'>
        <h1 className='text-3xl md:text-6xl'>Page Not Found</h1>
        <p className='text-base md:text-xl'>The page you are looking for does not exist!</p>
    </div>
  )
}

export default NotFound