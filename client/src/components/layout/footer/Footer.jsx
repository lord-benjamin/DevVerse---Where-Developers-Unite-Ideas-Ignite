import React, { Fragment } from 'react';
import ButtonWithIcon from '../../buttons/buttonWithIcon/ButtonWithIcon';
import user from '../../../assets/user.svg';
import posts from '../../../assets/posts.svg';
import dashboard from '../../../assets/dashboard.svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Footer = ({
  auth: { isAuthenticated, loading },
  profile: { profile },
}) => {
  const authLinks = (
    <ul className='flex flex-col-reverse sm:flex-row items-center justify-center font-medium text-white gap-7 h-full'>
      <li>
        <ButtonWithIcon
          text='Users'
          location='/users'
          color='text-white'
          icon={user}
        />
      </li>
      {profile && (
        <li>
          <ButtonWithIcon
            text='Posts'
            location='/posts'
            color='text-white'
            icon={posts}
          />
        </li>
      )}
      <li>
        <ButtonWithIcon
          text='Dashboard'
          location='/dashboard'
          color='text-white'
          icon={dashboard}
        />
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='flex flex-col-reverse sm:flex-row items-center justify-center font-medium text-white gap-7 h-full'>
      <li>
        <ButtonWithIcon
          text='Users'
          location='/users'
          color='text-white'
          icon={user}
        />
      </li>
    </ul>
  );

  const d = new Date();

  return (
    <footer className='bg-black z-10'>
      <div className='max-w-7xl mx-auto px-2 sm:px-5 md:px-10 w-full py-4 md:py-8 lg:py-12 font-montserrat font-medium flex flex-col-reverse lg:flex-row gap-0 lg:gap-8 items-center justify-center lg:justify-between text-sm sm:text-base'>
        <div className='text-center lg:text-left text-white h-full inline-flex justify-center items-center'>
          © {d.getFullYear()} DevVerse. All Rights Reserved. Designed and
          Developed by Dhruv Arora.
        </div>
        <hr className='lg:hidden w-full opacity-30 rounded-full my-4 md:my-8' />

        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </footer>
  );
};

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Footer);
