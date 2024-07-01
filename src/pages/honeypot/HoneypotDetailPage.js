import HoneypotComment from '../../components/honeypot/HoneypotComment';
import RecommendHoneypot from '../../components/honeypot/RecommendHoneypot';
import './HoneypotDetailPage.css';

function HoneypotDetailPage() {

    return (
        <div className="main-content">
            <div className="detail-container">
                <div className='host-info-wrapper'>
                    <img className='detail-poster'src={`${process.env.PUBLIC_URL}/images/honeypot/poster_test.jpg`} draggable="false"/>
                    <div className='host-profile-wrapper'>
                        <img className='host-profile-pic'src={`${process.env.PUBLIC_URL}/images/honeypot/jeonsomin.PNG`} draggable="false"/>
                        <p className='host-nickname'>전소민</p>
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
                        <p className='detail-title'>서양미술 800년 전 같이 가실 분 :-)</p>
                        <div className='detail-status'>모집중</div>
                        <p className='detail-regdate'>2024.07.12</p>
                    </div>
                    <div className='detail-introduction-container'>
                        <p>서양미술에 요즘 관심이 생겨서 보러가고 싶은데 혼자가긴 조금 두렵네요. {'\n'} 서양미술에 대해서 모르셔도 좋아요!{'\n'} 같이 가실분 구합니다.{'\n'} 남자, 여자 상관없습니다. 하지만 마음이 아름다운 분이면 좋을 거 같습니다 ㅎㅎ{'\n'} 많관부</p>
                    </div>
                    <div className='eventdate-totalpeople-container'>
                        <div className='detail-index-btn'>허니팟일정</div>
                        <p className='event-date'>2024.07.20</p>
                        <div className='detail-index-btn'>참여인원</div>
                        <p> 1 / 2</p>
                    </div>
                    <div className='eventdate-totalpeople-container'>
                        <div className='detail-index-btn'>모집 마감일</div>
                        <p className='event-date'>2024.07.20</p>
                    </div>
                    <div className='btn-container'>
                        <button className='go-to-list'> 목록으로</button>
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