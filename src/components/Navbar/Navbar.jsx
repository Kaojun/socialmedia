import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
	return (<div className={s.sidebar}>
			<nav className={s.nav}>

				<div className={s.item}>
					<NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
				</div>
				<div className={`${s.item} ${s.active}`}>
					<NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
				</div>
				<div className={`${s.item} ${s.active}`}>
					<NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
				</div>
				<div className={s.item}>
					<a>News</a>
				</div>
				<div className={s.item}>
					<a>Music</a>
				</div>
				<div className={s.item}>
					<a>Settings</a>
				</div>


			</nav>
			<div>
				<div className={s.friends}>
					<a>Friends</a>
				</div>
				<div className={s.friendRandom}> ddd</div>
			</div>

		</div>
	)
}
export default Navbar;