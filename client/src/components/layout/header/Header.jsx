import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import login from '../../../assets/login.svg';
import register from '../../../assets/register.svg';
import user from '../../../assets/user.svg';
import posts from '../../../assets/posts.svg';
import dashboard from '../../../assets/dashboard.svg';
import logoutImg from '../../../assets/logout.svg';
import ham from '../../../assets/hamburger.svg';
import cross from '../../../assets/cross.svg';
import ButtonWithIcon from '../../buttons/buttonWithIcon/ButtonWithIcon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

const Header = ({
  auth: { isAuthenticated, loading },
  logout,
}) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [hamMenu, setHamMenu] = useState(false);

  const hamClick = () => {
    setHamMenu(!hamMenu);
    document.querySelector('#icons').classList.toggle('-translate-y-8');
  };

  const outsideClick = () => {
    setHamMenu(false);
    document.querySelector('#icons').classList.toggle('-translate-y-8');
  };

  const clickHandler = () => {
    setTimeout(() => {
      setHamMenu(false);
      document.querySelector('#icons').classList.toggle('-translate-y-8');
    }, 500);
  };

  const authLinks = (
    <ul className='hidden md:flex justify-between font-medium gap-4 md:gap-7 items-center font-montserrat text-sm md:text-base'>
      <li>
        <ButtonWithIcon
          text='Users'
          location='/users'
          color='text-white'
          icon={user}
        />
      </li>
      <li>
        <ButtonWithIcon
          text='Posts'
          location='/posts'
          color='text-white'
          icon={posts}
        />
      </li>
      <li>
        <ButtonWithIcon
          text='Dashboard'
          location='/dashboard'
          color='text-white'
          icon={dashboard}
        />
      </li>
      <li>
        <div className='w-[1px] h-8 opacity-30 border border-white'></div>
      </li>
      <li onClick={logout}>
        <ButtonWithIcon
          text='Logout'
          location='/login'
          color='text-white'
          icon={logoutImg}
        />
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='hidden md:flex justify-between font-medium gap-4 md:gap-7 items-center font-montserrat text-sm md:text-base'>
      <li>
        <ButtonWithIcon
          text='Users'
          location='/users'
          color='text-white'
          icon={user}
        />
      </li>
      <li>
        <div className='w-[1px] h-8 opacity-30 border border-white'></div>
      </li>
      <li>
        <ButtonWithIcon
          text='Register'
          location='/register'
          color='text-white'
          icon={register}
        />
      </li>
      <li>
        <ButtonWithIcon
          text='Login'
          location='/login'
          color='text-white'
          icon={login}
        />
      </li>
    </ul>
  );

  const authLinksForResp = (
    <ul
      className={`${
        hamMenu ? 'flex' : 'hidden'
      } absolute top-[100%] left-0 right-0 m-2 rounded-lg bg-black text-white flex-col justify-between py-6 gap-6 items-center font-medium font-montserrat animate-comeDown`}
    >
      <li onClick={clickHandler}>
        <ButtonWithIcon
          text='Users'
          location='/users'
          color='text-white'
          icon={user}
        />
      </li>
      <li onClick={clickHandler}>
        <ButtonWithIcon
          text='Posts'
          location='/posts'
          color='text-white'
          icon={posts}
        />
      </li>
      <li onClick={clickHandler}>
        <ButtonWithIcon
          text='Dashboard'
          location='/dashboard'
          color='text-white'
          icon={dashboard}
        />
      </li>
      <li onClick={logout}>
        <div onClick={clickHandler}>
          <ButtonWithIcon
            text='Logout'
            location='/login'
            color='text-white'
            icon={logoutImg}
          />
        </div>
      </li>
    </ul>
  );

  const guestLinksForResp = (
    <ul
      className={`${
        hamMenu ? 'flex' : 'hidden'
      } absolute top-[100%] left-0 right-0 m-2 rounded-lg bg-black text-white flex-col justify-between py-6 gap-6 items-center font-medium font-montserrat animate-comeDown`}
    >
      <li onClick={clickHandler}>
        <ButtonWithIcon
          text='Users'
          location='/users'
          color='text-white'
          icon={user}
        />
      </li>
      <li onClick={clickHandler}>
        <ButtonWithIcon
          text='Register'
          location='/register'
          color='text-white'
          icon={register}
        />
      </li>
      <li onClick={clickHandler}>
        <ButtonWithIcon
          text='Login'
          location='/login'
          color='text-white'
          icon={login}
        />
      </li>
    </ul>
  );

  return (
    <header className='fixed w-full top-0 z-10 bg-black'>
      <div className='max-w-7xl mx-auto px-2 sm:px-5 md:px-10 flex justify-between gap-4 items-center text-white py-4 md:py-6'>
        {hamMenu && (
          <div
            onClick={outsideClick}
            className='absolute bg-black opacity-50  h-screen w-screen translate-y-[100%] bottom-0 left-0 right-0'
          ></div>
        )}

        <h1 className='font-bold text-2xl tracking-wider font-gruppo uppercase'>
          <Link to='/'>
            De<img className='h-7 inline' src={logo}></img>erse
          </Link>
        </h1>

        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}

        <div
          className='h-8 w-8 group duration-200 overflow-hidden cursor-pointer md:hidden'
          onClick={hamClick}
        >
          <div id='icons' className='duration-200'>
            <div className='flex group-hover:animate-drift'>
              <img className='h-8 w-8' src={ham} />
              <img className='h-8 w-8' src={ham} />
            </div>
            <div className='flex group-hover:animate-drift'>
              <img className='h-8 w-8' src={cross} />
              <img className='h-8 w-8' src={cross} />
            </div>
          </div>
        </div>

        {!loading && (
          <Fragment>
            {isAuthenticated ? authLinksForResp : guestLinksForResp}
          </Fragment>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
