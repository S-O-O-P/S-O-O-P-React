import { useState } from 'react';

function RegistStepTwo({allCultureList, selectedIndex}) {

    const [textAreaText, setTextAreaText] = useState('');
    const maxLength = 500;

    const handleTextAreaChange = (e) => {
        if (e.target.value.length <= maxLength) {
        setTextAreaText(e.target.value);
    }};

    
    
    return (
        <div className='step2-container'>
        { selectedIndex !== null && (
            <>
            <div className="region-eventdate">
            <div className="regist-info-btn">지역</div>
            {/* <div className="selected-region">{allCultureList[selectedIndex].area}</div> */}
            <div className="selected-region">서울</div>
            <div className="regist-info-btn">일자</div>
            <input className='date-style' type="date"/>
            </div>
        <div className="totaluser-enddate">
            <div className="regist-info-btn">모집 정원</div>
            <select className="step2-select">
                <option>2</option>
                <option>3</option>
            </select>
            <div className="regist-info-btn">마감 일자</div>
            <input className='date-style' type="date"/>
        </div>
        <p className="member-explanation">* 모집 정원은 호스트를 포함한 인원입니다.</p>
        <p className="member-explanation">예시) 1명 모집을 원할 경우, 모집 정원 2명 선택(호스트 + 참여자)</p>
        <div className="regist-title">
            <div className="regist-info-btn">제목</div>
            <input class='regist-honeypot-title' type="text" placeholder="허니팟 제목을 입력하세요."/>
        </div>
        <div className="regist-content">
            <div className="regist-info-btn">내용</div>
            <div className='text-area-wrapper'>
                <textarea className="regist-honeypot-content" placeholder="허니팟 내용을 입력하세요." value={textAreaText} onChange={handleTextAreaChange}/>
                <p className='limit'>{textAreaText.length}/{maxLength}</p>
            </div>
        </div>
        </>
        )}
        
        </div>
        
        
    )
}

export default RegistStepTwo;