import { createStore, combineReducers, bindActionCreators, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';

//state models

const initialState = {
    nickname: 'bb',
    email: 'bb@cc.com',
    isAuthenticated: false
};

//reducers

const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN: return state;
            //return { //FIXME

            //};
        case SIGN_UP:
            console.log('signup called');
            return {
                nickname: action.payload.nickname,
                email: action.payload.email,
                isAuthenticated: action.payload.isAuthenticated
            };
        default: return state;
    }
};

export const rootReducer = combineReducers({accountReducer});

//actions 
export const signUpThunk = (data) => async(dispatch, getState) => {
    console.log('data: ', data);
    const response = await axios.post('http://localhost:1330', data);

    dispatch({
        type: SIGN_UP,
        payload: {
            nickname: response.data.nickname,
            email: response.data.email,
            isAuthenticated: true
        }
    });
};

//store

export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);
