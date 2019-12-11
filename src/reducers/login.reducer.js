import { userConstants } from '../constants/login.constant';

const initState = {
    response: {},
    loading: false,
    loggingIn: false,
    error: false,
};
export function usersLogin(state = initState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        response: action.repos,
        loggingIn: true,
        loading: false
      };
    case userConstants.LOGIN_FAILURE:
      return { 
        ...state,
        response: action.repos,
        loading: false,
        loggingIn: false,
        error: true
      };
    default:
      return state
  }
}