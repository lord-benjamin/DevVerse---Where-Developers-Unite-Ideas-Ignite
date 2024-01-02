import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../buttons/button/Button';
import followerImg from '../../../assets/follower.svg';
import blackFollowerImg from '../../../assets/blackFollower.svg';
import followingImg from '../../../assets/following.svg';
import blackFollowingImg from '../../../assets/blackFollowing.svg';
import postsImg from '../../../assets/posts.svg';
import blackPostsImg from '../../../assets/blackPosts.svg';
import rightArrow from '../../../assets/rightArrow.svg';
import blackRightArrow from '../../../assets/blackRightArrow.svg';
import PropTypes from 'prop-types';

const DashboardActions = ({ userId, followers, following,totalPosts }) => {
  return (
    <section className='flex flex-col flex-wrap gap-2 md:gap-4'>
      <div className='flex gap-2 md:gap-4 h-full flex-wrap items-center'>
        <Link
          to={`/users/${userId}/follower`}
          className='text-xs md:text-base flex w-fit relative group rounded-lg font-michroma cursor-pointer'
        >
          <button
            type='button'
            className='h-full rounded-lg py-2 px-4 bg-dark text-white duration-200 flex items-center justify-center gap-1 sm:gap-2'
          >
            <img src={followerImg} className='w-4 md:w-5 h-4 md:h-5'></img>
            <span>{followers.length}</span>
            <span>Followers</span>{' '}
            <img src={rightArrow} className='h-3 md:h-4 w-3 md:w-4'></img>
          </button>
          <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white  border border-black text-black flex justify-center items-center duration-200 gap-1 sm:gap-2'>
            <img src={blackFollowerImg} className='w-5 h-5'></img>
            <span>{followers.length}</span>
            <span>Followers</span>{' '}
            <img src={blackRightArrow} className='h-3 md:h-4 w-3 md:w-4'></img>
          </div>
        </Link>
        <Link
          to={`/users/${userId}/following`}
          className='text-xs md:text-base flex w-fit relative group rounded-lg font-michroma cursor-pointer'
        >
          <button
            type='button'
            className='h-full rounded-lg py-2 px-4 bg-light text-white duration-200 flex items-center justify-center gap-1 sm:gap-2'
          >
            <img src={followingImg} className='w-4 md:w-5 h-4 md:h-5'></img>
            <span>{following.length}</span>
            <span>Followings</span>{' '}
            <img src={rightArrow} className='h-3 md:h-4 w-3 md:w-4'></img>
          </button>
          <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white border border-black text-black flex justify-center items-center duration-200 gap-1 sm:gap-2'>
            <img src={blackFollowingImg} className='w-5 h-5'></img>
            <span>{following.length}</span>
            <span>Followings</span>{' '}
            <img src={blackRightArrow} className='h-3 md:h-4 w-3 md:w-4'></img>
          </div>
        </Link>
        <Link
              to={`/users/${userId}/posts`}
              className='text-xs md:text-base flex w-fit relative group rounded-lg font-michroma cursor-pointer'
            >
              <button
                type='button'
                className='h-full rounded-lg py-2 px-4 bg-light text-white duration-200 flex items-center justify-center gap-1 sm:gap-2'
              >
                <img src={postsImg} className='w-4 md:w-5 h-4 md:h-5'></img>
                <span>{totalPosts}</span>
                <span>Posts</span>{' '}
                <img src={rightArrow} className='h-3 md:h-4 w-3 md:w-4'></img>
              </button>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white border border-black text-black flex justify-center items-center duration-200 gap-1 sm:gap-2'>
                <img src={blackPostsImg} className='w-5 h-5'></img>
                <span>{totalPosts}</span>
                <span>Posts</span>{' '}
                <img
                  src={blackRightArrow}
                  className='h-3 md:h-4 w-3 md:w-4'
                ></img>
              </div>
            </Link>
      </div>
      <hr className='my-1' />
      <div className='flex flex-wrap gap-2 md:gap-4'>
        <Button
          text='Edit Profile'
          location='/edit-profile'
          bgcolor='bg-gradient-to-r from-dark to-light'
          textcolor='text-white'
          font='font-michroma'
          type='button'
        />
        <Button
          text='Add Experience'
          location='/add-experience'
          bgcolor='bg-dark'
          textcolor='text-white'
          font='font-michroma'
          type='button'
        />
        <Button
          text='Add Education'
          location='/add-education'
          bgcolor='bg-light'
          textcolor='text-white'
          font='font-michroma'
          type='button'
        />
      </div>
    </section>
  );
};

DashboardActions.propTypes = {
  userId: PropTypes.string.isRequired,
  followers: PropTypes.array.isRequired,
  following: PropTypes.array.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

export default DashboardActions;
