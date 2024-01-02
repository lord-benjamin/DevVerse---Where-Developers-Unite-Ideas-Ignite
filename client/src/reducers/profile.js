import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  CLEAR_OTHER_PROFILE,
  GET_OTHER_PROFILE,
  FOLLOW_ADDED,
  FOLLOW_REMOVED,
  NO_REPOS,
  GET_ALL_POSTS,
  DELETE_ALL_POSTS,
} from '../actions/types';

const initialState = {
  profile: null,
  otherProfile: null,
  profiles: [],
  repos: [],
  userPosts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_OTHER_PROFILE:
      return {
        ...state,
        otherProfile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case FOLLOW_ADDED:
    case FOLLOW_REMOVED:
      return {
        ...state,
        // profile: {...state.profile, following: payload.following},
        // profiles: state.profiles.map(profile => profile.user._id===payload.user_id ? {...profile,followers: payload.followers} : profile),
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case NO_REPOS:
      return {
        ...state,
        repos: [],
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        userPosts: [],
        loading: false,
      };
    case CLEAR_OTHER_PROFILE:
      return {
        ...state,
        otherProfile: null,
        repos: [],
        userPosts: [],
        loading: false,
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        userPosts: payload,
        loading: false,
      };
    case DELETE_ALL_POSTS:
      return {
        ...state,
        userPosts: [],
        loading: false,
      };
    default:
      return state;
  }
}
