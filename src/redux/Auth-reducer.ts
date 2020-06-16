import {ResultCodes, ResultCodesCaptcha} from "../api/api";
import {FormAction, stopSubmit} from 'redux-form'
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
//local state
let initialState = {
    userId: null as null | number,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null , then captcha is not required
}
// reducer
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                userId: "adds",
                ...state,
                ...action.payload
            }
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default :
            return state;
    }
}
// actions
export const actions = {
    setAuthUserData : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: "SET_USER_DATA",
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess :  (captchaUrl: string) => ({
        type: "GET_CAPTCHA_URL_SUCCESS",
        payload: {captchaUrl}
    } as const)
}
//thunks
export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me()                               //
    if (meData.resultCode === ResultCodes.Success) {                              // выкинули .data.resultCode из-за типизации в апи
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodesCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error" //ответ от сервака
        dispatch(stopSubmit("login", {_error: message}))  // login это название формы
    }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
//TS
export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType <ActionTypes | FormAction >

export default authReducer