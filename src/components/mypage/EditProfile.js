import './EditProfile.css';
import {useState, useEffect} from 'react';

function EditProfile( {nickName, introduce, profileUpdate}) {

    const [inputText, setInputText] = useState(nickName);
    const [textAreaText, setTextAreaText] = useState(introduce);

    const maxLength = 100;

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleTextAreaChange = (e) => {
        if (e.target.value.length <= maxLength) {
        setTextAreaText(e.target.value);
    }};

    const handleSubmit = () => {
    profileUpdate(inputText, textAreaText);
    }

    return (
        <div className='profile-container'>
            <div className='profile-left'>
                <p className='name'>이름</p>
                <input className='name-input' type='text' placeholder={ '닉네임을 입력하세요.' } value={inputText} onChange={handleInputChange}/>
                <p className='intro'>자기소개</p>
                <p className='limit'>{textAreaText.length}/{maxLength}</p>
                <textarea className='intro-textarea' type='text' placeholder={ '자기소개를 입력하세요.' } value={textAreaText} onChange={handleTextAreaChange} />
            </div>    
            <hr/>
            <div className='profile-right'>
                <p>관심사</p>
                <div className='interest-wrapper'>
                    <input type='button' value='# 팝업'/>
                    <input type='button' value='# 공연'/>
                    <input type='button' value='# 행사/축제'/>
                    <input type='button' value='# 전시회'/>
                    <input type='button' value='# 뮤지컬'/>
                </div>
                <div className='modify-container'>
                    <button className='modify-btn' onClick={handleSubmit}>수정</button>
                </div>
            </div>    
        </div>
    );
}

export default EditProfile;