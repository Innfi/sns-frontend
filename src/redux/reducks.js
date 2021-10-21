import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SIGNUP_RESP = 'SIGNUP_RESP';
const SIGNIN_RESP = 'SIGNIN_RESP';
const LOAD_TIMELINE_RESP = 'LOAD_TIMELINE_RESP';
const SUBMIT_TIMELINE_RESP = 'SUBMIT_TIMELINE_RESP';
const ERROR = 'ERROR';
const TEMP_RESP = 'TEMP_RESP';
const TOGGLE_DRAWER_VISIBILITY = 'TOGGLE_DRAWER_VISIBILITY';
const NO_ACTION = 'NO_ACTION';

//state model
const initialState = {
    authData: {
        userId: '',
        nickname: '',
        email: '',
        token: '',
    },
    errorMsg: '',
    userData: {},
    timeline: [{
        authorId: 'innfi',
        text: 'timeline starts from here', 
        date: new Date(), 
        tmId: 'dummy1'
    }, {
        authorId: 'ennfi',
        text: 'congrats!',
        date: new Date(), 
        tmId: 'dummy2'
    }], 
    drawerVisible: false
};

//reducers
const snsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP_RESP:
            return {
                ...state, 
                authData: action.payload.authData
            };
        case SIGNIN_RESP: 
            return {
                ...state, 
                authData: action.payload.authData
            };
        case ERROR:
            return {
                ...state, 
                errorMsg: action.payload.errorMsg
            };
        case LOAD_TIMELINE_RESP:
            return {
                ...state,
                timeline: [ action.payload.userTimeline, ...state.timeline ]
            };
        case SUBMIT_TIMELINE_RESP:
            return {
                ...state,
                timeline: [ action.payload.newTimeline, ...state.timeline ] 
            };
        case TEMP_RESP:
            return {
                ...state,
                userData: action.payload.userData
            };
        case TOGGLE_DRAWER_VISIBILITY:
            return {
                ...state,
                drawerVisible: action.payload.toggleDrawer
            };
        case NO_ACTION: 
            return state;
        default: 
            return state;
    }
};

export const rootReducer = combineReducers({snsReducer})

//actions 
export const signUpThunk = (data, history) => async(dispatch, getState) => {
    axios.post(`${backendUrl}/signup`, data)
    .then((value) => {
        const response = value.data;

        console.log(`resp.userId: ${response.userId}`);
        console.log(`resp.email: ${response.email}`);

        dispatch({
            type: SIGNUP_RESP,
            payload: {
                authData: {
                    userId: response.userId,
                    email: response.email
                }
            }
        })

        history.push('/signin');
    }) 
    .catch((err) => {
        dispatch({
            type: ERROR, 
            payload: {
                errorMsg: 'signUpThunk failed'
            }
        });

        history.push('/signup');
    });
};

export const signInThunk = (data, history) => async (dispatch, getState) => {
    axios.post(`${backendUrl}/signin`, data) 
    .then((value) => {
        const response = value.data;

        console.log(`signIn response: ${JSON.stringify(response)}`);
        console.log(`signIn response: ${response.nickname}`);

        dispatch({
            type: SIGNIN_RESP,
            payload: {
                authData: {
                    userId: response.userId,
                    nickname: response.nickname, 
                    email: response.email,
                    token: response.jwtToken
                }
            }
        }); 

        history.push('/entry');
    });
};

//localTimeline
export const loadTimelineThunk = (data, history) => async(dispatch, getState) => {
    const userId = data.userId;    
    const url = `${backendUrl}/timeline/${userId}`;

    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${getState().snsReducer.authData.token}`
        },
        params: { //fixme
            page: 0, 
            limit: 3
        }
    })
    .then((value) => {
        const response = value.data;
        if(!response.timeline || response.timeline.length <= 0) {
            dispatch({ type: NO_ACTION, payload: {} });
            return;
        }

        dispatch({
            type: LOAD_TIMELINE_RESP,
            payload: {
                userTimeline: response.timeline 
            }
        });

        //history.push(`/timeline`);
    });
};

//submitTimeline
export const submitTimelineThunk = (data, history) => async (dispatch, getState) => {
    const authData = store.getState().snsReducer.authData;
    const userId = authData.userId;
    const nickname = authData.nickname;

    axios.post(`${backendUrl}/timeline/${userId}`, {
        authorId: nickname, 
        text: data.text
    }, {
        headers: {
            "Authorization": `Bearer ${authData.token}`
        }
    })
    .then((value) => {
        const response = value.data;
        console.log(`response: ${JSON.stringify(response)}`);

        dispatch({
            type: SUBMIT_TIMELINE_RESP,
            payload: {
                newTimeline: response.newTimeline
            }
        });
    });
};

export const submitTimelineMediaThunk = (data, history) => async (dispatch, getState) => {
    //const userId = data.userId;
    const authData = store.getState().snsReducer.authData;
    const userId = authData.userId;

    axios.post(`${backendUrl}/timeline/media/${userId}`, data, {
        headers: {
            "Authorization": `Bearer ${authData.token}`
        }
    })
    .then((value) => {
        const response = value.data;
        console.log(`response: ${JSON.stringify(response)}`);

        dispatch({ type: NO_ACTION, paylaod: {} });
        // dispatch({
        //     type: SUBMIT_TIMELINE_RESP,
        //     paload: {
        //         //TODO: handle multipart response 
        //     }
        // });
    });
};

//toggleDrawer
export const toggleDrawer = (toggle) => async(dispatch, getState) => {
    dispatch({
        type: TOGGLE_DRAWER_VISIBILITY,
        payload: {
            toggleDrawer: toggle
        }
    });
};

//signoutThunk
export const signoutThunk = (history) => async (dispatch, getState) => {
    //TODO
};

//store 
export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);