import {userConstants} from '../constants/login.constant';

export function loginRequest(repos) {
    return {
        type: userConstants.LOGIN_REQUEST,
        repos,
    }
}

export function loginSuccess(repos) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        repos,
    }
}

export function loginFailure(error) {
    return {
        type: userConstants.LOGIN_FAILURE,
        error
    }
}
export function registerRequest(repos) {
    return {
        type: userConstants.REGISTER_REQUEST,
        repos
    }
}
export function registerSuccess(repos) {
    return {
        type: userConstants.REGISTER_SUCCESS,
        repos
    }
}
export function registerFailure(repos) {
    return {
        type: userConstants.REGISTER_FAILURE,
        repos
    }
}