import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../../../layout/lazyLoad/Img';
import bg from '../../../../assets/bg.png';
import logo from '../../../../assets/logo.svg';
import locationImg from '../../../../assets/location.svg';
import followerImg from '../../../../assets/follower.svg';
import blackFollowerImg from '../../../../assets/blackFollower.svg';
import followingImg from '../../../../assets/following.svg';
import blackFollowingImg from '../../../../assets/blackFollowing.svg';
import postsImg from '../../../../assets/posts.svg';
import blackPostsImg from '../../../../assets/blackPosts.svg';
import rightArrow from '../../../../assets/rightArrow.svg';
import blackRightArrow from '../../../../assets/blackRightArrow.svg';
import youtubeImg from '../../../../assets/youtube.svg';
import linkedinImg from '../../../../assets/linkedin.svg';
import linktreeImg from '../../../../assets/linktree.svg';
import twitterImg from '../../../../assets/twitter.svg';
import facebookImg from '../../../../assets/facebook.svg';
import instagramImg from '../../../../assets/instagram.svg';
import websiteImg from '../../../../assets/website.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followUser, unfollowUser } from '../../../../actions/profile';

const ProfileTop = ({
  isAuthenticated,
  profile: { profile, loading },
  otherProfile: {
    status,
    company,
    location,
    website,
    social,
    followers,
    following,
    totalPosts,
    user: { _id, name, avatar },
  },
  followUser,
  unfollowUser,
}) => {
  const [btn, setBtn] = useState();

  const setter = () => {
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
  }, [profile]);

  return (
    <section>
      <div className='h-[100px] sm:h-[200px] w-full rounded-lg relative mt-2'>
        <div className='rounded-lg h-full w-full'>
          <Img
            src={bg}
            className='object-cover h-[100px] sm:h-[200px] w-screen rounded-lg'
          />
        </div>
        <div className='h-[100px] sm:h-[200px] w-[100px] sm:w-[200px] absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2'>
          <Img
            src={avatar}
            className='h-full w-full rounded-full border-4 md:border-8 border-white'
          />
        </div>
        <div className='text-xs sm:text-2xl tracking-wider font-gruppo text-white uppercase font-bold absolute bottom-2 sm:bottom-5 right-2 sm:right-5 opacity-30 select-none'>
          De<img className='h-3 sm:h-7 inline' src={logo}></img>erse
        </div>
      </div>
      <div className='w-full text-center pt-[56px] sm:pt-28 font-montserrat'>
        <h1 className='font-bold text-2xl sm:text-4xl'>
          {name} <span></span>
        </h1>
        <p className='font-medium mt-1 sm:mt-2 text-xs sm:text-base'>
          {status} {company && <span>{`at ${company}`}</span>}
        </p>
        {location && (
          <p className='text-sm sm:text-base mt-3 sm:mt-5 flex items-center justify-center'>
            <img
              src={locationImg}
              className='h-4 sm:h-5 w-4 sm:w-5 inline mr-1'
            ></img>
            {location}
          </p>
        )}
        <div className='flex flex-col lg:flex-row justify-center mt-3 sm:mt-5 gap-2 md:gap-4 items-center'>
          {isAuthenticated && !loading && profile && profile?.user._id !== _id && (
            <div className='h-full'>{btn}</div>
          )}
          <div className='flex gap-2 h-full flex-wrap items-center justify-center'>
            <Link
              to={`/users/${_id}/follower`}
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
                <img
                  src={blackRightArrow}
                  className='h-3 md:h-4 w-3 md:w-4'
                ></img>
              </div>
            </Link>
            <Link
              to={`/users/${_id}/following`}
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
                <img
                  src={blackRightArrow}
                  className='h-3 md:h-4 w-3 md:w-4'
                ></img>
              </div>
            </Link>
            <Link
              to={`/users/${_id}/posts`}
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
        </div>
        {(website ||
          social.youtube ||
          social.linkedin ||
          social.linktree ||
          social.twitter ||
          social.facebook ||
          social.instagram) && (
          <hr className='my-5 sm:my-6 bg-gray-500 text-gray-500 w-full sm:w-3/4 mx-auto' />
        )}
        {(website ||
          social.youtube ||
          social.linkedin ||
          social.linktree ||
          social.twitter ||
          social.facebook ||
          social.instagram) && (
          <div>
            <h2 className='font-kalnia font-bold text-sm sm:text-xl mb-3'>
              Socials
            </h2>
            <div className='flex flex-wrap gap-3 md:gap-4 justify-center items-center'>
              {website && (
                <div className='h-7 w-7 md:h-10 md:w-10 overflow-hidden group'>
                  <a
                    href={website}
                    target='_blank'
                    className='group-hover:animate-drift flex duration-200'
                    rel='noreferrer'
                  >
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={websiteImg}
                    ></img>
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={websiteImg}
                    ></img>
                  </a>
                </div>
              )}
              {social.youtube && (
                <div className='h-7 w-7 md:h-10 md:w-10 overflow-hidden group'>
                  <a
                    href={social.youtube}
                    target='_black'
                    className='group-hover:animate-drift flex duration-200'
                    rel='noreferrer'
                  >
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={youtubeImg}
                    ></img>
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={youtubeImg}
                    ></img>
                  </a>
                </div>
              )}
              {social.linkedin && (
                <div className='h-7 w-7 md:h-10 md:w-10 overflow-hidden group'>
                  <a
                    href={social.linkedin}
                    target='_black'
                    className='group-hover:animate-drift flex duration-200'
                    rel='noreferrer'
                  >
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={linkedinImg}
                    ></img>
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={linkedinImg}
                    ></img>
                  </a>
                </div>
              )}
              {social.linktree && (
                <div className='h-7 w-7 md:h-10 md:w-10 overflow-hidden group'>
                  <a
                    href={social.linktree}
                    target='_black'
                    className='group-hover:animate-drift flex duration-200'
                    rel='noreferrer'
                  >
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={linktreeImg}
                    ></img>
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={linktreeImg}
                    ></img>
                  </a>
                </div>
              )}
              {social.twitter && (
                <div className='h-7 w-7 md:h-10 md:w-10 overflow-hidden group'>
                  <a
                    href={social.twitter}
                    target='_black'
                    className='group-hover:animate-drift flex duration-200'
                    rel='noreferrer'
                  >
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={twitterImg}
                    ></img>
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={twitterImg}
                    ></img>
                  </a>
                </div>
              )}
              {social.facebook && (
                <div className='h-7 w-7 md:h-10 md:w-10 overflow-hidden group'>
                  <a
                    href={social.facebook}
                    target='_black'
                    className='group-hover:animate-drift flex duration-200'
                    rel='noreferrer'
                  >
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={facebookImg}
                    ></img>
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={facebookImg}
                    ></img>
                  </a>
                </div>
              )}
              {social.instagram && (
                <div className='h-7 w-7 md:h-10 md:w-10 overflow-hidden group'>
                  <a
                    href={social.instagram}
                    target='_black'
                    className='group-hover:animate-drift flex duration-200'
                    rel='noreferrer'
                  >
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={instagramImg}
                    ></img>
                    <img
                      className='h-7 w-7 md:h-10 md:w-10'
                      src={instagramImg}
                    ></img>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

ProfileTop.propTypes = {
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.object.isRequired,
  otherProfile: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
})(ProfileTop);
