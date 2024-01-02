import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import education from '../../../assets/education.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../../actions/profile';

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData).then((res) =>
      res === 'OK' ? navigate('/dashboard') : null
    );
  };

  return (
    <section className='space-y-6 md:space-y-8 pb-[40px] md:pb-[70px]'>
      <div className='text-left space-y-1 md:space-y-2'>
        <h1 className='text-3xl md:text-4xl font-syncopate font-bold bg-gradient-to-r from-dark to-light text-transparent bg-clip-text'>
          Add Education
        </h1>
        <h2 className='text-md md:text-xl font-kalnia font-bold flex gap-3 items-center'>
          <img className='h-5 w-5 md:h-7 md:w-7' src={education}></img>
          Add any school/university you had attended
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
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            placeholder='⁕ School'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            The name of the school or university where you gained education.
            (Eg. MIT, IIT-D)
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            placeholder='⁕ Degree'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            The degree or certificate you got on completion of your education.
            (Eg. B.Tech, MS)
          </p>
        </div>
        <div className='w-full space-y-1 md:space-y-2 mb-8'>
          <input
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            placeholder='⁕ Field of Study'
            className='h-[42px] border border-black outline-none py-2 px-4 rounded-lg w-full'
            autoComplete='off'
          />
          <p className='text-[12px] md:text-sm font-medium text-gray-500'>
            In which field you gained your education. (Eg. Computer Science,
            AI/ML)
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
            The starting date of your education.
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
            I&apos;m currently studying at this institution.
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
            The ending date of your education.
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
            Tell something about your studies and learnings at this institution.
          </p>
        </div>
        <div className='flex gap-4'>
          <div className='text-xs md:text-base w-max mb-4 md:mb-5'>
            <button
              type='submit'
              className='flex relative w-fit group rounded-lg font-michroma cursor-pointer'
            >
              <div className='h-full rounded-lg py-2 px-4 bg-dark text-white font-bold duration-200'>
                Add
              </div>
              <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white text-black border border-black flex justify-center items-center font-bold duration-200'>
                Add
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
