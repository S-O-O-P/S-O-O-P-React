import React, { useState, useEffect } from 'react';

function RegistStepTwo({ selectedIndex, filteredCultureList, onChange, user, onValidityChange }) {
    const [honeypotContent, setHoneypotContent] = useState('');
    const [honeypotTitle, setHoneypotTitle] = useState('');
    const [region, setRegion] = useState(filteredCultureList[selectedIndex]?.area || '');
    const [eventDate, setEventDate] = useState('');
    const [totalMembers, setTotalMembers] = useState('2');
    const [endDate, setEndDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const maxLength = 500;
    const maxTitleLength = 24;

    useEffect(() => {

        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);

        if (selectedIndex !== null) {
            const selectedEndDate = filteredCultureList[selectedIndex].endDate;
            const year = selectedEndDate.substring(0, 4);
            const month = selectedEndDate.substring(4, 6) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
            const day = selectedEndDate.substring(6, 8);
            const dateObject = new Date(year, month, day);
            const formattedEndDate = dateObject.toISOString().split('T')[0];

            setMaxDate(formattedEndDate);
            // console.log('선택한 항목의 엔드데이트 ', formattedEndDate);
        }
    }, [selectedIndex, filteredCultureList]);


    // useEffect를 이용하여 onChange 함수 호출
    useEffect(() => {
        // 만약 selectedIndex가 null이라면, 아무 것도 수행하지 않음
        if (selectedIndex === null) {
            return;
        }

        const isValid = honeypotTitle && honeypotContent && eventDate;
        onValidityChange(isValid);

        if (!honeypotTitle || !honeypotContent || !eventDate) {
            let missingFields = [];
            if (!honeypotTitle) missingFields.push('제목');
            if (!honeypotContent) missingFields.push('내용');
            if (!eventDate) missingFields.push('모임일자');
            
            setErrorMessage(`${missingFields.join(', ')}을(를) 입력해주세요.`);
            return;
        }

        setErrorMessage('');

        const formData = {
            hostCode: user.userCode,
            closureStatus: '모집중',
            honeypotTitle,
            honeypotContent,
            region,
            eventDate,
            totalMember: parseInt(totalMembers),
            endDate,
            interestCode: mapInterestCode(filteredCultureList[selectedIndex]?.realmName),
            poster: filteredCultureList[selectedIndex]?.thumbnail || null,
            regDate: new Date().toISOString(),
            visibilityStatus: '활성화',
            seqNo: filteredCultureList[selectedIndex].seq,
        };
        
        // onChange 함수 호출
        onChange(formData);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [honeypotTitle, honeypotContent, region, eventDate, totalMembers, endDate, selectedIndex]);

    // 관심 코드 매핑 함수
    const mapInterestCode = (realmName) => {
        switch (realmName) {
            case '전시':
                return 4; // 전시의 경우 관심 코드 4로 설정
            case '공연':
                return 2; // 공연의 경우 관심 코드 2로 설정
            case '뮤지컬':
                return 5; // 뮤지컬의 경우 관심 코드 5로 설정
            case '팝업':
                return 1; // 팝업의 경우 관심 코드 1로 설정
            case '행사/축제':
                return 3; // 행사/축제의 경우 관심 코드 3로 설정
            case '미술':
                return 4;
            case '연극':
                return 2;
            case '음악':
                return 2;
            case '무용':
                return 2;
            case '국악':
                return 2;
            case '기타':
                return 5;
            default:
                return null; // 기본값은 null로 설정
        }
    };

    const handleTitleChange = (e) => {
        if (e.target.value.length <= maxTitleLength) {
            setHoneypotTitle(e.target.value);
        }
    };

    const handleTextAreaChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setHoneypotContent(e.target.value);
        }
    };

    useEffect(() => {
        if (eventDate) {
          const eventDateObj = new Date(eventDate);
          eventDateObj.setDate(eventDateObj.getDate() - 1);
          setEndDate(eventDateObj.toISOString().split('T')[0]);
        } else {
          setEndDate('');
        }
      }, [eventDate]);

    

    return (
        <div className='step2-container'>
            {selectedIndex !== null && (
                <>
                    <div className="region-eventdate">
                        <div className="regist-info-btn">지역</div>
                        <div className="selected-region">{region}</div>
                        <div className="regist-info-btn">모임 일자</div>
                        <input className='date-style' type="date" value={eventDate} min={minDate} max={maxDate} onChange={(e) => setEventDate(e.target.value)} />
                    </div>
                    <div className="totaluser-enddate">
                        <div className="regist-info-btn">모집 정원</div>
                        <select className="step2-select" value={totalMembers} onChange={(e) => setTotalMembers(e.target.value)}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <div className="regist-info-btn">마감 일자</div>
                        <input className='date-style' type="date" value={endDate} readOnly/>
                    </div>
                    <p className="member-explanation">* 모집 정원은 호스트를 포함한 인원입니다.</p>
                    <p className="member-explanation">예시) 1명 모집을 원할 경우, 모집 정원 2명 선택(호스트 + 참여자)</p>
                    <div className="regist-title">
                        <div className="regist-info-btn">제목</div>
                        <div className='title-input-wrapper'>
                            <input className='regist-honeypot-title' type="text" placeholder="허니팟 제목을 입력하세요." value={honeypotTitle} onChange={handleTitleChange} />
                            <p className='limit'>{honeypotTitle.length}/{maxTitleLength}</p>
                        </div>
                    </div>
                    <div className="regist-content">
                        <div className="regist-info-btn">내용</div>
                        <div className='text-area-wrapper'>
                            <textarea className="regist-honeypot-content" placeholder="허니팟 내용을 입력하세요." value={honeypotContent} onChange={handleTextAreaChange} />
                            <p className='limit'>{honeypotContent.length}/{maxLength}</p>
                        </div>
                    </div>
                    <div className="error-message" >
                    {errorMessage && <p>{errorMessage}</p>}
                    </div>
                </>
            )}
        </div>
    );
}

export default RegistStepTwo;