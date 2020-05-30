import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
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


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));



class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		                  if (!this.props.initialized)
		return <Preloader/>
		
		return (
			<div className='app-wrapper'>
				<HeaderContainer/>
				<Navbar/>
				<div className='app-wrapper-content'>
					<Route path='/dialogs'
								 render={withSuspense(DialogsContainer)} />

										 <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
										 <Route path='/users' render={() => <UsersContainer/>}/>
										 <Route path='/login' render={() => <Login/>}/>
									 </div>
								 }
								 }
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})
export default compose
      (withRouter,
			connect(mapStateToProps,{initializeApp}))
			(App);
