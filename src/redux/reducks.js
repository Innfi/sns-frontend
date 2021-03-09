import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
const TIMELINE = 'TIMELINE';
const FOLLOWS = 'FOLLOWS';
const FOLLOWERS = 'FOLLOWERS';
const SUBMIT_TM = 'SUBMIT_TM';

const backendUrl = 'http://localhost:1330';


//state models

const initialState = {
    userId: '',
    nickname: 'bb',
    email: 'bb@cc.com',
    isAuthenticated: false,
    userTimeline: [],
    loadingTimeline: true,
    follows: [],
    followers: []
};

//reducers
const snsReducer = (state = initialState, action) => {
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
            console.log(`timeline called: ${JSON.stringify(action.payload.userTimeline)}`);
            return {
                ...state, 
                userTimeline: action.payload.userTimeline
            };
        case SUBMIT_TM:
            console.log(`submit timeline called: `);
            return state; //FIXME
        case FOLLOWS:
            console.log(`follows called: ${action.payload}`);
            return {
                follows: action.payload.follows
            };
        case FOLLOWERS:
            console.log(`followers called: ${action.payload}`);
            return {
                followers: action.payload.followers
            };
        //TOOD: add state: loading , error, etc
        default: return state;
    }
};

export const rootReducer = combineReducers({snsReducer});

//actions 
export const signUpThunk = (data, history) => async(dispatch, getState) => {
    axios.post(`${backendUrl}/login/signup`, data)
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
    axios.post(`${backendUrl}/login/signin`, data)
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

//loadTimeline
export const loadTimelineThunk = (data, history) => async(dispatch, getState) => {
    const userId = data.userId;
    axios.get(`${backendUrl}/timeline/${userId}`, {
        params: {
            page: 1, 
            limit: 3
        }
    }).then((value) => {
        const response = value.data;
        console.log('timeline response: ', response);

        dispatch({
            type: TIMELINE,
            payload: {
                userTimeline: response.timeline
            }
        });
    });
};

//submitTimeline
export const submitTimelineThunk = (data, history) => async (dispatch, getState) => {
    axios.post(`${backendUrl}/timeline`, data)
    .then((value) => {
        const response = value.data;
        console.log('submitTimeline] response: ', response.data);

        dispatch({
            type: SUBMIT_TM,
            payload: {
                newTimeline: response.data
            }
        }); 

        history.push('/timeline');
    });
};

//loadFollows
export const loadFollowsThunk = (data, history) => async (dispatch, getState) => {
    const userId = getState().userId;
    axios.get(`${backendUrl}/follows/${userId}`)
    .then((value) => {
        const response = value.data;
        console.log(`follows response: ${response}`);

        dispatch({
            type: FOLLOWS,
            payload: {
                follows: response.follows
            }
        });

        history.push('/follows');
    });
};

//loadFollowers
export const loadFollowersThunk = (data, history) => async (dispatch, getState) => {
    const userId = getState().userId;
    axios.get(`${backendUrl}/followers/${userId}`)
    .then((value) => {
        const response = value.data;
        console.log(`follows response: ${response}`);

        dispatch({
            type: FOLLOWERS,
            payload: {
                followers: response.followers
            }
        });

        history.push('/followers');
    });
};

//store
export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);
