import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialReducer = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.idToken,
        userId: action.userId,
        error: null
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};

const reducer = (state = initialReducer, action) => {
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state);
        default: return state;
    }
};

export default reducer;
