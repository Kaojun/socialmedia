import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
// local state
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
// reducer
const profilesReducer = (state = initialState, action: ActionTypes):InitialStateType => {
    switch (action.type) {
        case "ADD_POST": {
            let body = action.AddPostBody
            return {
                ...state,
                posts:
                    [...state.posts, {id: 10, message: body, likesCount: 0}]
            }
        }
        case "SET_USER_PROFILE" : {
            return {...state, profile: action.profile}
        }
        case "SET_STATUS" :
            return {...state, status: action.status}
        // case "@@redux-form/BLUR" :
        // 	if(action.payload) return {...state ,
        // 		posts :
        // 			[...state.posts , {id: 10, message: action.payload , likecount: 0} ] }
        case "SET_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        case "PROFILE_FORM_UPDATE":
            let toggle = state.formUpdate
            return {...state, formUpdate: !toggle}
        default :
            return state;
    }
}
// action creators
export const actions = {
    addPostActionCreator : (AddPostBody:string) => ({type: "ADD_POST", AddPostBody} as const),
    setUserProfile : (profile:ProfileType) => ({type: "SET_USER_PROFILE", profile} as const),
    setStatus :  (status:string) => ({type: "SET_STATUS", status} as const),
    savePhotoSuccess :  (photos:PhotosType) => ({type: "SET_PHOTO_SUCCESS", photos} as const),
    profileFormUpdate : () => ({type: "PROFILE_FORM_UPDATE"} as const)
}
//thunks
export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)

    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId:number):ThunkType => async (dispatch) => {         // санка при вызове getstatus , делает запрос getstatus
    // на сервер
    const response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))                 // диспатчит статус в стейт
}
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null)
        {dispatch(getUserProfile(userId))
        dispatch(actions.profileFormUpdate())}
        else throw new Error("UserId cant be null")
    } else if (data.resultCode === 1) {
        const parsed = data.messages[0].match(/Contacts->(\w+)/)[1]   // прикольно,но ловерит всю строчку
        const slised = parsed[0].toLowerCase() + parsed.slice(1)
        dispatch(stopSubmit("profileg", {contacts: {[slised]: `type valid url format for ${slised}`}}))
    }
}
// TS
export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType <ActionTypes | FormAction>

export default profilesReducer;