import { tableComponentConstants } from '../constants/home.constant';

const initState = {
  response: {},
};
export function tableBox2(state = initState, action) {
  switch (action.type) {
    case tableComponentConstants.TABLE_REQUEST:
      return {
        ...state
      };
    case tableComponentConstants.TABLE_REQUEST1:
      return {
        ...state
      };
    case tableComponentConstants.TABLE_REQUEST2:
      return {
        ...state
      };
    case tableComponentConstants.TABLE_REQUEST3:
      return {
        ...state
      };
    case tableComponentConstants.TABLE_RESPONSE:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
};
export function dataUserBox2(state = initState, action) {
  switch (action.type) {
    case tableComponentConstants.TABLE_REQUEST_USER:
      return {
        ...state
      };
    case tableComponentConstants.TABLE_RESPONSE_USER:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}