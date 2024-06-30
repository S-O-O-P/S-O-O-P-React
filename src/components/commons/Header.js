import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {

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

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('accessToken'));
    if (storedToken) {
      setAccessToken(storedToken.token);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8081/logout', {}, { withCredentials: true });
      localStorage.removeItem('accessToken');
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
            <li><NavLink to='/honey'>허니팟<span></span></NavLink></li>
          </ul>
        </nav>

        {accessToken ? 
          (<button className="login-btn" onClick={handleLogout}>LOGOUT</button>)
            : 
          (<NavLink to='/login'>
            <button className="login-btn">LOGIN</button>
          </NavLink>)}
      </div>
    </header>
  );
}

export default Header;
