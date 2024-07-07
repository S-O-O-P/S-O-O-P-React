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

  const clickMannerBtn = (honeypot) => {
    console.log('허니팟코드?', honeypot.honeypotCode);
    setPartyPeople(true);
    setSelectedHoneypotCode(honeypot.honeypotCode);
    setSelectedHoneypot(honeypot);
    setSelectedProfileIndex(null);
  }

  const fetchEvaluationData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/mypage/userratring`, {
        params: {
          honeypotCode: selectedHoneypotCode,
          raterCode: user.userCode
        }
      });
      console.log('서버 응답:', response.data);
      
      const newEvaluationData = {};
      response.data.forEach(evaluation => {
        if (evaluation.raterCode === user.userCode) {
          newEvaluationData[evaluation.rateeCode] = evaluation.ratingCode;
        }
      });
      
      setEvaluationData(newEvaluationData);
      console.log('설정된 evaluationData:', newEvaluationData);
    } catch (error) {
      console.error('평가 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  
  useEffect(() => {
    console.log('evaluationData 변경:', evaluationData);
  }, [evaluationData]);
  
  useEffect(() => {
    if (selectedHoneypotCode) {
      fetchEvaluationData();
    }
  }, [selectedHoneypotCode]);

  useEffect(() => {
    if (selectedHoneypotCode) {
      const foundHoneypot = particiMember.find(hp => hp.honeypotCode === selectedHoneypotCode);
      if (foundHoneypot) {
        // 자기 자신을 제외한 참여자만 필터링
        const filteredParticipants = foundHoneypot.participants.filter(
          participant => participant.userCode !== user.userCode // 또는 userCode를 사용할 수 있습니다
        );
        console.log('참여멤버 (자신 제외)', filteredParticipants);
        setParticipants(filteredParticipants);
      } else {
        console.log('해당 허니팟을 찾을 수 없습니다.');
        setParticipants([]);
      }
    }
  }, [selectedHoneypotCode, particiMember]);

  useEffect(() => {
    // finishedHoneyPotList의 길이가 0일 때 데이터가 없는 것으로 처리
    if (finishedHoneyPotList.length === 0) {
        setHasData(false);
    } else {
        setHasData(true);
    }
}, [finishedHoneyPotList]);  

  /* 제출버튼 눌렀을 때 모달창 띄우기 */
  const reviewSubmit = () => {
    setShowReCheckModal(true);
  }

    /* 확인버튼 클릭 시 모달 닫고 서버로 평가 등록 요청 */
    const okBtn = () => {
      setShowReCheckModal(false);
      // 여기서 서버로 평가 등록 요청을 보낼 수 있습니다.
      submitEvaluation(); // 평가 제출 함수 호출
    };
  
    /* 서버로 평가 등록 요청 보내는 함수 */
    const submitEvaluation = () => {
      if (isSubmitting) return;
    
      setIsSubmitting(true);
      
      const requestData = {
        honeypotCode: selectedHoneypotCode,
        raterCode: user.userCode,
        rateeCode: selectedProfileIndex !== null ? participants[selectedProfileIndex].userCode : null,
        ratingCode: selectedRadio
      };
    
      console.log('제출할 평가 데이터:', requestData);
    
      axios.post('http://localhost:8081/mypage/userrating', requestData)
        .then(response => {
          console.log('평가가 성공적으로 등록되었습니다.', response.data);
          setShowConfirmModal(true);
          
          setEvaluationData(prevData => {
            const newData = {...prevData, [requestData.rateeCode]: requestData.ratingCode};
            console.log('업데이트된 evaluationData:', newData);
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
    console.log('선택한 피평가자 : ', participants[index].userCode);
  };

  const pointClick = (index) => {
    setSelectedPointIndex(index);
    setSelectedRadio(null);
    console.log('선택한 점수:', index + 1); // 선택한 얼굴의 점수 출력
  };

  /* 평점 얼굴 선택 */
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const pointChoices = [
    { imgSrc: "/images/mypage/angryface.png", text: "못 만났어요" },
    { imgSrc: "/images/mypage/pensiveface.png", text: "불편했어요" },
    { imgSrc: "/images/mypage/neutralface.png", text: "보통이에요" },
    { imgSrc: "/images/mypage/grinningface.png", text: "괜찮았어요" },
    { imgSrc: "/images/mypage/starstruck.png", text: "좋았어요!" },
  ];

  /* 평점 얼굴 선택시 텍스트 */
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
            console.log(`Selected ratingCode: ${category.ratingCode}`)
            console.log(`Selected score: ${category.score}`);
            console.log(`Selected content: ${category.content}`);
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
      hasData == false ? 
    (
      <div className="review-detail">
      <div className="fin-honeypot-title">
        <p>진행완료 된 허니팟</p>
      </div>
      <div className="fin-honeypot-container">
        {/* 자료 없음 */}
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
        {/* 자료 있음 */}
      <div className="fin-honeypot-title">
        <p>진행완료 된 허니팟</p>
      </div>
      <div className="fin-honeypot-container">
        
        <div className="fin-honeypot-list">
        {finishedHoneyPotList.map((finishedHoneyPot, index) => (
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
              <p className="reg-date">{finishedHoneyPot.regDate}</p>
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
        {partyPeople == false ?
        (
        <div className="hide-honeypot-member-list">
          {/* 버튼 누르기 전 */}
          <p>좌측 멤버 평가를 눌러주세요.</p>
        </div>) : (
          <div className="fin-honeypot-member-list">
            {/* 버튼 눌렀을 시 */}
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
  console.log(`프로필 ${profile.nickname}: isEvaluated = ${isEvaluated}, evaluationData:`, evaluationData);
  
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
        {isEvaluated && <span className="evaluated-text"> (평가 완료)</span>}
      </p>
    </div>
  );
})}
          </div>
          {/*멤버 프로필 선택 시*/}
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
                    cursor: "pointer", // 선택 가능하다는 것을 시각적으로 표시
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
              // 선택된 프로필이 없는 경우 빈 div로 처리
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
      
      {/* 제출확인 Modal */}
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
      {/* 제출확인 Modal */}
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