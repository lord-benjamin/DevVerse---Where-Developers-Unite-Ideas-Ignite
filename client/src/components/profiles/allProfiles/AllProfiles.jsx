import React, { useEffect } from 'react';
import Spinner from '../../layout/spinner/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, getProfiles } from '../../../actions/profile';
import connectImg from '../../../assets/connect.svg';
import ProfileItem from '../profileItem/ProfileItem';

const AllProfiles = ({
  profile: { profile, profiles, loading },
  getProfiles,
  getCurrentProfile,
  auth
}) => {
  useEffect(() => {
    if(!auth.loading && auth.isAuthenticated){
      getCurrentProfile();
    }
    getProfiles();
  }, [getCurrentProfile,getProfiles,auth.loading,auth.isAuthenticated]);
  return auth.loading||loading ? (
    <Spinner />
  ) : (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          DevVerse Users
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-3 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={connectImg}></img>
          <p>Browse and connect with <span className='font-montserrat font-semibold mx-1'>{profiles===null ? '0' : profiles.length}</span> other users</p>
        </h2>
      </div>
      <div className='space-y-5 md:space-y-8'>
        {profiles.length > 0 ? (
          profiles.map((otherProfile) => (
            <ProfileItem
              key={otherProfile._id}
              otherProfile={otherProfile}
              profile={profile}
            />
          ))
        ) : (
          <p className='text-sm md:text-base italic font-montserrat'>
            No profiles found
          </p>
        )}
      </div>
    </section>
  );
};

AllProfiles.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, getProfiles })(
  AllProfiles
);
