import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/spinner/Spinner';
import Button from '../buttons/button/Button';
import blackUser from '../../assets/blackUser.svg';
import DashboardActions from './dashboardActions/DashboardActions';
import Experience from './experience/Experience';
import Education from './education/Education';
import experienceImg from '../../assets/experience.svg';
import educationImg from '../../assets/education.svg';
import DangerZone from './dangerZone/DangerZone';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className='space-y-6 md:space-y-10 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          Dashboard
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={blackUser}></img>Welcome{' '}
          {user && user.name}
        </h2>
      </div>
      {profile ? (
        <div className='space-y-6 md:space-y-10'>
          <DashboardActions userId={user._id} followers={profile.followers} following={profile.following} totalPosts={profile.totalPosts} />
          <div className='space-y-1 md:space-y-3'>
            <h2 className='text-lg md:text-2xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
              <img src={experienceImg} className='h-5 w-5 md:h-7 md:w-7' />
              Experience:
            </h2>
            {profile.experience.length === 0 ? (
              <p className='text-sm md:text-base italic font-montserrat'>
                No experience found
              </p>
            ) : (
              <Experience experience={profile.experience} />
            )}
          </div>
          <div className='space-y-1 md:space-y-3'>
            <h2 className='text-lg md:text-2xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
              <img src={educationImg} className='h-5 w-5 md:h-7 md:w-7' />
              Education:
            </h2>
            {profile.education.length === 0 ? (
              <p className='text-sm md:text-base italic font-montserrat'>
                No education found
              </p>
            ) : (
              <Education education={profile.education} />
            )}
          </div>
        </div>
      ) : (
        <div className='space-y-4'>
          <p className='text-sm md:text-lg font-montserrat'>
            You don&apos;t have a profile yet. Click the button below to create
            a profile.
          </p>
          <Button
            text='Create Profile'
            location='/create-profile'
            bgcolor='bg-gradient-to-r from-dark to-light'
            textcolor='text-white'
            font='font-michroma'
            type='button'
          />
        </div>
      )}
      <hr />
      <DangerZone isProfile={profile ? true : false}/>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
