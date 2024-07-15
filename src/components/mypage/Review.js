import "./Review.css";
import { useState, useEffect } from 'react';
import axios from "axios";

function MyComments({finishedHoneyPotList, particiMember, user, ratingCategory}) {

  const [showReCheckModal, setShowReCheckModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [partyPeople, setPartyPeople] = useState(false);
  const [selectedHoneypotCode, setSelectedHoneypotCode] = useState(null);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(null);
  const [selectedHoneypot, setSelectedHoneypot] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [evaluatedMembers, setEvaluatedMembers] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredFinishedHoneyPotList, setFilteredFinishedHoneyPotList] = useState([]);

  const isWithinSevenDays = (eventDate) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    const diffTime = today.getTime() - eventDay.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  useEffect(() => {
    const filteredList = finishedHoneyPotList.filter(honeypot => 
      isWithinSevenDays(honeypot.eventDate)
    );
    setFilteredFinishedHoneyPotList(filteredList);
    
    if (filteredList.length === 0) {
      setHasData(false);
    } else {
      setHasData(true);
    }
  }, [finishedHoneyPotList]);

  const clickMannerBtn = (honeypot) => {
    setPartyPeople(true);
    setSelectedHoneypotCode(honeypot.honeypotCode);
    setSelectedHoneypot(honeypot);
    setSelectedProfileIndex(null);
  }

  const fetchEvaluationData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/mypage/rating`, {
        params: {
          honeypotCode: selectedHoneypotCode,
          raterCode: user.userCode
        }
      });
      
      const newEvaluationData = {};
      response.data.forEach(evaluation => {
        if (evaluation.raterCode === user.userCode) {
          newEvaluationData[evaluation.rateeCode] = evaluation.ratingCode;
        }
      });
      
      setEvaluationData(newEvaluationData);
    } catch (error) {
      console.error('평가 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  
  useEffect(() => {
    if (selectedHoneypotCode) {
      fetchEvaluationData();
    }
  }, [selectedHoneypotCode]);

  useEffect(() => {
    if (selectedHoneypotCode) {
      const foundHoneypot = particiMember.find(hp => hp.honeypotCode === selectedHoneypotCode);
      if (foundHoneypot) {
        const filteredParticipants = foundHoneypot.participants.filter(
          participant => participant.userCode !== user.userCode
        );
        setParticipants(filteredParticipants);
      } else {
        console.log('해당 허니팟을 찾을 수 없습니다.');
        setParticipants([]);
      }
    }
  }, [selectedHoneypotCode, particiMember]);

  const reviewSubmit = () => {
    setShowReCheckModal(true);
  }

  const okBtn = () => {
    setShowReCheckModal(false);
    submitEvaluation();
  };

  const submitEvaluation = () => {
    if (isSubmitting) return;
  
    setIsSubmitting(true);
    
    const requestData = {
      honeypotCode: selectedHoneypotCode,
      raterCode: user.userCode,
      rateeCode: selectedProfileIndex !== null ? participants[selectedProfileIndex].userCode : null,
      ratingCode: selectedRadio
    };
  
    axios.post('http://localhost:8081/mypage/userrating', requestData)
      .then(response => {
        setShowConfirmModal(true);
        
        setEvaluationData(prevData => {
          const newData = {...prevData, [requestData.rateeCode]: requestData.ratingCode};
          return newData;
        });
        
        setSelectedProfileIndex(null);
        setSelectedPointIndex(null);
        setSelectedRadio(null);
      })
      .catch(error => {
        console.error('평가 등록 중 오류 발생:', error);
        alert("이미 평가한 멤버입니다.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const noBtn = () => {
    setShowReCheckModal(false);
  }

  const confirmBtn = () => {
    setShowConfirmModal(false);
  }

  const profileClick = (index) => {
    setSelectedProfileIndex(index);
    setSelectedPointIndex(null);
    setSelectedRadio(null);
  };

  const pointClick = (index) => {
    setSelectedPointIndex(index);
    setSelectedRadio(null);
  };

  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const pointChoices = [
    { imgSrc: "/images/mypage/angryface.png", text: "못 만났어요" },
    { imgSrc: "/images/mypage/pensiveface.png", text: "불편했어요" },
    { imgSrc: "/images/mypage/neutralface.png", text: "보통이에요" },
    { imgSrc: "/images/mypage/grinningface.png", text: "괜찮았어요" },
    { imgSrc: "/images/mypage/starstruck.png", text: "좋았어요!" },
  ];

  const choiceText = () => {
    if (selectedPointIndex === null) return null;
  
    const filteredCategories = ratingCategory.filter(
      category => category.score === selectedPointIndex + 1
    );
  
    return filteredCategories.map((category, index) => (
      <label htmlFor={`choice${index}`} className="radio-box" key={index}>
        <input
          type="radio"
          id={`choice${index}`}
          name="choice"
          value={category.ratingCode}
          checked={selectedRadio === category.ratingCode}
          onChange={() => {
            setSelectedRadio(category.ratingCode);
          }}
        />
        <span className="radio-btn"></span>
        {category.content}
      </label>
    ));
  };

  return (
    <>
    {
      !hasData ? 
    (
      <div className="review-detail">
      <div className="fin-honeypot-title">
        <p>진행완료 된 허니팟</p>
      </div>
      <div className="fin-honeypot-container">
        <div className="null-fin-honeypot-list">
          <p>진행완료된 허니팟이 없어요</p>
          <p className="blur">
            진행 완료된 허니팟은 여기에서 확인할 수 있어요.
          </p>
        </div>
        <div className="null-fin-honeypot-member-list">
          <p>진행완료된 허니팟이 없으면</p>
          <p>평가를 할 수 없습니다.</p>
        </div>
      </div>
    </div>
    ) : (
      <div className="review-detail">
      <div className="fin-honeypot-title">
        <p>진행완료 된 허니팟</p>
      </div>
      <div className="fin-honeypot-container">
        
        <div className="fin-honeypot-list">
        {filteredFinishedHoneyPotList.map((finishedHoneyPot, index) => (
        <div className="fin-honeypot" key={index}>
          <div className="poster">
            <img
              src={finishedHoneyPot.poster}
              alt="포스터"
            />
          </div>
          <div className="list-contents">
            <div className="text">
              <p className="status">진행완료</p>
              <p className="reg-date">{finishedHoneyPot.eventDate}</p>
              <p className="honeypot-title">{finishedHoneyPot.honeypotTitle}</p>
              <p className="participate">참여인원 {Number(finishedHoneyPot.approvalCount) + 1} / {finishedHoneyPot.totalMember}</p>
            </div>
            <div className="button">
              <button onClick={() => clickMannerBtn(finishedHoneyPot)}>멤버 평가</button>
            </div>
          </div>
        </div>
      ))}
        </div>
        {!partyPeople ?
        (
        <div className="hide-honeypot-member-list">
          <p>좌측 멤버 평가를 눌러주세요.</p>
        </div>) : (
          <div className="fin-honeypot-member-list">
          <div className="review-explanation">
            <div className="explanation-semibold">
              <p>신뢰할 수 있는 커뮤니티를 만들기 위해</p>
              <p>멤버 평가를 남겨주세요.</p>
            </div>
            <div className="explanation-blur">
              <p>남겨주신 평가는 익명으로 반영되며</p>
              <p>원하는 멤버만 선택해서 평가할 수 있어요.</p>
            </div>
          </div>
          <div className="choice-profile">
          {participants.map((profile, index) => {
            const isEvaluated = evaluationData.hasOwnProperty(profile.userCode);
            
            return (
              <div
                className={`one-profile ${isEvaluated ? 'evaluated' : ''}`}
                onClick={() => !isEvaluated && profileClick(index)}
                key={index}
                style={{
                  opacity: isEvaluated ? 0.3 : 1,
                  cursor: isEvaluated ? "not-allowed" : "pointer",
                }}
              >
                <img src={profile.profilePic} alt="프로필사진" />
                <p style={{
                  color: selectedProfileIndex === index ? "#EB844A" : "var(--blur-color)",
                  fontFamily: selectedProfileIndex === index ? "'SUIT Semibold', sans-serif" : "'SUIT Regular', sans-serif",
                  fontSize: "12px",
                }}>
                  {profile.nickname}
                </p>
              </div>
            );
          })}
          </div>
          <div className="choice-point-container">
            {selectedProfileIndex !== null ? (
              pointChoices.map((pointChoice, index) => (
                <div
                  className="choice-point"
                  onClick={() => pointClick(index)}
                  key={index}
                  style={{
                    opacity:
                      selectedPointIndex !== null &&
                      selectedPointIndex !== index
                        ? 0.3
                        : 1,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}${pointChoice.imgSrc}`}
                    alt="점수선택사진"
                  />
                  <p>{pointChoice.text}</p>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>

          <div className="choice-text">
            {choiceText()}
          </div>

          {selectedRadio && (
            <input className="send-review-btn" type="submit" value='제출' onClick={reviewSubmit} disabled={isSubmitting}/>
          )}
          </div>
        )}
      </div>
    </div>)
    }
      
      {showReCheckModal && (
        <div className="modal-container">
          <div className="modal-content">
          <img src={`${process.env.PUBLIC_URL}/images/commons/icon_alert.png`}/>
            <p className="modal-semibold">평가를 제출하시겠습어요?</p>
            <p className="modal-regular">제출하면 더이상 내용을 수정할 수 없어요!!</p>
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
      {showConfirmModal && (
        <div className="confirm-modal-container">
          <div className="confirm-modal-content">
          <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`}/>
            <p className="confirm-modal-semibold">평가가 제출되었습니다.</p>
            <div className="confirm-modal-buttons">
              <button className="confirm-modal-button yes" onClick={confirmBtn}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyComments;