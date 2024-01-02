import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import Img from '../../layout/lazyLoad/Img';
import likeImg from '../../../assets/like.svg';
import likedImg from '../../../assets/liked.svg';
import dislikeImg from '../../../assets/dislike.svg';
import dislikedImg from '../../../assets/disliked.svg';
import commentImg from '../../../assets/comments.svg';
import deleteImg from '../../../assets/delete.svg';
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost
} from '../../../actions/post';

const PostItem = ({
  auth,
  post: {
    _id,
    user,
    title,
    text,
    name,
    avatar,
    likes,
    dislikes,
    comments,
    date,
  },
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost
}) => {
  const [likeState,setLikeState] = useState(false);
  const [dislikeState,setDislikeState] = useState(false);

  const likeHandler = () => {
    addLike(_id);
    setLikeState(true);
    setDislikeState(false);
  }
  const removeLikeHandler = () => {
    removeLike(_id);
    setLikeState(false);
  }
  const dislikeHandler = () => {
    addDislike(_id);
    setLikeState(false);
    setDislikeState(true);
  }
  const removeDislikeHandler = () => {
    removeDislike(_id);
    setDislikeState(false);
  }

  const setter = () => {
    if(likes.find(like => like.user===auth.user._id)){
      setLikeState(true);
      setDislikeState(false);
    }
    if(dislikes.find(dislike => dislike.user===auth.user._id)){
      setLikeState(false);
      setDislikeState(true);
    }
  }

  useEffect(() => {
    setter();
  },[])

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' years ago';
    }
    if (interval === 1) {
      return interval + ' year ago';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
    if (interval === 1) {
      return interval + ' month ago';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }
    if (interval === 1) {
      return interval + ' day ago';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }
    if (interval === 1) {
      return interval + ' hour ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }
    if (interval === 1) {
        return interval + ' minute ago';
      }

    if (seconds < 10){
        return 'just now';
    }

    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className='flex flex-col md:flex-row justify-center w-full rounded-lg p-4 border border-black border-opacity-30 shadow-lg md:shadow-xl gap-5 md:gap-8 font-montserrat'>
      <Link
        to={`/users/${user}`}
        className='flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 group'
      >
        <div className='rounded-full aspect-square h-[40px] md:h-[150px] w-[40px] md:w-[150px]'>
          <Img
            src={avatar}
            className='rounded-full h-[40px] md:h-[150px] w-[40px] md:w-[150px]'
          />
        </div>
        <h1 className='text-base sm:text-lg font-semibold text-center group-hover:underline'>
          {name}
        </h1>
      </Link>
      <div className='flex flex-col gap-8 sm:gap-12 justify-between w-full'>
        <Link to={`/posts/${_id}`} className='hover:underline cursor-pointer'>
          {title && (
            <h1 className='text-base sm:text-lg md:text-2xl font-bold mb-1 md:mb-2'>
              {title}
            </h1>
          )}
          <p className='text-xs sm:text-sm md:text-base whitespace-pre-line'>
            {text.length > 200 ? text.substring(0, 200) + '...' : text}
          </p>
        </Link>
        <div className='flex flex-col gap-2'>
          <p className='text-xs md:text-base italic text-gray-500'>
            {/* Posted on: {dayjs(date).format('DD MMM, YYYY')} */}
            Posted: {timeAgo(date)}
          </p>
          <div className='text-xs sm:text-sm md:text-base font-medium flex flex-col sm:flex-row gap-1.5 sm:gap-3 items-start sm:items-center'>
            <div className='flex items-center gap-1'>
              <div
                onClick={likeState ? ()=>removeLikeHandler() : ()=>likeHandler()}
                className={`${likeState && 'bg-gradient-to-r from-dark to-light'} flex gap-1.5 items-center py-1.5 md:py-2 px-3 group cursor-pointer rounded-lg border border-black border-opacity-30`}
              >
                <div className='h-5 w-5 md:h-6 md:w-6 overflow-hidden group'>
                  <button
                    type='button'
                    className='group-hover:animate-drift flex duration-200'
                  >
                    <img
                      className='h-5 w-5 md:h-6 md:w-6'
                      src={likeImg}
                    ></img>
                    <img
                      className='h-5 w-5 md:h-6 md:w-6'
                      src={likeImg}
                    ></img>
                  </button>
                </div>
                {likes.length > 0 && <span>{likes.length}</span>}
              </div>
              <div
                onClick={dislikeState ? ()=>removeDislikeHandler() : ()=>dislikeHandler()}
                className={`${dislikeState && 'bg-gradient-to-r from-dark to-light'} flex gap-1.5 items-center py-1.5 md:py-2 px-3 group cursor-pointer rounded-lg border border-black border-opacity-30`}
              >
                <div className='h-5 w-5 md:h-6 md:w-6 overflow-hidden group'>
                  <button
                    type='button'
                    className='group-hover:animate-drift flex duration-200'
                  >
                    <img
                      className='h-5 w-5 md:h-6 md:w-6'
                      src={dislikeImg}
                    ></img>
                    <img
                      className='h-5 w-5 md:h-6 md:w-6'
                      src={dislikeImg}
                    ></img>
                  </button>
                </div>
                {dislikes.length > 0 && <span>{dislikes.length}</span>}
              </div>
            </div>
            <Link
              to={`/posts/${_id}`}
              className='text-xs sm:text-sm md:text-base bg-gradient-to-r from-dark to-light py-1.5 md:py-2 px-3 rounded-lg text-white flex gap-2 items-center font-medium group'
            >
              {comments.length} Comments
              <div className='h-4 w-4 md:h-6 md:w-6 overflow-hidden'>
                <div className='group-hover:animate-drift flex duration-200'>
                  <img className='h-4 w-4 md:h-6 md:w-6' src={commentImg}></img>
                  <img className='h-4 w-4 md:h-6 md:w-6' src={commentImg}></img>
                </div>
              </div>
            </Link>
            {!auth.loading && user === auth.user._id && (
              <div onClick={() => deletePost(_id)} className='text-xs sm:text-sm md:text-base flex justify-center items-center py-1.5 md:py-2 px-3 rounded-lg gap-2 font-medium bg-red-600 bg-opacity-90 group cursor-pointer text-white'>
                <div className='h-4 w-4 md:h-6 md:w-6 overflow-hidden'>
                  <div
                    type='button'
                    className='group-hover:animate-drift flex duration-200'
                  >
                    <img
                      className='h-4 w-4 md:h-6 md:w-6'
                      src={deleteImg}
                    ></img>
                    <img
                      className='h-4 w-4 md:h-6 md:w-6'
                      src={deleteImg}
                    ></img>
                  </div>
                </div>
                Delete
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  removeDislike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost
})(PostItem);
