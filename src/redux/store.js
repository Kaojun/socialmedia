// import profilesReducer from "./Profile-reducer";
// import dialogsReducer from "./DialogsPage-reducer";
// import sidebarReducer from "./Sidebar-reducer";
//
// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST = 'UPDATE-NEW-POST';
//
//
//
// let store = {
// 	_state: {
// 		profilesPage: {
// 			posts: [
// 				{id: 1, message: 'Hi, how are you?', likesCount: 12},
// 				{id: 2, message: 'It\'s my first post', likesCount: 11},
// 				{id: 3, message: 'Blabla', likesCount: 11},
// 				{id: 4, message: 'Dada', likesCount: 11}],
// 			newPostText: 'it-kamasutradsd.com'
// 		},
// 		dialogPage: {
// 			messages: [
// 				{id: 1, message: 'Hi', from: 'me'},
// 				{id: 2, message: 'How is your it-kamasutra?', from: 'friend'},
// 				{id: 3, message: 'Yo', from: 'me'},
// 				{id: 4, message: 'Yo', from: 'friend'},
// 				{id: 5, message: 'Yo', from: 'me'}],
// 			dialogs: [
// 				{id: 1, name: 'Dimych', avatar: `http://avatarmaker.ru/img/11/1044/104363.jpg`},
// 				{id: 2, name: 'Andrew', avatar: `http://avatarmaker.ru/img/11/1044/104356.jpg`},
// 				{id: 3, name: 'Sveta', avatar: `http://avatarmaker.ru/img/11/1044/104346.gif`},
// 				{id: 4, name: 'Sasha', avatar: `http://avatarmaker.ru/img/11/1044/104351.gif`},
// 				{id: 5, name: 'Viktor', avatar: `http://avatarmaker.ru/img/11/1044/104329.gif`},
// 				{id: 6, name: 'Valera', avatar: `http://avatarmaker.ru/img/11/1044/104302.png`}],
// 			newMessageBody: ""
// 		},
// 	},
// 	_callSubscriber() {
// 		console.log("state was changed")
// 	},
// 	subscribe(observer) {
// 		this._callSubscriber = observer
// 	}, //observer
// 	getState() {
// 		return this._state
// 	},
// 	dispatch(action) {
//
// 		profilesReducer(this._state.profilesPage,action)
// 		dialogsReducer(this._state.dialogPage,action)
// 		sidebarReducer(this._state.sidebar,action)
// 		this._callSubscriber(this._state)
// 		}
// }
//
//
//
//
//
//
// window.state = store._state
// window.stare = store
