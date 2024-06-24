import './EditProfile.css';
import {useState, useEffect} from 'react';

function EditProfile( {nickName, introduce, profileUpdate}) {

    const [inputText, setInputText] = useState(nickName);
    const [textAreaText, setTextAreaText] = useState(introduce);

    const maxLength = 180;

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleTextAreaChange = (e) => {
        if (e.target.value.length <= maxLength) {
        setTextAreaText(e.target.value);
    }};

    const handleSubmit = () => {
    profileUpdate(inputText, textAreaText);
    setShowConfirmModal(false); // 모달 닫기
    }

    /* 관심사 버튼 State */
    const [choiceInterest, setChoiceInterest] = useState({
        passingTags: {
            팝업: false,
            공연: false,
            행사축제: false,
            전시회: false,
            뮤지컬: false,
        }
    });

    /* 관심사 버튼 클릭시 state 변경(true/false) */
    const handleInterest = (e) => {
        const interestType = e.target.id;

        setChoiceInterest(prevState => {
            const newState = {
                passingTags: {
                    ...prevState.passingTags,
                    [interestType]: !prevState.passingTags[interestType]
                }
            };
            console.log(`Updated state for ${interestType}:`, newState.passingTags[interestType]);
            return newState;
        });

        // 여기서 이전 상태를 출력함 (업데이트된 상태는 다음 렌더링에서 적용됨)
        console.log(e.target.id)
        console.log(choiceInterest)
    };

    useEffect(() => {
        console.log('State updated:', choiceInterest);
    }, [choiceInterest]);

    const [showReCheckModal, setShowReCheckModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    /* 제출버튼 눌렀을 때 모달창 띄우기 */
  const modifySubmit = () => {
    setShowReCheckModal(true);
  }

  /* 확인버튼 */
  const okBtn = () => {
    setShowReCheckModal(false);
    setShowConfirmModal(true);
  }

  const noBtn = () => {
    setShowReCheckModal(false);
  }

  const confirmBtn = () => {
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
            <hr className='divide-line'/>
            <div className='profile-right'>
                <p>관심사</p>
                <div className='interest-wrapper'>
                {
                Object.keys(choiceInterest.passingTags).map(tag => (
                <button key={tag} id={tag} onClick={handleInterest} className={choiceInterest.passingTags[tag] ? 'selected' : ''}>
                    # {tag}
                </button>
                ))
                }
                </div>
                <div className='modify-container'>
                    <button className='modify-btn' onClick={modifySubmit}>수정</button>
                </div>
            </div>
            {/* 제출확인 Modal */}
      {showReCheckModal && (
        <div className="modal-container">
          <div className="modal-content">
          <img src={`${process.env.PUBLIC_URL}/images/commons/icon_alert.png`}/>
            <p className="modal-semibold">확인을 누르면</p>
            <p className="modal-semibold">프로필이 변경됩니다.</p>
            <div className="modal-buttons">
              <button className="modal-button no" onClick={noBtn}>
                취소
              </button>
              <button className="modal-button yes" onClick={okBtn}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 제출확인 Modal */}
      {showConfirmModal && (
        <div className="confirm-modal-container">
          <div className="confirm-modal-content">
          <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`}/>
            <p className="confirm-modal-semibold">프로필이 변경되었습니다.</p>
            <div className="confirm-modal-buttons">
              <button className="confirm-modal-button yes" onClick={handleSubmit}>
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