import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/App-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/WIthSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // лези по запросу сделает запрос с сервака
// чтобы подгрузить компоненту
class App extends React.Component {
		componentDidMount () {              // срабатывает один раз при монтаже
				this.props.initializeApp()

		}

		render () {
				if(!this.props.initialized)
						return <Preloader/>
				return (
						 <div className='app-wrapper'>
								 <HeaderContainer/>
								 <Navbar/>
								 <div className='app-wrapper-content'>
										 <Switch>
												 <Route exact path='/' render={() => <Redirect to={"/profile"}/> }/>
												 <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
												 <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
												 <Route path='/users' render={() => <UsersContainer pageTitle={"Самураи"}/>}/>
												 <Route path='/login' render={() => <Login/>}/>
												 <Route path='*' render={() => <div>404</div>}/>
										 </Switch>
								 </div>
						 </div>
				)
		}
}

const mapStateToProps = (state) => ({
		initialized: state.app.initialized
})
export default compose
(withRouter,
		 connect(mapStateToProps, {initializeApp}))
(App);
