import React from 'react'
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'

const LoginForm = (props) => {
		debugger
		return <div>

				<h1>Login</h1>
				<form onSubmit={props.handleSubmit}>
					<div>{props.error && <div className={style.formSummaryError}>{props.error}</div>}
						<Field typeF="input" placeholder={"Login"} name={"email"} component={FormControl} validate={[required]}/>
						<Field typeF="input" placeholder={"Password"} type={"password"} name={"password"} component={FormControl}
						       validate={[required]}/>
						<Field typeF="input" component={FormControl} name={"rememberMe"} type={"checkbox"}/> remember me </div>

						{props.captchaUrl && <img src={props.captchaUrl}/>}
						<div>
								{props.captchaUrl &&
								<Field typeF="input" placeholder={""} name={"captcha"} component={FormControl} validate={[required]}/>}
						</div>
						<div>
								<button>Login</button>
						</div>

				</form>
		</div>
} // сама форма
const ReduxLoginForm = reduxForm({form: "login"})(LoginForm)   //обертка редакс форм
const Login = (props) => {                        //логика при сабмите
		const onSubmit = (formData) => {
				props.login(formData.email, formData.password, formData.rememberMe ,formData.captcha)
		}
		if(props.isAuth) {
				return <Redirect to={"/profile"}/>
		}
		return <div>
				<ReduxLoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
		</div>
}
const mapStateToProps = (state) => (
		 {
				 isAuth: state.auth.isAuth,
				 captchaUrl: state.auth.captchaUrl
		 })
export default connect(mapStateToProps, {login})(Login)