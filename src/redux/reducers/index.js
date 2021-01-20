import {combineReducers} from "redux";
import {sessionStatus, sessionData, activityStatus, inProgressStatus} from "./genericReducers";

const appReducer = combineReducers({
	loginStatus: sessionStatus,
	loginData: sessionData,
	activity: activityStatus,
	inProgress: inProgressStatus
});
const rootReducer = (state, action) => {
	return appReducer(state, action);
}

export default rootReducer;