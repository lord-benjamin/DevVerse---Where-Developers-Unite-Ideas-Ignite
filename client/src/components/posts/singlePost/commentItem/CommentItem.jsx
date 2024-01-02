import React, { useState, useEffect } from 'react';
import Img from '../../../layout/lazyLoad/Img';
import likeImg from '../../../../assets/like.svg';
import dislikeImg from '../../../../assets/dislike.svg';
import deleteImg from '../../../../assets/delete.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addCommentLike,
  removeCommentLike,
  addCommentDislike,
  removeCommentDislike,
  deleteComment,
} from '../../../../actions/post';

const CommentItem = ({
  comment: { _id, text, name, avatar, user, likes, dislikes, date },
  postId,
  auth,
  addCommentLike,
  removeCommentLike,
  addCommentDislike,
  removeCommentDislike,
  deleteComment,
}) => {
  const [likeState, setLikeState] = useState(false);
  const [dislikeState, setDislikeState] = useState(false);

  const likeHandler = (e) => {
    e.preventDefault();
    addCommentLike(postId, _id);
    setLikeState(true);
    setDislikeState(false);
  };
  const removeLikeHandler = (e) => {
    e.preventDefault();
    removeCommentLike(postId, _id);
    setLikeState(false);
  };
  const dislikeHandler = (e) => {
    e.preventDefault();
    addCommentDislike(postId, _id);
    setLikeState(false);
    setDislikeState(true);
  };
  const removeDislikeHandler = (e) => {
    e.preventDefault();
    removeCommentDislike(postId, _id);
    setDislikeState(false);
  };

  const setter = () => {
    if (likes?.find((like) => like.user === auth.user._id)) {
      setLikeState(true);
      setDislikeState(false);
    }
    if (dislikes?.find((dislike) => dislike.user === auth.user._id)) {
      setLikeState(false);
      setDislikeState(true);
    }
  };

  useEffect(() => {
    setter();
  }, []);

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

    if (seconds < 10) {
      return 'just now';
    }

    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className='flex w-full gap-3 md:gap-5'>
      <Link
        to={`/users/${user}`}
        className='rounded-full aspect-square h-[35px] md:h-[50px] w-[35px] md:w-[50px]'
      >
        <Img
          src={avatar}
          className='rounded-full h-[35px] md:h-[50px] w-[35px] md:w-[50px]'
        />
      </Link>
      <div className='w-full border-b'>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2 md:gap-4 items-baseline'>
            <Link
              to={`/users/${user}`}
              className='text-sm md:text-lg font-medium hover:underline'
            >
              {name}
            </Link>
            <p className='text-xs md:text-base italic text-gray-500'>
              {timeAgo(date)}
            </p>
          </div>
          <p className='text-xs md:text-base whitespace-pre-line'>{text}</p>
        </div>
        <div className='font-montserrat font-medium my-4 flex justify-between items-center w-full'>
          <div className='flex items-center gap-1 text-xs md:text-base'>
            <div
              onClick={
                likeState ? (e) => removeLikeHandler(e) : (e) => likeHandler(e)
              }
              className={`${
                likeState && 'bg-gradient-to-r from-dark to-light'
              } flex gap-1.5 items-center py-1.5 md:py-2 px-3 group cursor-pointer rounded-lg border border-black border-opacity-30`}
            >
              <div className='h-5 w-5 md:h-6 md:w-6 overflow-hidden group'>
                <button
                  type='button'
                  className='group-hover:animate-drift flex duration-200'
                >
                  <img className='h-5 w-5 md:h-6 md:w-6' src={likeImg}></img>
                  <img className='h-5 w-5 md:h-6 md:w-6' src={likeImg}></img>
                </button>
              </div>
              {likes?.length > 0 && <span>{likes?.length}</span>}
            </div>
            <div
              onClick={
                dislikeState
                  ? (e) => removeDislikeHandler(e)
                  : (e) => dislikeHandler(e)
              }
              className={`${
                dislikeState && 'bg-gradient-to-r from-dark to-light'
              } flex gap-1.5 items-center py-1.5 md:py-2 px-3 group cursor-pointer rounded-lg border border-black border-opacity-30`}
            >
              <div className='h-5 w-5 md:h-6 md:w-6 overflow-hidden group'>
                <button
                  type='button'
                  className='group-hover:animate-drift flex duration-200'
                >
                  <img className='h-5 w-5 md:h-6 md:w-6' src={dislikeImg}></img>
                  <img className='h-5 w-5 md:h-6 md:w-6' src={dislikeImg}></img>
                </button>
              </div>
              {dislikes?.length > 0 && <span>{dislikes?.length}</span>}
            </div>
          </div>
          {user === auth.user._id && (
            <div
              onClick={() => deleteComment(postId, _id)}
              className='text-xs sm:text-sm md:text-base flex justify-center items-center py-1.5 md:py-2 px-3 rounded-lg gap-2 font-medium bg-red-600 bg-opacity-90 group cursor-pointer text-white'
            >
              <div className='h-4 w-4 md:h-6 md:w-6 overflow-hidden'>
                <div
                  type='button'
                  className='group-hover:animate-drift flex duration-200'
                >
                  <img className='h-4 w-4 md:h-6 md:w-6' src={deleteImg}></img>
                  <img className='h-4 w-4 md:h-6 md:w-6' src={deleteImg}></img>
                </div>
              </div>
              Delete
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  addCommentLike: PropTypes.func.isRequired,
  removeCommentLike: PropTypes.func.isRequired,
  addCommentDislike: PropTypes.func.isRequired,
  removeCommentDislike: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(null, {
  addCommentLike,
  removeCommentLike,
  addCommentDislike,
  removeCommentDislike,
  deleteComment,
})(CommentItem);
