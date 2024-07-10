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
    const [inputError, setInputError] = useState('');
    const [isValidForm, setIsValidForm] = useState(true);
    const maxLength = 180;
    
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
            // console.log('Updated user data:', loggedInUser);
        }
    }, [loggedInUser]);

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
            setInputText(newNickname);
            if (!isValidNickname(newNickname)) {
                setInputError('닉네임은 한글, 영문, 숫자만 사용 가능하며, 자음 또는 모음만으로 이루어질 수 없습니다.');
                setIsValidForm(false);
            } else {
                setInputError('');
                setIsValidForm(true);
            }
        }
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
        if (!isValidForm) {
            alert('올바른 닉네임을 입력해주세요.');
            return;
        }
        setShowReCheckModal(true);
    };

    const handleConfirm = async () => {
        setShowReCheckModal(false);
        
        if (!isValidForm) {
            alert('올바른 닉네임을 입력해주세요.');
            return;
        }

        const updatedInterests = Object.entries(choiceInterest)
            .filter(([_, value]) => value)
            .map(([key, _]) => ({
                interestCode: INTERESTS.indexOf(key) + 1,
                interestName: key
            }));
    
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
                onProfileUpdate(response.data.results.updateProflie);
            }
        } catch (error) {
            console.error("프로필 업데이트 실패:", error.response ? error.response.data : error.message);
            alert("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
        }
    };


    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    return (
        <div className='profile-container'>
            <div className='profile-left'>
                <p className='name'>이름</p>
                <input className='name-input' type='text' placeholder='닉네임을 입력하세요.' value={inputText} onChange={handleInputChange} maxLength={16}/>
                <p className='intro'>자기소개</p>
                <p className='limit'>{textAreaText.length}/{maxLength}</p>
                <textarea className='intro-textarea' placeholder='자기소개를 입력하세요.' value={textAreaText} onChange={handleTextAreaChange} />
                {inputError && <p className="error-message" style={{color:"red", fontSize: '10px'}}>{inputError}</p>}
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
                <button className='modify-btn' onClick={modifySubmit} disabled={!isValidForm}>수정</button>
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