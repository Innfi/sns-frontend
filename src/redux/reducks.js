import { createStore, combineReducers } from 'redux';


const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';

//state models

const initialState = {
    userId: 'aa',
    nickname: 'bb',
    email: 'bb@cc.com'
};

//reducers

const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN: return state;
            //return { //FIXME

            //};
        case SIGN_UP: return state;
            //return { //FIXME

            //};
        default: return state;
    }
};

export const rootReducer = combineReducers({accountReducer});

//actions 

export const signUp = (signUpInfo) => ({
    type: SIGN_UP, 
    payload: {
        signUpInfo
    }
});

export const signIn = (signInInfo) => ({
    type: SIGN_IN,
    payload: {
        signInInfo
    }
});

//store

export const store = createStore(rootReducer);