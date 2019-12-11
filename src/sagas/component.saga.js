import { tableResponse, tableResponseUser } from '../actions/component.action';
import {
    put, takeLatest
} from 'redux-saga/effects';
import axios from 'axios';
import { apiCrypto, apiAlexfu } from '../constants/api';
import { tableComponentConstants } from '../constants/home.constant';

function* getDataTable() {
    const indexesDetailToken = apiCrypto + "/gettop30.do?indexsType=taifu30"; //index 1
    try {
        const fetchTable2Api = yield axios.get(indexesDetailToken).then(res => res).catch(res => console.debug('error fetch api', res));
        yield put(tableResponse(fetchTable2Api.data));
    } catch (err) {

    }
}
function* getDataTable1() {
    const indexesDetailToken1 = apiCrypto + "/gettop30.do?indexsType=altcoin"; //index 2
    try {
        const fetchTable2Api = yield axios.get(indexesDetailToken1).then(res => res).catch(res => console.debug('error fetch api', res));
        // console.log(fetchTable2Api.data);
        yield put(tableResponse(fetchTable2Api.data));
    } catch (err) {

    }
}
function* getDataTable2() {
    const indexesDetailToken2 = apiCrypto + "/get-mabell-tokens-list.do"; //index 3
    try {
        const fetchTable2Api = yield axios.get(indexesDetailToken2).then(res => res).catch(res => console.debug('error fetch api', res));
        yield put(tableResponse(fetchTable2Api.data));
    } catch (err) {

    }
}
function* getDataTable3() {
    const indexesDetailToken3 = apiCrypto + "/caculate-member-index-value.do?memberID=1"; //index 4
    try {
        const fetchTable2Api = yield axios.get(indexesDetailToken3).then(res => res).catch(res => console.debug('error fetch api', res));
        var x = fetchTable2Api.data.memberPercentOutList;
        let array = [];
        array.push({...x[x.length-6], token_name:'augur'});
        array.push({...x[x.length-5], token_name:'bitcoin'});
        array.push({...x[x.length-4], token_name:'litecoin'});
        array.push({...x[x.length-3], token_name:'dash'});
        array.push({...x[x.length-2], token_name:'xrp'});
        array.push({...x[x.length-1], token_name:'ethereum'});
        yield put(tableResponse(array));
    } catch (err) {

    }
}
function* getDataTableUser(param) {
    const indexesDetailTokenUser = apiAlexfu + `/crypto/get-user-index/${param.repos.portfolio}`;
    try {
        const fetchTable2Api = yield axios.get(indexesDetailTokenUser,{
            headers: {
                'Authorization': `bearer ${param.repos.valueToken}`,
                'Content-Type': 'application/json',
            }
        }).then(res => res).catch(res => console.debug('error fetch api', res));
        yield put(tableResponseUser(fetchTable2Api.data.wpKUserPercentList));
    } catch (err) {

    }
}
export default function* getTable2API() {
    yield takeLatest(tableComponentConstants.TABLE_REQUEST, getDataTable);
    yield takeLatest(tableComponentConstants.TABLE_REQUEST1, getDataTable1);
    yield takeLatest(tableComponentConstants.TABLE_REQUEST2, getDataTable2);
    yield takeLatest(tableComponentConstants.TABLE_REQUEST3, getDataTable3);
    yield takeLatest(tableComponentConstants.TABLE_REQUEST_USER, getDataTableUser);
}
