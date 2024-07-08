import './EditProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios'; // axios를 사용한다고 가정합니다. 필요에 따라 다른 HTTP 클라이언트를 사용할 수 있습니다.

const INTERESTS = ['팝업', '공연', '행사/축제', '전시회', '뮤지컬'];

function EditProfile({ loggedInUser, onProfileUpdate }) {
    const [inputText, setInputText] = useState(loggedInUser.nickname);
    const [textAreaText, setTextAreaText] = useState(loggedInUser.aboutme);
    const [choiceInterest, setChoiceInterest] = useState({
        팝업: false,
        공연: false,
        행사축제: false,
        전시회: false,
        뮤지컬: false,
    });
    const [showReCheckModal, setShowReCheckModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // useEffect(() => {
    //     const initialInterests = {
    //         팝업: false,
    //         공연: false,
    //         행사축제: false,
    //         전시회: false,
    //         뮤지컬: false,
    //     };
    //     loggedInUser.interests.forEach(interest => {
    //         initialInterests[interest.interestName] = true;
    //     });
    //     setChoiceInterest(initialInterests);
    // }, [loggedInUser, loggedInUser.nickname, loggedInUser.aboutme]);
    
    useEffect(() => {
      const initialInterests = INTERESTS.reduce((acc, interest) => {
          acc[interest] = loggedInUser.interests.some(i => i.interestName === interest);
          return acc;
      }, {});
      setChoiceInterest(initialInterests);
  }, [loggedInUser]);

    const maxLength = 180;

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleTextAreaChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setTextAreaText(e.target.value);
        }
    };

    const handleInterest = (e) => {
        const interestType = e.target.id;
        setChoiceInterest(prev => ({
            ...prev,
            [interestType]: !prev[interestType]
        }));
    };

    const modifySubmit = () => {
        setShowReCheckModal(true);
    };

    const handleConfirm = async () => {
    setShowReCheckModal(false);
    
    const interestMap = {
        '팝업': 1,
        '공연': 2,
        '행사/축제': 3,
        '전시회': 4,
        '뮤지컬': 5
    };

    const updatedInterests = Object.entries(choiceInterest)
        .filter(([_, value]) => value)
        .map(([key, _]) => interestMap[key])
        .filter(code => code !== undefined);

    const updateData = {
        nickname: inputText,
        aboutme: textAreaText,
        profilePic: loggedInUser.profilePic,
        interests: updatedInterests
    };

    try {
        await axios.put(`http://localhost:8081/mypage/${loggedInUser.userCode}`, updateData);
        setShowConfirmModal(true);
        if (onProfileUpdate) {
            onProfileUpdate(updateData);
        }
        console.log('업데이트된 데이터:', updateData);
    } catch (error) {
        console.error("프로필 업데이트 실패:", error);
        // 오류 처리 로직 (예: 오류 메시지 표시)
    }
};

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    return (
        <div className='profile-container'>
            <div className='profile-left'>
                <p className='name'>이름</p>
                <input className='name-input' type='text' placeholder='닉네임을 입력하세요.' value={inputText} onChange={handleInputChange}/>
                <p className='intro'>자기소개</p>
                <p className='limit'>{textAreaText.length}/{maxLength}</p>
                <textarea className='intro-textarea' placeholder='자기소개를 입력하세요.' value={textAreaText} onChange={handleTextAreaChange} />
            </div>    
            <hr className='divide-line'/>
            <div className='profile-right'>
                <p>관심사</p>
                <div className='interest-wrapper'>
                    {Object.keys(choiceInterest).map(tag => (
                        <button 
                            key={tag} 
                            id={tag} 
                            onClick={handleInterest} 
                            className={choiceInterest[tag] ? 'selected' : ''}
                        >
                            # {tag}
                        </button>
                    ))}
                </div>
                <div className='modify-container'>
                    <button className='modify-btn' onClick={modifySubmit}>수정</button>
                </div>
            </div>
            
            {showReCheckModal && (
                <div className="modal-container">
                    <div className="modal-content">
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_alert.png`} alt="Alert"/>
                        <p className="modal-semibold">확인을 누르면</p>
                        <p className="modal-semibold">프로필이 변경됩니다.</p>
                        <div className="modal-buttons">
                            <button className="modal-button no" onClick={() => setShowReCheckModal(false)}>
                                취소
                            </button>
                            <button className="modal-button yes" onClick={handleConfirm}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {showConfirmModal && (
                <div className="confirm-modal-container">
                    <div className="confirm-modal-content">
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`} alt="Confirm"/>
                        <p className="confirm-modal-semibold">프로필이 변경되었습니다.</p>
                        <div className="confirm-modal-buttons">
                            <button className="confirm-modal-button yes" onClick={closeConfirmModal}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}    
        </div>
    );
}

export default EditProfile;