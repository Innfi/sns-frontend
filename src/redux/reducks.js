import { createStore, combineReducers, bindActionCreators, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


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
        case SIGN_UP: 
            return {
                userId: state.userId,
                nickname: state.nickname,
                email: state.nickname
            };
        default: return state;
    }
};

export const rootReducer = combineReducers({accountReducer});

//actions 

export const dummySignUp = () => {
    return {
        type: SIGN_UP,
        payload: {
            userId: '111',
            nickname: 'none',
            email: 'not@exist.com',
        }
    };
};

export const signUpThunk = () => async(dispatch, getState) => {
    const response = await axios.get('http://localhost:3001/users/123');
    console.log('from axios.get: ', response.data);

    dispatch({
        type: SIGN_UP,
        payload: {
            userId: '111',
            nickname: 'none',
            email: 'not@exist.com',
        }
    });
};

//store

export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);

export const loginActions = bindActionCreators(
    {
        signUpThunk
    },
    store.dispatch
)
