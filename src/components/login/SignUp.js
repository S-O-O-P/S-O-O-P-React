import './SignUp.css';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useDecodeJwtResponse from '../../apis/DecodeJwtResponse'

function SignUp() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [nickName, setNickName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [userCode, setUserCode] = useState(null);
  const [role, setRole] = useState(null); 
  const [signupPlatform, setSignupPlatform] = useState(null);
  const navigate = useNavigate();
  const [isValidForm, setIsValidForm] = useState(true);
  const [inputError, setInputError] = useState('');
  const { decodedToken, accessToken } = useDecodeJwtResponse();
  const [showReCheckModal, setShowReCheckModal] = useState(false);

  useEffect(() => {
    if (decodedToken && accessToken) {
      setUserCode(decodedToken.userCode);
      setRole(decodedToken.role);
      setSignupPlatform(decodedToken.signupPlatform);
    } else {
      navigate('/signup');
    }
  }, [decodedToken, navigate]);
  

  const onClickHandler = (valueI) => {
    setSelectedInterests(pre => {
      if (pre.includes(valueI)) {
        return pre.filter(interest => interest !== valueI);
      } else if (pre.length < 3) {
        return [...pre, valueI];
      }
      return pre;
    });
  };

  const handleLogout = async () => {
    
    try {
      await axios.post('http://localhost:8081/logout', {}, { withCredentials: true });
      document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate('/login');
    } catch (error) {
      // console.error('Logout failed', error);
    }
  };

  const handleSignUp = async () => {
    if(modifySubmit() == true){
    try {
      const response = await axios.post('http://localhost:8081/signup', 
        { userCode, nickName, aboutMe, signupPlatform, selectedInterests },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      // console.log('추가 정보 입력 완료', response);
      navigate('/completed', { state: { nickName } });
    } catch (error) {
      // console.error('추가 정보 입력 실패', error);
      handleLogout();
    }
  }
  };

  const isValidNickname = (nickname) => {
    // 한글, 영문, 숫자만 허용하고 자음/모음만으로 이루어진 경우를 체크
    const regex = /^(?=.*[가-힣a-zA-Z0-9])[가-힣a-zA-Z0-9]{1,16}$/;
    const onlyConsonants = /^[ㄱ-ㅎ]+$/;
    const onlyVowels = /^[ㅏ-ㅣ]+$/;
    
    if (!regex.test(nickname)) {
        return false;
    }
    if (onlyConsonants.test(nickname) || onlyVowels.test(nickname)) {
        return false;
    }
    return true;
};

  const handleInputChange = (e) => {
    const newNickname = e.target.value;
    if (newNickname.length <= 16) {
        setNickName(newNickname);
        if (!isValidNickname(newNickname)) {
            setInputError('닉네임은 한글, 영문, 숫자만 사용 가능하며, 자음 또는 모음만으로 이루어질 수 없습니다.');
            setIsValidForm(false);
        } else {
            setInputError('');
            setIsValidForm(true);
        }
    }
};
    const modifySubmit = () => {
        if (!isValidForm) {
            alert('올바른 닉네임을 입력해주세요.\n닉네임은 한글, 영문, 숫자만 사용 가능하며,\n자음 또는 모음만으로 이루어질 수 없습니다.');
            return false;
        }else{
          return true;
        }
    };


  return (
    <div className="App">
      <main>
        <div className="login-container">
          <div className='logo-content'>
            <img className='middle-logo' src="images/commons/logo.png" alt="LOGO"/>
          </div>
          <div>
            <p className='titles'>추가 정보 입력</p>
            <div className='inputBox'>
              <div className='NickBox'>
                <div className='NickTitle'>닉네임</div>
                <input 
                  maxLength='16' 
                  className='NickName' 
                  placeholder='닉네임을 입력해 주세요.' 
                  value={nickName}
                  onChange={handleInputChange} 
                />
              </div>
              <div className='AboutBox'>
                <div className='AboutTitle'>자기소개</div>
                <textarea 
                  maxLength='180' 
                  className='AboutMe' 
                  placeholder='자기소개를 입력해 주세요'
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)} 
                />
              </div>
            </div>
            <p className='InterestTitle'>
              <span className='textRed'>관심사를 </span>
              <span>선택해주세요.</span>
            </p>
            <span className='textRed'>최대 3개</span>까지 선택할 수 있습니다.
            <div>
              <button
                onClick={() => onClickHandler(1)}
                className={selectedInterests.includes(1) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #팝업
              </button>
              <button
                onClick={() => onClickHandler(2)}
                className={selectedInterests.includes(2) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #공연
              </button>
              <button
                onClick={() => onClickHandler(3)}
                className={selectedInterests.includes(3) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #행사/축제
              </button>
            </div>
            <div>
              <button
                onClick={() => onClickHandler(4)}
                className={selectedInterests.includes(4) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #전시
              </button>
              <button
                onClick={() => onClickHandler(5)}
                className={selectedInterests.includes(5) ? 'InterestButtonOn' : 'InterestButton'}
              >
                #뮤지컬
              </button>
            </div>
            <div className='btns'>
              <NavLink to={"/main"}>
              <button className='btn1'>건 너 뛰 기</button></NavLink>
              <button 
                className={selectedInterests.length < 1 ? 'btn2' : 'btn3'} 
                onClick={handleSignUp}
                disabled={selectedInterests.length < 1}
              >
                등 록
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
