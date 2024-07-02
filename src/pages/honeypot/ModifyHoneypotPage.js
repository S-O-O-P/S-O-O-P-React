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

    useEffect(() => {
        // 기존 데이터 초기값 설정
        setTitle(detailHoneypot.honeypotTitle);
        setContent(detailHoneypot.honeypotContent);
        setEventDate(detailHoneypot.eventDate);
        setEndDate(detailHoneypot.endDate);
        setTotalMember(detailHoneypot.totalMember);
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
                totalMember: totalMember
            };

            console.log('Updated Data:', updatedData);

            const response = await axios.put(`http://localhost:8081/honeypot/modify/${honeypotCode}`, updatedData);
            navigate(`/honeypot/detail/${honeypotCode}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelClick = () => {
        navigate(`/honeypot/detail/${honeypotCode}`);
    };

    return (
        <div className="main-content">
            <div className="modify-container">
                <div className='modify-title'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='modify-content'>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className='modify-event-date'>
                    <label>모임 일정:</label>
                    <input
                        type='date'
                        value={eventDate}
                        min={new Date().toISOString().split('T')[0]} // 현재 날짜 이후만 선택 가능
                        max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]} // 현재 날짜로부터 +30일까지 선택 가능
                        onChange={(e) => handleEventDateChange(e.target.value)}
                    />
                </div>
                <div className='modify-end-date'>
                    <label>모집 마감일:</label>
                    <input
                        type='date'
                        value={endDate}
                        readOnly
                    />
                </div>
                <div className='modify-total-member'>
                    <label>총 참여 인원:</label>
                    <input
                        type='number'
                        value={totalMember}
                        max={4} min={2}
                        onChange={(e) => setTotalMember(e.target.value)}
                    />
                </div>
                <div className='btn-container'>
                    <button className='cancel-btn' onClick={handleCancelClick}>취소하기</button>
                    <button className='save-btn' onClick={handleSaveClick}>저장하기</button>
                </div>
            </div>
        </div>
    )
}

export default ModifyHoneypotPage;
