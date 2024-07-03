import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HoneypotList from '../../components/honeypot/HoneypotList';
import './HoneypotPage.css';

function HoneypotPage({user}) {
    
    const [honeypots, setHoneypots] = useState([]);
    const [filteredHoneypots, setFilteredHoneypots] = useState([]); // 필터링된 허니팟 데이터
    const [searchWord, setSearchWord] = useState(''); // 검색어
    const [selectRegion, setSelectRegion] = useState('전체'); // 선택 지역
    const [sortKey, setSortKey] = useState('등록일순'); // 정렬 기준
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageGroup, setPageGroup] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchHoneypots() {
            try {
                const response = await axios.get('http://localhost:8081/honeypot/list');
                setHoneypots(response.data.results.honeypots);
                setFilteredHoneypots(response.data.results.honeypots); // 초기 필터링 설정
                console.log('메인페이지:',honeypots);
                console.log('로그인한 유저(허니팟메인페이지): ', user);
            } catch (error) {
                console.error('Error 입니다 : ', error);
            }
        }

        fetchHoneypots();
    }, []);

    // 카테고리 버튼 클릭 처리 함수
    const onClickCategory = (interestCode) => {
        setSelectedCategory(interestCode);
        let categoryFilteredData = [];
    
        if (interestCode === '전체') {
            // 전체 카테고리를 선택한 경우 모든 데이터를 보여줍니다.
            categoryFilteredData = honeypots.filter(honeypot =>
                (selectRegion === '전체' || honeypot.region === selectRegion) &&
                honeypot.honeypotTitle.toLowerCase().includes(searchWord.toLowerCase())
            );
        } else {
            // 특정 카테고리를 선택한 경우 해당 카테고리로 필터링합니다.
            categoryFilteredData = honeypots.filter(honeypot =>
                honeypot.interestCategory.interestName === interestCode &&
                (selectRegion === '전체' || honeypot.region === selectRegion) &&
                honeypot.honeypotTitle.toLowerCase().includes(searchWord.toLowerCase())
            );
            console.log('관심코드:', interestCode);
        }
    
        setFilteredHoneypots(categoryFilteredData);
        setCurrentPage(1);
        setPageGroup(0);
        
    };
    // 검색어 입력 처리
    const searchTitleWord = (e) => {
        const { value } = e.target;
        setSearchWord(value);
        // 검색어가 없는 경우 전체 목록 보여주기
        if (value === '') {
            const filteredData = honeypots.filter(honeypot =>
                selectRegion === '전체' || honeypot.region === selectRegion
            );
            setFilteredHoneypots(filteredData);
        }
    };
    // 엔터키 처리
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickSearchInput();
        }
    };
    // 검색 버튼 클릭 처리
    const onClickSearchInput = () => {
        // 검색어가 비어있는 경우 전체 목록 보여주기
        const filteredData = searchWord === ''
            ? honeypots.filter(honeypot => selectRegion === '전체' || honeypot.region === selectRegion)
            : honeypots.filter(honeypot =>
                honeypot.honeypotTitle.toLowerCase().includes(searchWord.toLowerCase()) &&
                (selectRegion === '전체' || honeypot.region === selectRegion)
            );
        setFilteredHoneypots(filteredData);
        setCurrentPage(1);
        setPageGroup(0);
    };
    // 셀렉트 박스 변경 시 처리
    const handleRegionChange = (e) => {
        const { value } = e.target;
        setSelectRegion(value);
        // 검색어가 없는 경우 전체 목록 보여주기
        if (searchWord === '') {
            const filteredData = honeypots.filter(honeypot =>
                value === '전체' || honeypot.region === value
            );
            setFilteredHoneypots(filteredData);
        }
        setCurrentPage(1);
        setPageGroup(0);
    };
    // 정렬 기준 변경 처리
    useEffect(() => {
        let sortedData = [...filteredHoneypots];
        switch (sortKey) {
            case '등록일순':
                sortedData.sort((a, b) => new Date(a.regDate) - new Date(b.regDate));
                break;
            case '마감일순':
                sortedData.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
                break;
            case '카테고리별':
                sortedData.sort((a, b) => a.interestCategory.interestName.localeCompare(b.interestCategory.interestName));
                break;
            default:
                break;
        }
        setFilteredHoneypots(sortedData);
    }, [sortKey]); // sortKey가 변경될 때만 실행

    const count = {
        전체: honeypots.length,
        팝업: honeypots.filter(item => item.interestCategory.interestName === '팝업').length,
        공연: honeypots.filter(item => item.interestCategory.interestName === '공연').length,
        행사축제: honeypots.filter(item => item.interestCategory.interestName === '행사/축제').length,
        전시회: honeypots.filter(item => item.interestCategory.interestName === '전시회').length,
        뮤지컬: honeypots.filter(item => item.interestCategory.interestName === '뮤지컬').length,
    };

    const uniqueRegions = [...new Set(honeypots.map(honeypot => honeypot.region))];

    return (
        <div className="main-content">
            <div className="honeypot-container">
                <div className="honeypotpage-title">
                    <p>허니팟</p>
                </div>
                <div className='honeypot-main'>
                    <div className="honeypot-category">
                        <button className={selectedCategory === '전체' ? 'selected' : ''} onClick={() => onClickCategory('전체')}>
                            전시/행사 전체보기<span className='count'>{count.전체}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" />
                        </button>
                        <button className={selectedCategory === '팝업' ? 'selected' : ''} onClick={() => onClickCategory('팝업')}>
                            팝업 <span className='count'>{count.팝업}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" />
                        </button>
                        <button className={selectedCategory === '공연' ? 'selected' : ''} onClick={() => onClickCategory('공연')}>
                            공연 <span className='count'>{count.공연}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" />
                        </button>
                        <button className={selectedCategory === '행사/축제' ? 'selected' : ''} onClick={() => onClickCategory('행사/축제')}>
                            행사/축제 <span className='count'>{count.행사축제}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" />
                        </button>
                        <button className={selectedCategory === '전시회' ? 'selected' : ''} onClick={() => onClickCategory('전시회')}>
                            전시회 <span className='count'>{count.전시회}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" />
                        </button>
                        <button className={selectedCategory === '뮤지컬' ? 'selected' : ''} onClick={() => onClickCategory('뮤지컬')}>
                            뮤지컬 <span className='count'>{count.뮤지컬}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" />
                        </button>
                    </div>
                    <hr className='honeypot-hr'/>
                    <div className='honeypot-sortandsearch-container'>
                        <select className='honeypot-sort' value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                            <option value='등록일순'>등록일순</option>
                            <option value='마감일순'>마감일순</option>
                            <option value='카테고리별'>카테고리별</option>
                        </select>
                        <select className='honeypot-sort region' value={selectRegion} onChange={handleRegionChange}>
                            <option value='전체'>전체</option>
                            {uniqueRegions.map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                        <div className='search-wrapper'>
                            <input className='text-search' onChange={searchTitleWord} onKeyPress={handleKeyPress} type='text' placeholder="검색어를 입력하세요."/>
                            <button onClick={onClickSearchInput} className='submit-btn' type='button'></button>
                        </div>
                        <button className='create-honeypot' onClick={() => navigate('/honeypot/regist')}>허니팟<img src={`${process.env.PUBLIC_URL}/images/honeypot/icon_create_white.png`} alt="허니팟생성아이콘" /></button>
                    </div>
                    
                    <HoneypotList 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageGroup={pageGroup}
                        setPageGroup={setPageGroup}
                        honeypots={filteredHoneypots}
                        user={user}
                    />
                </div>
            </div>
        </div>
    );
}

export default HoneypotPage;
