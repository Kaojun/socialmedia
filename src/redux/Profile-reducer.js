import {profileAPI, usersAPI} from "../api/api";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState =  {
	posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It\'s my first post', likesCount: 11},
		{id: 3, message: 'Blabla', likesCount: 11},
		{id: 4, message: 'Dada', likesCount: 11}],
	profile: null,
	status: ""
	}


const profilesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			 let body = action.AddPostBody
			return {...state ,
					posts :
					[...state.posts , {id: 10, message: body , likecount: 0} ] }
		}
		case SET_USER_PROFILE :{
			return	{...state, profile : action.profile}}
		case SET_STATUS :
		return {...state,status: action.status}
		// case "@@redux-form/BLUR" :
		// 	if(action.payload) return {...state ,
		// 		posts :
		// 			[...state.posts , {id: 10, message: action.payload , likecount: 0} ] }

		default :
			return state;
	}
}


export const addPostActionCreator = (AddPostBody) => ({type: ADD_POST , AddPostBody})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE , profile})
export const setStatus = (status) => ({type: SET_STATUS , status})


export default profilesReducer


export const getUserProfile = (userId) => async(dispatch) => {
	let response = await usersAPI.getProfile(userId)

		dispatch(setUserProfile(response.data))
}
export const getStatus = (userId) => async(dispatch) => {         // санка при вызове getstatus , делает запрос getstatus на сервер
	let response = await profileAPI.getStatus(userId)

		dispatch(setStatus(response.data))                 // диспатчит статус в стейт
}
export const updateStatus = (status) => async(dispatch) => {
	let response = await profileAPI.updateStatus(status)

			if (response.data.resultCode === 0) {
				dispatch(setStatus(status))
			}
}