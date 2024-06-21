import "./Review.css";
import { useState } from "react";

function MyComments() {
  const [자료있음, 자료변경] = useState(true);
  const [showReCheckModal, setShowReCheckModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  

  /* 제출버튼 눌렀을 때 모달창 띄우기 */
  const reviewSubmit = () => {
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
    setShowConfirmModal(false);
  }

  /* 프로필 선택 */
  const profiles = [
    { imgSrc: "/images/mypage/profile-father.png", name: "웅이아버지", review: "null"},
    { imgSrc: "/images/mypage/profile-song.png", name: "귀여운처제", review: "null" },
    { imgSrc: "/images/mypage/profile-push.png", name: "당기나미나", review: "notNull" },
  ];

  const [selectedProfileIndex, setSelectedProfileIndex] = useState(null);

  const profileClick = (index) => {

    // 평점가를 완료하면 선택안됨.
    if (profiles[index].review === 'null') {
      setSelectedProfileIndex(index);
      setSelectedPointIndex(null); // 프로필 선택 시 포인트 선택 초기화
      setSelectedRadio(null); // 프로필 선택 시 라디오 버튼 초기화
    }

  };

  const pointClick = (index) => {
    setSelectedPointIndex(index);
    setSelectedRadio(null);
  };

  /* 멤버 평점 버튼 */
  const [partyPeople, setPartyPeople] = useState(false);

  const clickMannerBtn = () => {
    setPartyPeople(true);
  }
  

  /* 프로필 선택 */

  /* 평점 얼굴 선택 */
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(null);
  
  const choiceFace = (index) => {
    setSelectedPointIndex(index);
    setSelectedRadio(null);
  };

  const pointChoices = [
    { imgSrc: "/images/mypage/angryface.png", text: "못 만났어요" },
    { imgSrc: "/images/mypage/pensiveface.png", text: "불편했어요" },
    { imgSrc: "/images/mypage/neutralface.png", text: "보통이에요" },
    { imgSrc: "/images/mypage/grinningface.png", text: "괜찮았어요" },
    { imgSrc: "/images/mypage/starstruck.png", text: "좋았어요!" },
  ];
  /* 평점 얼굴 선택 */

  /* 평점 얼굴 선택시 텍스트 */

  const choiceText = () => {
    switch (selectedPointIndex) {
      case 0:
        return (
          <>
            <label for="choice1" className="radio-box">
              <input type="radio" id="choice1" name="choice" value="option1"
                checked={selectedRadio === "option1"}
                onChange={() => setSelectedRadio("option1")}/>
              <span className="radio-btn"></span>
              사전 연락 없이 무단으로 모임에 불참했어요.
            </label>
            <label for="choice2" className="radio-box">
              <input type="radio" id="choice2" name="choice" value="option2"
                checked={selectedRadio === "option2"}
                onChange={() => setSelectedRadio("option2")}/>
              <span className="radio-btn"></span>
              불참 의사를 멤버들에게 알리고 모임에 불참했어요.
            </label>
          </>
        );
      case 1:
        return (
          <>
            <label for="choice1" className="radio-box">
              <input type="radio" id="choice1" name="choice" value="option1"
                checked={selectedRadio === "option1"}
                onChange={() => setSelectedRadio("option1")} />
              <span className="radio-btn"></span>
              시간 약속을 지키지 않아서 다른 사람들이 모두 기다렸어요.
            </label>
            <label for="choice2" className="radio-box">
              <input type="radio" id="choice2" name="choice" value="option2"
                checked={selectedRadio === "option2"}
                onChange={() => setSelectedRadio("option2")} />
              <span className="radio-btn"></span>
              이성에 대한 과도한 관심을 보여서 불편했어요.
            </label>
            <label for="choice3" className="radio-box">
              <input type="radio" id="choice3" name="choice" value="option3"
                checked={selectedRadio === "option3"}
                onChange={() => setSelectedRadio("option3")} />
              <span className="radio-btn"></span>
              수동적이고 소극적인 태도여서 함께하기 어색했어요.
            </label>
          </>
        );
      case 2:
        return (
          <>
            <label for="choice1" className="radio-box">
              <input type="radio" id="choice1" name="choice" value="option1"
                checked={selectedRadio === "option1"}
                onChange={() => setSelectedRadio("option1")} />
              <span className="radio-btn"></span>
              싫지도 좋지도 않았어요.
            </label>
            <label for="choice2" className="radio-box">
              <input type="radio" id="choice2" name="choice" value="option2"
                checked={selectedRadio === "option2"}
                onChange={() => setSelectedRadio("option2")} />
              <span className="radio-btn"></span>
              평범한 경험이었어요.
            </label>
          </>
        );
      case 3:
        return (
          <>
            <label for="choice1" className="radio-box">
              <input type="radio" id="choice1" name="choice" value="option1"
                checked={selectedRadio === "option1"}
                onChange={() => setSelectedRadio("option1")} />
              <span className="radio-btn"></span>
              대화코드가 잘 맞아 즐겁게 대화할 수 있었어요.
            </label>
            <label for="choice2" className="radio-box">
              <input type="radio" id="choice2" name="choice" value="option2"
                checked={selectedRadio === "option2"}
                onChange={() => setSelectedRadio("option2")} />
              <span className="radio-btn"></span>
              다른 멤버가 이야기 할 때 잘 들어주셨어요.
            </label>
            <label for="choice3" className="radio-box">
              <input type="radio" id="choice3" name="choice" value="option3"
                checked={selectedRadio === "option3"}
                onChange={() => setSelectedRadio("option3")} />
              <span className="radio-btn"></span>
              주도적으로 모임에 잘 참여해 주셨어요.
            </label>
          </>
        );
      case 4:
        return (
          <>
            <label for="choice1" className="radio-box">
              <input type="radio" id="choice1" name="choice" value="option1"
                checked={selectedRadio === "option1"}
                onChange={() => setSelectedRadio("option1")} />
              <span className="radio-btn"></span>
              취향이 통하는 멤버를 만나 좋았어요. 다음에 또 만나고 싶어요.
            </label>
            <label for="choice2" className="radio-box">
              <input type="radio" id="choice2" name="choice" value="option2"
                checked={selectedRadio === "option2"}
                onChange={() => setSelectedRadio("option2")} />
              <span className="radio-btn"></span>
              유쾌하고 밝은 에너지로 분위기 메이커 역할을 했어요.
            </label>
            <label for="choice3" className="radio-box">
              <input type="radio" id="choice3" name="choice" value="option3"
                checked={selectedRadio === "option3"}
                onChange={() => setSelectedRadio("option3")} />
              <span className="radio-btn"></span>
              덕분에 시간가는줄 모르고 즐거운 경험을 했어요.
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
    {
      자료있음 == false ? 
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
          <div className="fin-honeypot">
            <div className="poster">
              <img
                src={`${process.env.PUBLIC_URL}/images/mypage/poster.png`}
                alt="포스터"
              />
            </div>
            <div className="list-contents">
              <div className="text">
                <p className="status">진행완료</p>
                <p className="reg-date">2024년 6월 3일 모집시작</p>
                <p className="honeypot-title">XX 같이 볼 사람</p>
                <p className="participate">참여인원 4/4</p>
              </div>
              <div className="button">
                <button onClick={ clickMannerBtn }>멤버 평가</button>
              </div>
            </div>
          </div>
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
{profiles.map((profile, index) => (
  <div
    className="one-profile"
    onClick={() => profileClick(index)}
    key={index}
    style={{
      opacity:
        selectedProfileIndex !== null && selectedProfileIndex !== index
          ? 0.3
          : 1,
      cursor: "pointer",
    }}
  >
    <img
      src={`${process.env.PUBLIC_URL}${profile.imgSrc}`}
      alt="프로필사진"
    />
    <p
      style={{
        color: selectedProfileIndex === index ? "#EB844A" : "var(--blur-color)",
        fontFamily: selectedProfileIndex === index
          ? "'SUIT Semibold', sans-serif"
          : "'SUIT Regular', sans-serif",
        fontSize: "12px",
      }}
    >
      {profile.name}
    </p>
  </div>
))}
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
            <input className="send-review-btn" type="submit" value='제출' onClick={reviewSubmit}/>
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