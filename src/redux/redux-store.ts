import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import profilesReducer from "./Profile-reducer"
import dialogsReducer from "./DialogsPage-reducer"
import sidebarReducer from "./Sidebar-reducer"
import usersReducer from "./Users-reducer"
import authReducer from "./Auth-reducer"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from "./App-reducer"
import exp from "constants";




let rootReducer = combineReducers({
	profilesPage : profilesReducer,
	dialogPage: dialogsReducer,
	sidebar: sidebarReducer,
	userPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer
})

type RootReducerType = typeof rootReducer   // (globalstate:AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType> // !!почитать

// let state: AppStateType
// state.


type PropertiesTypes<T> = T extends {[key:string] : infer U} ? U : never
export type InferActionsTypes<T extends {[key:string] : (...args:any[])=>any } > = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action , R = Promise<void> > = ThunkAction<R, AppStateType, unknown, A>



// https://habr.com/ru/company/alfa/blog/452620/

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunkMiddleware)  ))


// @ts-ignore
window.store=store


export default store