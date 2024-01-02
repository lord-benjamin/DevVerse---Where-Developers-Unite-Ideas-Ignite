import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../../actions/post';
import { getCurrentProfile } from '../../../../actions/profile';
import Spinner from '../../../layout/spinner/Spinner';
import Img from '../../../layout/lazyLoad/Img';

const CommentForm = ({
  profile: {profile,loading},
  addComment,
  getCurrentProfile,
  postId,
  auth: {
    user: { avatar },
  },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [text,setText] = useState('');

  return loading ? <Spinner/> : (
    <div className={`flex ${profile===null ? 'items-center' : 'items-start'} w-full gap-2 md:gap-4 my-4 md:my-8`}>
      <div className='rounded-full aspect-square h-[35px] md:h-[50px] w-[35px] md:w-[50px]'>
        <Img
          src={avatar}
          className='rounded-full h-[35px] md:h-[50px] w-[35px] md:w-[50px]'
        />
      </div>
      {profile === null ? (
        <div>
          <p className='text-xs sm:text-lg italic font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text border-black border w-max py-1 px-2 cursor-default rounded-lg font-montserrat'>
            Create a profile to add comments!
          </p>
        </div>
      ) : (
        <div className='w-full'>
          <form
            className='w-full font-montserrat text-[14px] md:text-base space-y-2 md:space-y-4'
            onSubmit={(e) => {
                e.preventDefault();
                addComment(postId,{text});
                setText('')
            }}
          >
            <textarea
              name='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Leave a comment...'
              className='h-[100px] border border-black outline-none pt-2 px-4 rounded-lg w-full min-h-[100px]'
              autoComplete='off'
            />
            <div className='text-xs md:text-base w-max mb-4 md:mb-5'>
            <button
              type='submit'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-dark text-white font-bold duration-200'>
                Comment
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
                Comment
              </div>
            </button>
          </div>
          </form>
        </div>
      )}
    </div>
  )
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, addComment })(
  CommentForm
);
