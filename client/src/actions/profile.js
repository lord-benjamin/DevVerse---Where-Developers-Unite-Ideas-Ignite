import axios from 'axios';
import { setAlert } from './alert';
import {
  ACCOUNT_DELETED,
  GET_PROFILE,
  GET_OTHER_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CLEAR_OTHER_PROFILE,
  FOLLOW_ADDED,
  FOLLOW_REMOVED,
  NO_REPOS,
  DELETE_ALL_POSTS,
  GET_ALL_POSTS,
} from './types';

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    // dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_OTHER_PROFILE });

  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile`);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Get profile by id
export const getProfileById = (user_id) => async (dispatch) => {
  
  try {
    const res = await axios.get(`/api/profile/user/${user_id}`);
    // dispatch({ type: CLEAR_OTHER_PROFILE });
    dispatch({
      type: GET_OTHER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Get Github Repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Create or update profile
export const createAndEditProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_OTHER_PROFILE,
      });

      dispatch(
        setAlert(
          edit
            ? 'Profile updated successfully!'
            : 'Profile created successfully!',
          'bg-green-600 text-white'
        )
      );

      return 'OK';
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

//Add experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(
        'Experience details added successfully!',
        'bg-green-600 text-white'
      )
    );

    return 'OK';
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Edit experience
export const editExperience = (formData, exp_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/profile/experience/${exp_id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert('Experience updated successfully!', 'bg-green-600 text-white')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete experience
export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${exp_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert('Experience removed successfully!', 'bg-green-600 text-white')
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Add education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        'Education details added successfully!',
        'bg-green-600 text-white'
      )
    );

    return 'OK';
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Edit education
export const editEducation = (formData, edu_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/profile/education/${edu_id}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert('Education updated successfully!', 'bg-green-600 text-white')
    );
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete education
export const deleteEducation = (edu_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${edu_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert('Education removed successfully!', 'bg-green-600 text-white')
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Delete account
export const deleteAccount = (deletePosts) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.delete(
      '/api/users',
      { data: { deletePosts: deletePosts } },
      config
    );

    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: CLEAR_OTHER_PROFILE,
    });
    dispatch({
      type: ACCOUNT_DELETED,
    });

    dispatch(
      setAlert(
        'Your account has been permanently deleted!',
        'bg-gradient-to-r from-dark to-light text-white'
      )
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Follow a profile
export const followUser = (user_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/user/${user_id}/follow`);
    dispatch({
      type: FOLLOW_ADDED,
      payload: {user_id,followers: res.data.targetFollowers,following: res.data.userFollowing},
    });
    dispatch(
      setAlert(
        'You have successfully followed the user.',
        'bg-green-600 text-white'
      )
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Unfollow a profile
export const unfollowUser = (user_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/user/${user_id}/unfollow`);
    dispatch({
      type: FOLLOW_REMOVED,
      payload: {user_id,followers: res.data.targetFollowers,following: res.data.userFollowing},
    });
    dispatch(
      setAlert('You are not following the user now.', 'bg-green-600 text-white')
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Get all user's posts
export const getAllUserPosts = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${user_id}/posts`);

    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Delete all user's posts
export const deleteAllPosts = () => async (dispatch) => {
  try {
    await axios.delete('/api/posts');

    dispatch({
      type: DELETE_ALL_POSTS
    });
    dispatch(setAlert('All your posts have been deleted.', 'bg-gradient-to-r from-dark to-light text-white'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};
