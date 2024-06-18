import React from 'react';
import "./SignUp.css"

function SingUp() {
  return (
    <div className="App">
      <main>
        <div className="login-container">
          <div className='logo-content'>
            <img className='midle-logo' src="images/commons/logo.png" alt="LOGO"/>
          </div>
          <div>
          <p className='title'>추가 정보 입력</p>

            <div className='inputBox'>

              <div className='NickBox'>
                <div className='NickTitle'>
                  닉네임
                </div>
              <input maxlength='10' className='NickName'/>
              </div>

              <div className='AboutBox'>
                <div className='AboutTitle'>
                자기소개
                </div>
                <textarea maxlength='300' className='AboutMe'/>
              </div>

            </div>
            <p className='InterestTitle'>
              <span className='textRed'>관심사를 </span>
              <span>선택해주세요.</span>
            </p>
            <spanp className='textRed'>최대 5개</spanp>
            <span>까지 선택할 수 있습니다.</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingUp;