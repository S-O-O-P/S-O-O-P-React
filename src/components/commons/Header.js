import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProflieApi from '../../apis/mypage/UserProfile';

function Header({user}) {
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!sessionStorage.getItem('refreshed')) {
      sessionStorage.setItem('refreshed', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('refreshed');
    }
  }, []);

  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  const getCookies = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const storedToken = getCookies('access');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  useEffect(() => {
    UserProflieApi({setIsLoading, setLoggedInUser, user})
},[user, loggedInUser.nickname]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8081/logout', {}, { withCredentials: true });
      document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setAccessToken(null);
      navigate('/main');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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
            <li><NavLink to='/cultureinfo'>공연/전시 정보<span></span></NavLink></li>
            <li><NavLink to='/honeypot'>허니팟<span></span></NavLink></li>
          </ul>
        </nav>
        {accessToken ? (
          <>
            <a href='/mypage'><li>{loggedInUser.nickname} 님</li></a>
            <a href='/mypage'><li><img className='mypage-btn' src={`${process.env.PUBLIC_URL}/images/commons/icon_mypage_colored.png`} alt="MYPAGE"/></li></a>
            <li><img className='logout-btn' onClick={handleLogout} src={`${process.env.PUBLIC_URL}/images/commons/icon_logout_colored.png`} alt='LOGOUT'/></li>
          </>
        ) : (
          <NavLink to='/login'>
            <li><button className="login-btn">LOGIN</button></li>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
