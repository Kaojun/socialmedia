import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks"
import userPhoto from "../../../logo.svg";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, isOwner, updateStatus, savePhoto, status , saveProfile,formUpdate}) => {



		let [editMode , setEditMode] = useState(false)

		const onSubmit= (formData) => {
				saveProfile(formData)           // через async не будет работаьь

		}

		useEffect ( () =>{                    // при приходе статуса с сервера он сетится в стейт и перерисовывает
				setEditMode(false)
		}, [formUpdate])
		if(!profile) {
				return <Preloader/>
		}
		const onMainFotoSelected = (e) => {
				if(e.target.files.length) {
						savePhoto(e.target.files[0])
				}
		}
		return (
				 <div>
						 <div className={s.descriptionBlock}>
								 <img src={profile.photos.large || userPhoto}/>
								 {isOwner && <input type="file" onChange={onMainFotoSelected}/>}

								 {editMode ? <ProfileDataForm onSubmit={onSubmit} initialValues={profile} profile={profile}/> : <ProfileData toEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}
								 <ProfileStatusHooks status={status} updateStatus={updateStatus}/>
						 </div>
				 </div>
		)
}

const ProfileData = ({profile,isOwner, toEditMode}) => {
		return <div> {isOwner && <div><button onClick={toEditMode}>edit</button></div>}
				<div>
						<b>Full name :</b> : {profile.fullname}
				</div>
				<div>
						<b>Looking for a Job</b> : {profile.lookingForAJob ? "yes" : "no"}
						{profile.lookingForAJob &&
						<div>
								<b>My proffesional skills</b> {profile.lookingForAJobDescription}
						</div>}
				</div>
				<div>
						<b>Contacts :</b> : {Object.keys(profile.contacts).map(key => {
						return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
				})}
				</div>
				<div>
						<b>About me :</b> : {profile.aboutMe}
				</div>
		</div>
}
const Contact = ({contactTitle, contactValue}) => {
		return <div className={s.contacts}><b>{contactTitle}</b> : {contactValue}</div>
}
export default ProfileInfo;