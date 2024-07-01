import React, { useRef, useState } from 'react';
import './RecommendHoneypot.css';
import { honeypotData } from '../../pages/honeypot/DummyData';

function RecommendHoneypot() {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 3; // Adjust scrolling speed here
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className='recommend-container'>
            <div className='recommend-title'>추천 허니팟</div>
            <div
                className='recommend-honeypot-list'
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {honeypotData.map((honeypot, index) => (
                    <div key={index} className="one-recommend-index">
                        <div className="recommend-index-poster">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/honeypot/poster_test.jpg`}
                                alt="포스터이미지"
                            />
                        </div>
                        <div className="recommend-index-info">
                            <div className="top-info">
                                <div className="recommend-region-info">{honeypot.REGION}</div>
                                <div className="recommend-category-info">{honeypot.INTEREST_CODE}</div>
                                <div className="recommend-status">{honeypot.CLOSURE_STATUS}</div>
                            </div>
                            <p className="recommend-info-title">{honeypot.HONEYPOT_TITLE}</p>
                            <div className="recommend-schedule">
                                <div>일정</div>
                                <p className="honeypot-date">2024.06.02 (토)</p>
                                <p className="total-member"> 참여인원 1 / {honeypot.TOTAL_MEMBER} </p>
                            </div>
                            <p className="end-date">{honeypot.END_DATE} 까지 모집해요</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendHoneypot;
