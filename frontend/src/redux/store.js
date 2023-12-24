import { defaults } from 'minimatch';
import { combineReducers, createStore } from 'redux';

const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_SITES = 'SET_SITES';
const SET_USERS = 'SET_USERS';

export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH,
    payload: isAuth
})

export const setSites = (sites) => ({
    type: SET_SITES,
    payload: sites
})

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
})

const initialState = {
    is_auth: false,
    sites: [],
    users: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return { ...state, is_auth: action.payload }
        case SET_SITES:
            return { ...state, sites: action.payload }
        case SET_USERS:
            return { ...state, users: action.payload }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    app: appReducer,
});

export const store = createStore(rootReducer);