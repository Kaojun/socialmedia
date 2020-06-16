import {getAuthUserData} from "./Auth-reducer";
import { InferActionsTypes } from "./redux-store";
//local state
let initialState = {
    initialized: false
}
// reducer
const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default :
            return state;
    }
}
// actions
export const actions = {
    initializedSuccess: () => ({type: "SET_INITIALIZED_SUCCESS"} as const)
}
// thunks
export const initializeApp = () => (dispatch: any) => {                     // инициализация для App
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
                dispatch(actions.initializedSuccess())
            }
        )
}
// TS
export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes <typeof actions>

export default appReducer