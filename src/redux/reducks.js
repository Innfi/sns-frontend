import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';

//state models

const initialState = {
    nickname: 'bb',
    email: 'bb@cc.com',
    isAuthenticated: false,
    userTimeline: []
};

//reducers

const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN: return state;
            //return { //FIXME

            //};
        case SIGN_UP:
            console.log('signup called: ', action.payload);
            return {
                nickname: action.payload.nickname,
                email: action.payload.email,
                isAuthenticated: action.payload.isAuthenticated,
                userTimeline: action.payload.userTimeline
            };
        default: return state;
    }
};

export const rootReducer = combineReducers({accountReducer});

//actions 
export const signUpThunk = (data, history) => async(dispatch, getState) => {
    const response = await axios.post('http://localhost:1330', data);

    console.log('response: ', response.data);

    dispatch({
        type: SIGN_UP,
        payload: {
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
