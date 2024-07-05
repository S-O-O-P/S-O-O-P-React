import HoneypotList from '../../components/honeypot/HoneypotList';
import './HoneypotPage.css'
import { useState, useEffect } from 'react'
import { honeypotData } from './DummyData';
import { useNavigate } from 'react-router-dom';

function HoneypotPage() {



    // 카테고리 용 더미카운터
    const count = {
        전체: honeypotData.length,  // 전체 카테고리 개수
        팝업: honeypotData.filter(item => item.INTEREST_CODE === '팝업').length,
        공연: honeypotData.filter(item => item.INTEREST_CODE === '공연').length,
        행사축제: honeypotData.filter(item => item.INTEREST_CODE === '행사/축제').length,
        전시회: honeypotData.filter(item => item.INTEREST_CODE === '전시회').length,
        뮤지컬: honeypotData.filter(item => item.INTEREST_CODE === '뮤지컬').length,
    };

    const [filteredHoneypots, setFilteredHoneypots] = useState(honeypotData); // 필터링된 허니팟 데이터
    const [searchWord, setSearchWord] = useState(''); // 검색어
    const [selectRegion, setSelectRegion] = useState('전체'); // 선택 지역
    const [sortKey, setSortKey] = useState('등록일순'); // 정렬 기준
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageGroup, setPageGroup] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리 상태 추가

    // 카테고리 버튼 클릭 처리 함수
    const onClickCategory = (interestCode) => {

        setSelectedCategory(interestCode);

        let categoryFilteredData = [];
    
        if (interestCode === '전체') {
            // 전체 카테고리를 선택한 경우 모든 데이터를 보여줍니다.
            categoryFilteredData = honeypotData.filter(honeypot =>
                (selectRegion === '전체' || honeypot.REGION === selectRegion) &&
                honeypot.HONEYPOT_TITLE.toLowerCase().includes(searchWord.toLowerCase())
            );
        } else {
            // 특정 카테고리를 선택한 경우 해당 카테고리로 필터링합니다.
            categoryFilteredData = honeypotData.filter(honeypot =>
                honeypot.INTEREST_CODE === interestCode &&
                (selectRegion === '전체' || honeypot.REGION === selectRegion) &&
                honeypot.HONEYPOT_TITLE.toLowerCase().includes(searchWord.toLowerCase())
            );
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
            const filteredData = honeypotData.filter(honeypot =>
                selectRegion === '전체' || honeypot.REGION === selectRegion
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
            ? honeypotData.filter(honeypot => selectRegion === '전체' || honeypot.REGION === selectRegion)
            : honeypotData.filter(honeypot =>
                honeypot.HONEYPOT_TITLE.toLowerCase().includes(searchWord.toLowerCase()) &&
                (selectRegion === '전체' || honeypot.REGION === selectRegion)
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
            const filteredData = honeypotData.filter(honeypot =>
                value === '전체' || honeypot.REGION === value
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
                sortedData.sort((a, b) => new Date(a.REG_DATE) - new Date(b.REG_DATE));
                break;
            case '종료일순':
                sortedData.sort((a, b) => new Date(a.END_DATE) - new Date(b.END_DATE));
                break;
            case '카테고리별':
                sortedData.sort((a, b) => a.INTEREST_CODE.localeCompare(b.INTEREST_CODE));
                break;
            default:
                break;
        }
        setFilteredHoneypots(sortedData);
    }, [sortKey]); // sortKey가 변경될 때만 실행

    // 허니팟 생성 네비게이트
    const navigate = useNavigate();

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
                            <option value='종료일순'>종료일순</option>
                            <option value='카테고리별'>카테고리별</option>
                        </select>
                        <select className='honeypot-sort region' value={selectRegion} onChange={handleRegionChange}>
                            <option value='전체'>전체</option>
                            <option value='서울'>서울</option>
                            <option value='경기도'>경기도</option>
                            <option value='경상도'>경상도</option>
                            <option value='전라도'>전라도</option>
                            <option value='강원도'>강원도</option>
                        </select>
                        <div className='search-wrapper'>
                            <input className='text-search' onChange={searchTitleWord} onKeyPress={handleKeyPress} type='text' placeholder="검색어를 입력하세요."/>
                            <button onClick={onClickSearchInput} className='submit-btn' type='button'></button>
                        </div>
                        <button className='create-honeypot' onClick={() => navigate('/honeypot/regist')}>허니팟<img src={`${process.env.PUBLIC_URL}/images/honeypot/icon_create_white.png`} alt="허니팟생성아이콘" /></button>
                    </div>
                    <HoneypotList honeypotData={filteredHoneypots}
                                  currentPage={currentPage}
                                  setCurrentPage={setCurrentPage}
                                  pageGroup={pageGroup}
                                  setPageGroup={setPageGroup}/>
                </div>
            </div>
        </div>
    );
}

export default HoneypotPage;