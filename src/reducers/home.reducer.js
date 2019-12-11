import { homeConstants, userBox2Constants, box3Constants, userBox1Constants } from '../constants/home.constant';

const initState = {
  response: {},
};
export function homeAfterLogin(state = initState, action) {
  switch (action.type) {
    case homeConstants.USER_REQUEST:
      return {
        ...state,
        response: action.repos
      };
    case homeConstants.USER_RESPONSE:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function userBox2Reducer(state = initState, action) {
  switch (action.type) {
    case userBox2Constants.USER_REQUEST_SEARCH_BOX2:
      return {
        ...state,
        response: action.repos
      };
    case userBox2Constants.USER_RESPONSE_BOX2:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function userBox2TableReducer(state = initState, action) {
  switch (action.type) {
    case userBox2Constants.USER_REQUEST_TABLE_BOX2:
      return {
        ...state,
        response: action.repos
      };
    case userBox2Constants.USER_RESPONSE_TABLE_BOX2:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
const initStateBox3 = {
  response: {},
  register: false,
  delete: false
}
export function box3Reducer(state = initStateBox3, action) {
  switch (action.type) {
    case box3Constants.USER_REQUEST_BOX3:
      return {
        ...state,
        response: action.repos
      };
    case box3Constants.USER_REQUEST_CHANGE_FLAG:
      return {
        ...state
      };
    case box3Constants.USER_RESPONSE_BOX3:
      return {
        ...state,
        register: true
      };
    case box3Constants.USER_RESPONSE_CHANGE_FLAG:
      return {
        ...state,
        register: false
      };
    default:
      return state
  }
}
export function box1Reducer(state = initState, action) {
  switch (action.type) {
    case userBox2Constants.USER_REQUEST_TABLE_BOX1:
      return {
        ...state
      };
    case userBox2Constants.USER_RESPONSE_TABLE_BOX1:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function getPorforlioId(state = initState, action) {
  switch (action.type) {
    case userBox2Constants.GET_PORFORLIO:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function box3DelReducer(state = initStateBox3, action) {
  switch (action.type) {
    case box3Constants.USER_REQUEST_DEL_BOX3:
      return {
        ...state,
        response: action.repos
      };
    case box3Constants.USER_RESPONSE_DEL_BOX3:
      return {
        ...state,
        delete: true
      };
      case box3Constants.USER_REQUEST_DEL_CHANGE_FLAG:
      return {
        ...state
      };
      case box3Constants.USER_RESPONSE_DEL_CHANGE_FLAG:
      return {
        ...state,
        delete: false
      };
    default:
      return state
  }
}
const initStateBox1 = {
  response: {},
  delete: false,
  register: false
}
export function box1DelReducer(state = initStateBox1, action) {
  switch (action.type) {
    case userBox1Constants.USER_REQUEST_DEL:
      return {
        ...state,
        response: action.repos
      };
    case userBox1Constants.USER_RESPONSE_DEL:
      return {
        ...state,
        delete: true
      };
    default:
      return state
  }
}
export function saveBox1Reducer(state = initStateBox1, action) {
  switch (action.type) {
    case userBox2Constants.SAVE_BOX1:
      return {
        ...state,
        response: action.repos
      };
    case userBox2Constants.RESPONSE_SAVE_BOX1:
      return {
        ...state,
        register: true,
      };
      case userBox1Constants.USER_REQUEST_DEL_CHANGE_FLAG:
      return {
        ...state
      };
      case userBox1Constants.USER_RESPONSE_DEL_CHANGE_FLAG:
      return {
        ...state,
        register: false,
      };
    default:
      return state
  }
}