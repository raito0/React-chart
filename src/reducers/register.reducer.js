import { userConstants } from '../constants/login.constant';

const initState = {
    response: {},
    registering: false,
    error: false,
};

export function register( state = initState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
          return {
            ...state,
            registering: false,
        };
        case userConstants.REGISTER_SUCCESS:
          return {
            ...state,
            registering: true,
        };
        case userConstants.REGISTER_FAILURE:
          return {
            ...state,
            registering: false,
            error: true
        };
        default:
          return state
      }
}