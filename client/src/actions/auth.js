import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_OTHER_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERR });
  }
};

//Register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(
        setAlert(
          'Your account has been created successfully!',
          'bg-green-600 text-white'
        )
      );
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
        );
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth`, body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(setAlert('Logged in successfully!', 'bg-green-600 text-white'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
        );
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Logout/Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_OTHER_PROFILE });
  dispatch({ type: LOGOUT });
  dispatch(setAlert('Logged out successfully!', 'bg-green-600 text-white'));
};
