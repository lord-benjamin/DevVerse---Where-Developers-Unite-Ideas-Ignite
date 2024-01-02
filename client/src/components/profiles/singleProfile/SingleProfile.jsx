import React, { useEffect } from 'react';
import backImg from '../../../assets/back.svg';
import blackBackImg from '../../../assets/blackBack.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, getProfileById } from '../../../actions/profile';
import { useParams } from 'react-router-dom';
import Spinner from '../../layout/spinner/Spinner';
import Button from '../../buttons/button/Button';
import ProfileTop from './profileTop/ProfileTop';
import ProfileAbout from './profileAbout/ProfileAbout';
import ProfileExp from './profileExp/ProfileExp';
import ProfileEdu from './profileEdu/ProfileEdu';
import ProfileGithub from './profileGithub/ProfileGithub';

const SingleProfile = ({
  getCurrentProfile,
  getProfileById,
  auth,
  profile: { otherProfile, loading },
}) => {
  const { user_id } = useParams();

  useEffect(() => {
    if (!auth.loading && auth.isAuthenticated) {
      getCurrentProfile();
    }
    getProfileById(user_id);
  }, [
    getCurrentProfile,
    getProfileById,
    auth.loading,
    auth.isAuthenticated,
    user_id,
  ]);

  return otherProfile === null || loading || auth.loading ? (
    <Spinner />
  ) : (
    <section className='pb-[40px] md:pb-[70px]'>
      <div className='flex gap-1 md:gap-3'>
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
        {auth.isAuthenticated &&
          !auth.loading &&
          auth.user._id === otherProfile.user._id && (
            <Button
              text='Edit Profile'
              location='/edit-profile'
              bgcolor='bg-dark'
              textcolor='text-white'
              font='font-michroma'
              type='button'
            />
          )}
      </div>
      <ProfileTop
        isAuthenticated={auth.isAuthenticated}
        otherProfile={otherProfile}
      />
      <ProfileAbout otherProfile={otherProfile} />
      <div className='h-full w-full flex flex-col md:flex-row gap-3 sm:gap-8 mt-3 sm:mt-8'>
        <div className='w-full h-full md:w-1/2 p-3 md:p-5 border border-black border-opacity-30'>
          <h1 className='font-kalnia font-bold text-xl sm:text-2xl mb-3 md:mb-6'>
            Experience:
          </h1>
          {otherProfile.experience.length > 0 ? (
            <div>
              {otherProfile.experience.map((exp, idx) => (
                <div key={exp._id}>
                  <ProfileExp exp={exp} />
                  {idx != otherProfile.experience.length - 1 && (
                    <hr className='my-3 md:my-5 bg-gray-500 text-gray-500 w-full' />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className='text-xs sm:text-base italic font-montserrat opacity-75'>
              No experience has been added by the user.
            </p>
          )}
        </div>
        <div className='w-full h-full md:w-1/2 p-3 md:p-5 border border-black border-opacity-30'>
          <h1 className='font-kalnia font-bold text-xl sm:text-2xl mb-3 md:mb-6'>
            Education:
          </h1>
          {otherProfile.education.length > 0 ? (
            <div>
              {otherProfile.education.map((edu, idx) => (
                <div key={edu._id}>
                  <ProfileEdu edu={edu} />
                  {idx != otherProfile.education.length - 1 && (
                    <hr className='my-3 md:my-5 bg-gray-500 text-gray-500 w-full' />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className='text-xs sm:text-base italic font-montserrat opacity-75'>
              No education has been added by the user.
            </p>
          )}
        </div>
      </div>
      {otherProfile.githubusername && (
        <ProfileGithub username={otherProfile.githubusername} />
      )}
    </section>
  );
};

SingleProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, getProfileById })(
  SingleProfile
);
