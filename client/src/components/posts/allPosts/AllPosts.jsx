import React, { useEffect } from 'react';
import communityImg from '../../../assets/community.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import { getAllPosts } from '../../../actions/post';
import Spinner from '../../layout/spinner/Spinner';
import PostItem from '../postItem/PostItem';
import Button from '../../buttons/button/Button';

const AllPosts = ({
  post: { posts, loading },
  getAllPosts,
  profile,
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getAllPosts();
  }, [getAllPosts, getCurrentProfile]);

  return loading||profile.loading ? (
    <Spinner />
  ) : (
    <section className='space-y-6 md:space-y-10 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          Posts
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-3 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={communityImg}></img>
          <p>Welcome to the community - <span className='font-montserrat font-semibold mx-1'>{posts===null ? '0' : posts.length}</span> posts till now on the platform...</p>
        </h2>
      </div>
      {profile.profile === null ? (
        <p className='text-sm sm:text-lg italic font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text border-black border w-max py-1 px-2 cursor-default rounded-lg font-montserrat'>
          Create a profile to add posts!
        </p>
      ) : (
        <Button
          text='Create Post'
          bgcolor='bg-gradient-to-r from-dark to-light'
          textcolor='text-white'
          location='/create-post'
          font='font-michroma'
          type='button'
        />
      )}
      <div className='space-y-3 md:space-y-8'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

AllPosts.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getCurrentProfile, getAllPosts })(
  AllPosts
);
