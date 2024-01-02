import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ProfileExp = ({
  exp: { title, company, location, from, to, current, description },
}) => {
  return (
    <div className='font-montserrat'>
      <h1 className='font-bold text-lg md:text-xl'>{title}</h1>
      <h3 className='font-semibold text-base md:text-lg'>{company}</h3>
      <p className='italic text-xs md:text-sm mt-1 mb-2'>
        {dayjs(from).format('MMM, YYYY')} -{' '}
        {to && !current ? dayjs(to).format('MMM, YYYY') : 'Current'}
      </p>
      {location && (
        <p className='text-sm md:text-base'>
          <span className='font-semibold'>Location: </span>
          {location}
        </p>
      )}
      {description && (
        <p className='text-sm md:text-base mt-0 sm:mt-1 whitespace-pre-line'>
          <span className='font-semibold'>Description: </span>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileExp.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default ProfileExp;
