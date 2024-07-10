import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import useDecodeJwtResponse from '../../apis/DecodeJwtResponse';

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [nickName, setNickName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [userCode, setUserCode] = useState(null);
  const [role, setRole] = useState(null); 
  const [signupPlatform, setSignupPlatform] = useState(null);

  const decodedToken = useDecodeJwtResponse();

  useEffect(() => {
    if (decodedToken) {
      setUserCode(decodedToken.userCode);
      setRole(decodedToken.role);
      setSignupPlatform(decodedToken.signupPlatform);
      setAccessToken(decodedToken.token);
      // navigate('/main');
    } else {
      navigate('/signup');
    }
  }, [decodedToken, navigate]);

  const onNaverLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/naver";
  };

  const onKakaoLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/kakao";
  };

  const onGoogleLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <div className="App">
      <main>
        <div className="login-container">
          <div className='logo-content'>
            <img className='middle-logo' src="images/commons/logo.png" alt="LOGO"/>
          </div>
          <div className="login-box">
            <p className='text'>소셜 계정 간편 로그인 & 가입</p>
            <button onClick={onNaverLogin} className="naver-login">네이버 로그인</button>
            <button onClick={onKakaoLogin} className="kakao-login">카카오 로그인</button>
            <button onClick={onGoogleLogin} className="google-login">Google 로그인</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
