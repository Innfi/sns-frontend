import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';

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
                userId: action.payload.userId,
                nickname: action.payload.nickname,
                email: action.payload.email,
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
        default: return state;
    }
};

export const rootReducer = combineReducers({accountReducer});

//actions 
export const signUpThunk = (data, history) => async(dispatch, getState) => {
    axios.post('http://localhost:1330', data)
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
    });
    //const response = await axios.post('http://localhost:1330', data);

    //console.log('signUp response: ', response.data);

    //dispatch({
    //    type: SIGN_UP,
    //    payload: {
    //        userId: response.data.userId,
    //        nickname: response.data.nickname,
    //        email: response.data.email
    //    }
    //});

    //history.push('/signin');
};

export const signInThunk = (data, history) => async (dispatch, getState) => {
    //dummy response
    const response = await axios.post('http://localhost:1330/signin', data);

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
};

//store

export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);
