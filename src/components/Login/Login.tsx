import React from 'react'
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {FormControl} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux-store";

// типы для LoginForm с использованием InjectedFormProps
type LoginFormValuesType = { email: string, password: string, rememberMe: boolean, captcha: string }
type LoginFormOwnProps = { captchaUrl: string | null  }
//типизация для формы Login
type mapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

// Login форма
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType , LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>{error && <div className={style.formSummaryError}>{error}
						</div>}
                <Field typeF="input" placeholder={"Login"} name={"email"} component={FormControl} validate={[required]}/>
                <Field typeF="input" placeholder={"Password"} type={"password"} name={"password"} component={FormControl}
                       validate={[required]}/>
                <Field typeF="input" component={FormControl} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>

            {captchaUrl && <img src={captchaUrl}/>}
            <div>
                {captchaUrl &&
								<Field typeF="input" placeholder={""} name={"captcha"} component={FormControl} validate={[required]}/>}
            </div>
            <div>
                <button>Login</button>
            </div>

        </form>
    </div>
}
// ХОК для логин формы
const ReduxLoginForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({form: "login"})(LoginForm)   //обертка редакс форм

// Форма Login
const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {                        //логика при сабмите
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <ReduxLoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    })
export default connect(mapStateToProps, {login})(Login)