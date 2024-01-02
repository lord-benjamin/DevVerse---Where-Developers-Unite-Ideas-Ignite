import React, { useEffect } from 'react';
import githubImg from '../../../../assets/github.svg';
import blackGithubImg from '../../../../assets/blackGithub.svg';
import star from '../../../../assets/star.svg';
import eye from '../../../../assets/eye.svg';
import fork from '../../../../assets/fork.svg';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../../../actions/profile';
import Spinner from '../../../layout/spinner/Spinner';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <section className='mt-6 sm:mt-8'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-2 mb-3 md:mb-6'>
        <h1 className='font-kalnia font-bold text-xl sm:text-2xl'>
          Latest Github Repositories
        </h1>
        <a
          href={`https://github.com/${username}`}
          target='_blank'
          className='text-xs md:text-base flex w-fit relative group rounded-lg font-montserrat font-medium cursor-pointer'
          rel='noreferrer'
        >
          <button
            type='button'
            className='h-full rounded-lg py-2 px-4 bg-black text-white duration-200 flex items-center justify-center gap-1 sm:gap-2'
          >
            <span>Visit Github Account</span>{' '}
            <img src={githubImg} className='h-4 md:h-5 w-4 md:w-5'></img>
          </button>
          <div className='h-full absolute inset-0 scale-0 group-hover:scale-100 rounded-lg bg-white border border-black text-black flex justify-center items-center duration-200 gap-1 sm:gap-2'>
            <span>Visit Github Account</span>{' '}
            <img src={blackGithubImg} className='h-4 md:h-5 w-4 md:w-5'></img>
          </div>
        </a>
      </div>
      <div className='flex flex-col gap-3 md:gap-5'>
        {repos.length === 0 ? (
          <div>
            <Spinner />
            <p className='font-montserrat italic text-sm md:text-base'>
              No repositories found.
            </p>
          </div>
        ) : (
          repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target='_blank'
              rel='noreferrer'
              className='h-full w-full text-white group'
            >
              <div className='rounded-lg w-full h-full bg-gradient-to-br md:bg-gradient-to-r from-dark via-black to-light p-3 md:p-5 duration-200'>
                <div className='flex flex-col md:flex-row gap-5 md:gap-8 justify-between items-center font-montserrat'>
                  <div className='flex flex-col gap-1 text-center md:text-left h-full w-full md:w-3/4 items-center md:items-start'>
                    <h1 className='font-bold text-base md:text-xl group-hover:underline'>
                      {repo.name}
                    </h1>
                    <p className='text-xs md:text-base text-gray-200 font-medium group-hover:underline'>
                      {repo.description}
                    </p>
                  </div>
                  <div className='flex flex-row md:flex-col items-end justify-center h-full w-full md:w-1/4 font-medium gap-3 md:gap-1 flex-wrap text-sm md:text-base'>
                    <div className='bg-white px-2 py-1 text-black flex justify-center items-center gap-2 rounded-lg'>
                      <img src={star} className='h-4 w-4'></img>
                      <span>{repo.stargazers_count} Stars</span>
                    </div>
                    <div className='bg-dark px-2 py-1 text-white flex justify-center items-center gap-2 rounded-lg'>
                      <img src={eye} className='h-4 w-4'></img>
                      <span>{repo.watchers_count} Watchers</span>
                    </div>
                    <div className='bg-black px-2 py-1 text-white flex justify-center items-center gap-2 rounded-lg'>
                      <img src={fork} className='h-4 w-4'></img>
                      <span>{repo.forks_count} Forks</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
