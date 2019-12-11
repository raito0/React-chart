import { tableComponentConstants } from '../constants/home.constant';

export function tableRequest() {
    return {
        type: tableComponentConstants.TABLE_REQUEST
    }
}
export function tableRequest1() {
    return {
        type: tableComponentConstants.TABLE_REQUEST1
    }
}
export function tableRequest2() {
    return {
        type: tableComponentConstants.TABLE_REQUEST2
    }
}
export function tableRequest3() {
    return {
        type: tableComponentConstants.TABLE_REQUEST3
    }
}
export function tableResponse(repos) {
    return {
        type: tableComponentConstants.TABLE_RESPONSE,
        repos,
    }
}
export function tableRequestUser(repos) {
    return {
        type: tableComponentConstants.TABLE_REQUEST_USER,
        repos
    }
}
export function tableResponseUser(repos) {
    return {
        type: tableComponentConstants.TABLE_RESPONSE_USER,
        repos
    }
}