import React, { useEffect, useRef, useState } from 'react';
import './RecommendHoneypot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecommendHoneypot({ interestName, allCultureList, honeypotCode }) {
    const [honeypots, setHoneypots] = useState([]);
    const [filteredHoneypots, setFilteredHoneypots] = useState([]);
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);


    useEffect(() => {
        async function fetchHoneypots() {
            try {
                const response = await axios.get('http://localhost:8081/honeypot/listandapproved');
                console.log('리스펀스는? :', response.data)
                const activeHoneypots = response.data.filter(honeypot => 
                    honeypot.visibilityStatus === '활성화' && 
                    honeypot.closureStatus === '모집중' &&
                    honeypot.interestName === interestName &&
                    honeypot.honeypotCode != honeypotCode
                );
                console.log(activeHoneypots)
                setHoneypots(activeHoneypots);
            } catch (error) {
                console.error('Error 입니다 : ', error);
            }
        }
        fetchHoneypots();
    }, [interestName, honeypotCode]);

    const filteredHoneypotData = honeypots.filter(honeypot => 
        honeypot.interestName === interestName && 
        honeypot.honeypotCode != honeypotCode
    );

    const scroll = (scrollOffset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
        }
    };

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();
        }
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    return (
        <div className='recommend-container'>
            <div className='recommend-title'>추천 허니팟</div>
            <div className='recommend-scroll-container'>
                {showLeftArrow && (
                    <button className="scroll-arrow left" onClick={() => scroll(-300)}>
                        &lt;
                    </button>
                )}
                <div
                    className='recommend-honeypot-list'
                    ref={scrollRef}
                    onScroll={checkScrollPosition}
                >
                    {filteredHoneypotData.map((honeypot, index) => (
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
                {showRightArrow && (
                    <button className="scroll-arrow right" onClick={() => scroll(590)}>
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
}

export default RecommendHoneypot;