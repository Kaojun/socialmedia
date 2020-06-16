import {updateObjectInArray} from "../utils/object-helper";
import {UserType} from "../types/types";
import { Dispatch } from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";
//local state
let initialState = {
	users: [] as Array<UserType>,
	pageSize: 25,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>  //array of users ids
}
// reducer
const usersReducer = (state = initialState, action:ActionTypes):InitialState => {
	switch (action.type) {
		case 'TOGGLE_FOLLOW':
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
		case 'SET_USERS': {
			return {...state, users: action.users}
		}
		case 'SET_CURRENT_PAGE': {
			return {...state, currentPage: action.currentPage}
		}
		case 'TOTAL_COUNT': {
			return {...state, totalUsersCount: action.count}
		}
		case 'TOGGLE_IS_FETCHING': {
			return {...state, isFetching: action.isFetching}
		}
		case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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
// actions
export const actions = {
	setTotalUsersCount: (count: number) => ({type: 'TOTAL_COUNT', count} as const),
	setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
	toggleFollow: (userId: number) => ({type: 'TOGGLE_FOLLOW', userId} as const),
	setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
	setIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}
//Thunks
export const getUsersThunkCreator = (page:number, pageSize:number):ThunkType  => {
		return async (dispatch: Dispatch<ActionTypes>) => {
			// let a = getState().
			dispatch(actions.setIsFetching(true)) //крутилка
			dispatch(actions.setCurrentPage(page))
			let data = await usersAPI.getUsers(page, pageSize)
			dispatch(actions.setIsFetching(false))
			dispatch(actions.setUsers(data.items))
			dispatch(actions.setTotalUsersCount(data.totalCount))
		}
	}
export const followThunkCreator = (userId:number):ThunkType  => {
		return async (dispatch) => {
			dispatch(actions.toggleFollowingProgress(true, userId))
			let response = await usersAPI.followAPI(userId)
			if (response.resultCode == 0) {
				dispatch(actions.toggleFollow(userId))
			}
			dispatch(actions.toggleFollowingProgress(false, userId))
		}
	}
export const unfollowThunkCreator = (userId:number):ThunkType  => {
		return async (dispatch) => {
			dispatch(actions.toggleFollowingProgress(true, userId))
			let response = await usersAPI.unFollowAPI(userId)
			if (response.resultCode == 0) {
				dispatch(actions.toggleFollow(userId))
			}
			dispatch(actions.toggleFollowingProgress(false, userId))
		}
	}
//TS
type InitialState = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>     // смотри статью хабр в редакс-сторе
type ThunkType = BaseThunkType <ActionTypes>

export default usersReducer