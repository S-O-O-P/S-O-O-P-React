import ApplicationApi from "../../apis/honeypot/ApplicationApi";
import HoneypotDetailApi from '../../apis/honeypot/HoneypotDetailApi';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function HostDetailPage({ detailHoneypot, filteredCultureList, title, convertDateFormat, navigate, modifyClick }) {

  const [applications, setApplications] = useState([]); // 참가신청자
  const [approvalModal, setApprovalModal] = useState(false); // 승인/미승인 결정 모달

  // 참가신청정보 조회
  useEffect(() => {
    if (detailHoneypot && detailHoneypot.honeypotCode) {
      ApplicationApi(detailHoneypot.honeypotCode, setApplications);
    }
  }, [detailHoneypot]);

  // 승인 여부 필터링
  const approvedApplications = applications.filter(app => app.decisionStatus === '승인');
  const pendingApplications = applications.filter(app => app.decisionStatus === '승인대기중');

  // 모집 상태 업데이트를 위한 함수
  const updateRecruitmentStatus = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/honeypot/modify/${detailHoneypot.honeypotCode}`, {
        honeypotTitle: detailHoneypot.honeypotTitle,
        honeypotContent: detailHoneypot.honeypotContent,
        eventDate: detailHoneypot.eventDate,
        endDate: detailHoneypot.endDate,
        totalMember: detailHoneypot.totalMember,
        closureStatus: '모집완료'
      });

      console.log('모집 상태 업데이트 완료:', response.data);
      // 모집 상태 업데이트 후 모집상태 재 조회
      ApplicationApi(detailHoneypot.honeypotCode, setApplications);

    } catch (error) {
      console.error('모집 상태 업데이트 실패:', error);
    }
  };

  // 모집 인원 초과 여부 체크 및 상태 업데이트
  useEffect(() => {
    if (
      approvedApplications.length + 1 >= detailHoneypot.totalMember &&
      detailHoneypot.closureStatus !== '모집완료' &&
      detailHoneypot.closureStatus === '모집중'
    ) {
      updateRecruitmentStatus();
      HoneypotDetailApi();
    }
  }, [approvedApplications.length, detailHoneypot]);

  // 승인 미승인 수정
  const handleApproval = async (applicationCode, decisionStatus) => {
    try {
      const response = await axios.put(`http://localhost:8081/honeypot/application/${detailHoneypot.honeypotCode}/${applicationCode}`, {
        decisionStatus
      });
      console.log("승인/미승인 업데이트:", response.data);
      
      // 업데이트 후 승인된 신청자 수 다시 조회
      ApplicationApi(detailHoneypot.honeypotCode, setApplications);

      // 승인된 신청자 수와 모집 인원 비교 후 상태 업데이트
      if (
        approvedApplications.length + 1 >= detailHoneypot.totalMember &&
        detailHoneypot.closureStatus !== '모집완료' &&
        detailHoneypot.closureStatus === '모집중'
      ) {
        updateRecruitmentStatus();
      }

    } catch (error) {
      console.error('승인/미승인 업데이트 실패:', error);
    }
  };

  console.log('승인대기자: ', pendingApplications);

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
        <button className='go-to-modify' onClick={modifyClick}>수정하기</button>
        <button className='check-application' onClick={() => setApprovalModal(true)}>참여신청 정보 확인</button>
      </div>
      {approvalModal && (
        <div className='approval-modal-container'>
          <div className='approval-modal-content'>
            <h2>참여신청 정보</h2>
            {pendingApplications.length > 0 ? (
              pendingApplications.map(app => (
                <div key={app.applicationCategory.applicationCode} className='application-info'>
                  <div className="img-name-wrapper">  
                    <img src={app.applicationCategory.userCategory.profilePic} alt="신청자프로필사진"/>
                    <p className="approval-name">{app.applicationCategory.userCategory.nickname}</p>
                  </div>
                  <button className='disapproved-btn' onClick={() => handleApproval(app.applicationCategory.applicationCode, '미승인')}>미승인</button>
                  <button className='approved-btn' onClick={() => handleApproval(app.applicationCategory.applicationCode, '승인')}>승인</button>
                </div>
              ))
            ) : (
              <p>대기 중인 신청자가 없습니다.</p>
            )}
            <button className='approval-modal-close' onClick={() => setApprovalModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
