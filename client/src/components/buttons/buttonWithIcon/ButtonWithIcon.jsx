import React from 'react'
import { Link } from 'react-router-dom'

const ButtonWithIcon = ({text,location,color,icon}) => {
  return (
    <Link to={location} className={`duration-200 flex gap-1 justify-center items-center group ${color}`}>
        {text}
        <div className='h-5 w-5 md:h-6 md:w-6 overflow-hidden'>
            <div className='group-hover:animate-drift flex duration-200'>
                <img className='h-5 w-5 md:h-6 md:w-6' src={icon}></img>
                <img className='h-5 w-5 md:h-6 md:w-6' src={icon}></img>
            </div>
        </div>
    </Link>
  )
}

export default ButtonWithIcon