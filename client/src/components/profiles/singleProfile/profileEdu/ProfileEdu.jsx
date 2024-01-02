import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ProfileEdu = ({
  edu: { school, degree, fieldofstudy, from, to, current, description },
}) => {
  return (
    <div className='font-montserrat'>
      <h1 className='font-bold text-lg md:text-xl'>{degree}</h1>
      <h3 className='font-semibold text-base md:text-lg'>{school}</h3>
      <p className='italic text-xs md:text-sm mt-1 mb-2'>
        {dayjs(from).format('MMM, YYYY')} -{' '}
        {to && !current ? dayjs(to).format('MMM, YYYY') : 'Current'}
      </p>
      <p className='text-sm md:text-base'>
        <span className='font-semibold'>Field of Study: </span>
        {fieldofstudy}
      </p>
      {description && (
        <p className='text-sm md:text-base mt-0 sm:mt-1 whitespace-pre-line'>
          <span className='font-semibold'>Description: </span>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileEdu.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default ProfileEdu;
