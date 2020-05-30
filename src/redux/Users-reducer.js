import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helper";

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET-USERS'
const TOTAL_COUNT = 'TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
let initialState = {
	users: [],
	pageSize: 25,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: []
}
const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FOLLOW:
			return {
				...state, users: updateObjectInArray(state.users , action.userId , "id"  )
					//
					// state.users.map(u => {
					// if (u.id === action.userId) {
					// 	return {...u, followed: !u.followed}
					// }
					// return u;
				// })
			}
		case SET_USERS: {
			return {...state, users: action.users}
		}
		case SET_CURRENT_PAGE: {
			return {...state, currentPage: action.p}
		}
		case TOTAL_COUNT: {
			return {...state, totalUsersCount: action.count}
		}
		case TOGGLE_IS_FETCHING: {
			return {...state, isFetching: action.isFetching}
		}
		case TOGGLE_IS_FOLLOWING_PROGRESS: {
			return {
				...state, followingInProgress:
					action.isFetching                                                   // иф
						? [...state.followingInProgress, action.userId]                     //грузит фолоу=тру=добавляем в массив юсерид
						: state.followingInProgress.filter(id => id != action.userId) //   при вызове фолс=удаляет нужный айди из массива
			}
		}
		default :
			return state;
	}
}
//
export const setTotalUsersCount = (count) => ({type: TOTAL_COUNT, count})
export const setCurrentPage = (p) => ({type: SET_CURRENT_PAGE, p})
export const toggleFollow = (userId) => ({type: TOGGLE_FOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})
//
export const getUsersThunkCreator =
	(page, pageSize) => {
		return async (dispatch) => {
			dispatch(setIsFetching(true)) //крутилка
			dispatch(setCurrentPage(page))
			let data = await usersAPI.getUsers(page, pageSize)
			dispatch(setIsFetching(false))
			dispatch(setUsers(data.items))
			dispatch(setTotalUsersCount(data.totalCount))
		}
	}






export const followThunkCreator =
	(userId) => {
		return async (dispatch) => {
			dispatch(toggleFollowingProgress(true, userId))
			let response = await usersAPI.followAPI(userId)
			if (response.data.resultCode == 0) {
				dispatch(toggleFollow(userId))
			}
			dispatch(toggleFollowingProgress(false, userId))
		}
	}
export const unfollowThunkCreator =
	(userId) => {
		return async (dispatch) => {
			dispatch(toggleFollowingProgress(true, userId))
			let response = await usersAPI.unFollowAPI(userId)
			if (response.data.resultCode == 0) {
				dispatch(toggleFollow(userId))
			}
			dispatch(toggleFollowingProgress(false, userId))
		}
	}
export default usersReducer