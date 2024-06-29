import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('token'); 

    if (accessToken) {
      setToken(accessToken);
      const expiresAt = new Date().getTime() + (60 * 60 * 1000); // 1시간 후 만료
      localStorage.setItem('accessToken', JSON.stringify({ token: accessToken, expiresAt })); // 로컬 스토리지에 토큰과 만료 시간 저장
      navigate('/main'); // 토큰이 설정되면 메인 페이지로 리디렉션
    } else {
      const storedToken = JSON.parse(localStorage.getItem('accessToken')); // 로컬 스토리지에서 토큰 가져오기
      if (storedToken) {
        const now = new Date().getTime();
        if (now < storedToken.expiresAt) {
          setToken(storedToken.token); // 토큰이 유효한 경우 설정
          navigate('/main'); // 유효한 토큰이 있는 경우 메인 페이지로 리디렉션
        } else {
          localStorage.removeItem('accessToken'); // 토큰이 만료된 경우 삭제
        }
      }
    }
  }, [navigate]);

  const getAuth = (token) => axios.create({
    baseURL: 'http://localhost:3000/login',
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Accept": "*",
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    }
  });

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
