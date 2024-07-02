import HoneypotComment from '../../components/honeypot/HoneypotComment';
import RecommendHoneypot from '../../components/honeypot/RecommendHoneypot';
import './HoneypotDetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';


function HoneypotDetailPage() {
    const { honeypotCode } = useParams();
    const [detailHoneypot, setDetailHoneypot] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchHoneypots() {
            try {
                const response = await axios.get(`http://localhost:8081/honeypot/detail/${honeypotCode}`);
                console.log(response.data.results.honeypot);
                setDetailHoneypot(response.data.results.honeypot);
            } catch (error) {
                console.error('Error 입니다 : ', error);
            }
        }

        fetchHoneypots();
    }, [honeypotCode]);


    return (
        <div className="main-content">
            <div className="detail-container">
                <div className='host-info-wrapper'>
                    <img className='detail-poster'src={detailHoneypot.poster} draggable="false" alt='포스터이미지'/>
                    <div className='host-profile-wrapper'>
                        <img className='host-profile-pic'src={detailHoneypot.profilePic} draggable="false" alt='프로필사진'/>
                        {/* <p className='host-nickname'>{detailHoneypot.hostInfo.nickname}</p> */}
                    </div>
                    <div className='detail-manner-box' >
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_star.png`} alt="유저평점아이콘" />
                        <div className='detail-manner-text'>
                            <p>유저평점</p>
                            <p>4.9 / 5</p>
                        </div>
                    </div>
                </div>
                <div className='honeypot-detail-container'>
                    <div className='title-status-regdate'>
                        <p className='detail-title'>{detailHoneypot.honeypotTitle}</p>
                        <div className='detail-status'>{detailHoneypot.closureStatus}</div>
                        <p className='detail-regdate'>2024.07.12</p>
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
                        <button className='go-to-modify'>수정하기</button>
                    </div>
                    <div className='ticket-info-container'>
                        <div className='poster-wrapper'>
                        <img src={`${process.env.PUBLIC_URL}/images/honeypot/poster_test.jpg`} alt="포스터이미지" draggable="false"/>
                        </div>
                        <ul className='poster-cutting_line'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div className='ticket-info'>
                            <p className='ticket-title'>서양 미술 800년 展</p>
                            <p>2024.08.05 ~ 2024.10.31</p>
                            <p>더현대서울 6층 ALT.1</p>
                            <div>남은시간</div>
                            <p className='countdown'>1일 5시간 36분 12초</p>
                            <p className='count-eb'>얼리버드 : 07.19 24:00 까지</p>
                        </div>
                    </div>
                    <hr className='honeypot-detail-hr'/>
                    <RecommendHoneypot />
                    <HoneypotComment/>
                </div>
            </div>
        </div>
    )
}

export default HoneypotDetailPage;