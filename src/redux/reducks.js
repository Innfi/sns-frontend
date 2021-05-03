import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SIGNUP_RESP = 'SIGNUP_RESP';
const SIGNIN_RESP = 'SIGNIN_RESP';
const ERROR = 'ERROR';

const backendUrl = 'http://localhost:1330'; //FIXME


//state model
const initialState = {
    authData: {
        email: 'init@test.com',
        token: '',
    },
    errorMsg: ''
};

//reducers
const snsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP_RESP:
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
    axios.post(`${backendUrl}/login/signup`, data)
    .then((value) => {
        const response = value.data;

        dispatch({
            type: SIGNUP_RESP,
            payload: {
                authData: {
                    email: response.email,
                    token: response.token
                }
            }
        })
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

//store 
export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);