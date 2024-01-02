import React from 'react';
import PropTypes from 'prop-types';
import bullet from '../../../../assets/bulletPoints.svg'

const ProfileAbout = ({
  otherProfile: {
    user: { name },
    bio,
    skills,
  },
}) => {
  return (
    <section className='w-full text-center mt-6 sm:mt-8 text-white bg-gradient-to-r from-dark via-black to-light px-3 sm:px-5 py-5 sm:py-8'>
      <div>
        <h2 className='font-kalnia font-bold text-sm sm:text-xl mb-2 sm:mb-3'>
          {name.trim().split(' ')[0]}&apos;s Bio
        </h2>
        {bio ? (
          <p className='font-montserrat text-xs sm:text-base whitespace-pre-line'>{bio}</p>
        ) : (
          <p className='text-xs sm:text-base italic font-montserrat opacity-75'>
            No bio has been added by the user.
          </p>
        )}
      </div>
      <hr className='opacity-40 w-full sm:w-3/4 mx-auto my-5 sm:my-8' />
      <div>
        <h2 className='font-kalnia font-bold text-sm sm:text-xl mb-2 sm:mb-3'>
          Skills
        </h2>
        <ul className='flex flex-row flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 justify-center'>
          {skills.map((skill, idx) => (
            <li
              key={idx}
              className='flex gap-1 items-center font-montserrat'
            >
              <img src={bullet} className='h-3 sm:h-5 w-3 sm:w-5'></img>
              <span className='text-xs sm:text-base'>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

ProfileAbout.propTypes = {
  otherProfile: PropTypes.object.isRequired,
};

export default ProfileAbout;
