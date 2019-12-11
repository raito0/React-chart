import { userConstants } from '../constants/login.constant';
import { takeLatest, put } from  'redux-saga/effects';
import { apiAlexfu } from '../constants/api';
import axios from 'axios';
import { registerFailure, registerSuccess } from '../actions/login.action';

function* requestRegister(registerParams) {
  const {
      repos
  } = registerParams;
  const bodyRegisterApi = {
      "wpKAuthDto": {
        "secret": `${repos.password}`
      },
      "wpKMemberDto": {
        "email": `${repos.email}`,
        "gender": `${repos.gender}`,
        "identifier": `${repos.username}`,
        "mobile": ``, //import to mobile
        "given": `${repos.firstname}`,
        "family": `${repos.lastname}`
      }
  };
  const registerApi = apiAlexfu + "/member/registration";
  const RequestRegister = yield axios.post(registerApi, bodyRegisterApi, {
    headers: {
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
      'Content-Type': 'application/json',
    }
  }).then(res=>res).catch(err=>console.log('Api err', err));
  try{
    if(RequestRegister.data) {
      const loginApi = `http://54.251.165.42:8080/alexfu-web-application/oauth/token?grant_type=password&username=${repos.username}&password=${repos.password}&scope=all`;
      const fetchLoginApi = yield axios.post(loginApi, null, {
        headers: {
          'Authorization': 'Basic YWRtaW46YWRtaW4=',
          'Content-Type': 'application/json',
        }
      }).then(res=>res).catch(err=>{
        console.log(err)
      });
      if(fetchLoginApi.data.access_token && fetchLoginApi.status === 200) {
        document.cookie=`access_token=[${fetchLoginApi.data.access_token}]`;
      }
      yield put(registerSuccess());
    } else {
      yield put(registerFailure());
    }
  }catch{
    yield put(registerFailure());
  }
  
}
export default function* registerAPI() {
    yield takeLatest(userConstants.REGISTER_REQUEST, requestRegister);
}
  