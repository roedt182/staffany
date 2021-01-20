import globalState from "../states";

export function sessionStatus(state = globalState.loginStatus, action) {
    switch (action.type) {
        case "SET_LOGIN":
            return action.status;
        default:
            return state;
    }
}
export function sessionData(state = globalState.loginData, action) {
    switch (action.type) {
        case "SET_LOGIN_DATA":
            return action.loginData;
        default:
            return state;
    }
}
export function activityStatus(state = globalState.activity, action) {
    switch (action.type) {
        case "SET_ACTIVITY":
            return action.status;
        default:
            return state;
    }
}
export function inProgressStatus(state = globalState.inProgress, action) {
    switch (action.type) {
        case "SET_IN_PROGRESS":
            return action.status;
        default:
            return state;
    }
}