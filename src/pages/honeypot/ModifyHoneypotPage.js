import './ModifyHoneypotPage.css';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ModifyHoneypotPage() {
    const { honeypotCode } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { detailHoneypot } = location.state;
    const [title, setTitle] = useState(detailHoneypot.honeypotTitle);
    const [content, setContent] = useState(detailHoneypot.honeypotContent);
    const [eventDate, setEventDate] = useState(detailHoneypot.eventDate);
    const [endDate, setEndDate] = useState(detailHoneypot.endDate);
    const [totalMember, setTotalMember] = useState(detailHoneypot.totalMember);
    const [region, setRegion] = useState(detailHoneypot.region);
    const [honeypotContent, setHoneypotContent] = useState('');
    const [honeypotTitle, setHoneypotTitle] = useState('');
    const maxLength = 500;
    const maxTitleLength = 24;

    useEffect(() => {
        // 기존 데이터 초기값 설정
        setTitle(detailHoneypot.honeypotTitle);
        setContent(detailHoneypot.honeypotContent);
        setEventDate(detailHoneypot.eventDate);
        setEndDate(detailHoneypot.endDate);
        setTotalMember(detailHoneypot.totalMember);
        setRegion(detailHoneypot.region);
    }, [detailHoneypot]);

    const handleEventDateChange = (newDate) => {
        setEventDate(newDate);

        // 모집 마감일(endDate) 설정: 모임 일정(eventDate)의 하루 전
        const eventDateObj = new Date(newDate);
        eventDateObj.setDate(eventDateObj.getDate() - 1);
        const formattedEndDate = eventDateObj.toISOString().split('T')[0]; // ISO 포맷의 날짜 문자열로 변환
        setEndDate(formattedEndDate);
    };

    const handleSaveClick = async () => {
        try {
            const updatedData = {
                honeypotTitle: title,
                honeypotContent: content,
                eventDate: eventDate,
                endDate: endDate,
                totalMember: totalMember,
                closureStatus: detailHoneypot.closureStatus
            };

            console.log('Updated Data:', updatedData);

            const response = await axios.put(`http://localhost:8081/honeypot/modify/${honeypotCode}`, updatedData);
            navigate(`/honeypot/${honeypotCode}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelClick = () => {
        navigate(`/honeypot/${honeypotCode}`);
    };

    return (
        <div className="honeypot-modify-main-content">
            <div className="honeypot-modify-container">

                <div className="honeypotpage-title">
                    <p>허니팟 수정</p>
                </div>
                
                <div className='moidify-container'>
                    <div className="region-eventdate">
                        <div className="regist-info-btn">지역</div>
                        <div className="selected-region">{region}</div>
                        <div className="regist-info-btn">모임일자</div>
                        <input className='date-style' type="date" value={eventDate} 
                                min={new Date().toISOString().split('T')[0]} // 현재 날짜 이후만 선택 가능
                                max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]} // 현재 날짜로부터 +30일까지 선택 가능
                                onChange={(e) => handleEventDateChange(e.target.value)}
                        />
                    </div>
                    <div className="totaluser-enddate">
                        <div className="regist-info-btn">모집 정원</div>
                        <select className="step2-select" value={totalMember} onChange={(e) => setTotalMember(e.target.value)}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                        <div className="regist-info-btn">마감 일자</div>
                        <input className='date-style' type="date" value={endDate} readOnly/>
                    </div>
                    <p className="member-explanation">* 모집 정원은 호스트를 포함한 인원입니다.</p>
                    <p className="member-explanation">예시) 1명 모집을 원할 경우, 모집 정원 2명 선택(호스트 + 참여자)</p>
                    <div className="regist-title">
                        <div className="regist-info-btn">제목</div>
                        <input className='regist-honeypot-title' type="text" placeholder="허니팟 제목을 입력하세요." value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="regist-content">
                        <div className="regist-info-btn">내용</div>
                        <div className='text-area-wrapper'>
                            <textarea className="regist-honeypot-content" placeholder="허니팟 내용을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)}/>
                            <p className='limit'>{honeypotContent.length}/{maxLength}</p>
                        </div>
                    </div>
                </div>
                <div className='regist-btn-container'>
                    <button className='regist-cancle-btn' onClick={handleCancelClick}>취소</button>
                    <button className='regist-next-btn' onClick={handleSaveClick}>수정</button>
                </div>
            </div>
        </div>
    )
}

export default ModifyHoneypotPage;