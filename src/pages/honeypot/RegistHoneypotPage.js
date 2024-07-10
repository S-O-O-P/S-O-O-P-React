import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistStepOne from '../../components/honeypot/RegistStepOne';
import RegistStepTwo from '../../components/honeypot/RegistStepTwo';
import axios from 'axios';
import './RegistHoneypotPage.css';

function RegistHoneypotPage({ cultureList, user }) {
    const parsedData = JSON.parse(cultureList);
    const externalCultureList = parsedData.perforList || [];
    const [allCultureList, setAllCultureList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();
    const [registStep, setRegistStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [filteredCultureList, setFilteredCultureList] = useState([]);
    const [uniqueAreas, setUniqueAreas] = useState([]);
    const [uniqueRealmName, setUniqueRealmName] = useState([]);

    const transformInternalData = (internalItem) => {
        return {
            area: internalItem.region,
            endDate: internalItem.usageEndDate.split('T')[0].replace(/-/g, ''),
            place: internalItem.place,
            price: internalItem.regularPrice ? `${internalItem.regularPrice}원` : "상세페이지 확인",
            realmName: mapInterestCodeToRealmName(internalItem.interestCode),
            seq: internalItem.earlyBirdCode, // 적절한 고유 식별자 필요
            startDate: internalItem.usageStartDate.split('T')[0].replace(/-/g, ''),
            thumbnail: internalItem.poster || "기본 이미지 URL",
            title: internalItem.ebTitle,
            url: internalItem.sellerLink || "#"
        };
    };

    const mapInterestCodeToRealmName = (interestCode) => {
        const map = {
            1: "팝업",
            2: "공연",
            3: "행사/축제",
            4: "전시",
            5: "뮤지컬"
        };
        return map[interestCode] || "기타";
    };

    useEffect(() => {
        const fetchInternalCultureList = async () => {
            try {
                const response = await axios.get('http://localhost:8081/cultureInfo/early');
                const internalCultureList = response.data.earlyBirdList;
                console.log('인터날', internalCultureList);
                
                // 내부 API 데이터 구조 변환
                const transformedInternalList = internalCultureList.map(transformInternalData);
                
                // 외부 API 데이터와 변환된 내부 API 데이터 통합
                const combinedList = [...externalCultureList, ...transformedInternalList];
                console.log('콤바인드리스트', combinedList);
                setAllCultureList(combinedList);
                setFilteredCultureList(combinedList);

                const areas = combinedList.map(item => item.area);
                setUniqueAreas([...new Set(areas)]);

                const realmNames = combinedList.map(item => item.realmName);
                setUniqueRealmName([...new Set(realmNames)]);

            } catch (error) {
                console.error('내부 API 호출 실패', error);
                setAllCultureList(externalCultureList);
                setFilteredCultureList(externalCultureList);
                
                const areas = externalCultureList.map(item => item.area);
                setUniqueAreas([...new Set(areas)]);

                const realmNames = externalCultureList.map(item => item.realmName);
                setUniqueRealmName([...new Set(realmNames)]);
            }
        };

        fetchInternalCultureList();
    }, []);

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
            navigate(`/honeypot/detail/${code}`, { state: { newHoneypotCode: code } });
        } else {
            console.error('연결실패');
        }
    };

    const registBtn = () => {
        axios.post('http://localhost:8081/honeypot/regist', formData)
            .then(response => {
                console.log('보내는 데이터:', formData);
                setShowConfirmModal(true);
                console.log('?',response);
            })
            .catch(error => {
                console.error('등록 실패!', error);
                console.log('실패 후 보내는 데이터:', formData);
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
                        filteredCultureList={filteredCultureList}
                        updateFilteredCultureList={updateFilteredCultureList}
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
                        filteredCultureList={filteredCultureList}
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