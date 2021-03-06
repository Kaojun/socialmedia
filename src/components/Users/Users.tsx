import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../logo.svg";
import {NavLink} from "react-router-dom";
import {Paginator} from "../common/Paginator/paginator";
import {UserType} from '../../types/types';

type PropsType ={
	totalUsersCount:number
	pageSize:number
	currentPage:number
	onPageChanged: (page:number) => void
	users: Array<UserType>
	followingInProgress:Array<number>
	unfollowThunkCreator: (id:number) =>void
	followThunkCreator:(id:number) =>void

}

let Users: React.FC<PropsType> = ({currentPage ,totalUsersCount,pageSize,onPageChanged, ...props}) => {

	return <div>

	<Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize}/>
		{
			props.users.map(g =>
					<div key={g.id}>
				        <span>
					            <div><NavLink to={'/profile/' + g.id}>
												<img src={g.photos.small != null ? g.photos.small : userPhoto} className={styles.userPhoto}/>
				            	</NavLink></div>

									<div>


												{g.followed ?           // проверка на фоллоу из стейта
													<button  disabled={props.followingInProgress.some(id => id == g.id)} onClick={() => { //дизейб если айди тру
														props.unfollowThunkCreator(g.id)
													}}>UNFOLLOW</button>
													: <button disabled={props.followingInProgress.some(id => id == g.id)} onClick={() => {
														props.followThunkCreator(g.id)
													}}> FOLLOW</button>
												}


					            </div>
				        	</span>
						<span>
				<div>
					{g.name}
				</div>
				  <div>
					{g.status}
				  </div>
					          </span>
						<span>
			<div>{"g.location.country"}</div><div>{"g.location.city"}</div>
					</span>
					</div>
			)
		}
	</div>
}
export default Users
