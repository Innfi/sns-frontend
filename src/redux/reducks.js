import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
const TIMELINE = 'TIMELINE';
const FOLLOWS = 'FOLLOWS';
const FOLLOWERS = 'FOLLOWERS';

//state models

const initialState = {
    userId: '',
    nickname: 'bb',
    email: 'bb@cc.com',
    isAuthenticated: false,
    userTimeline: []
};

//reducers

const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN: 
            console.log('signup called: ', action.payload);
            return { 
                isAuthenticated: action.payload.isAuthenticated,
                userTimeline: action.payload.userTimeline
            };
        case SIGN_UP:
            console.log('signup called: ', action.payload);
            return {
                userId: action.payload.userId,
                nickname: action.payload.nickname,
                email: action.payload.email
            };
        case TIMELINE:
            console.log(`timeline called: ${action.payload}`);
            return {
                userTimeline: action.payload.userTimeline
            };
        //TOOD: add state: loading , error, etc
        default: return state;
    }
};

export const rootReducer = combineReducers({accountReducer});

//actions 
export const signUpThunk = (data, history) => async(dispatch, getState) => {
    axios.post('http://localhost:1330/login/signup', data)
    .then((value) => {
        const response = value.data;
        console.log('signUp response: ', response);

        dispatch({
            type: SIGN_UP,
            payload: {
                userId: response.userId,
                nickname: response.nickname,
                email: response.email
            }
        });

        history.push('/signin');
    })
    .catch((reason) => {
        console.log('catch: ', reason);
        //TODO: error handling page
    });
};

export const signInThunk = (data, history) => async (dispatch, getState) => {
    //dummy response
    axios.post('http://localhost:1330/login/signin', data)
    .then((value) => {
        const response = value.data;
        console.log('signIn response: ', response.data);

        dispatch({
            type: SIGN_IN,
            payload: {
                userId: response.data.userId,
                nickname: response.data.nickname,
                email: response.data.email,
                isAuthenticated: response.data.isAuthenticated,
                userTimeline: response.data.userTimeline
            }
        });

        history.push('/private');
    })
    .catch((reason) => {
        console.log('catch: ', reason);
        //TODO: error handling page
    });
};

export const loadTimelineThunk = (data, history) => async(dispatch, getState) => {
    const userId = getState().userId;
    axios.get(`http://localhost:1330/timeline/${userId}`)
    .then((value) => {
        const response = value.data;
        console.log('timeline response: ', response.data);

        dispatch({
            type: TIMELINE,
            payload: {
                userTimeline: response.data.timeline
            }
        });

        history.push('/timeline');
    });
};

//store

export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);
