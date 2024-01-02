import React, { useState } from 'react';
import user from '../../../assets/blackUser.svg';
import show from '../../../assets/show.svg';
import hide from '../../../assets/hide.svg';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const showHideClickPass = () => {
    document
      .querySelector('#passIcons')
      .classList.toggle('-translate-y-[42px]');
    const type =
      document.querySelector('#pass').getAttribute('type') === 'password'
        ? 'text'
        : 'password';
    document.querySelector('#pass').setAttribute('type', type);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold text-light'>
          Sign In
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={user}></img>Enter Into
          Your Account
        </h2>
      </div>
      <form
        className='w-full font-montserrat text-[14px] md:text-base'
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          placeholder='Email'
          className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full mb-8'
          autoComplete='off'
        />
        <div className='space-y-1 md:space-y-2 w-full relative mb-8'>
          <input
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            id='pass'
            type='password'
            placeholder='Password'
            className='h-[42px] border border-black outline-none py-2 pl-4 pr-[42px] rounded-lg w-full'
            autoComplete='off'
          />
          <div
            className='bg-white border-y border-r border-y-black border-r-black h-[42px] w-[42px] absolute bottom-0 right-0 rounded-r-lg group duration-200 overflow-hidden cursor-pointer'
            onClick={showHideClickPass}
          >
            <div id='passIcons' className='duration-200'>
              <div className='flex group-hover:animate-drift'>
                <img className='h-[42px] w-[42px]' src={show} />
                <img className='h-[42px] w-[42px]' src={show} />
              </div>
              <div className='flex group-hover:animate-drift'>
                <img className='h-[42px] w-[42px]' src={hide} />
                <img className='h-[42px] w-[42px]' src={hide} />
              </div>
            </div>
          </div>
        </div>
        <div className='text-xs md:text-base w-max mb-4 md:mb-5'>
          <button
            type='submit'
            className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
          >
            <div className='h-full rounded-lg py-2 px-4 bg-light text-white font-bold duration-200'>
              Login
            </div>
            <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
              Login
            </div>
          </button>
        </div>
        <p className='text-sm md:text-base'>
          Don&apos;t have an account?{' '}
          <Link
            className='font-medium hover:underline text-light'
            to='/register'
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
