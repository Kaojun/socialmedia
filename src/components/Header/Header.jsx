import React from 'react';
import s from './Header.module.css';
import NavLink from "react-router-dom/NavLink";

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />
        <div className={s.loginBlock}>
            {props.isAuth
              ? <div>{props.login} - <button onClick={props.logout}>LOG OUT</button></div>
              : <NavLink to={'/login/'}> LOGIN </NavLink>}

        </div>
    </header>
}

export default Header;