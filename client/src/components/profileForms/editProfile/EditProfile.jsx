import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../buttons/button/Button';
import Spinner from '../../layout/spinner/Spinner';
import blackUser from '../../../assets/blackUser.svg';
import youtubeImg from '../../../assets/youtube.svg';
import linkedinImg from '../../../assets/linkedin.svg';
import linktreeImg from '../../../assets/linktree.svg';
import twitterImg from '../../../assets/twitter.svg';
import facebookImg from '../../../assets/facebook.svg';
import instagramImg from '../../../assets/instagram.svg';
import './style.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createAndEditProfile,
  getCurrentProfile,
} from '../../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createAndEditProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    bio: '',
    status: '',
    githubusername: '',
    skills: '',
    youtube: '',
    linkedin: '',
    linktree: '',
    twitter: '',
    facebook: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const statusOptions = [
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Web Developer', label: 'Web Developer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Network Administrator', label: 'Network Administrator' },
    { value: 'UX/UI Designer', label: 'UX/UI Designer' },
    { value: 'Cybersecurity Analyst', label: 'Cybersecurity Analyst' },
    { value: 'Cloud Solutions Architect', label: 'Cloud Solutions Architect' },
    { value: 'IT Consultant', label: 'IT Consultant' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'AI/ML Engineer', label: 'AI/ML Engineer' },
    { value: 'Other', label: 'Other' },
  ];

  const [isOther, setIsOther] = useState(false);
  const [statusOptionInList, setStatusOptionInList] = useState(null);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      status: loading || !profile.status ? '' : profile.status,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      skills: loading || !profile.skills ? '' : profile.skills.join(', '),
      youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
      linkedin:
        loading || !profile.social.linkedin ? '' : profile.social.linkedin,
      linktree:
        loading || !profile.social.linktree ? '' : profile.social.linktree,
      twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
      facebook:
        loading || !profile.social.facebook ? '' : profile.social.facebook,
      instagram:
        loading || !profile.social.instagram ? '' : profile.social.instagram,
    });
  }, [loading]);

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    linkedin,
    linktree,
    twitter,
    facebook,
    instagram,
  } = formData;

  useEffect(() => {
    const idx = statusOptions.findIndex((option) => option.value === status);
    if (idx !== -1) {
      setStatusOptionInList(statusOptions[idx]);
      setIsOther(false);
    } else {
      setStatusOptionInList(statusOptions[10]);
      setIsOther(true);
    }

    if (
      loading ||
      profile.social.youtube !== '' ||
      profile.social.linkedin !== '' ||
      profile.social.linktree !== '' ||
      profile.social.twitter !== '' ||
      profile.social.facebook !== '' ||
      profile.social.instagram !== ''
    ) {
      toggleSocialInputs(true);
    } else {
      toggleSocialInputs(false);
    }
  }, [loading, status]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onStatusChange = (selectedStatus) => {
    setStatusOptionInList(selectedStatus);
    if (selectedStatus.value === 'Other') {
      setFormData({ ...formData, status: '' });
      setIsOther(true);
    } else {
      setFormData({ ...formData, status: selectedStatus.value });
      setIsOther(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createAndEditProfile(formData, true);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          Edit Profile
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-1 md:gap-2 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={blackUser}></img>Edit Your
          DevVerse Profile
        </h2>
      </div>
      <p className='font-montserrat text-sm md:text-base'>
        Fields marked with <span className='mx-1'>⁕</span> are required fields.
      </p>
      <form
        className='w-full font-montserrat text-[14px] md:text-base'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <Select
            value={statusOptionInList}
            onChange={(selectedStatus) => onStatusChange(selectedStatus)}
            placeholder='⁕ Select Professional Status'
            options={statusOptions}
            className='react-select-container'
            classNamePrefix='react-select'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Provide insights into your current career stage.
          </p>
        </div>

        {isOther && (
          <div className='w-full space-y-1 md:space-y-2 mb-8'>
            <input
              name='status'
              value={status}
              onChange={(e) => onChange(e)}
              placeholder='Tell your status'
              className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
              autoComplete='off'
            />
            <p className='text-[12px] md:text-sm font-medium text-gray-500'>
              If you chose Other.
            </p>
          </div>
        )}

        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
            placeholder='Company'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Your company name or the company you work for.
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            type='url'
            pattern='https?://.*'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
            placeholder='Website'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Your portfolio website or your company&apos;s website.
            <br />
            <span className='text-red-600 opacity-90'>[ Enter full URL ]</span>
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
            placeholder='Location'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Place where you live. (Eg. Mountain View, CA)
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
            placeholder='⁕ Skills'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Please enter comma separated values. (Eg. Python, Ruby, PHP, Django)
            <br />
            <span className='text-red-600 opacity-90'>
              [ Mention in decreasing order of expertise. ]
            </span>
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <textarea
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder='Short Bio...'
            className='h-[84px] border border-black outline-none pt-2 px-4 rounded-lg w-full min-h-[84px]'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Let others know who you are!
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='githubusername'
            value={githubusername}
            onChange={(e) => onChange(e)}
            placeholder='GitHub Username'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            If you want your latest repositories to be displayed on your profile
          </p>
        </div>
        <div className='w-full mb-8 md:mb-10'>
          <div className='text-xs md:text-base w-max mb-5 flex justify-center items-center gap-2 md:gap-5'>
            <div
              className='flex relative w-fit group rounded-lg font-montserrat cursor-pointer'
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
            >
              <div className='h-full rounded-lg py-2 px-4 bg-white text-black border border-black font-medium duration-200'>
                Add Social Network Links
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-gradient-to-r from-dark to-light text-white flex justify-center items-center font-medium duration-200'>
                Add Social Network Links
              </div>
            </div>
            <p className='italic'>Optional</p>
          </div>
          {displaySocialInputs && (
            <div className='space-y-2'>
              <span className='text-[12px] md:text-sm font-medium text-red-600 opacity-90'>
                [ Enter full URLs ]
              </span>
              <div className='flex flex-col md:flex-row w-full gap-2 md:gap-6'>
                <div className='flex w-full md:w-1/2 justify-center items-center gap-1 md:gap-2 group'>
                  <div className='h-10 w-10 md:h-12 md:w-12 overflow-hidden'>
                    <div className='group-hover:animate-drift flex duration-200'>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={youtubeImg}
                      ></img>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={youtubeImg}
                      ></img>
                    </div>
                  </div>
                  <input
                    name='youtube'
                    value={youtube}
                    onChange={(e) => onChange(e)}
                    placeholder='Youtube URL'
                    type='url'
                    pattern='https?://.*'
                    className='h-[35px] md:h-[42px] w-full border border-black rounded-lg py-2 px-4 outline-none'
                    autoComplete='off'
                  />
                </div>
                <div className='flex w-full md:w-1/2 justify-center items-center gap-1 md:gap-2 group'>
                  <div className='h-10 w-10 md:h-12 md:w-12 overflow-hidden'>
                    <div className='group-hover:animate-drift flex duration-200'>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={linkedinImg}
                      ></img>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={linkedinImg}
                      ></img>
                    </div>
                  </div>
                  <input
                    name='linkedin'
                    value={linkedin}
                    onChange={(e) => onChange(e)}
                    placeholder='LinkedIn URL'
                    type='url'
                    pattern='https?://.*'
                    className='h-[35px] md:h-[42px] w-full border border-black rounded-lg py-2 px-4 outline-none'
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='flex flex-col md:flex-row w-full gap-2 md:gap-6'>
                <div className='flex w-full md:w-1/2 justify-center items-center gap-1 md:gap-2 group'>
                  <div className='h-10 w-10 md:h-12 md:w-12 overflow-hidden'>
                    <div className='group-hover:animate-drift flex duration-200'>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={linktreeImg}
                      ></img>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={linktreeImg}
                      ></img>
                    </div>
                  </div>
                  <input
                    name='linktree'
                    value={linktree}
                    onChange={(e) => onChange(e)}
                    placeholder='Linktree URL'
                    type='url'
                    pattern='https?://.*'
                    className='h-[35px] md:h-[42px] w-full border border-black rounded-lg py-2 px-4 outline-none'
                    autoComplete='off'
                  />
                </div>
                <div className='flex w-full md:w-1/2 justify-center items-center gap-1 md:gap-2 group'>
                  <div className='h-10 w-10 md:h-12 md:w-12 overflow-hidden'>
                    <div className='group-hover:animate-drift flex duration-200'>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={twitterImg}
                      ></img>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={twitterImg}
                      ></img>
                    </div>
                  </div>
                  <input
                    name='twitter'
                    value={twitter}
                    onChange={(e) => onChange(e)}
                    placeholder='Twitter URL'
                    type='url'
                    pattern='https?://.*'
                    className='h-[35px] md:h-[42px] w-full border border-black rounded-lg py-2 px-4 outline-none'
                    autoComplete='off'
                  />
                </div>
              </div>
              <div className='flex flex-col md:flex-row w-full gap-2 md:gap-6'>
                <div className='flex w-full md:w-1/2 justify-center items-center gap-1 md:gap-2 group'>
                  <div className='h-10 w-10 md:h-12 md:w-12 overflow-hidden'>
                    <div className='group-hover:animate-drift flex duration-200'>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={facebookImg}
                      ></img>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={facebookImg}
                      ></img>
                    </div>
                  </div>
                  <input
                    name='facebook'
                    value={facebook}
                    onChange={(e) => onChange(e)}
                    placeholder='Facebook URL'
                    type='url'
                    pattern='https?://.*'
                    className='h-[35px] md:h-[42px] w-full border border-black rounded-lg py-2 px-4 outline-none'
                    autoComplete='off'
                  />
                </div>
                <div className='flex w-full md:w-1/2 justify-center items-center gap-1 md:gap-2 group'>
                  <div className='h-10 w-10 md:h-12 md:w-12 overflow-hidden'>
                    <div className='group-hover:animate-drift flex duration-200'>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={instagramImg}
                      ></img>
                      <img
                        className='h-10 w-10 md:h-12 md:w-12'
                        src={instagramImg}
                      ></img>
                    </div>
                  </div>
                  <input
                    name='instagram'
                    value={instagram}
                    onChange={(e) => onChange(e)}
                    placeholder='Instagram URL'
                    type='url'
                    pattern='https?://.*'
                    className='h-[35px] md:h-[42px] w-full border border-black rounded-lg py-2 px-4 outline-none'
                    autoComplete='off'
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex gap-4'>
          <div className='text-xs md:text-base w-max mb-4 md:mb-5'>
            <button
              type='submit'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-dark text-white font-bold duration-200'>
                Save
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
                Save
              </div>
            </button>
          </div>
          <Link
            to='/dashboard'
            className='text-xs md:text-base w-max mb-4 md:mb-5'
          >
            <button
              type='button'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-light text-white font-bold duration-200'>
                Cancel
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
                Cancel
              </div>
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

EditProfile.propTypes = {
  createAndEditProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createAndEditProfile,
  getCurrentProfile,
})(EditProfile);
