import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../layout/spinner/Spinner';
import connectImg from '../../../assets/connect.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/profile';
import Img from '../../layout/lazyLoad/Img';
import Button from '../../buttons/button/Button';

const Following = ({ profile: { otherProfile, loading }, getProfileById }) => {
  const { user_id } = useParams();

  useEffect(() => {
    getProfileById(user_id);
  }, [getProfileById, user_id]);

  return otherProfile === null || loading ? (
    <Spinner />
  ) : (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          {otherProfile.user.name.trim().split(' ')[0]}&apos;s Followings
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-3 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={connectImg}></img>
          Explore followings of {otherProfile.user.name}
        </h2>
      </div>
      {otherProfile.following.length > 0 ? (
        <div className='space-y-5 sm:space-y-8'>
          {otherProfile.following.map((item) => (
            <div
              key={item._id}
              className='w-full py-4 px-4 sm:px-8 bg-gradient-to-br from-dark to-black rounded-lg shadow-2xl flex justify-between items-center gap-4 relative overflow-hidden'
            >
            <div className='absolute w-96 h-96 top-0 left-0 rotate-[30deg] sm:rotate-45 -translate-y-1/2 -translate-x-3/4 sm:-translate-x-1/2 bg-gradient-to-br from-black to-light'></div>
              <div className='h-20 w-20 rounded-full aspect-square z-[1]'>
                <Img src={item.avatar} className='h-full w-full rounded-full aspect-square' />
              </div>
              <div className='flex flex-col sm:flex-row justify-between h-full items-start sm:items-center gap-2 w-full z-[1]'>
                <h1 className='text-white font-montserrat text-base sm:text-xl font-bold'>
                  {item.name}
                </h1>
                <Button
                  text='View Profile'
                  location={`/users/${item.user}`}
                  bgcolor='bg-gradient-to-r from-dark to-light'
                  textcolor='text-white'
                  font='font-michroma'
                  type='button'
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-sm md:text-base italic font-montserrat'>
          {otherProfile.user.name.trim().split(' ')[0]} is not following anyone.
        </p>
      )}
    </section>
  );
};

Following.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Following);
