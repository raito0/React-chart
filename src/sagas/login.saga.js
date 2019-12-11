import { userConstants } from '../constants/login.constant';
import { loginSuccess, loginFailure } from '../actions/login.action';
import {
    put, takeLatest
  } from 'redux-saga/effects';
import axios from 'axios';
import {apiAlexfu} from '../constants/api'
function* getToken(loginParams) {
  const {
    repos
  } = loginParams;
  const loginApi = `${apiAlexfu}/oauth/token?grant_type=password&username=${repos.username}&password=${repos.password}&scope=all`;
  const fetchLoginApi = yield axios.post(loginApi, null, {
    headers: {
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
      'Content-Type': 'application/json',
    }
  }).then(res=>res).catch(err=>{
    console.log(err)
  });
  try {
    if(fetchLoginApi.data.access_token && fetchLoginApi.status === 200) {
      document.cookie=`access_token=[${fetchLoginApi.data.access_token}]`;
      yield put(loginSuccess(fetchLoginApi.data));
    } else {
      yield put(loginFailure("Username and password incorrect"))
    }
  } catch (err) {
    yield put(loginFailure('Api request error'))
  }
}

export default function* getAPI() {
    yield takeLatest(userConstants.LOGIN_REQUEST, getToken);
}
  