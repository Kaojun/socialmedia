import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./Auth-reducer";
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, reqUsers} from "./users-selectors";

const SET_INITIALIZED_SUCCES = 'SET_INITIALIZED_SUCCES';

let initialState = {
	initialized:false
}
const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED_SUCCES:
			return {
				...state,
				initialized:true
			}
		default :
			return state;
	}
}
export const initializedSuccess = () => ({type: SET_INITIALIZED_SUCCES});


export const initializeApp = () => (dispatch) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise])
		.then(() => {
				dispatch(initializedSuccess())
			}
		)
}


export default appReducer


// let mapStateToProps = (state) => {
// 	return {
// 		users: reqUsers(state),
// 		pageSize: getPageSize(state),
// 		totalUsersCount: getTotalUsersCount(state),
// 		currentPage: getCurrentPage(state),
// 		isFetching: getIsFetching(state),
// 		followingInProgress: getFollowingInProgress(state)
// 	}
// }