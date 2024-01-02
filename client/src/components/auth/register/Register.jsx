import React, { useState } from 'react';
import user from '../../../assets/blackUser.svg';
import show from '../../../assets/show.svg';
import hide from '../../../assets/hide.svg';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
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

  const showHideClickConfirmPass = () => {
    document
      .querySelector('#confirmPassIcons')
      .classList.toggle('-translate-y-[42px]');
    const type =
      document.querySelector('#confirmPass').getAttribute('type') === 'password'
        ? 'text'
        : 'password';
    document.querySelector('#confirmPass').setAttribute('type', type);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, password, confirmPass } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setAlert(
        "Passwords didn't match, please confirm the password again!",
        'bg-red-600 text-white'
      );
    } else {
      register({ name, email, password });
    }
  };

  //Redirect if registered
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold text-dark'>
          Sign Up
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={user}></img>Create Your
          DevVerse Account
        </h2>
      </div>
      <form
        className='w-full font-montserrat text-[14px] md:text-base'
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
          placeholder='Name'
          className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full mb-8'
          autoComplete='off'
        />
        <div className='space-y-1 md:space-y-2 mb-8'>
          <input
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            placeholder='Email Address'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-justify text-[12px] md:text-sm font-medium text-gray-500'>
            Our site uses Gravatar, so if you want a profile image, either use a
            gravatar email for registering or visit{' '}
            <a
              className='text-dark hover:underline'
              href='https://www.gravatar.com'
              target='_blank'
              rel='noreferrer'
            >
              gravatar.com
            </a>{' '}
            to get a new profile image.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-8 mb-5 sm:mb-8 md:mb-16'>
          <div className='space-y-1 md:space-y-2 w-full sm:w-1/2 relative mb-5'>
            <input
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              id='pass'
              type='password'
              placeholder='Create Password'
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
            <p className='absolute text-[12px] md:text-sm font-medium text-gray-500'>
              Password should contain atleast 6 characters.
            </p>
          </div>
          <div className='space-y-1 md:space-y-2 w-full sm:w-1/2 relative mb-5'>
            <input
              name='confirmPass'
              value={confirmPass}
              onChange={(e) => onChange(e)}
              id='confirmPass'
              type='password'
              placeholder='Confirm Password'
              className='h-[42px] border border-black bg-white outline-none py-2 pl-4 pr-[42px] rounded-lg w-full'
              autoComplete='off'
            />
            <div
              className='bg-white border-y border-r border-y-black border-r-black h-[42px] w-[42px] absolute bottom-0 right-0 rounded-r-lg group duration-200 overflow-hidden cursor-pointer'
              onClick={showHideClickConfirmPass}
            >
              <div id='confirmPassIcons' className='duration-200'>
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
        </div>
        <div className='text-xs md:text-base w-max mb-4 md:mb-5'>
          <button
            type='submit'
            className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
          >
            <div className='h-full rounded-lg py-2 px-4 bg-dark text-white font-bold duration-200'>
              Register
            </div>
            <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
              Register
            </div>
          </button>
        </div>
        <p className='text-sm md:text-base'>
          Already have an account?{' '}
          <Link className='font-medium hover:underline text-dark' to='/login'>
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
