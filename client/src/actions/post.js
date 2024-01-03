import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_COMMENT,
  ADD_POST,
  CLEAR_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_COMMENT_DISLIKES,
  UPDATE_COMMENT_LIKES,
  UPDATE_DISLIKES,
  UPDATE_LIKES,
} from './types';

//Get all posts
export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: CLEAR_POST });

  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Add like
export const addLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/like`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Remove like
export const removeLike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/unlike`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Add dislike
export const addDislike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/dislike`);
    dispatch({
      type: UPDATE_DISLIKES,
      payload: { post_id, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Remove dislike
export const removeDislike = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/undislike`);
    dispatch({
      type: UPDATE_DISLIKES,
      payload: { post_id, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Delete post
export const deletePost = (post_id) => async (dispatch) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}`);

    dispatch({
      type: DELETE_POST,
      payload: post_id,
    });
    dispatch(setAlert('Post deleted successfully.', 'bg-green-600 text-white'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post created successfully.', 'bg-green-600 text-white'));

    return 'OK';
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
      );
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get post by id
export const getPostById = (post_id) => async (dispatch) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Add comment
export const addComment = (post_id,formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/comment`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment added successfully.', 'bg-green-600 text-white'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'bg-red-600 text-white'))
      );
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete comment
export const deleteComment = (post_id,comment_id) => async (dispatch) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/comment/${comment_id}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: comment_id,
    });
    dispatch(setAlert('Comment deleted successfully.', 'bg-green-600 text-white'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Add comment like
export const addCommentLike = (post_id,comment_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/comment/${comment_id}/like`);
    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: { comment_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Remove comment like
export const removeCommentLike = (post_id,comment_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/comment/${comment_id}/unlike`);
    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: { comment_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Add comment dislike
export const addCommentDislike = (post_id,comment_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/comment/${comment_id}/dislike`);
    dispatch({
      type: UPDATE_COMMENT_DISLIKES,
      payload: { comment_id, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};

//Remove comment dislike
export const removeCommentDislike = (post_id,comment_id) => async (dispatch) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${post_id}/comment/${comment_id}/undislike`);
    dispatch({
      type: UPDATE_COMMENT_DISLIKES,
      payload: { comment_id, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert(err.response.data.msg, 'bg-red-600 text-white'));
  }
};
