import './EditProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const INTERESTS = ['팝업', '공연', '행사/축제', '전시회', '뮤지컬'];

function EditProfile({ loggedInUser, onProfileUpdate }) {
    const [inputText, setInputText] = useState(loggedInUser.nickname);
    const [textAreaText, setTextAreaText] = useState(loggedInUser.aboutme);
    const [choiceInterest, setChoiceInterest] = useState({});
    const [showReCheckModal, setShowReCheckModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedInterestsCount, setSelectedInterestsCount] = useState(0);

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
        if (loggedInUser && loggedInUser.interests) {
            const initialInterests = INTERESTS.reduce((acc, interest) => {
                acc[interest] = loggedInUser.interests.some(i => i.interestName === interest);
                return acc;
            }, {});
            setChoiceInterest(initialInterests);
            setSelectedInterestsCount(Object.values(initialInterests).filter(Boolean).length);
            setInputText(loggedInUser.nickname);
            setTextAreaText(loggedInUser.aboutme);
            console.log('Updated user data:', loggedInUser);
        }
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
        setChoiceInterest(prev => {
            const updatedInterests = { ...prev };
            if (updatedInterests[interestType]) {
                // 이미 선택된 관심사를 선택 해제하는 경우
                updatedInterests[interestType] = false;
                setSelectedInterestsCount(count => count - 1);
            } else if (selectedInterestsCount < 3) {
                // 새로운 관심사를 선택하는 경우 (3개 미만일 때만)
                updatedInterests[interestType] = true;
                setSelectedInterestsCount(count => count + 1);
            } else {
                // 이미 3개가 선택된 상태에서 새로운 관심사를 선택하려고 할 때
                alert('관심사는 최대 3개까지만 선택할 수 있습니다.');
            }
            return updatedInterests;
        });
    };

    const modifySubmit = () => {
        setShowReCheckModal(true);
    };

    const handleConfirm = async () => {
        setShowReCheckModal(false);
        
        const updatedInterests = Object.entries(choiceInterest)
            .filter(([_, value]) => value)
            .map(([key, _]) =>  INTERESTS.indexOf(key) + 1);
    
        const updateData = {
            nickname: inputText,
            aboutme: textAreaText,
            profilePic: loggedInUser.profilePic,
            interests: updatedInterests
        };
    
        try {
            const response = await axios.put(`http://localhost:8081/mypage/${loggedInUser.userCode}`, updateData);
            setShowConfirmModal(true);
            if (onProfileUpdate) {
                onProfileUpdate(response.data);  // 서버 응답 데이터를 전달
            }
        } catch (error) {
            console.error("프로필 업데이트 실패:", error.response ? error.response.data : error.message);
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
            <p>관심사 (최대 3개 선택 가능, 현재 {selectedInterestsCount}개 선택됨)</p>
            <div className='interest-wrapper'>
                {INTERESTS.map(tag => (
                    <button 
                        key={tag} 
                        id={tag} 
                        onClick={handleInterest} 
                        className={choiceInterest[tag] ? 'selected' : ''}
                        disabled={!choiceInterest[tag] && selectedInterestsCount >= 3}
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