import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../buttons/button/Button';
import bullet from '../../../assets/bulletPoints.svg';
import Img from '../../layout/lazyLoad/Img';
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/profile';

const ProfileItem = ({
  otherProfile: {
    user: { name, avatar, _id },
    status,
    company,
    location,
    skills,
    totalPosts,
    followers,
    following,
  },
  profile,
  auth: {isAuthenticated,loading},
  followUser,
  unfollowUser,
}) => {
  const [btn, setBtn] = useState();

  const setter = () => {
    //   console.log(followers.indexOf((item) => item.user === profile?.user._id));
    if (followers.find((item) => item.user === profile?.user._id)) {
        setBtn(
        <div
          onClick={() => unfollowHandler()}
          className='text-xs md:text-base flex w-fit relative group rounded-lg font-michroma cursor-pointer'
        >
          <button
            type='button'
            className='h-full rounded-lg py-2 px-4 bg-gradient-to-r from-dark to-light text-white duration-200'
          >
            Unfollow
          </button>
          <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200'>
            Unfollow
          </div>
        </div>
      );
    } else {
      setBtn(
        <div
          onClick={() => followHandler()}
          className='text-xs md:text-base flex w-fit relative group rounded-lg font-michroma cursor-pointer'
        >
          <button
            type='button'
            className='h-full rounded-lg py-2 px-4 bg-gradient-to-r from-dark to-light text-white duration-200'
          >
            Follow
          </button>
          <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200'>
            Follow
          </div>
        </div>
      );
    }
  };

  const followHandler = () => {
    followUser(_id);
    setter();
  };
  const unfollowHandler = () => {
    unfollowUser(_id);
    setter();
  };

  useEffect(() => {
    if(profile){
      setter()
    }
  },[profile])
  
  return (
    <div className='w-full h-full bg-gradient-to-br md:bg-gradient-to-tl from-black to-dark shadow-2xl rounded-lg text-white flex flex-col md:flex-row justify-between items-center md:items-start lg:items-center px-2 py-4 md:p-4 relative overflow-hidden'>
      <div className='absolute h-[500px] w-[500px] bg-gradient-to-l from-black to-light rotate-[25deg] -translate-x-1/2 left-1/2 md:left-0 top-0 md:-translate-x-[255px] -translate-y-[250px] md:-translate-y-[200px] rounded-full lg:rounded-none'></div>
      <div className='rounded-full aspect-square h-[150px] md:h-[200px] w-[150px] md:w-[200px] mx-auto z-[1]'>
        <Img src={avatar} className='rounded-full h-full w-full' />
      </div>
      <div className='h-full w-full flex flex-col lg:flex-row justify-between pt-4 pb-2 px-0 md:py-4 md:pl-8 lg:pr-6 gap-6 z-[1]'>
        <div className='h-full space-y-3'>
          <div className='flex flex-col md:flex-row lg:flex-col items-center lg:items-start gap-1 md:gap-3 lg:gap-1'>
            <h1 className='text-2xl font-montserrat font-bold text-center'>{name}</h1>
            <span className='hidden md:block lg:hidden w-[1px] h-[25px] border border-white rounded-full opacity-70'></span>
            <h3 className='font-montserrat font-medium text-sm md:text-base text-center'>
              {status} {company && <span>{`at ${company}`}</span>}
            </h3>
          </div>
          {location && (
            <h3 className='font-kalnia font-bold text-sm md:text-lg text-center md:text-left'>
              Location:{' '}
              <span className='font-montserrat font-normal text-sm md:text-base'>
                {location}
              </span>
            </h3>
          )}
          <div className='flex flex-row justify-center md:justify-start lg:flex-col gap-2'>
            <Button
              text='View Profile'
              location={`/users/${_id}`}
              bgcolor='bg-gradient-to-r from-dark to-light'
              textcolor='text-white'
              font='font-michroma'
              type='button'
            />
            {isAuthenticated && !loading && !profile && profile?.user._id !== _id && ( btn )}
          </div>
        </div>
        <div className='flex flex-row lg:flex-col gap-10 md:gap-16 lg:gap-4 justify-center md:justify-start'>
          <h2 className='font-kalnia font-bold text-xs md:text-lg flex flex-col lg:flex-row items-center lg:items-baseline gap-2'>
            <span className='text-center'>
              Followers<span className='hidden lg:inline'>:</span>
            </span>
            <span className='font-montserrat font-normal'>
              {followers.length}
            </span>
          </h2>
          <h2 className='font-kalnia font-bold text-xs md:text-lg flex flex-col lg:flex-row items-center lg:items-baseline gap-2'>
            <span className='text-center'>
              Following<span className='hidden lg:inline'>:</span>
            </span>
            <span className='font-montserrat font-normal'>
              {following.length}
            </span>
          </h2>
          <h2 className='font-kalnia font-bold text-xs md:text-lg flex flex-col lg:flex-row items-center lg:items-baseline gap-2'>
            <span className='text-center'>
              Total Posts<span className='hidden lg:inline'>:</span>
            </span>
            <span className='font-montserrat font-normal'>{totalPosts}</span>
          </h2>
        </div>
        <div className='h-full'>
          <h2 className='font-kalnia font-bold text-sm md:text-lg mb-2 text-center md:text-left'>
            Top Skills:
          </h2>
          <ul className='flex flex-row lg:flex-col flex-wrap gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 lg:gap-0 justify-center md:justify-start'>
            {skills.slice(0, 5).map((skill, idx) => (
              <li
                key={idx}
                className='flex gap-0.5 lg:gap-2 items-center font-montserrat'
              >
                <img src={bullet} className='h-3 md:h-5 w-3 md:w-5'></img>
                <span className='text-xs md:text-base'>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  otherProfile: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { followUser, unfollowUser })(ProfileItem);
