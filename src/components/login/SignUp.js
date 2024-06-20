import React, { useState } from 'react';
import './SignUp.css';
import { NavLink } from 'react-router-dom';

function SignUp() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const onClickHandler = (valueI) => {
    setSelectedInterests(pre => {
      if (pre.includes(valueI)) {
        return pre.filter(interest => interest !== valueI);
      } else if (pre.length < 5) {
        return [...pre, valueI];
      }
      return pre;
    });
  };

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
                <div className='NickTitle'>닉네임</div>
                <input maxLength='10' className='NickName' />
              </div>
              <div className='AboutBox'>
                <div className='AboutTitle'>자기소개</div>
                <textarea maxLength='300' className='AboutMe' />
              </div>
            </div>
            <p className='InterestTitle'>
              <span className='textRed'>관심사를 </span>
              <span>선택해주세요.</span>
            </p>
            <span className='textRed'>최대 5개</span>
            <span>까지 선택할 수 있습니다.</span>
            <div>
              <button
                onClick={() => onClickHandler(1)}
                className={selectedInterests.includes(1) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #전시
              </button>
              <button
                onClick={() => onClickHandler(2)}
                className={selectedInterests.includes(2) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #콘서트
              </button>
              <button
                onClick={() => onClickHandler(3)}
                className={selectedInterests.includes(3) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #연주회
              </button>
              <button
                onClick={() => onClickHandler(4)}
                className={selectedInterests.includes(4) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #공연
              </button>
            </div>
            <div>
              <button
                onClick={() => onClickHandler(5)}
                className={selectedInterests.includes(5) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #뮤지컬
              </button>
              <button
                onClick={() => onClickHandler(6)}
                className={selectedInterests.includes(6) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #연극
              </button>
              <button
                onClick={() => onClickHandler(7)}
                className={selectedInterests.includes(7) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #팝업스토어
              </button>
              <button
                onClick={() => onClickHandler(8)}
                className={selectedInterests.includes(8) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #페스티벌
              </button>
            </div>
            <div className='btns'>
            <NavLink to='/login'>
              <button className='btn1'>취소</button>
              </NavLink>
              <NavLink to=''>
              <button className='btn2'>등록</button>
              </NavLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default SignUp;
