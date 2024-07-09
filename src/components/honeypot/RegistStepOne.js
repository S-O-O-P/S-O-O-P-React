import React, { useState, useEffect } from 'react';

function RegistStepOne({ allCultureList, filteredCultureList, updateFilteredCultureList, posterClick, uniqueAreas, user }) {
    const [selectedRealm, setSelectedRealm] = useState('전체');
    const [selectedArea, setSelectedArea] = useState('지역');
    const [selectedIndex, setSelectedIndex] = useState(null);

    // 추가할 장르 옵션
    const genres = ['전체', '전시', '공연', '뮤지컬', '팝업', '행사/축제'];

    // 장르와 숫자를 매핑하는 객체
    const genreMap = {
        '팝업': 1,
        '공연': 2,
        '행사/축제': 3,
        '전시': 4,
        '뮤지컬': 5
    };

    // 선택된 장르와 지역에 따라 필터링된 목록
        filteredCultureList = allCultureList.filter(performance => {
        const matchesRealm = selectedRealm === '장르' || selectedRealm === '전체' ||
            (selectedRealm === '전시' && (performance.realmName === '미술' || performance.title.match('전시'))) ||
            (selectedRealm === '공연' && (performance.realmName === '음악' || performance.realmName === '연극' || performance.title.match('음악') || performance.title.match('영화'))) ||
            (selectedRealm === '뮤지컬' && (performance.title.match('뮤지') || performance.title.match('뮤지컬'))) ||
            (selectedRealm === '팝업' && performance.realmName === '팝업') ||
            (selectedRealm === '행사/축제' && (performance.title.match('축제') || performance.title.match('페스티벌'))) ||
            performance.realmName === selectedRealm;
        const matchesArea = selectedArea === '지역' || performance.area === selectedArea;
        return matchesRealm && matchesArea;
    });

    useEffect(() => {
        const filteredList = allCultureList.filter(item => {
            if (selectedRealm === '전체') {
                return true; // 모든 항목 허용
            } else if (selectedRealm === '전시') {
                return item.realmName === '미술' || item.title.includes('전시');
            } else if (selectedRealm === '공연') {
                return item.realmName === '음악' || item.realmName === '연극' || item.title.includes('음악') || item.title.includes('영화');
            } else if (selectedRealm === '뮤지컬') {
                return item.title.includes('뮤지') || item.title.includes('뮤지컬');
            } else if (selectedRealm === '팝업') {
                return item.realmName === '팝업';
            } else if (selectedRealm === '행사/축제') {
                return item.title.includes('축제') || item.title.includes('페스티벌');
            } else {
                return item.realmName === selectedRealm;
            }
        });
        updateFilteredCultureList(filteredList); // 필터링된 결과를 상태에 업데이트
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRealm]);

    // 필터 조건이 변경될 때 선택된 인덱스를 초기화
    useEffect(() => {
        setSelectedIndex(null);
    }, [selectedRealm, selectedArea]);

    const handlePosterClick = (index) => {
        setSelectedIndex(index);
        const selectedGenre = filteredCultureList[index]?.realmName; // 필터링된 목록에서 선택된 포스터의 카테고리
        const interestCode = genreMap[selectedGenre] || null; // 선택된 카테고리에 대응하는 코드
        posterClick(index, interestCode); // posterClick 함수에 index와 interestCode 전달
        console.log(filteredCultureList[index]);
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