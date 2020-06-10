import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helper";
import {UserType} from "../types/types";
import { Dispatch } from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
// константы Action
const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET-USERS'
const TOTAL_COUNT = 'TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
//стейт
let initialState = {
	users: [] as Array<UserType>,
	pageSize: 25,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>  //array of users ids
}
// тип стейта
type InitialState = typeof initialState
const usersReducer = (state = initialState, action:ActionTypes):InitialState => {
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
			return {...state, currentPage: action.currentPage}
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
// типы Action
type SetTotalUsersCountActionType = {
	type: typeof TOTAL_COUNT
	count:number
}
type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE
	currentPage:number
}
type ToggleFollowActionType = {
	type: typeof TOGGLE_FOLLOW
	userId:number
}
type SetUsersActionType = {
	type: typeof SET_USERS
	users:Array<UserType>
}
type SetIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching:boolean
}
type ToggleFollowingProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching:boolean, userId:number
}
// общий тип для всех Action
type ActionTypes = SetTotalUsersCountActionType |SetUsersActionType | SetCurrentPageActionType | ToggleFollowActionType | SetIsFetchingActionType | ToggleFollowingProgressActionType
// Action
export const setTotalUsersCount = (count:number):SetTotalUsersCountActionType => ({type: TOTAL_COUNT, count})
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
export const toggleFollow = (userId:number):ToggleFollowActionType => ({type: TOGGLE_FOLLOW, userId})
export const setUsers = (users:Array<UserType>):SetUsersActionType => ({type: SET_USERS, users})
export const setIsFetching = (isFetching:boolean):SetIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})
//Thunks
type CurrentDispatchType = Dispatch<ActionTypes>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsersThunkCreator =
	(page:number, pageSize:number):ThunkType  => {
		return async (dispatch: CurrentDispatchType) => {
			// let a = getState().
			dispatch(setIsFetching(true)) //крутилка
			dispatch(setCurrentPage(page))
			let data = await usersAPI.getUsers(page, pageSize)
			dispatch(setIsFetching(false))
			dispatch(setUsers(data.items))
			dispatch(setTotalUsersCount(data.totalCount))
		}
	}
export const followThunkCreator =
	(userId:number):ThunkType  => {
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
	(userId:number):ThunkType  => {
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