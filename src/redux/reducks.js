import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const SIGNUP_RESP = 'SIGNUP_RESP';
const SIGNIN_RESP = 'SIGNIN_RESP';
const TEMP_RESP = 'TEMP_RESP';
const ERROR = 'ERROR';

//state model
const initialState = {
    authData: {
        email: '',
        token: '',
    },
    errorMsg: '',
    userData: {}
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
        case TEMP_RESP:
            return {
                ...state,
                userData: action.payload.userData
            };
        default: 
            return state;
    }
};

export const rootReducer = combineReducers({snsReducer})

//actions 
export const signUpThunk = (data, history) => async(dispatch, getState) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login/signup`, data)
    .then((value) => {
        const response = value.data;

        dispatch({
            type: SIGNUP_RESP,
            payload: {
                authData: {
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login/signin`, data) 
    .then((value) => {
        const response = value.data;

        dispatch({
            type: SIGNIN_RESP,
            payload: {
                authData: {
                    email: response.email,
                    token: response.token.jwtToken
                }
            }
        }); 

        history.push('/temp');
    });
};

export const tempThunk = (data, history) => async (dispatch, getState) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/temp`, {
        headers: {
            "Authorization": `Bearer ${getState().snsReducer.authData.token}`
        }
    })
    .then((value) => {
        const response = value.data;

        dispatch({
            type: TEMP_RESP,
            payload: {
                userData: response
            }
        });

        history.push('/temp');
    });
};

//store 
export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);