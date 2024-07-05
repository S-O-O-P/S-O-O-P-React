import ApplicationApi from "../../apis/honeypot/ApplicationApi";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function UserDetailPage({ detailHoneypot, filteredCultureList, title, convertDateFormat, navigate, user }) {
  const [applications, setApplications] = useState([]); // 참가신청자

  // 참가신청정보 조회
  useEffect(() => {
    if (detailHoneypot && detailHoneypot.honeypotCode) {
      ApplicationApi(detailHoneypot.honeypotCode, setApplications);
    }
  }, [detailHoneypot]);

  // 승인 여부 필터링
  const approvedApplications = applications.filter(app => app.decisionStatus === '승인');
  console.log('승인 된 신청인 수: ', approvedApplications.length)
  console.log('트루인가 : ', approvedApplications.length + 1 === detailHoneypot.totalMember)

  // 참여하기 버튼 클릭 시 동작할 함수
  const handleParticipate = async () => {
    try {
      // 이미 참여한 사용자인지 확인
      const alreadyApplied = applications.some(app => app.applicationCategory.userCategory.userCode === user.userCode);
      if (alreadyApplied) {
        alert('이미 참여 신청한 사용자입니다.');
        return;
      }

      if(approvedApplications.length + 1 === detailHoneypot.totalMember) {
        alert('신청인원이 다 찼습니다.');
        return;
      }

      // 참여 신청 API 호출
      const response = await axios.post('http://localhost:8081/honeypot/application', {
        honeypotCategory: {
          honeypotCode: detailHoneypot.honeypotCode
        },
        userCategory: {
          userCode: user.userCode
        },
        applicationDate: new Date().toISOString().slice(0, 10) // 오늘 날짜를 ISO 포맷으로 설정
      });

      // 참여 신청 완료 메시지
      console.log('등록완료 정보 : ', response);
      alert('참가 신청이 완료되었습니다.');

      // 신청 완료 후 참가 신청자 정보 다시 조회
      ApplicationApi(detailHoneypot.honeypotCode, setApplications);

    } catch (error) {
      console.error('참가 신청 실패:', error);
      alert('참가 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  

  return (
    <div className='honeypot-detail-container'>
      <div className='title-status-regdate'>
        <p className='detail-title'>{detailHoneypot.honeypotTitle}</p>
        <div className='detail-status'>{detailHoneypot.closureStatus}</div>
        <p className='detail-regdate'>{detailHoneypot.regDate}</p>
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
    </div>
  );
}