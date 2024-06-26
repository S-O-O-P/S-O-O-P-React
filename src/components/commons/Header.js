import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
        <div className="top-bar">
          <div>
          <NavLink to='/main'>
            <img className='header-logo' src={`${process.env.PUBLIC_URL}/images/commons/logo.png`} alt="LOGO"/>
            </NavLink>
          </div>
          <nav>
            <ul>
              <li><NavLink to={'/cultureinfo'}>공연/전시 정보<span></span></NavLink></li>
              <li><NavLink to='/honey'>허니팟<span></span></NavLink></li>
            </ul>
          </nav>
          <NavLink to='/login'>
          <button className="login-btn">LOGIN</button>
          </NavLink>
        </div>
    </header>
  );
}

export default Header;
