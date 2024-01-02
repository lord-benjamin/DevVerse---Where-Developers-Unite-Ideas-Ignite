import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import blackPostImg from '../../../assets/blackPosts.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import { addPost } from '../../../actions/post';
import Spinner from '../../layout/spinner/Spinner';
import { Navigate } from 'react-router-dom';

const CreatePost = ({
  profile: { profile, loading },
  getCurrentProfile,
  addPost,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    text: '',
  });

  const { title, image, text } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData).then((res) => (res === 'OK' ? navigate('/posts') : null));
  };

  return loading ? (
    <Spinner />
  ) : profile === null ? (
    <Navigate to='/posts' />
  ) : (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          Create Post
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={blackPostImg}></img>
          Say something in the community!
        </h2>
      </div>
      <div className='font-montserrat text-sm md:text-base space-y-1'>
        <p className='font-semibold text-red-600 opacity-90'>
          A post once created cannot be edited, so post wisely!
        </p>
        <p>
          Fields marked with <span className='mx-1'>⁕</span> are required
          fields.
        </p>
      </div>
      <form
        className='w-full font-montserrat text-[14px] md:text-base'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            placeholder='Title'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Your main heading for the post.
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            type='url'
            pattern='https?://.*'
            name='image'
            value={image}
            onChange={(e) => onChange(e)}
            placeholder='Image URL'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            An image to accompany your post.
            <br />
            <span className='text-red-600 opacity-90'>[ Enter full URL ]</span>
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <textarea
            name='text'
            value={text}
            onChange={(e) => onChange(e)}
            placeholder='⁕ Text...'
            className='h-[168px] border border-black outline-none pt-2 px-4 rounded-lg w-full min-h-[168px]'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Tell your thoughts to everyone!
          </p>
        </div>

        <div className='flex gap-4'>
          <div className='text-xs md:text-base w-max mb-4 md:mb-5'>
            <button
              type='submit'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-dark text-white font-bold duration-200'>
                Post
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
                Post
              </div>
            </button>
          </div>
          <Link to='/posts' className='text-xs md:text-base w-max mb-4 md:mb-5'>
            <button
              type='button'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-light text-white font-bold duration-200'>
                Cancel
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
                Cancel
              </div>
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

CreatePost.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, addPost })(
  CreatePost
);
