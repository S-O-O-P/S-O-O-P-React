import './SignUp.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [nickName, setNickName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [signupPlatform, setSignupPlatform] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);


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

  console.log("관심사 코드 : "+selectedInterests)



  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('token');
    const username = query.get('username');

    if (accessToken) {
      setSignupPlatform(username);
      setToken(accessToken);
      const expiresAt = new Date().getTime() + (10 * 60 * 1000); // 10분후 만료
      localStorage.setItem('accessToken', JSON.stringify({ token: accessToken, expiresAt }));
      localStorage.setItem('username', JSON.stringify({ si: username, expiresAt }));
      navigate('/signup');
    } else {
      const storedToken = JSON.parse(localStorage.getItem('accessToken'));
      const storedUserName = JSON.parse(localStorage.getItem('username'));
      if (storedToken) {
        setToken(storedToken.token);
        setSignupPlatform(storedUserName.username);
        // fetchUser(storedToken.token)
        // navigate('/main');
      }
    }
    // console.log(accessToken);
    // console.log(username);
  }, [navigate]);
  // const fetchUser = async (token) => {
  //   try {
  //     const response = await axios.get('http://localhost:8081/user', {
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       },
  //       withCredentials: true
  //     });
      
  //     setUser(response.data);
  //     setSignupPlatform(response.data.signupPlatform); // signupPlatform 설정
  //   } catch (error) {
  //     console.error('Error fetching user data', error);
  //   }
  // };


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8081/logout', {}, { withCredentials: true });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      setAccessToken(null);
      setSignupPlatform(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };


  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:8081/signup', 
        { nickName, aboutMe, signupPlatform, selectedInterests },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      console.log('추가 정보 입력 완료', response);
      navigate('/main');
    } catch (error) {
      console.error('추가 정보 입력 실패', error);
      handleLogout();
    }
  }


  return (
    <div className="App">
      <main>
        <div className="login-container">
          <div className='logo-content'>
            <img className='midle-logo' src="images/commons/logo.png" alt="LOGO"/>
          </div>
          <div>
            <p className='titles'>추가 정보 입력</p>
            <div className='inputBox'>
              <div className='NickBox'>
                <div className='NickTitle'>닉네임</div>
                <input maxLength='10' className='NickName' placeholder='닉네임' onChange={(e)=>setNickName(e.target.value)} />
              </div>
              <div className='AboutBox'>
                <div className='AboutTitle' >자기소개</div>
                <textarea maxLength='300' className='AboutMe' placeholder='자기소개를 입력해 주세요'onChange={(e)=>setAboutMe(e.target.value)} />
              </div>
            </div>
            <p className='InterestTitle'>
              <span className='textRed'>관심사를 </span>
              <span>선택해주세요.</span>
            </p>
            <span className='textRed'>최대 3개</span>
            <span>까지 선택할 수 있습니다.</span>
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
              <button className='btn1' onClick={handleLogout}>취 소</button>

              <button className={selectedInterests.length < 1 ?'btn2':'btn3'} 
              onClick={handleSignUp}>등 록
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default SignUp;
