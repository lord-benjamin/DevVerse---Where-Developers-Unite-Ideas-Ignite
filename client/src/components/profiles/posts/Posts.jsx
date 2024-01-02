import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../layout/spinner/Spinner';
import blackPostsImg from '../../../assets/blackPosts.svg';
import likeImg from '../../../assets/like.svg';
import dislikeImg from '../../../assets/dislike.svg';
import blackCommentsImg from '../../../assets/blackComments.svg'
import deleteImg from '../../../assets/delete.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUserPosts, getProfileById } from '../../../actions/profile';
import { deletePost } from '../../../actions/post';
import Img from '../../layout/lazyLoad/Img';
import Button from '../../buttons/button/Button';

const Posts = ({
  profile: { otherProfile, userPosts, loading },
  getAllUserPosts,
  getProfileById,
  deletePost,
  auth,
}) => {
  const { user_id } = useParams();

  useEffect(() => {
    getProfileById(user_id);
    getAllUserPosts(user_id);
  }, [getAllUserPosts, user_id]);

  return auth.loading || loading || otherProfile === null ? (
    <Spinner />
  ) : (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          {otherProfile.user.name.trim().split(' ')[0]}&apos;s Posts
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-3 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={blackPostsImg}></img>
          Explore posts of {otherProfile.user.name}
        </h2>
      </div>
      {userPosts.length > 0 ? (
        <div className='space-y-5 sm:space-y-8'>
          {userPosts.map((post) => (
            <div
              key={post._id}
              className='w-full py-4 px-4 sm:px-8 bg-gradient-to-br from-dark to-black rounded-lg shadow-2xl flex justify-between items-center gap-4 relative overflow-hidden'
            >
              <div className='absolute w-96 h-96 top-0 left-0 rotate-[30deg] sm:rotate-45 -translate-y-1/2 -translate-x-3/4 sm:-translate-x-1/2 bg-gradient-to-br from-black to-light'></div>
              <div className='flex flex-col-reverse sm:flex-row justify-between gap-5 sm:gap-8 w-full'>
                <div className='flex justify-between flex-col gap-8 w-full text-white font-montserrat  z-[1]'>
                  <Link to={`/posts/${post._id}`} className='space-y-1 hover:underline'>
                    {post.title && (
                      <h1 className='text-lg sm:text-xl font-bold'>
                        {post.title}
                      </h1>
                    )}
                    <p className='text-xs md:text-base whitespace-pre-line'>
                      {post.text.length < 150
                        ? post.text
                        : post.text.substring(0, 150) + '...'}
                    </p>
                  </Link>
                  <div className='flex flex-col gap-y-3 sm:flex-row justify-between items-start sm:items-center'>
                    <div className='flex gap-2'>
                      <div className='flex items-center p-2 gap-1.5 md:gap-2 text-black bg-white w-max bg-opacity-90 rounded-lg text-xs md:text-base'>
                        <img className='h-4 md:h-5 w-4 md:w-5' src={likeImg}></img>
                        {post.likes.length}
                      </div>
                      <div className='flex items-center p-2 gap-1.5 md:gap-2 text-black bg-white w-max bg-opacity-90 rounded-lg text-xs md:text-base'>
                        <img className='h-4 md:h-5 w-4 md:w-5' src={dislikeImg}></img>
                        {post.dislikes.length}
                      </div>
                      <div className='w-[1px] border border-white border-opacity-40 rounded-full mx-1 sm:mx-2'></div>
                      <div className='flex items-center p-2 gap-1.5 md:gap-2 text-black bg-white w-max bg-opacity-90 rounded-lg text-xs md:text-base'>
                        <img className='h-4 md:h-5 w-4 md:w-5' src={blackCommentsImg}></img>
                        {post.comments.length}
                      </div>
                    </div>
                    {post.user === auth.user._id && (
                      <div
                        onClick={() => deletePost(post._id)}
                        className='text-xs sm:text-sm md:text-base flex justify-center items-center py-1.5 md:py-2 px-3 rounded-lg gap-2 font-medium bg-red-600 bg-opacity-90 group cursor-pointer text-white'
                      >
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
                {post.image && (
                  <Link to={`/posts/${post._id}`} className='w-full sm:w-[200px] h-[200px] aspect-auto sm:aspect-square rounded-lg'>
                    <Img
                      src={post.image}
                      className='object-cover w-screen sm:w-[200px] h-[200px] rounded-lg'
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-sm md:text-base italic font-montserrat'>
          {otherProfile.user.name.trim().split(' ')[0]} has no posts.
        </p>
      )}
    </section>
  );
};

Posts.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAllUserPosts: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getAllUserPosts,
  getProfileById,
  deletePost,
})(Posts);
