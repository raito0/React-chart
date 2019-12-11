import { chartResponseTV, chartResponseTV1, chartResponseTV2, chartResponseTV3, chartResponseToken, chartResponseUser } from '../actions/chart.action';
import {
  put, takeLatest
} from 'redux-saga/effects';
import axios from 'axios';
import { apiCrypto, apiAlexfu } from '../constants/api';
import { chartConstants } from '../constants/home.constant';

function* getChartTVData(param) {
  const chartApiTV1 = apiCrypto + "/get-summary-total.do?indexsType=taifu30";
  const chartApiTV2 = apiCrypto + "/get-summary-total.do?indexsType=altcoin";
  const chartApiTV3 = apiCrypto + "/get-mabell-index-all.do";
  const chartApiTV4 = apiCrypto + "/get-member-index-value.do?memberID=1";
  const chartApiUser = apiAlexfu + "/crypto/get-user-token"
  try {
    const fetchChartApiTV1 = yield axios.get(chartApiTV1).then(res => res).catch(res => console.debug('error fetch api', res));
    if (fetchChartApiTV1.status === 200) {
      yield put(chartResponseTV(fetchChartApiTV1.data));
    }
    const fetchChartApiTV2 = yield axios.get(chartApiTV2).then(res => res).catch(res => console.debug('error fetch api', res));
    if (fetchChartApiTV2.status === 200) {
      yield put(chartResponseTV1(fetchChartApiTV2.data));
    }
    const fetchChartApiTV3 = yield axios.get(chartApiTV3).then(res => res).catch(res => console.debug('error fetch api', res));
    if (fetchChartApiTV3.status === 200) {
      yield put(chartResponseTV2(fetchChartApiTV3.data));
    }
    const fetchChartApiTV4 = yield axios.get(chartApiTV4).then(res => res).catch(res => console.debug('error fetch api', res));
    if (fetchChartApiTV4.status === 200) {
      yield put(chartResponseTV3(fetchChartApiTV4.data));
    }
    const cookies = document.cookie.split(";");
    var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
    if (accessToken.length !== 0) {
      const valueToken = accessToken.toString().split("[")[1].split("]")[0];
      const fetchChartApiUser = yield axios.get(chartApiUser,{
        headers: {
          'Authorization': `bearer ${valueToken}`,
          'Content-Type': 'application/json',
        }
      }).then(res => res).catch(res => console.debug('error fetch api', res));
      if (fetchChartApiUser.status === 200) {
        yield put(chartResponseUser({lasts: fetchChartApiUser.data.lasts, map: fetchChartApiUser.data.map }));
      }
    }

  } catch (err) {

  }
}
function* getChartData(paramToken) {
  const { repos } = paramToken;
  const chartApiToken = repos.map(item => apiCrypto + `/gettokenbyid.do?token_id=${item}`);
  let fetchChartApiTokens = [];
  for (const api of chartApiToken) {
    setTimeout(fetchChartApiTokens.push(yield axios.get(api).then(res => res.data[res.data.length - 1].close_price).catch(res => console.debug('error fetch api', res))), 0);
  }
  yield put(chartResponseToken(fetchChartApiTokens))
  try {

  } catch (err) {

  }
}
export default function* getChartAPI() {
  yield takeLatest(chartConstants.CHART_REQUEST, getChartTVData);
  yield takeLatest(chartConstants.CHART_REQUEST_TOKEN, getChartData);
}
