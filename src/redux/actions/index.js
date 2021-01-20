export function setLoginStatus(status) {
    return function (dispatch) {
        dispatch({
            type: "SET_LOGIN",
            status: status
        })
    }
}
export function setLoginData(loginData) {
    return function (dispatch) {
        dispatch({
            type: "SET_LOGIN_DATA",
            loginData: loginData
        })
    }
}
export function setActivity(status) {
    return function (dispatch) {
        dispatch({
            type: "SET_ACTIVITY",
            status: status
        })
    }
}
export function setInProgress(status) {
    return function (dispatch) {
        dispatch({
            type: "SET_IN_PROGRESS",
            status: status
        })
    }
}

