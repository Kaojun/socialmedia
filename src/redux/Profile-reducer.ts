import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import exp from "constants";
import {PostType, ProfileType,PhotosType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'
const PROFILE_FORM_UPDATE = 'PROFILE_FORM_UPDATE'



let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    formUpdate: true
}

export type InitialStateType = typeof initialState
const profilesReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let body = action.AddPostBody
            return {
                ...state,
                posts:
                    [...state.posts, {id: 10, message: body, likesCount: 0}]
            }
        }
        case SET_USER_PROFILE : {
            return {...state, profile: action.profile}
        }
        case SET_STATUS :
            return {...state, status: action.status}
        // case "@@redux-form/BLUR" :
        // 	if(action.payload) return {...state ,
        // 		posts :
        // 			[...state.posts , {id: 10, message: action.payload , likecount: 0} ] }
        case SET_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        case PROFILE_FORM_UPDATE:
            let toggle = state.formUpdate
            return {...state, formUpdate: !toggle}
        default :
            return state;
    }
}


type AddPostActionCreatorActionType ={
    type: typeof ADD_POST
    AddPostBody: string
}
type SetUserProfileCreatorActionType ={
    type: typeof SET_USER_PROFILE
    profile: string
}
type SetStatusCreatorActionType ={
    type: typeof SET_STATUS
    status: string
}
type SavePhotoSuccessCreatorActionType ={
    type: typeof SET_PHOTO_SUCCESS
    photos: PhotosType
}
type ProfileFormUpdateCreatorActionType ={
    type: typeof PROFILE_FORM_UPDATE
}

// action creators
export const addPostActionCreator = (AddPostBody:string):AddPostActionCreatorActionType => ({type: ADD_POST, AddPostBody})
export const setUserProfile = (profile:string):SetUserProfileCreatorActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status:string):SetStatusCreatorActionType => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessCreatorActionType => ({type: SET_PHOTO_SUCCESS, photos})
export const profileFormUpdate = ():ProfileFormUpdateCreatorActionType => ({type: PROFILE_FORM_UPDATE})
//

//thunks

export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId:number) => async (dispatch:any) => {         // санка при вызове getstatus , делает запрос getstatus на сервер
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))                 // диспатчит статус в стейт
}
export const updateStatus = (status:string) => async (dispatch:any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
        dispatch(profileFormUpdate())
    } else if (response.data.resultCode === 1) {
        const parsed = response.data.messages[0].match(/Contacts->(\w+)/)[1]   // прикольно,но ловерит всю строчку
        const slised = parsed[0].toLowerCase() + parsed.slice(1)
        dispatch(stopSubmit("profileg", {contacts: {[slised]: `type valid url format for ${slised}`}}))
    }
}
export default profilesReducer;