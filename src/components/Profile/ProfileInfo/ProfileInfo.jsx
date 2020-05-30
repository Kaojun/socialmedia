import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks"


const ProfileInfo = (props) => {
    if(!props.profile ) {return <Preloader/>}
    return (
        <div>
            <div className={s.descriptionBlock}>
              <img src={props.profile.photos.large} /> <div>
              <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus} />


               about me : {props.profile.aboutMe}
               contacts:<ul>
              <li>facebook:{props.profile.contacts.facebook}</li>
                <li>website:{props.profile.contacts.website}</li>
              <li>{props.profile.contacts.vk ? `vk:  ${props.profile.contacts.vk}` : null}</li>
                    <li>twitter: {props.profile.contacts.twitter}</li>
                      <li>instagram: { props.profile.contacts.instagram}</li>
                        <li>youtube:{props.profile.contacts.youtube}</li>
                          <li>github:{props.profile.contacts.github}</li>
                            <li>mainLink: {!props.profile.contacts.mainLink} {props.profile.contacts.mainLink}</li>

              </ul></div>
              Looking for a Job : {props.profile.lookingForAJob}
            </div>
        </div>
    )
}

export default ProfileInfo;