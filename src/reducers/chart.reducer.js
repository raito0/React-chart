import { chartConstants } from '../constants/home.constant';

const initState = {
  response: {},
};
export function chartReducer(state = initState, action) {
  switch (action.type) {
    case chartConstants.CHART_REQUEST:
      return {
        ...state
      };
    case chartConstants.CHART_RESPONSE:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function chartReducerTV1(state = initState, action) {
  switch (action.type) {
    case chartConstants.CHART_REQUEST:
      return {
        ...state
      };
    case chartConstants.CHART_RESPONSETV1:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function chartReducerTV2(state = initState, action) {
  switch (action.type) {
    case chartConstants.CHART_REQUEST:
      return {
        ...state
      };
    case chartConstants.CHART_RESPONSETV2:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function chartReducerTV3(state = initState, action) {
  switch (action.type) {
    case chartConstants.CHART_REQUEST:
      return {
        ...state
      };
    case chartConstants.CHART_RESPONSETV3:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function chartReducerUser(state = initState, action) {
  switch (action.type) {
    case chartConstants.CHART_REQUEST:
      return {
        ...state
      };
    case chartConstants.CHART_RESPONSE_USER:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}
export function chartReducerToken(state = initState, action) {
  switch (action.type) {
    case chartConstants.CHART_REQUEST_TOKEN:
      return {
        ...state
      };
    case chartConstants.CHART_RESPONSE_TOKEN:
      return {
        ...state,
        response: action.repos
      };
    default:
      return state
  }
}