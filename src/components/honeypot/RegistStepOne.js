
import React, { useState, useEffect, useCallback } from 'react';
import HoneypotList from './HoneypotList';

function RegistStepOne({ allCultureList, updateFilteredCultureList, posterClick, uniqueAreas, user }) {
    const [selectedRealm, setSelectedRealm] = useState('전체');
    const [selectedArea, setSelectedArea] = useState('지역');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [filteredCultureList, setFilteredCultureList] = useState([]);

    // console.log('레지스트 스텝원 Component props:', allCultureList);

    const genres = ['전체', '전시', '공연', '뮤지컬', '팝업', '행사/축제', '얼리버드'];

    const genreMap = {
        '팝업': 1,
        '공연': 2,
        '행사/축제': 3,
        '전시': 4,
        '뮤지컬': 5,
        '얼리버드' : 6
    };

    const filterCultureList = useCallback(() => {
        return allCultureList.filter(item => {
            if (selectedRealm === '전체') {
                return true;
            } else if (selectedRealm === '전시') {
                return item.realmName === '미술' || item.title.includes('전시');
            } else if (selectedRealm === '공연') {
                return item.realmName === '음악' || item.realmName === '연극' || item.title.includes('음악') || item.title.includes('영화');
            } else if (selectedRealm === '뮤지컬') {
                return item.realmName === '뮤지컬' || item.title.includes('뮤지컬') || item.realmName === '기타';
            } else if (selectedRealm === '팝업') {
                return item.realmName === '팝업';
            } else if (selectedRealm === '행사/축제') {
                return item.title.includes('축제') || item.title.includes('페스티벌');
            } else if (selectedRealm === '얼리버드'){
                return item.url === 'earlybird';
            } else {
                return item.realmName === selectedRealm;
            }
        }).filter(item => selectedArea === '지역' || item.area === selectedArea);
    }, [allCultureList, selectedRealm, selectedArea]);

    useEffect(() => {
        const filteredList = filterCultureList();
        setFilteredCultureList(filteredList);
        updateFilteredCultureList(filteredList);
    }, [selectedRealm, selectedArea, allCultureList]);
    
    useEffect(() => {
        setSelectedIndex(null);
    }, [selectedRealm, selectedArea]);

    const handlePosterClick = (index) => {
        setSelectedIndex(index);
        const selectedGenre = filteredCultureList[index]?.realmName;
        const interestCode = genreMap[selectedGenre] || null;
        posterClick(index, interestCode);
        console.log('선택한 포스터', filteredCultureList[index]);
    };

    return (
        <div className='select-event'>
            <div className='select-container'>
                <select className='select-interest' value={selectedRealm} onChange={(e) => setSelectedRealm(e.target.value)}>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>
                <select className='select-region' value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                    <option value="지역">지역</option>
                    {uniqueAreas.map((area, index) => (
                        <option key={index} value={typeof area === 'string' ? area : ''}>{typeof area === 'string' ? area : ''}</option>
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
                        <img src={`${process.env.PUBLIC_URL}/images/honeypot/no_culture_info.png`} alt="없음"/>
                        <p>해당 공연/전시 정보가 없습니다!</p>
                    </div>
                )}
            </div>
            {selectedIndex !== null ? (
                <div>
                    <div className='culture-info-title'>
                        <div className='index'>제목</div>
                        <div className='content'>{filteredCultureList[selectedIndex].title.replaceAll('&lt;', `<`).replaceAll('&gt;', `>`).replaceAll("&#39;", "'")}</div>
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