import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="App">
      <main>
        <div className="login-container">
          <div className='logo-content'>
            <img className='midle-logo' src="images/login/logo2.png" alt="LOGO"/>
            <p className='logo-text'>로고 텍스트?</p>
          </div>
          <div className="login-box">
          <p className='text'>소셜 계정 간편 로그인 & 가입</p>
            <button className="naver-login">네이버 로그인</button>
            <button className="kakao-login">카카오 로그인</button>
            <button className="google-login">Google 로그인</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
