import React from 'react';
import './SignUpCompleted.css';
import { NavLink } from 'react-router-dom';


function Completed() {
    return (
        <div className="App">
        <main>
            <div className="login-container">
            <div className='logo-content'>
            <img className='chack' src='images/commons/icon_confirm.png'/>
            </div>
                
                </div>
                
        
            <div>
                <p className='ctextitle'>
                    <span>환영 합니다! </span>
                </p>
                <div>
                <span className='ctext2'>이름(닉네임)님 </span>
                <span className='ctext'>의 회원 가입이</span>
                </div>
                <p className='ctext'>완료 되었습니다.</p>
            </div>
            <div className='ctextBox'>
                <pre className='ctextB'>*회원 가입 내역 확인 및 수정은</pre>
                <pre className='ctextRed'>  마이페이지 =&gt; 회원 정보 수정 </pre>
                <pre className='ctextB'>에서 가능합니다.</pre>
            </div>
            </main>

            <NavLink to='/login'>
                <button className='loginBtn'>로그인 바로가기</button>
            </NavLink>
        </div>
        
    );
    }
    
    export default Completed;