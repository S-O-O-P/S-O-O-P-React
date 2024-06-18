import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
        <div className="top-bar">
          <div>
          <NavLink to='/main'>
            <img className='header-logo' src="images/commons/logo.png" alt="LOGO"/>
            </NavLink>
          </div>
          <nav>
            <ul>
              <li>오픈공지</li>
              <li>열린팟</li>
              <li>고객센터</li>
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
