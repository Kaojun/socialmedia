import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form'





const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null as null | number ,
    email: null as string | null,
    login: null as string | null,
    isAuth: false ,
    captchaUrl: null as string | null // if null , then captcha is not required
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                userId: "adds" ,
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default :
            return state;
    }
}
type SetAuthUserDataPayloadType = {
    userId: number |null, email: string|null, login: string|null, isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (userId: number |null, email: string|null, login: string|null, isAuth: boolean):SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})



type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl:string}

}
export const getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})




export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()                               //
    if (meData.resultCode === 0) {                              // выкинули .data.resultCode из-за типизации в апи
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error" //ответ от сервака
        dispatch(stopSubmit("login", {_error: message}))  // login это название формы
    }
}



export const getCaptchaUrl = () => async (dispatch:any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export default authReducer