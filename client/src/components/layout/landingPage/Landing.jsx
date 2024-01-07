import React, { useEffect } from 'react';
import videoBg from '../../../assets/vid2.mp4';
import Button from '../../buttons/button/Button';
import {connect} from 'react-redux'
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'


const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Navigate to='/dashboard' />
  }

  useEffect(() => {
    document.querySelector('video').playbackRate = 2;
  }, []);

  return (
    <section className='h-[calc(100vh-85px)] md:h-[calc(100vh-125px)] w-full'>
      <div className='text-center absolute left-0 bottom-0 top-0 right-0'>
        {/* <div className='absolute w-full h-full bg-black bg-opacity-50'></div> */}
        <video
          src={videoBg}
          autoPlay
          muted
          loop
          className='object-cover h-screen w-screen brightness-50'
        />
        <div className='absolute w-full h-40 top-0 bg-gradient-to-b from-black to-transparent'></div>
        <div className='absolute w-full h-40 bottom-0 bg-gradient-to-t from-black to-transparent'></div>
        <div className='text-white space-y-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2 sm:px-4'>
          <h1 className='text-4xl md:text-6xl  tracking-normal sm:tracking-widest font-syncopate font-bold bg-gradient-to-r from-light to-dark text-transparent bg-clip-text'>
            Developer Universe
          </h1>
          <p className='text-xs md:text-base font-michroma opacity-80'>
            Unleash your creativity, forge connections, and craft your unique
            story in the programming community!
          </p>
          <div className='flex items-center justify-center gap-4 md:gap-8'>
            <Button
              text='Login'
              location='/login'
              bgcolor='bg-light'
              textcolor='text-black'
              font='font-michroma'
              type='button'
            />
            <Button
              text='Register'
              location='/register'
              bgcolor='bg-dark'
              textcolor='text-black'
              font='font-michroma'
              type='button'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing);
