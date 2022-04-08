import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SIGNUP_RESP = 'SIGNUP_RESP';
const SIGNIN_RESP = 'SIGNIN_RESP';
const SIGNOUT_RESP = 'SIGNOUT_RESP';
const LOAD_TIMELINE_RESP = 'LOAD_TIMELINE_RESP';
const SUBMIT_TIMELINE_RESP = 'SUBMIT_TIMELINE_RESP';
const ERROR = 'ERROR';
const TEMP_RESP = 'TEMP_RESP';
const TOGGLE_DRAWER_VISIBILITY = 'TOGGLE_DRAWER_VISIBILITY';
const NO_ACTION = 'NO_ACTION';

// state model
const initialState = {
  authData: {
    userId: '',
    nickname: '',
    email: '',
    token: '',
  },
  errorMsg: '',
  userData: {},
  timeline: [
    {
      authorId: 'innfi',
      text: 'timeline starts from here',
      date: new Date(),
      tmId: 'dummy1',
    },
    {
      authorId: 'ennfi',
      text: 'congrats!',
      date: new Date(),
      tmId: 'dummy2',
    },
  ],
  drawerVisible: false,
};

// reducers
const snsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_RESP:
      return {
        ...state,
        authData: action.payload.authData,
      };
    case SIGNIN_RESP:
      return {
        ...state,
        authData: action.payload.authData,
      };
    case SIGNOUT_RESP:
      return {
        ...state,
        authData: {
          userId: '',
          nickname: '',
          email: '',
          token: '',
        },
      };
    case ERROR:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
      };
    case LOAD_TIMELINE_RESP:
      return {
        ...state,
        timeline: [action.payload.userTimeline, ...state.timeline],
      };
    case SUBMIT_TIMELINE_RESP:
      return {
        ...state,
        timeline: [action.payload.newTimeline, ...state.timeline],
      };
    case TEMP_RESP:
      return {
        ...state,
        userData: action.payload.userData,
      };
    case TOGGLE_DRAWER_VISIBILITY:
      return {
        ...state,
        drawerVisible: action.payload.toggleDrawer,
      };
    case NO_ACTION:
      return state;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ snsReducer });

// store
export const store = createStore(rootReducer, applyMiddleware(thunk));

// actions
export const signUpThunk = (data, history) => async (dispatch) => {
  axios
    .post(`${backendUrl}/signup`, data)
    .then((value) => {
      const response = value.data;

      dispatch({
        type: SIGNUP_RESP,
        payload: {
          authData: {
            userId: response.userId,
            email: response.email,
          },
        },
      });

      history.push('/signin');
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        payload: {
          errorMsg: 'signUpThunk failed',
          msg: err,
        },
      });

      history.push('/signup');
    });
};

export const signInThunk = (data, history) => async (dispatch) => {
  axios.post(`${backendUrl}/signin`, data).then((value) => {
    const response = value.data;

    dispatch({
      type: SIGNIN_RESP,
      payload: {
        authData: {
          userId: response.userId,
          nickname: response.nickname,
          email: response.email,
          token: response.jwtToken,
        },
      },
    });

    history.push('/entry');
  });
};

// localTimeline
export const loadTimelineThunk = (data) => async (dispatch, getState) => {
  const { userId } = data;
  const url = `${backendUrl}/timeline/${userId}`;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getState().snsReducer.authData.token}`,
      },
      params: {
        // fixme
        page: 0,
        limit: 3,
      },
    })
    .then((value) => {
      const response = value.data;
      if (!response.timeline || response.timeline.length <= 0) {
        dispatch({ type: NO_ACTION, payload: {} });
        return;
      }

      dispatch({
        type: LOAD_TIMELINE_RESP,
        payload: {
          userTimeline: response.timeline,
        },
      });

      // history.push(`/timeline`);
    });
};

// submitTimeline
export const submitTimelineThunk = (data) => async (dispatch) => {
  const { authData } = store.getState().snsReducer;
  const { userId } = authData;
  const { nickname } = authData;

  axios
    .post(
      `${backendUrl}/timeline/${userId}`,
      {
        authorId: nickname,
        text: data.text,
      },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      },
    )
    .then((value) => {
      const response = value.data;
      dispatch({
        type: SUBMIT_TIMELINE_RESP,
        payload: {
          newTimeline: response.newTimeline,
        },
      });
    });
};

export const submitTimelineMediaThunk = (data) => async (dispatch) => {
  const { authData } = store.getState().snsReducer;
  const { userId } = authData;

  axios
    .post(`${backendUrl}/timeline/media/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
    .then((value) => {
      const response = value.data;

      dispatch({ type: NO_ACTION, paylaod: { response } });
    });
};

// toggleDrawer
export const toggleDrawer = (toggle) => async (dispatch) => {
  dispatch({
    type: TOGGLE_DRAWER_VISIBILITY,
    payload: {
      toggleDrawer: toggle,
    },
  });
};

// signoutThunk
export const signoutThunk = (history) => async (dispatch) => {
  dispatch({
    type: SIGNOUT_RESP,
  });

  history.push('/signin');
};
