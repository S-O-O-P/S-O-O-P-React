import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistStepOne from '../../components/honeypot/RegistStepOne';
import RegistStepTwo from '../../components/honeypot/RegistStepTwo';
import axios from 'axios';
import './RegistHoneypotPage.css';

function RegistHoneypotPage({ cultureList, user }) {
    const parsedData = JSON.parse(cultureList);
    const allCultureList = parsedData.perforList || [];
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();
    const [registStep, setRegistStep] = useState(1); // 등록 순서
    const [formData, setFormData] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [filteredCultureList, setFilteredCultureList] = useState([]); // 필터링된 목록 상태 추가
    const areas = allCultureList.map(item => item.area);
    const uniqueAreas = [...new Set(areas)];
    const realmName = allCultureList.map(item => item.realmName);
    const uniqueRealmName = [...new Set(realmName)];

    // StepOne에서 필터링된 목록을 업데이트하는 함수
    const updateFilteredCultureList = (filteredList) => {
        setFilteredCultureList(filteredList);
    };

    const posterClick = (index) => {
        setSelectedIndex(index);
    };

    const nextBtnClick = () => {
        if (registStep === 1) {
            if (selectedIndex === null) {
                setShowWarningModal(true);
            } else {
                setRegistStep(2);
            }
        }
    };

    const previousBtnClick = () => {
        if (registStep === 2) {
            setSelectedIndex(null);
            setRegistStep(1);
        }
    };

    const fetchHoneypotList = async () => {
        try {
            const response = await axios.get('http://localhost:8081/honeypot/list');
            const honeypotList = response.data.results.honeypots;
            console.log('honeypotList : ', honeypotList)
            const latestHoneypot = honeypotList[honeypotList.length - 1];
            console.log('lastestHoneypot : ', latestHoneypot);
            return latestHoneypot.honeypotCode;
        } catch (error) {
            console.error('연결실패', error);
            return null;
        }
    };

    const okBtn = async () => {
        setShowConfirmModal(false);
        const code = await fetchHoneypotList();
        if (code) {
            navigate(`/honeypot/detail/${code}`); // 모달 닫기 후 상세 페이지로 이동
        } else {
            console.error('연결실패');
        }
    };

    const registBtn = () => {
        axios.post('http://localhost:8081/honeypot/regist', formData)
            .then(response => {
                console.log('Sending data to server:', formData);
                setShowConfirmModal(true);
                console.log(response);
            })
            .catch(error => {
                console.error('There was an error registering the honeypot!', error);
                console.log('Sending data to server:', formData);
            });
    };

    const warningOkBtn = () => {
        setShowWarningModal(false);
    };

    return (
        <div className='honeypot-regist-main-content'>
            <div className='honeypot-regist-container'>
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
                        filteredCultureList={filteredCultureList} // 필터링된 목록 전달
                        updateFilteredCultureList={updateFilteredCultureList} // 필터링된 목록 업데이트 함수 전달
                        posterClick={posterClick}
                        selectedIndex={selectedIndex}
                        uniqueAreas={uniqueAreas}
                        uniqueRealmName={uniqueRealmName}
                        user={user}
                    />
                )}
                {registStep === 2 && (
                    <RegistStepTwo
                        selectedIndex={selectedIndex}
                        filteredCultureList={filteredCultureList} // 필터링된 목록 전달
                        onChange={setFormData}
                        user={user}
                    />
                )}
                
                {registStep === 1 && (
                    <div className='regist-btn-container'>
                        <button className='regist-cancle-btn' onClick={() => navigate('/honeypot')}>취소</button>
                        <button className='regist-next-btn' onClick={nextBtnClick}>다음</button>
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
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`} alt="confirm-icon" />
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
                    <div className="regist-confirm-modal-content" style={{ height: '220px' }}>
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`} alt="confirm-icon" />
                        <p className="regist-confirm-modal-semibold">모든 필드를 입력해 주세요.</p>
                        <div className="regist-confirm-modal-buttons">
                            <button className="regist-confirm-modal-button yes" onClick={warningOkBtn}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegistHoneypotPage;
