import HoneypotComment from '../../components/honeypot/HoneypotComment';
import RecommendHoneypot from '../../components/honeypot/RecommendHoneypot';
import './HoneypotDetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/commons/Loading';


function HoneypotDetailPage( {cultureList}) {

    const { honeypotCode } = useParams();
    const [detailHoneypot, setDetailHoneypot] = useState({});
    const navigate = useNavigate();
    const parsedData = JSON.parse(cultureList);
    const allCultureList = parsedData.perforList || [];
    const [filteredCultureList, setFilteredCultureList] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // 공연 / 전시 start/endDate
    const convertDateFormat = (stringDate) => {
        let dateFormat = "";
        const year = stringDate.slice(0, 4);
        const month = stringDate.slice(4, 6);
        const day = stringDate.slice(6);
        
        dateFormat = year+"."+month+"."+day; // 날짜 표시 형식
        return dateFormat;
    }



    useEffect(() => {
        async function fetchHoneypots() {
            setIsLoading(true); // 데이터 로딩 시작 시 로딩 상태를 true로 설정
            try {
                const response = await axios.get(`http://localhost:8081/honeypot/detail/${honeypotCode}`);
                console.log('seqNo:', response.data.results.honeypot.seqNo);
                console.log('test : ', allCultureList)
                console.log('detailHoneypot', detailHoneypot);
    
                // seqNo 값과 일치하는 데이터만 필터링
                const seqNoFromResponse = response.data.results.honeypot.seqNo;
                const filteredList = allCultureList.filter(item => item.seq === seqNoFromResponse.toString());
                console.log('filteredCultureList:', filteredList);
    
                setDetailHoneypot(response.data.results.honeypot);
                setFilteredCultureList(filteredList);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    
        fetchHoneypots();
    }, [honeypotCode]);

    const modifyClick = () => {
        navigate(`/honeypot/modify/${honeypotCode}`, {
            state: { detailHoneypot }
        });
    };

    if (isLoading) {
        return <LoadingSpinner />; // 로딩 중일 때 보여줄 UI
    }

    const title = filteredCultureList[0].title.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'"); // 제목          



    return (
        <div className="main-content">
            <div className="detail-container">
                <div className='host-info-wrapper'>
                    <img className='detail-poster'src={detailHoneypot.poster} draggable="false" alt='포스터이미지'/>
                    <div className='host-profile-wrapper'>
                        <img className='host-profile-pic'src={detailHoneypot.hostInfo.profilePic} draggable="false" alt='프로필사진'/>
                        <p className='host-nickname'>{detailHoneypot.hostInfo.nickname}</p>
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
                    <div className='ticket-info-container'>
                        <div className='poster-wrapper'>
                        <img src={filteredCultureList[0].thumbnail} alt="포스터이미지" draggable="false"/>
                        </div>
                        <ul className='poster-cutting_line'>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div className='ticket-info'>
                            <p className='ticket-title'>{title}</p>
                            <p>{convertDateFormat(filteredCultureList[0].startDate)} ~ {convertDateFormat(filteredCultureList[0].endDate)}</p>
                            <p>{filteredCultureList[0].place}</p>
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