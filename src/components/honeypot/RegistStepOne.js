import React, { useState, useEffect } from 'react';

function RegistStepOne({ allCultureList, posterClick, uniqueAreas, uniqueRealmName }) {
    const [selectedRealm, setSelectedRealm] = useState('장르');
    const [selectedArea, setSelectedArea] = useState('지역');
    const [selectedIndex, setSelectedIndex] = useState(null);

    // 선택된 장르와 지역에 따라 필터링된 목록
    const filteredCultureList = allCultureList.filter(performance => {
        const matchesRealm = selectedRealm === '장르' || performance.realmName === selectedRealm;
        const matchesArea = selectedArea === '지역' || performance.area === selectedArea;
        return matchesRealm && matchesArea;
    });

    // 필터 조건이 변경될 때 선택된 인덱스를 초기화
    useEffect(() => {
        setSelectedIndex(null);
    }, [selectedRealm, selectedArea]);

    const handlePosterClick = (index) => {
        setSelectedIndex(index);
        posterClick(index);
    };

    return (
        <div className='select-event'>
            <div className='select-container'>
                <select className='select-interest' value={selectedRealm} onChange={(e) => setSelectedRealm(e.target.value)}>
                    <option>장르</option>
                    {uniqueRealmName.map((realmName, index) => (
                        <option key={index} value={realmName}>{realmName}</option>
                    ))}
                </select>
                <select className='select-region' value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                    <option>지역</option>
                    {uniqueAreas.map((area, index) => (
                        <option key={index} value={area}>{area}</option>
                    ))}
                </select>
            </div>
            <div className='select-api-container'>
                {filteredCultureList.length > 0 ? (
                    filteredCultureList.map((performance, index) => (
                        <div
                            className={`one-culture ${selectedIndex === index ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handlePosterClick(index)}
                        >
                            <img
                                className={`poster ${selectedIndex === index ? 'selected' : ''} ${selectedIndex !== null && selectedIndex !== index ? 'grayscale' : ''}`}
                                src={performance.thumbnail}
                                alt={performance.title}
                            />
                            {selectedIndex === index && (
                                <img className="confirm-icon" src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`} alt="선택됨" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className='no-culture'>
                        <img src={`${process.env.PUBLIC_URL}/images/honeypot/no_culture_info.png`}/>
                        <p>공연/전시 정보가 없습니다!</p>
                    </div>
                )}
            </div>
            {selectedIndex !== null ? (
                <div>
                    <div className='culture-info-title'>
                        <div className='index'>제목</div>
                        <div className='content'>{filteredCultureList[selectedIndex].title}</div>
                    </div>
                    <div className='culture-info-title'>
                        <div className='index'>기간</div>
                        <div className='content'>{`${filteredCultureList[selectedIndex].startDate} ~ ${filteredCultureList[selectedIndex].endDate}`}</div>
                    </div>
                    <div className='culture-info-title'>
                        <div className='index'>지역</div>
                        <div className='content'>{filteredCultureList[selectedIndex].area}</div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='culture-info-title'>
                        <div className='index'>제목</div>
                    </div>
                    <div className='culture-info-title'>
                        <div className='index'>기간</div>
                    </div>
                    <div className='culture-info-title'>
                        <div className='index'>지역</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegistStepOne;
