import React from 'react'
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'

const LoginForm = (props) => {
	return <div>

	<h1>Login</h1>
	<form onSubmit={props.handleSubmit}>

		<div>
			<Field typeF="input" placeholder={"Login"} name={"email"} component={FormControl}
			validate={[required]}/>
		</div>

		<div>
			<Field typeF="input" placeholder={"Password"} type={"password"} name={"password"} component={FormControl}
						 validate={[required]}/>
		</div>

		<div>
			<Field typeF="input" component={FormControl}  name={"rememberMe"}  type={"checkbox"} /> remember me
		</div>
		{props.error && <div className={style.formSummaryError}>
			{props.error}
		</div>
		}
		<div>
			<button>Login</button>
		</div>

	</form>
	</div>
} // сама форма

const ReduxLoginForm = reduxForm ({form : "login"})(LoginForm)   //обертка редакс форм


const Login = (props) => {                         //логика при сабмите
	const onSubmit = (formData) =>
	{props.login(formData.email , formData.password , formData.rememberMe)}

	if (props.isAuth) {
		return <Redirect to={"/profile"}/>
	}

	return <div>
		<ReduxLoginForm onSubmit={onSubmit}/>
	</div>
}
const mapStateToProps =(state) =>(
{
	isAuth : state.auth.isAuth
})
export default connect(mapStateToProps , {login})(Login)