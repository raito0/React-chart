import { chartConstants } from '../constants/home.constant';

export function chartRequestTV(repos) {
    return {
        type: chartConstants.CHART_REQUEST,
        repos
    }
}
export function chartRequestToken(repos) {
    return {
        type: chartConstants.CHART_REQUEST_TOKEN,
        repos,
    }
}
export function chartResponseToken(repos) {
    return {
        type: chartConstants.CHART_RESPONSE_TOKEN,
        repos,
    }
}
export function chartResponseTV(repos) {
    return {
        type: chartConstants.CHART_RESPONSE,
        repos,
    }
}
export function chartResponseTV1(repos) {
    return {
        type: chartConstants.CHART_RESPONSETV1,
        repos,
    }
}
export function chartResponseTV2(repos) {
    return {
        type: chartConstants.CHART_RESPONSETV2,
        repos,
    }
}
export function chartResponseTV3(repos) {
    return {
        type: chartConstants.CHART_RESPONSETV3,
        repos,
    }
}
export function chartResponseUser(repos) {
    return {
        type: chartConstants.CHART_RESPONSE_USER,
        repos,
    }
}