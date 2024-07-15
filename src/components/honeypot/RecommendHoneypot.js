import React, { useState, useEffect } from 'react';
import './RecommendHoneypot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecommendHoneypot({ interestName, allCultureList, honeypotCode }) {
    const [honeypots, setHoneypots] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchHoneypots() {
            try {
                const response = await axios.get('http://localhost:8081/honeypot/listandapproved');
                const activeHoneypots = response.data.filter(honeypot => 
                    honeypot.visibilityStatus === '활성화' && 
                    honeypot.closureStatus === '모집중' &&
                    honeypot.interestName === interestName &&
                    honeypot.honeypotCode != honeypotCode
                );
                setHoneypots(activeHoneypots);
            } catch (error) {
                console.error('Error 입니다 : ', error);
            }
        }
        fetchHoneypots();
    }, [interestName, honeypotCode]);

    const moveLeft = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const moveRight = () => {
        setCurrentIndex(prev => Math.min(prev + 1, Math.max(honeypots.length - 1, 0)));
    };

    return (
        <div className='recommend-container'>
        <div className='recommend-title'>추천 허니팟</div>
        <div className='recommend-scroll-container'>
            <button className={`scroll-arrow left ${currentIndex === 0 ? 'hidden' : ''}`} onClick={moveLeft}>
                &lt;
            </button>
                <div className='recommend-honeypot-list'>
                    {honeypots.slice(currentIndex, currentIndex + 3).map((honeypot, index) => (
                        <div key={index} className="one-recommend-index" onClick={() => { navigate(`/honeypot/detail/${honeypot.honeypotCode}`) }}>
                            <div className="recommend-index-poster">
                                <img src={honeypot.poster} alt="포스터이미지" />
                            </div>
                            <div className="recommend-index-info">
                                <div className="top-info">
                                    <div className="recommend-region-info">{honeypot.region}</div>
                                    <div className="recommend-category-info">{honeypot.interestName}</div>
                                    <div className="recommend-status">{honeypot.closureStatus}</div>
                                </div>
                                <p className="recommend-info-title">{honeypot.honeypotTitle}</p>
                                <div className="recommend-schedule">
                                    <div>일정</div>
                                    <p className="honeypot-date">{honeypot.eventDate}</p>
                                    <p className="total-member"> {honeypot.approvedCount + 1} / {honeypot.totalMember} </p>
                                </div>
                                <p className="end-date">{honeypot.endDate} 까지 모집해요</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className={`scroll-arrow right ${currentIndex >= honeypots.length - 1 ? 'hidden' : ''}`} onClick={moveRight}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default RecommendHoneypot;