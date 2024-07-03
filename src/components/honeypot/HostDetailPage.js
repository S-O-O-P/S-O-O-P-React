export default function HostDetailPage ({ detailHoneypot, filteredCultureList, title, convertDateFormat, navigate, modifyClick }) {
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
            <p> 1 / {detailHoneypot.totalMember}</p>
          </div>
          <div className='eventdate-totalpeople-container'>
            <div className='detail-index-btn'>모집 마감일</div>
            <p className='event-date'>{detailHoneypot.endDate}</p>
          </div>
          <div className='btn-container'>
            <button className='go-to-list' onClick={() => navigate('/honeypot')}> 목록으로</button>
            <button className='go-to-modify' onClick={modifyClick}>수정하기</button>
          </div>
        </div>
    );
  }
  