import ApplicationApi from "../../apis/honeypot/ApplicationApi";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function UserDetailPage({ detailHoneypot, filteredCultureList, title, convertDateFormat, navigate, user }) {
  const [applications, setApplications] = useState([]);
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (detailHoneypot && detailHoneypot.honeypotCode) {
      ApplicationApi(detailHoneypot.honeypotCode, setApplications);
    }
  }, [detailHoneypot]);

  const approvedApplications = applications.filter(app => app.decisionStatus === '승인');

  const handleParticipate = () => {
    if(detailHoneypot.closureStatus === '진행완료') {
      setResultMessage('진행 완료 된 모임은 신청하실 수 없습니다.');
      setShowResultModal(true);
      return;
    }
    
    if (detailHoneypot.closureStatus === '모집완료' || approvedApplications.length + 1 >= detailHoneypot.totalMember) {
      setResultMessage('모집이 완료되어 신청하실 수 없습니다.');
      setShowResultModal(true);
      return;
    }

    const alreadyApplied = applications.some(app => app.applicationCategory.userCategory.userCode === user.userCode);
    if (alreadyApplied) {
      setResultMessage('이미 참여 신청한 사용자입니다.');
      setShowResultModal(true);
      return;
    }

    setShowParticipateModal(true);
  };

  const confirmParticipate = async () => {
    try {
      await axios.post('http://localhost:8081/honeypot/application', {
        honeypotCategory: {
          honeypotCode: detailHoneypot.honeypotCode
        },
        userCategory: {
          userCode: user.userCode
        },
        applicationDate: new Date().toISOString().slice(0, 10)
      });

      setResultMessage('참가 신청이 완료되었습니다.');
      ApplicationApi(detailHoneypot.honeypotCode, setApplications);
    } catch (error) {
      console.error('참가 신청 실패:', error);
      setResultMessage('참가 신청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setShowParticipateModal(false);
      setShowResultModal(true);
    }
  };

  return (
    <div className='honeypot-detail-container'>
      <div className='title-status-regdate'>
        <p className='detail-title'>{detailHoneypot.honeypotTitle}</p>
        <div className='detail-status'>{detailHoneypot.closureStatus}</div>
        <p className='detail-regdate'>작성일 : {detailHoneypot.regDate}</p>
      </div>
      <div className='detail-introduction-container'>
        <p>{detailHoneypot.honeypotContent}</p>
      </div>
      <div className='eventdate-totalpeople-container'>
        <div className='detail-index-btn'>허니팟일정</div>
        <p className='event-date'>{detailHoneypot.eventDate}</p>
        <div className='detail-index-btn'>참여인원</div>
        <p> {approvedApplications.length + 1} / {detailHoneypot.totalMember}</p>
      </div>
      <div className='eventdate-totalpeople-container'>
        <div className='detail-index-btn'>모집 마감일</div>
        <p className='event-date'>{detailHoneypot.endDate}</p>
      </div>
      <div className='application-user'>
        <p>참여 멤버</p>
        {approvedApplications.length > 0 ? (
          <div className="one-people-wrapper"> 
            {approvedApplications.map(app => (
              <div key={app.applicationCategory.userCategory.userCode} className='one-people'>
                <img src={app.applicationCategory.userCategory.profilePic} alt="프로필사진"/>
                <p>{app.applicationCategory.userCategory.nickname}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>참여자가 없습니다.</p>
        )}
      </div>
      <div className='btn-container'>
        <button className='go-to-list' onClick={() => navigate('/honeypot')}> 목록으로</button>
        <button className='go-to-modify' onClick={handleParticipate}>참여하기</button>
      </div>

      {showParticipateModal && (
        <div className='modal-container'>
          <div className='warningmodal-content4'>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_alert.png`} alt="경고아이콘"/>
            <p className="warning-message">참여 신청하시겠습니까?</p>
            <div className="warning-modal-buttons2">
              <button className="warning-modal-button no2" onClick={() => setShowParticipateModal(false)}>
                아니오
              </button>
              <button className="warning-modal-button yes2" onClick={confirmParticipate}>
                예
              </button>
            </div>
          </div>
        </div>
      )}

      {showResultModal && (
        <div className='modal-container'>
          <div className='warningmodal-content4'>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`} alt="경고아이콘"/>
            <p className="warning-message">{resultMessage}</p>
            <div className="warning-modal-buttons">
              <button className="warning-modal-button yes" onClick={() => setShowResultModal(false)}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}