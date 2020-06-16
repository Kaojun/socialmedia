import React from 'react'
import {FormControl} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import {Field, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({ handleSubmit,profile ,error}) => {
		return <form onSubmit={handleSubmit}>
				<div>
						<button >save</button>
						{error && <div className={style.formSummaryError}>
								{error}
						</div>}
				</div>
				<div>
						<b>Full name :</b> {<Field typeF="input" placeholder={"dsd"} name={"fullName"} component={FormControl}/>}
				</div>
				<div>
						<b>Looking for a Job</b> :
						{<Field typeF="input" type={"checkbox"} name={"lookingForAJob"} component={FormControl}/> }
				</div>

				<div>
						<b>My proffesional skills</b>
						{<Field typeF="textarea" placeholder={"Введите свои навыки"} name={"lookingForAJobDescription"} component={FormControl}/>}
				</div>

				<div>
						<b>Contacts :</b> : {Object.keys(profile.contacts).map(key => {
						return <div key={key} className={s.contacts}>
								<b>{key}</b> : {<Field typeF="input" placeholder={key} name={"contacts." + key} component={FormControl}/>}
						</div>
				})}
				</div>
				<div>
						<b>About me :</b> :
						{<Field typeF="textarea" placeholder={"Введите о себе"} name={"aboutMe"} component={FormControl}/>}
				</div>
		</form>
}
const ProfileDataFormRedux = reduxForm({form: "profileg"})(ProfileDataForm)
export default ProfileDataFormRedux