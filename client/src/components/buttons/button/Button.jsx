import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({text,location,bgcolor,textcolor,font,type}) => {
  return (
    <Link to={location} className={`text-xs md:text-base flex w-fit relative group rounded-lg ${font}`}>
        <button type={type} className={`h-full rounded-lg py-2 px-4 ${bgcolor} ${textcolor} duration-200`}>{text}</button>
        <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200'>{text}</div>
    </Link>
  )
}

export default Button