import {getAuthUserData} from "./Auth-reducer";
const SET_INITIALIZED_SUCCES = 'SET_INITIALIZED_SUCCES';
export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}
const appReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCES:
            return {
                ...state,
                initialized: true
            }
        default :
            return state;
    }
}
type initializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCES
}
export const initializedSuccess = ():initializedSuccessActionType => ({type: SET_INITIALIZED_SUCCES});


export const initializeApp = () => (dispatch: any) => {                     // инициализация для App
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
                dispatch(initializedSuccess())
            }
        )
}
export default appReducer