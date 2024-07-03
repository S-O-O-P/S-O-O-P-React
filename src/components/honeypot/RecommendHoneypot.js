import React, { useEffect, useRef, useState } from 'react';
import './RecommendHoneypot.css';
import HoneypotListApi from '../../apis/honeypot/HoneypotListApi';

function RecommendHoneypot( {interestName, allCultureList}) {
    const [honeypots, setHoneypots] = useState([]);
    const [filteredHoneypots, setFilteredHoneypots] = useState([]);

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        HoneypotListApi({setHoneypots}, {setFilteredHoneypots})
    }, [setHoneypots])

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

    const filteredHoneypotData = honeypots.filter(honeypot => honeypot.interestCategory.interestName === interestName);


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
                {filteredHoneypotData.map((honeypot, index) => (
                    <div key={index} className="one-recommend-index">
                        <div className="recommend-index-poster">
                            <img
                                src={filteredHoneypotData[index].poster}
                                alt="포스터이미지"
                            />
                        </div>
                        <div className="recommend-index-info">
                            <div className="top-info">
                                <div className="recommend-region-info">{filteredHoneypotData[index].region}</div>
                                <div className="recommend-category-info">{filteredHoneypotData[index].interestCategory.interestName}</div>
                                <div className="recommend-status">{filteredHoneypotData[index].closureStatus}</div>
                            </div>
                            <p className="recommend-info-title">{filteredHoneypotData[index].honeypotTitle}</p>
                            <div className="recommend-schedule">
                                <div>일정</div>
                                <p className="honeypot-date">{filteredHoneypotData[index].eventDate}</p>
                                <p className="total-member"> 참여인원 1 / {filteredHoneypotData[index].totalMember} </p>
                            </div>
                            <p className="end-date">{filteredHoneypotData[index].endDate} 까지 모집해요</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendHoneypot;
