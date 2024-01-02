import React, { useState } from 'react';
import PropTypes from 'prop-types';
import deleteImg from '../../../assets/blackDelete.svg';
import { connect } from 'react-redux';
import { deleteAllPosts,deleteAccount } from '../../../actions/profile';
import './style.css';

const DangerZone = ({ deleteAllPosts,deleteAccount, isProfile }) => {

  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [decision, setDecision] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState('disabled');
  const [deletePosts, setDeletePosts] = useState(null);

  const onChange = (e) => {
    if (e.target.value === 'delete all with posts') {
      setSubmitDisabled('');
      setDeletePosts(true);
    } else if (e.target.value === 'delete all except posts') {
      setSubmitDisabled('');
      setDeletePosts(false);
    } else {
      setSubmitDisabled('disabled');
    }
    setDecision(e.target.value);
  };

  return (
    <section className='border-2 border-red-600 bg-red-600 bg-opacity-10 p-2 md:p-4 space-y-2 md:space-y-5'>
      <h2 className='text-lg md:text-2xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
        <img src={deleteImg} className='h-5 w-5 md:h-7 md:w-7' />
        Danger Zone
      </h2>
      <div className='space-y-4'>
        {isProfile && (
          <div className='flex justify-between items-center'>
            <p className='text-xs md:text-base font-montserrat font-bold'>
              Delete Posts
            </p>
            <div className='text-xs md:text-base w-max'>
              <button
                onClick={() => setShowPostDeleteModal(true)}
                type='button'
                className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
              >
                <div className='h-full rounded-lg py-2 px-4 bg-red-600 text-white duration-200'>
                  Delete
                </div>
                <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200'>
                  Delete
                </div>
              </button>
            </div>
          </div>
        )}
        <div className='flex justify-between items-center'>
          <p className='text-xs md:text-base font-montserrat font-bold'>
            Delete Account
          </p>
          <div className='text-xs md:text-base w-max'>
            <button
              onClick={() => setShowDeleteModal(true)}
              type='button'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-red-600 text-white duration-200'>
                Delete
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200'>
                Delete
              </div>
            </button>
          </div>
        </div>
      </div>
      {showPostDeleteModal && (
        <div className='flex justify-center items-center w-full h-full fixed inset-0 z-20'>
          <div
            className='absolute inset-0 w-full h-full bg-black opacity-50'
            onClick={() => {
              setShowPostDeleteModal(false);
            }}
          ></div>
          <div className='w-full max-w-[800px] mx-2 bg-white z-30 rounded-lg p-3 md:p-6 animate-comeDown'>
            <h1 className='font-kalnia font-bold text-lg md:text-2xl mb-2 md:mb-4'>
              Delete Posts
            </h1>
            <div className='font-montserrat space-y-3 text-xs md:text-base'>
              <p>
                Are you sure you want to delete{' '}
                <span className='font-semibold'>all your posts?</span>
              </p>
            </div>

            <div className='flex justify-end gap-2 md:gap-4 mt-4 md:mt-6'>
              <div
                className='text-xs md:text-base w-max'
              >
                <button
                  onClick={() => {
                    deleteAllPosts();
                    setShowPostDeleteModal(false);
                  }}
                  type='button'
                  className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
                >
                  <div className='h-full rounded-lg py-2 px-4 bg-red-600 opacity-90 border border-red text-white duration-200'>
                    Delete
                  </div>
                  <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200'>
                    Delete
                  </div>
                </button>
              </div>
              <div className='text-xs md:text-base w-max'>
                <button
                  onClick={() => {
                    setShowPostDeleteModal(false);
                  }}
                  type='button'
                  className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
                >
                  <div className='h-full rounded-lg py-2 px-4 bg-white text-black border border-black duration-200'>
                    Cancel
                  </div>
                  <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-gradient-to-r from-dark to-light text-white flex justify-center items-center duration-200'>
                    Cancel
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className='flex justify-center items-center w-full h-full fixed inset-0 z-20'>
          <div
            className='absolute inset-0 w-full h-full bg-black opacity-50'
            onClick={() => {
              setShowDeleteModal(false);
              setDecision('');
              setSubmitDisabled('disabled');
              setDeletePosts(null);
            }}
          ></div>
          <div className='w-full max-w-[800px] mx-2 bg-white z-30 rounded-lg p-3 md:p-6 animate-comeDown'>
            <h1 className='font-kalnia font-bold text-lg md:text-2xl mb-2 md:mb-4'>
              Delete Account
            </h1>
            <div className='font-montserrat space-y-3 text-xs md:text-base'>
              <p>
                You are about to delete your DevVerse account{' '}
                <span className='font-semibold'>permanently</span>.
              </p>
              <p>
                This means your{' '}
                <span className='font-semibold'>
                  profile and account details will be deleted, AND your comments on any post will become anonymous.
                </span>
              </p>
              <p>
                However, you have the option to choose whether to keep your{' '}
                <span className='font-semibold'>posts</span> on the DevVerse
                platform with anonymous credentials, or to delete them also.
              </p>
              <table>
                <tbody>
                  <tr>
                    <td className='border-none flex'>1.</td>
                    <td className='border-none'>
                      <p>
                        If you want to delete your account along with your
                        posts, type:
                        <br />
                        <span className='font-semibold text-red-600 opacity-90 preventSelect'>
                          delete all with posts
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-none flex'>2.</td>
                    <td className='border-none'>
                      <p>
                        If you want to delete your account, and decide to keep
                        your posts on the platform, type:
                        <br />
                        <span className='font-semibold text-red-600 opacity-90 preventSelect'>
                          delete all except posts
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='font-montserrat space-y-1 mt-2 md:mt-5'>
              <input
                placeholder='Input your decision...'
                className='border border-black rounded-lg py-2 px-3 md:px-4 w-full outline-none h-[35px] md:h-[42px] text-xs md:text-base'
                value={decision}
                onChange={(e) => onChange(e)}
                autoComplete='off'
              />
              {!submitDisabled && (
                <p className='text-[12px] md:text-sm text-justify font-medium text-red-600 opacity-90'>
                  {deletePosts
                    ? 'Your account details, profile and posts will be deleted permanently.'
                    : 'Your account details and profile will be deleted permanently, your posts will be authored anonymous and remain on DevVerse.'}
                </p>
              )}
            </div>

            <div className='flex justify-end gap-2 md:gap-4 mt-4 md:mt-6'>
              <div
                className={`text-xs md:text-base w-max ${
                  submitDisabled === 'disabled'
                    ? 'grayscale pointer-events-none'
                    : 'grayscale-0 pointer-events-auto'
                }`}
              >
                <button
                  onClick={() => {
                    deleteAccount(deletePosts);
                  }}
                  disabled={submitDisabled}
                  type='button'
                  className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
                >
                  <div className='h-full rounded-lg py-2 px-4 bg-red-600 opacity-90 border border-red text-white duration-200'>
                    Delete
                  </div>
                  <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center duration-200'>
                    Delete
                  </div>
                </button>
              </div>
              <div className='text-xs md:text-base w-max'>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDecision('');
                    setSubmitDisabled('disabled');
                    setDeletePosts(null);
                  }}
                  type='button'
                  className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
                >
                  <div className='h-full rounded-lg py-2 px-4 bg-white text-black border border-black duration-200'>
                    Cancel
                  </div>
                  <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-gradient-to-r from-dark to-light text-white flex justify-center items-center duration-200'>
                    Cancel
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

DangerZone.propTypes = {
  deleteAllPosts: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  isProfile: PropTypes.bool,
};

export default connect(null, { deleteAllPosts,deleteAccount })(DangerZone);
