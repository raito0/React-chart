import { homeConstants, userBox2Constants, box3Constants, userBox1Constants } from '../constants/home.constant';

export function userRequest(repos) {
    return {
        type: homeConstants.USER_REQUEST,
        repos,
    }
}
export function userBox2Request(repos) {
    return {
        type: userBox2Constants.USER_REQUEST_SEARCH_BOX2,
        repos
    }
}
export function userBox2Response(repos) {
    return {
        type: userBox2Constants.USER_RESPONSE_BOX2,
        repos,
    }
}
export function userBox2RequestTable(repos) {
    return {
        type: userBox2Constants.USER_REQUEST_TABLE_BOX2,
        repos
    }
}
export function userBox2ResponseTable(repos) {
    return {
        type: userBox2Constants.USER_RESPONSE_TABLE_BOX2,
        repos,
    }
}
export function userRequestBox1(repos) {
    return {
        type: userBox2Constants.USER_REQUEST_TABLE_BOX1,
        repos,
    }
}
export function userResponseBox1(repos) {
    return {
        type: userBox2Constants.USER_RESPONSE_TABLE_BOX1,
        repos,
    }
}
export function userResponse(repos) {
    return {
        type: homeConstants.USER_RESPONSE,
        repos,
    }
}
export function box3Request(repos) {
    return {
        type: box3Constants.USER_REQUEST_BOX3,
        repos
    }
}

export function box3Response() {
    return {
        type: box3Constants.USER_RESPONSE_BOX3
    }
}
export function box3RequestDel(repos) {
    return {
        type: box3Constants.USER_REQUEST_DEL_BOX3,
        repos
    }
}
export function box3ResponseDel() {
    return {
        type: box3Constants.USER_RESPONSE_DEL_BOX3,
    }
}
export function box3RequestChangeFlag() {
    return {
        type: box3Constants.USER_REQUEST_CHANGE_FLAG
    }
}
export function box3ResponseChangeFlag() {
    return {
        type: box3Constants.USER_RESPONSE_CHANGE_FLAG
    }
}
export function box3RequestDelChangeFlag() {
    return {
        type: box3Constants.USER_REQUEST_DEL_CHANGE_FLAG
    }
}
export function box3ResponseDelChangeFlag() {
    return {
        type: box3Constants.USER_RESPONSE_DEL_CHANGE_FLAG
    }
}
export function getPorforlioId(repos) {
    return {
        type: userBox2Constants.GET_PORFORLIO,
        repos
    }
}
export function saveBox1(repos) {
    return {
        type: userBox2Constants.SAVE_BOX1,
        repos
    }
}
export function responsesaveBox1(repos) {
    return {
        type: userBox2Constants.RESPONSE_SAVE_BOX1,
        repos
    }
}
export function requestDelUserBox1(repos) {
    return {
        type: userBox1Constants.USER_REQUEST_DEL,
        repos
    }
}
export function responseDelUserBox1(repos) {
    return {
        type: userBox1Constants.USER_RESPONSE_DEL,
        repos
    }
}
export function requestChangeFlagDelBox1() {
    return {
        type: userBox1Constants.USER_REQUEST_DEL_CHANGE_FLAG,
    }
}
export function responseChangeFlagDelBox1() {
    return {
        type: userBox1Constants.USER_RESPONSE_DEL_CHANGE_FLAG,
    }
}