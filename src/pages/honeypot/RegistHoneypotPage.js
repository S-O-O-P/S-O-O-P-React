import './RegistHoneypotPage.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import RegistStepOne from '../../components/honeypot/RegistStepOne';
import RegistStepTwo from '../../components/honeypot/RegistStepTwo';


function RegistHoneypotPage({cultureList}) {

    const parsedData = JSON.parse(cultureList);
    const allCultureList = parsedData.perforList || [];
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();
    const [registStep, setRegistStep] = useState(1); // 등록 순서

    // API에서 지역 목록 가져오기
    const areas = allCultureList.map(item => item.area);

    // 지역 중복 제거
    const uniqueAreas = [...new Set(areas)];

    // API에서 장르 가져오기
    const realmName = allCultureList.map(item => item.realmName);

    // 장르 중복 제거
    const uniqueRealmName = [...new Set(realmName)];



    const posterClick = (index) => {
        setSelectedIndex(index === selectedIndex ? null : index);
    };

    const nextBtnClick = () => {
        if (registStep === 1) {
            if (selectedIndex === null) {
                setShowWarningModal(true);
            } else {
                setRegistStep(2);
            }
        }
    }

    const previousBtnClick = () => {
        if (registStep === 2) {
            setSelectedIndex(null);
            setRegistStep(1);
        }
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    /* 확인버튼 */
    const okBtn = () => {
        setShowConfirmModal(false);
    }

    const registBtn = () => {
        setShowConfirmModal(true);
    }

    const warningOkBtn = () => {
        setShowWarningModal(false);
    };

    return (
        <div className='honeypot-regist-main-content'>
            <div className='honeypto-regist-container'>
                <div className="honeypotpage-title">
                    <p>허니팟 등록</p>
                </div>
                <div className='regist-procedure'>
                    <button className={`step ${registStep === 1 ? 'active' : ''}`}><span>1</span>공연/전시</button>
                    <button className={`step ${registStep === 2 ? 'active' : ''}`}><span>2</span>모집 정보 입력</button>
                </div>
                
                    {registStep === 1 && (
                        <RegistStepOne
                            allCultureList={allCultureList}
                            posterClick={posterClick}
                            selectedIndex={selectedIndex}
                            uniqueAreas={uniqueAreas}
                            uniqueRealmName={uniqueRealmName}
                        />
                    )}
                    {registStep === 2 && (
                        <RegistStepTwo
                            selectedIndex={selectedIndex}
                            allCultureList={allCultureList}
                        />
                    )}
                
                    {registStep === 1 && (
                        <div className='regist-btn-container'>
                        <button className='regist-cancle-btn' onClick={() => navigate('/honeypot')}>취소</button>
                        <button className='regist-next-btn' onClick={ nextBtnClick }>다음</button>
                    </div>    
                    )}
                    {registStep === 2 && (
                        <div className='regist-btn-container'>
                        <button className='regist-cancle-btn' onClick={previousBtnClick}>이전</button>
                        <button className='regist-next-btn' onClick={registBtn}>생성</button>
                    </div>    
                    )}
                
            </div>
            {/* 제출확인 Modal */}
            {showConfirmModal && (
                <div className="regist-confirm-modal-container">
                <div className="regist-confirm-modal-content">
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`}/>
                    <p className="regist-confirm-modal-semibold">허니팟 등록이 완료되었습니다.</p>
                    <p className="regist-confirm-modal-regular">함께 즐거운 문화 생활을 즐겨보세요.</p>
                    <div className="regist-confirm-modal-buttons">
                    <button className="regist-confirm-modal-button yes" onClick={okBtn}>
                        확인
                    </button>
                    </div>
                </div>
                </div>
            )}

            {/* 경고 Modal */}
            {showWarningModal && (
                <div className="regist-confirm-modal-container">
                    <div className="regist-confirm-modal-content" style={{height: '220px'}}>
                    <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`}/>
                        <p className="regist-confirm-modal-semibold">항목을 선택해 주세요.</p>
                        <div className="regist-confirm-modal-buttons">
                            <button className="regist-confirm-modal-button yes" onClick={warningOkBtn}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
                
            
        </div>
    )
}

export default RegistHoneypotPage;