import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import deleteImg from '../../../assets/blackDelete.svg';
import editImg from '../../../assets/edit.svg'
import { deleteExperience } from '../../../actions/profile';
import './style.css';

const Experience = ({ experience, deleteExperience }) => {
  const navigate = useNavigate();

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td className='border-l-none'>{exp.company}</td>
      <td>{exp.title} </td>
      <td className='hidden md:table-cell'>
        {dayjs(exp.from).format('D MMM, YYYY')} -{' '}
        {exp.to && !exp.current
          ? dayjs(exp.to).format('D MMM, YYYY')
          : 'Current'}
      </td>
      <td className='md:hidden'>
        {dayjs(exp.from).format('DD/MM/YYYY')} -{' '}
        {exp.to ? dayjs(exp.to).format('DD/MM/YYYY') : 'Current'}
      </td>
      <td className='p-0'>
        <div className='flex flex-col md:flex-row min-h-full w-full'>
          <button
            onClick={() => {
              deleteExperience(exp._id);
            }}
            type='button'
            className='duration-200 border-b border-b-black md:border-b-0 md:border-r md:border-r-black p-2 md:p-3 flex gap-2 justify-center items-center group text-black w-full h-full'
          >
            <div className='h-4 w-4 md:h-6 md:w-6 overflow-hidden'>
              <div className='group-hover:animate-drift flex duration-200'>
                <img className='h-4 w-4 md:h-6 md:w-6' src={deleteImg}></img>
                <img className='h-4 w-4 md:h-6 md:w-6' src={deleteImg}></img>
              </div>
            </div>
            <span className='hidden md:block font-medium'>Delete</span>
          </button>
          <button
            onClick={() => {
              navigate(`/edit-experience/${exp._id}`)
            }}
            type='button'
            className='duration-200 p-2 md:p-3 flex gap-2 justify-center items-center group text-black w-full'
          >
            <div className='h-4 w-4 md:h-6 md:w-6 overflow-hidden'>
              <div className='group-hover:animate-drift flex duration-200'>
                <img className='h-4 w-4 md:h-6 md:w-6' src={editImg}></img>
                <img className='h-4 w-4 md:h-6 md:w-6' src={editImg}></img>
              </div>
            </div>
            <span className='hidden md:block font-medium'>Edit</span>
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <section>
      <table className='text-center font-montserrat w-full text-xs md:text-base'>
        <thead>
          <tr className='bg-dark text-white'>
            <th className='bg-dark'>Company</th>
            <th className='bg-dark'>Title</th>
            <th className='bg-dark'>Duration</th>
            <th className='bg-dark' />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </section>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
