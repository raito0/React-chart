import { userResponse, userBox2Response, userBox2ResponseTable, box3Response, box3ResponseChangeFlag, box3ResponseDel, box3ResponseDelChangeFlag, userResponseBox1, getPorforlioId, responseDelUserBox1, responseChangeFlagDelBox1, responsesaveBox1 } from '../actions/home.action';
import {
  put, takeLatest
} from 'redux-saga/effects';
import axios from 'axios';
import { apiAlexfu } from '../constants/api';
import { homeConstants, userBox2Constants, box3Constants, userBox1Constants } from '../constants/home.constant';

function* getDataUser(userParams) {
  const userHomeApi = apiAlexfu + "/member";
  try {
    const fetchUserApi = yield axios.get(userHomeApi, {
      headers: {
        'Authorization': `bearer ${userParams.repos}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res).catch(res => console.debug('error fetch api', res));
    if (fetchUserApi.status === 200) {
      yield put(userResponse(fetchUserApi.data))
    }
  } catch (err) {

  }
}
function* getDataUserBox2(param) {
  const userBox2Api = apiAlexfu + `/crypto/get-all-token?access_token=${param.repos}`;
  try {
    const fetchUserBox2Api = yield axios.get(userBox2Api).then(res => res).catch(err => console.debug(err));
    if (fetchUserBox2Api.status === 200) {
      yield put(userBox2Response(fetchUserBox2Api.data))
    }
  } catch {

  }
}
function* getDataUserBox2Table(param) {
  const userBox2TableApi = apiAlexfu + '/crypto/get-user-token';
  try {
    const fetchUserBox2TableApi = yield axios.get(userBox2TableApi, {
      headers: {
        'Authorization': `bearer ${param.repos.valueToken}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res).catch(err => console.debug(err));
    if (fetchUserBox2TableApi.status === 200) {
      var fiter = Object.values(fetchUserBox2TableApi.data.map).filter(item => item.some(i => parseInt(i.porfolioId) === param.repos.portfolio));
      if (fiter.length !== 0) {
        var data = fiter[0].map(item => ({
          action: item.action,
          blockExplorerLink: item.blockExplorerLink,
          comments: item.comments,
          createdAt: item.createdAt,
          date: new Date(item.date),
          id: item.id,
          location: item.location,
          memberId: item.memberId,
          quantity: item.quantity,
          tokenId: item.tokenId,
          totalCostBasis: item.quantity * item.unitCost,
          unitCost: item.unitCost,
          updatedAt: item.updatedAt,
          porfolioId: item.porfolioId
        }));
        yield put(userBox2ResponseTable(data))
      } else {
        yield put(userBox2ResponseTable([]))
      }
    }
  } catch {

  }
}
function* dataUserBox3(param) {
  const box3Api = apiAlexfu + '/crypto/save-porfolio-token';
  const paramBox3Request = JSON.stringify([{
    "tokenId": param.repos.tokenId,
    "date": param.repos.date,
    "action": param.repos.action,
    "quantity": param.repos.quantity,
    "unitCost": param.repos.unitCost,
    "totalCostBasis": param.repos.quantity * param.repos.unitCost,
    "location": param.repos.location,
    "blockExplorerLink": param.repos.blockExplorerLink,
    "comments": param.repos.comments,
    "id": param.repos.id,
    "porfolioId": param.repos.porfolioId
  }]);
  try {
    const fetchBox3Api = yield axios.post(box3Api, paramBox3Request, {
      headers: {
        'Authorization': `bearer ${param.repos.access_token}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res).catch(err => console.log('err', err));
    if (fetchBox3Api.status === 200 && fetchBox3Api.data === true) {
      yield put(box3Response())
    }
  } catch {

  }
}
function* dataUserDelBox3(param) {
  const box3DelApi = apiAlexfu + '/crypto/delete-porfolio-token';
  const paramDel = JSON.stringify({
    "id": param.repos.id,
    "porfolioId": param.repos.porfolioId
  });
  try {
    const fetchBox3Api = yield axios.post(box3DelApi, paramDel, {
      headers: {
        'Authorization': `bearer ${param.repos.access_token}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res).catch(err => console.log('err', err));
    if (fetchBox3Api.status === 200 && fetchBox3Api.data === true) {
      yield put(box3ResponseDel())
    }
  } catch {

  }
}
function* getDataBox1(param) {
  const userBox2TableApi = apiAlexfu + '/crypto/get-user-token';
  try {
    const fetchUserBox2TableApi = yield axios.get(userBox2TableApi, {
      headers: {
        'Authorization': `bearer ${param.repos.valueToken}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res).catch(err => console.debug(err));
    var id = fetchUserBox2TableApi.data.wpKUserPorfolioDtoList.filter(item => item.porfolioName === param.repos.portfolio)[0] && fetchUserBox2TableApi.data.wpKUserPorfolioDtoList.filter(item => item.porfolioName === param.repos.portfolio)[0].id;
    if (id !== undefined) {
      yield put(getPorforlioId(id))
    }
    if (fetchUserBox2TableApi.status === 200) {
      yield put(userResponseBox1(fetchUserBox2TableApi.data.wpKUserPorfolioDtoList))
    }
  } catch {

  }
}
function* saveDataBox1(param) {
  const saveApi = apiAlexfu + '/crypto/save-user-porfolio';
  const bodyApi = JSON.stringify([{
    "porfolioName": param.repos.portfolio.porfolioName,
    "id": param.repos.portfolio.id
  }])
  try {
    const fetchSaveApi = yield axios.post(saveApi, bodyApi, {
      headers: {
        'Authorization': `bearer ${param.repos.valueToken}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res).catch(err => console.debug(err));
    if (fetchSaveApi.status === 200) {
      yield put(responsesaveBox1())
    }
  } catch {

  }
}
function* dataUserDelBox1(param) {
  const box1DelApi = apiAlexfu + '/crypto/delete-user-porfolio';
  const paramDel = {
    "id": param.repos.id,
  };
  try {
    const fetchBox3Api = yield axios.post(box1DelApi, paramDel, {
      headers: {
        'Authorization': `bearer ${param.repos.valueToken}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res).catch(err => console.log('err', err));
    if (fetchBox3Api.status === 200 && fetchBox3Api.data === true) {
      yield put(responseDelUserBox1())
    }
  } catch {

  }
}
function* changeFlag() {
  yield put(box3ResponseChangeFlag());
}
function* changeFlagDel() {
  yield put(box3ResponseDelChangeFlag());
}
function* changeFlagBox1() {
  yield put(responseChangeFlagDelBox1());
}
export default function* getUserAPI() {
  yield takeLatest(homeConstants.USER_REQUEST, getDataUser);
  yield takeLatest(userBox2Constants.USER_REQUEST_SEARCH_BOX2, getDataUserBox2);
  yield takeLatest(userBox2Constants.USER_REQUEST_TABLE_BOX2, getDataUserBox2Table);
  yield takeLatest(box3Constants.USER_REQUEST_BOX3, dataUserBox3);
  yield takeLatest(box3Constants.USER_REQUEST_DEL_BOX3, dataUserDelBox3);
  yield takeLatest(box3Constants.USER_REQUEST_CHANGE_FLAG, changeFlag);
  yield takeLatest(box3Constants.USER_REQUEST_DEL_CHANGE_FLAG, changeFlagDel);
  yield takeLatest(userBox2Constants.USER_REQUEST_TABLE_BOX1, getDataBox1);
  yield takeLatest(userBox2Constants.SAVE_BOX1, saveDataBox1);
  yield takeLatest(userBox1Constants.USER_REQUEST_DEL, dataUserDelBox1);
  yield takeLatest(userBox1Constants.USER_REQUEST_DEL_CHANGE_FLAG, changeFlagBox1);
}
