import {
    all, fork
  } from 'redux-saga/effects';
import loginSaga from './sagas/login.saga';
import registerSaga from './sagas/register.saga';
import userSaga from './sagas/home.saga';
import table2Saga from './sagas/component.saga';
import chartSaga from './sagas/chart.saga';
function* rootSaga() {
  yield all([
    fork(loginSaga),
    registerSaga(),
    userSaga(),
    table2Saga(),
    chartSaga(),
  ]);
}

export default rootSaga;
  