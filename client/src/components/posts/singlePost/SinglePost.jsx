import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../../actions/post';
import { useParams } from 'react-router-dom';
import Spinner from '../../layout/spinner/Spinner';
import backImg from '../../../assets/back.svg';
import blackBackImg from '../../../assets/blackBack.svg';
import likeImg from '../../../assets/like.svg';
import dislikeImg from '../../../assets/dislike.svg';
import deleteImg from '../../../assets/delete.svg';
import Img from '../../layout/lazyLoad/Img';
import dayjs from 'dayjs';
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost,
} from '../../../actions/post';
import CommentForm from './commentForm/CommentForm';
import CommentItem from './commentItem/CommentItem';

const SinglePost = ({
  getPostById,
  post: { post, loading },
  auth,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost,
}) => {
  const { post_id } = useParams();

  const navigate = useNavigate();

  const deleteHandler = () => {
    deletePost(post_id);
    navigate('/posts');
  };

  const [likeState, setLikeState] = useState(false);
  const [dislikeState, setDislikeState] = useState(false);

  const likeHandler = () => {
    addLike(post_id);
    setLikeState(true);
    setDislikeState(false);
    setTimeout(() => {
      getPostById(post_id);
    }, 250);
    // setter();
  };
  const removeLikeHandler = () => {
    removeLike(post_id);
    setLikeState(false);
    setTimeout(() => {
      getPostById(post_id);
    }, 250);
    // setter();
  };
  const dislikeHandler = () => {
    addDislike(post_id);
    setLikeState(false);
    setDislikeState(true);
    setTimeout(() => {
      getPostById(post_id);
    }, 250);
    // setter();
  };
  const removeDislikeHandler = () => {
    removeDislike(post_id);
    setDislikeState(false);
    setTimeout(() => {
      getPostById(post_id);
    }, 250);
    // setter();
  };

  // const setter = useCallback(() => {
  //   if (post?.likes?.find((like) => like.user === auth?.user?._id)) {
  //     setLikeState(true);
  //     setDislikeState(false);
  //   } else {
  //     setLikeState(false);
  //   }
  //   if (post?.dislikes?.find((dislike) => dislike.user === auth?.user?._id)) {
  //     setLikeState(false);
  //     setDislikeState(true);
  //   } else {
  //     setDislikeState(false);
  //   }
  // }, [post]);
  const setter = () => {
    if (post?.likes?.find((like) => like.user === auth?.user?._id)) {
      setLikeState(true);
      setDislikeState(false);
    } else {
      setLikeState(false);
    }
    if (post?.dislikes?.find((dislike) => dislike.user === auth?.user?._id)) {
      setLikeState(false);
      setDislikeState(true);
    } else {
      setDislikeState(false);
    }
    console.log('setter called')
  };

  useEffect(() => {
    getPostById(post_id);
  }, [getPostById,post_id]);

  useEffect(() => {
    setter();
  },[setter])

  return auth.loading || loading || post === null ? (
    <Spinner />
  ) : (
    <section className='pb-[40px] md:pb-[70px]'>
      <div
        onClick={() => history.back()}
        className='text-xs md:text-base flex w-fit relative group rounded-lg font-michroma cursor-pointer'
      >
        <button
          type='button'
          className='h-full rounded-lg py-2 px-4 bg-gradient-to-r from-dark to-light text-white duration-200 flex items-center justify-center gap-2'
        >
          <img src={backImg} className='w-4 h-4'></img>Back
        </button>
        <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200  gap-2'>
          <img src={blackBackImg} className='w-4 h-4'></img>Back
        </div>
      </div>
      <div className='font-montserrat mt-6 border-black'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-3 md:gap-5 text-sm md:text-lg text-gray-500'>
          <div className='flex items-center gap-3 md:gap-5'>
            <p className='font-kalnia font-bold italic'>Authored by:</p>
            <Link
              to={`/users/${post.user}`}
              className='flex gap-1 md:gap-3 items-center group'
            >
              <div className='rounded-full aspect-square h-[35px] md:h-[50px] w-[35px] md:w-[50px]'>
                <Img
                  src={post.avatar}
                  className='rounded-full h-[35px] md:h-[50px] w-[35px] md:w-[50px]'
                />
              </div>
              <h1 className='font-medium group-hover:underline'>{post.name}</h1>
            </Link>
          </div>
          <p className='font-kalnia font-bold italic hidden sm:block'>at</p>
          <div className='flex items-center gap-3 md:gap-5'>
            <p className='font-kalnia font-bold italic block sm:hidden'>
              Posted:
            </p>
            <p className='font-semibold italic'>
              {dayjs(post.date).format('hh:mm A, DD MMM YYYY, dddd')}
            </p>
          </div>
        </div>
        <div className='my-4 md:my-8 whitespace-pre-line space-y-4 md:space-y-8'>
          {post.title && (
            <div className='text-3xl md:text-5xl font-bold'>{post.title}</div>
          )}
          {post.image && (
            <div className='w-full h-full rounded-lg'>
              <Img
                src={post.image}
                className='w-screen h-full object-cover rounded-lg'
              />
            </div>
          )}
          <div className='text-sm md:text-base lg:text-lg text-justify'>
            {post.text}
          </div>
        </div>
      </div>
      <hr />
      <div className='font-montserrat font-medium my-4 flex justify-between items-center w-full'>
        <div className='flex items-center gap-1 text-xs md:text-base'>
          <div
            onClick={
              likeState ? () => removeLikeHandler() : () => likeHandler()
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
            {post?.likes?.length > 0 && <span>{post?.likes?.length}</span>}
          </div>
          <div
            onClick={
              dislikeState
                ? () => removeDislikeHandler()
                : () => dislikeHandler()
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
            {post?.dislikes?.length > 0 && (
              <span>{post?.dislikes?.length}</span>
            )}
          </div>
        </div>
        {post.user === auth.user._id && (
          <div
            onClick={() => deleteHandler()}
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
      <hr />
      <CommentForm postId={post_id} auth={auth} />
      <hr className='w-full sm:w-3/4 mx-auto mb-2 md:mb-6' />
      <div className='font-montserrat space-y-4 md:space-y-6'>
        <h1 className='text-lg md:text-2xl font-semibold'>
          {post?.comments?.length} Comments
        </h1>
        <div className='space-y-3 md:space-y-8'>
          {post?.comments?.length > 0 ? (
            post?.comments?.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post_id}
                auth={auth}
              />
            ))
          ) : (
            <div className='text-sm md:text-base italic'>
              There are no comments to display.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  removeDislike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPostById,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost,
})(SinglePost);
