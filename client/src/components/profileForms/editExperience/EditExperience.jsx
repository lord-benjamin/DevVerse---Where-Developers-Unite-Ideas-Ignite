import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Spinner from '../../layout/spinner/Spinner';
import experience from '../../../assets/experience.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, editExperience } from '../../../actions/profile';
import dayjs from 'dayjs';

const EditExperience = ({
  profile: { profile, loading },
  editExperience,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { exp_id } = useParams();

  const [toDateDisabled, toggleDisabled] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    const experience = profile?.experience.find((exp) => exp._id === exp_id);

    setFormData({
      title: loading || !experience.title ? '' : experience.title,
      company: loading || !experience.company ? '' : experience.company,
      location: loading || !experience.location ? '' : experience.location,
      from: loading || !experience.from ? '' : dayjs(experience.from).format('YYYY-MM-DD'),
      to: loading || !experience.to ? '' : dayjs(experience.to).format('YYYY-MM-DD'),
      current: loading || !experience.current ? false : experience.current,
      description:
        loading || !experience.description ? '' : experience.description,
    });
  }, [loading]);

  useEffect(() => {
    if(formData.current){
        toggleDisabled(true)
    }
  })

  const { title, company, location, from, to, current, description } = formData;


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editExperience(formData, exp_id);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          Edit Experience
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-3 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={experience}></img>
          Edit your experience details
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
          <input
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
            placeholder='⁕ Job Title'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            The job title you served/serving at the company. (Eg. Developer,
            Software Engineer)
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
            placeholder='⁕ Company'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            The name of the company in which you gained experience. (Eg. Google,
            Microsoft)
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
            Location of your office/organization. (Eg. Mountain View, CA)
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
            placeholder='⁕ From Date'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            The starting date of your job.
          </p>
        </div>
        <div
          className='flex w-full mb-8 gap-2 md:gap-3 cursor-pointer'
          onClick={() => {
            setFormData({ ...formData, current: !current });
            toggleDisabled(!toDateDisabled);
          }}
        >
          <input
            type='checkbox'
            name='current'
            value={current}
            checked={current}
            placeholder='⁕ From Date'
            className='cursor-pointer'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium'>
            I&apos;m currently working in this job.
          </p>
        </div>
        <div
          className={`w-full space-y-1 md:space-y-2 mb-8 ${
            toDateDisabled ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <input
            disabled={toDateDisabled ? 'disabled' : ''}
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            placeholder='To Date'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            The ending date of your job.
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <textarea
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
            placeholder='Description...'
            className='h-[84px] border border-black outline-none pt-2 px-4 rounded-lg w-full min-h-[84px]'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            Tell something about what you did at the company.
          </p>
        </div>
        <div className='flex gap-4'>
          <div className='text-xs md:text-base w-max mb-4 md:mb-5'>
            <button
              type='submit'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-dark text-white font-bold duration-200'>
                Edit
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
                Edit
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

EditExperience.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  editExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, editExperience })(
  EditExperience
);
