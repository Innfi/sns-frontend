import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const SIGNUP_RESP = 'SIGNUP_RESP';
const SIGNIN_RESP = 'SIGNIN_RESP';
const ERROR = 'ERROR';

//state model
const initialState = {
    authData: {
        email: '',
        token: '',
    },
    errorMsg: ''
};

//reducers
const snsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP_RESP:
            console.log(`reducer: authData: ${JSON.stringify(action.payload.authData)}`);
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
        default: 
            return state;
    }
};

export const rootReducer = combineReducers({snsReducer})

//actions 
export const signUpThunk = (data, history) => async(dispatch, getState) => {
    console.log(process.env.BACKEND_URL);
    axios.post(`http://localhost:1330/login/signup`, data)
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
    axios.post(`http://localhost:1330/login/signin`, data) 
    .then((value) => {
        const response = value.data;
        console.log(`signin response: ${JSON.stringify(response)}`);

        dispatch({
            type: SIGNIN_RESP,
            payload: {
                authData: {
                    email: response.email,
                    token: response.token
                }
            }
        })
    });
};

//store 
export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);