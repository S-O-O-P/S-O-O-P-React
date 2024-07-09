import { useEffect } from "react";
import CardType from "../../components/cultureInfo/CardType";
import EarlySlide from "../../components/cultureInfo/EarlySlide";
import HotSlide from "../../components/cultureInfo/HotSlide";
import styles from "./CultureInfo.module.css";
import "../honeypot/HoneypotPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/commons/Loading";
import TableType from "../../components/cultureInfo/TableType";
import EarlyBirdInfoApi from "../../apis/cultureInfo/EarlyBirdApi";

export default function CultureInfo(props) {

  //State 설정
  const [cultureList, setCultureList] = useState(null); // 공연/전시 전체 목록 
  const [filteredList, setFilteredList] = useState(null) // 필터&검색 리스트
  const [earlyBirdInfo, setEarlyBirdInfo] = useState([]); // 얼리버드 리스트
  const [hotList, setHotList] = useState([]) // HOT 공연/전시 정보
  const { detailDataList } = props;  // detailDataList를 props에서 가져옴
  const [category, setCategory] = useState('all') // 선택한 카테고리 - 초기값은 전체
  const [totalCount, setTotalCount] = useState(0); // 공연/전시 총 갯수
  const [publicCount, setPublicCount] = useState(0); // 공연/전시 공공 api 총 갯수
  const [exhibitCount, setExhibitCount] = useState(0); // 전시회 갯수
  const [concertCount, setConcertCount] = useState(0); // 공연 갯수
  const [musicalCount, setMusicalCount] = useState(0); // 뮤지컬 갯수
  const [festivalCount, setFestivalCount] = useState(0); // 행사/축제 갯수
  const [popCount, setPopCount] = useState(0); // 팝업스토어 갯수
  const [earlyCount, setEarlyCount] = useState(0); // 얼리버드 갯수
  const [isEarly, setIsEarly] = useState(false) // 얼리버드 선택 여부
  const [searchValue, setSearchValue] = useState(null) // 검색어
  const [subFilter, setSubFilter] = useState("마감임박순") // 최신 등록순 필터로 초기화
  const [areaFilter, setAreaFilter] = useState("전체 지역") // 지역 필터 - 전체 지역으로 초기화

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const cardItemsPerPage = 12;
  const tableItemsPerPage = 15;

  // 장르 카테고리 선택 후, 등록순 / 지역 카테고리 선택
  // 장르 카테고리를 재설정할 경우, 하위 - 등록순 / 지역 카테고리 초기화

  // 총 갯수를 계산하는 함수
  const calculateTotalCount = (publicCnt, earlyCnt) => {
    return Number(publicCnt) + earlyCnt;
  };
  
  useEffect(
    () => {
        //얼리버드 공연/전시 리스트 전체 조회 api 호출
        EarlyBirdInfoApi({setEarlyBirdInfo}, "all");
        const earlyCount = earlyBirdInfo?.length || 0;
        setEarlyCount(earlyCount);
        setTotalCount(calculateTotalCount(publicCount, earlyCount));      
    },[]
  );  
  
  //app.js에서 전달받은 api정보 state 저장
  useEffect(
    () => {
      if (props.cultureList && earlyBirdInfo) { // api정보 정상적으로 불러오면   
        const cultureListObj = JSON.parse(props.cultureList); // cultureList를 JavaScript 객체로 변환
        cultureListObj.perforList.sort((a,b) => {return Number(a.endDate) - Number(b.endDate)}) // 마감임박순으로 초기화
        
        const totalCount = cultureListObj.totalCount; // totalCount 값 가져오기
        console.log("totalCount from public api: ", totalCount);
        setPublicCount(totalCount);          
        setTotalCount(calculateTotalCount(totalCount, earlyCount));
        
        // realmName 값에 따른 갯수 확인
        const realmCounts = {"전시" : 0 , "공연" : 0 , "뮤지컬" : 0, "축제" : 0, "팝업" : 0, "얼리버드" : 0};
        cultureListObj.perforList.forEach(item => {
          const realmName = item.realmName;
          const titName = item.title;
          if (realmName == "미술") {
            //realmCounts[realmName]++;
            realmCounts["전시"]++;
          } else if(titName.match("뮤지") || titName.match("뮤지컬")){
            realmCounts["뮤지컬"]++;
          } else if(realmName == "음악" || realmName == "연극"|| titName.match("영화")){
            realmCounts["공연"]++;
          } else if(titName.match("행사") || titName.match("축제") || titName.match("페스티벌")){
            realmCounts["축제"]++;
          } else if(realmName == "팝업"){
            realmCounts["팝업"]++;
          }
        });

        setExhibitCount(realmCounts["전시"]);
        setConcertCount(realmCounts["공연"]);
        setMusicalCount(realmCounts["뮤지컬"]);
        setFestivalCount(realmCounts["축제"]);
        
        console.log("realmName 별 갯수: ", realmCounts);
        
        setCultureList(JSON.parse(props.cultureList)); // JSON형태로 cultureList 저장 
        setFilteredList({...cultureListObj , perforList : cultureListObj.perforList.sort((a,b) => {return Number(a.endDate) - Number(b.endDate)})})
        setHotList(JSON.parse(props.cultureList));          
        
        //공연/전시 대분류 카테고리 버튼
        const genreFilterList = document.querySelectorAll(`.${styles.filter_genre_list} li`);
        
        genreFilterList.forEach(genreBtn => { // 공연/전시 대분류 카테고리 버튼 각각에
          genreBtn.addEventListener('click', (e) => { //클릭 이벤트 추가
            const genre = e.currentTarget.dataset.genre; // 클릭한 li 태그에 지정한 data-genre 사용자 지정 데이터 특성 가져오기
            setCategory(genre);

            //카테고리 버튼 클릭시 마다, 하단 필터 초기화
            setSubFilter("마감임박순");
            setAreaFilter("전체 지역");
            setSearchValue(null);            
            
            // 모든 버튼에서 active 클래스 제거
            genreFilterList.forEach(item => {
              item.classList.remove(`${styles.active}`);
            });

            // 현재 클릭된 버튼에 active 클래스 추가
            e.currentTarget.classList.add(`${styles.active}`);
            
            // 해당 카테고리에 맞는 cultureList 필터링
            let filteredList = [];
            if (genre === "all") { // 전체
              filteredList = cultureListObj.perforList.sort((a, b) => Number(a.endDate) - Number(b.endDate)); // 전체보기일 경우 전체 리스트 반환
              setIsEarly(false);
            } else if(genre === "미술"){ // 전시
              filteredList = cultureListObj.perforList.filter(item => item.realmName === genre || item.title.match("전시")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "음악"){ // 공연
              filteredList = cultureListObj.perforList.filter(item => item.realmName === genre || item.realmName === "연극" || item.title.match("음악") || item.title.match("영화")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "뮤지컬"){ // 뮤지컬
              filteredList = cultureListObj.perforList.filter(item => item.title.match("뮤지") || item.title.match("뮤지컬")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "축제"){ // 행사 / 축제
              filteredList = cultureListObj.perforList.filter(item => item.title.match("축제") || item.title.match("페스티벌")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "얼리버드"){ // 얼리버드
              filteredList = earlyBirdInfo.sort((a,b) => {return Number(a.saleEndDate) - Number(b.saleEndDate)});
              setIsEarly(true);
            }

            // 필터링된 결과를 cultureList 상태에 업데이트
            setCultureList({ ...cultureListObj, perforList: filteredList });
            setFilteredList({ ...cultureListObj, perforList: filteredList });
            setCurrentPage(1); // 페이지를 1로 초기화
          });
        }); 

        return () => {
          // 클릭 이벤트 리스너 해제 (cleanup)
          genreFilterList.forEach(genreBtn => {
            genreBtn.removeEventListener('click', () => {});
          });
        };        
      }
    }, [props.cultureList, earlyBirdInfo]
  );

  useEffect(
    ()=>{
      
      setTotalCount(Number(publicCount) + earlyCount);
    },[earlyCount, publicCount]
  );
  
  useEffect(() => {
    console.log("cultureList : ", cultureList);
  }, [cultureList]);
  
  
  useEffect(
    () => {
      window.scrollTo(0, 0); //페이지 이동시, 최상단으로 스크롤 위치
    }, []
  );


  // 서브 필터
  const subFilterHandler = (e) => {
    e.currentTarget.classList.toggle(`${styles.active}`);
    e.currentTarget.childNodes[1].classList.toggle(`${styles.active}`);
  }

  //서브 필터 아이템 
  const subFilterItemHandler = (e) => {
      e.currentTarget.closest("ul").classList.remove(`.${styles.active}`);
      const cultureListObj = JSON.parse(props.cultureList);
      console.log("현재 클릭한 필터 : " + e.currentTarget.innerText);
      console.log("현재 선택한 카테고리 : " + category);

      let filteredListCategory = [];
      let filteredListAfterSubFiltered = [];

      if (category === "all") { // 전체
        filteredListCategory = cultureListObj.perforList.sort((a, b) => Number(a.endDate) - Number(b.endDate)); // 전체보기일 경우 전체 리스트 반환
      } else if(category === "미술"){ // 전시
        filteredListCategory = cultureListObj.perforList.filter(item => item.realmName === category || item.title.match("전시")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
      } else if(category === "음악"){ // 공연
        filteredListCategory = cultureListObj.perforList.filter(item => item.realmName === category || item.realmName === "연극" || item.title.match("음악") || item.title.match("영화")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
      } else if(category === "뮤지컬"){ // 뮤지컬
        filteredListCategory = cultureListObj.perforList.filter(item => item.title.match("뮤지") || item.title.match("뮤지컬")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
      } else if(category === "축제"){ // 행사 / 축제
        filteredListCategory = cultureListObj.perforList.filter(item => item.title.match("축제") || item.title.match("페스티벌")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
      } else if(category === "얼리버드"){ // 얼리버드
        filteredListCategory = cultureListObj.sort((a,b) => {return Number(a.saleEndDate) - Number(b.saleEndDate)});
      }

      if (e.currentTarget.innerText === "마감임박순") {
        filteredListAfterSubFiltered = areaFilter === "전체 지역" ? filteredListCategory.sort((a, b) => Number(a.endDate) - Number(b.endDate)) : filteredListCategory.filter(item => item.area.match(areaFilter)).sort((a, b) => Number(a.endDate) - Number(b.endDate));
        setSubFilter(e.currentTarget.innerText);
      } else if (e.currentTarget.innerText === "최신등록순") {
        filteredListAfterSubFiltered = areaFilter === "전체 지역" ? filteredListCategory.sort((a, b) => Number(b.startDate) - Number(a.startDate)) : filteredListCategory.filter(item => item.area.match(areaFilter)).sort((a, b) => Number(b.startDate) - Number(a.startDate));
        setSubFilter(e.currentTarget.innerText);
      } else if (e.currentTarget.innerText === "가격순") {
        filteredListAfterSubFiltered = filteredListCategory.sort((a, b) => Number(b.startDate) - Number(a.startDate));
        setSubFilter(e.currentTarget.innerText);
      } else if (e.currentTarget.innerText === "허니팟 많은순") {
        setSubFilter(e.currentTarget.innerText);
      } else if (e.currentTarget.innerText === "인기순") {
        setSubFilter(e.currentTarget.innerText);
      }else if (e.currentTarget.innerText === "전체 지역") {
        setAreaFilter("전체 지역");
        filteredListAfterSubFiltered = filteredListCategory;
      } else {
        console.log("areaFilter : " + areaFilter);
        setAreaFilter(e.currentTarget.innerText);
        console.log("after areaFilter : " + areaFilter);
        const areaFiltered = filteredListCategory.filter(item => item.area.match(e.currentTarget.innerText));
        filteredListAfterSubFiltered = subFilter === "마감임박순" ? areaFiltered.sort((a, b) => Number(a.endDate) - Number(b.endDate)) : areaFiltered.sort((a, b) => Number(b.startDate) - Number(a.startDate));
      }

      setFilteredList({ ...cultureListObj, perforList: filteredListAfterSubFiltered });
      setCurrentPage(1);
    };

  // select view
  // 공연/전시 카드/테이블 타입 보기 필터
  const selectViewHandler =  (e) => { // 클릭 이벤트 추가
    const viewCardType = document.querySelector(`.${styles.culture_list_box}`); // 카드 타입 영역
    const viewTableType = document.querySelector(`.${styles.culture_table}`);
    if (e.currentTarget.classList.contains(`${styles.active}`)) { //클릭한 버튼이 이미 활성화된 상태라면
      return false;
    } else { // 클릭한 버튼이 비활성화된 상태라면
      e.currentTarget.classList.add(`${styles.active}`); // 활성화 상태로 전환
      console.log('현재 클릭한 버튼 :' + e.currentTarget.classList);
      if (e.currentTarget.classList.contains(`${styles.left_filter}`)) { // 카드 형식 버튼이 활성화라면              
        e.currentTarget.nextElementSibling.classList.remove(`${styles.active}`);
        e.currentTarget.childNodes[0].setAttribute('src', `/images/cultureInfo/icon_home_white.png`);// 버튼 아이콘 활성화 이미지 변경
        e.currentTarget.nextElementSibling.childNodes[0].setAttribute('src', `/images/commons/icon_list_colored.png`);// 버튼 아이콘 비활성화 이미지 변경
        viewCardType.classList.add(`${styles.active}`);
        viewTableType.classList.remove(`${styles.active}`);
      } else { // 테이블 형식 버튼이 활성화라면
        e.currentTarget.previousElementSibling.classList.remove(`${styles.active}`);
        e.currentTarget.childNodes[0].setAttribute('src', `/images/commons/icon_list_white.png`);// 버튼 아이콘 활성화 이미지 변경
        e.currentTarget.previousElementSibling.childNodes[0].setAttribute('src', `/images/cultureInfo/icon_home_colored.png`);// 버튼 아이콘 비활성화 이미지 변경
        viewTableType.classList.add(`${styles.active}`);
        viewCardType.classList.remove(`${styles.active}`);
      }
    }
  }

  // 검색어 입력 처리
  const searchTitleWord = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    // 검색어가 없는 경우 전체 목록 보여주기
    if (value === '') {
        const filteredData = cultureList.perforList;
        setFilteredList({ ...cultureList, perforList: filteredData });
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
      const filteredData = searchValue === '' || searchValue === null
          ? filteredList
          : cultureList.perforList.filter(cultureItem =>
            cultureItem.title.toLowerCase().includes(searchValue.toLowerCase()) &&
              (areaFilter === '전체 지역' || cultureItem.region === areaFilter)
          );
          console.log("searching filteredData", filteredData[0]);
      setCultureList({ ...cultureList, perforList: filteredData });
      setCurrentPage(1);
  };

  // 현재 페이지에 따른 데이터를 슬라이싱하는 함수
  const getCurrentPageData = (items, itemsPerPage, page) => {
    if (!items) return [];
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const Pagination = ({ items, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(items?.length / itemsPerPage);
  
    // if (totalPages === 1) return null; // 페이지가 1개일 경우 페이지네이션 표시 안함
  
    const handlePageClick = (page) => {
      if (page > 0 && page <= totalPages) {
        onPageChange(page);
      }
    };
  
    const renderPageNumbers = () => {
      let pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? styles.active : ""}
          >
            {i}
          </li>
        );
      }
      return pageNumbers;
    };
  
    return (
       
      <div className={`${styles.pagination_box} ${styles.flex_center}`}>
        {totalPages !== 1 ?
        <>
          <span
            className={styles.start_page}
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
          >
            {/* 처음 페이지로 */}
          </span>
          <span
            className={styles.prev_page}
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {/* 이전 페이지로 */}
          </span>
        </> : null}
        <ul className={`${styles.pagination} ${styles.flex_center}`}>
          {renderPageNumbers()}
        </ul>
        { totalPages !== 1 ?
          <>
          <span
            className={styles.next_page}
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {/* 다음 페이지로 */}
          </span>
          <span
            className={styles.end_page}
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
          >
            {/* 마지막 페이지로 */}
          </span>
        </> : null}
      </div>
    );
  };

  const cardData = getCurrentPageData(filteredList?.perforList, cardItemsPerPage, currentPage); //카드형 페이지 데이터
  const tableData = getCurrentPageData(filteredList?.perforList, tableItemsPerPage, currentPage); //테이블형 페이지 데이터


  return (
    <>
      {/* contents */}
      <div className={styles.contents_cont}>
        {/* HOT 공연/전시 */}
        <div className={styles.hot_sec_box}>
          <div className={styles.hot_sec}>
            <div className={`${styles.flex_center} ${styles.ticket_shape_cont}`}>
              <div className={`${styles.left_shape} ${styles.flex_center}`}>
                <p>HOT<br />전시공연</p>
              </div>
              <ul className={styles.cutting_line}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              {/* {HotSlide()} */}
              {hotList && <HotSlide cultureList={hotList} />}
              {/* {cultureList ? <HotSlide cultureList={cultureList} /> : <LoadingSpinner />} */}
            </div>
          </div>
        </div>
        {/* //hot_sec_box - Hot 공연/전시 정보 */}

        {/* 얼리버드 공연/전시 정보 */}
        <div className={styles.early_sec_box}>
          <div className={styles.early_sec}>
            <p className={styles.sec_tit}>얼리버드</p>
            <div className={styles.early_slide_box}>
              {earlyBirdInfo && <EarlySlide earlyBirdInfo={earlyBirdInfo}/>}
            </div>
          </div>
        </div>
        {/* //얼리버드 공연/전시 정보 */}

        {/* 공연/전시 둘러보기 */}
        <div className={styles.culture_sec_box}>
          <div className={styles.culture_sec}>
            <p className={styles.sec_tit}>공연/전시 둘러보기</p>
            <ul className={`${styles.filter_genre_list} ${styles.flex_center}`}>
              <li className={`${styles.flex_center} ${styles.active}`} data-genre="all">
                <p>전체보기</p>
                <span className={styles.filter_count}>{totalCount}</span>
              </li>
              <li className={styles.flex_center} data-genre="미술">
                <p>전시회</p>
                <span className={styles.filter_count}>{exhibitCount}</span>
              </li>
              <li className={styles.flex_center} data-genre="음악">
                <p>공연</p>
                <span className={styles.filter_count}>{concertCount}</span>
              </li>
              <li className={styles.flex_center} data-genre="뮤지컬">
                <p>뮤지컬</p>
                <span className={styles.filter_count}>{musicalCount}</span>
              </li>
              <li className={styles.flex_center} data-genre="축제">
                <p>행사/축제</p>
                <span className={styles.filter_count}>{festivalCount}</span>
              </li>
              <li className={styles.flex_center} data-genre="팝업">
                <p>팝업</p>
                <span className={styles.filter_count}>{popCount}</span>
              </li>
              <li className={styles.flex_center} data-genre="얼리버드">
                <p>얼리버드</p>
                <span className={styles.filter_count}>{earlyCount}</span>
              </li>
            </ul>
            {/* // 공연/전시 필터링 버튼 리스트*/}
            <span className={styles.divide_line}></span>

            {/* 해당 공연/전시 세부 필터링 버튼 리스트 */}
            <div className={`${styles.filter_box} ${styles.flex_between}`}>
              <ul className={`${styles.detail_filter_list} ${styles.flex_start}`}>
                <li className={styles.left_filter} onClick={(e) => subFilterHandler(e)}>
                  <span className={`${styles.selected_filter} ${styles.left} ${styles.flex_between}`}><span className={`${styles.selected_option} ${styles.left_detail_selected}`}>{subFilter}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className={styles.filter_arrow_icon} /></span>
                  <ul>
                    <li data-filter="deadline" onClick={(e) => subFilterItemHandler(e)}>마감임박순</li>
                    <li data-filter="lately" onClick={(e) => subFilterItemHandler(e)}>최신등록순</li>
                    {/* <li data-filter="low">가격낮은순</li> */}
                    <li data-filter="honeyPot" onClick={(e) => subFilterItemHandler(e)}>허니팟 많은순</li>
                    {/* <li data-filter="hot">인기순</li> */}
                  </ul>
                </li>
                <li className={`${styles.right_filter} ${styles.region_filter}`} onClick={(e) => subFilterHandler(e)}>
                  <span className={`${styles.selected_filter} ${styles.right} ${styles.flex_between}`}><span className={`${styles.selected_option} ${styles.right_detail_selected}`}>{areaFilter}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className={styles.filter_arrow_icon} /></span>
                  <ul>
                    <li onClick={(e) => subFilterItemHandler(e)}>전체 지역</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>서울</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>인천</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>부산</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>경기</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>충북</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>충남</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>경남</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>경북</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>대구</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>대전</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>광주</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>세종</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>울산</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>강원</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>전남</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>전북</li>
                    <li onClick={(e) => subFilterItemHandler(e)}>제주</li>
                  </ul>
                </li>
              </ul>

              {/* 검색창 */}
              <div className='search-wrapper'>
                <input className='text-search' onChange={searchTitleWord} onKeyPress={handleKeyPress} type='text' placeholder="검색어를 입력하세요."/>
                <button onClick={onClickSearchInput} className='submit-btn' type='button'></button>
              </div>

              <ul className={`${styles.view_filter_list} ${styles.flex_start}`}>
                <li className={`${styles.left_filter} ${styles.active} ${styles.flex_center}`} onClick={(e) =>  selectViewHandler(e)}>
                  <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/icon_home_white.png`} alt="view card pattern icon" />
                </li>
                <li className={`${styles.right_filter} ${styles.flex_center}`} onClick={(e) =>  selectViewHandler(e)}>
                  <img src={`${process.env.PUBLIC_URL}/images/commons/icon_list_colored.png`} alt="view table pattern icon" />
                </li>
              </ul>
            </div>
            {/* // 해당 공연/전시 세부 필터링 버튼 리스트 */}
            <p className={styles.culture_notice_txt}>* 표시 가격은 성인 1인 기준 가격입니다.</p>

            {/* 공연/전시 리스트 */}
            {!filteredList?.perforList ?
            <div className={styles.cultureList_null}>
              <p>현재 해당 정보가 존재하지 않습니다.</p>
              <p>빠른 정보 업데이트로 찾아뵙겠습니다.</p>
            </div>
            :
              /* 카드 형식 */
              <>
                <div className={`${styles.culture_list_box} ${styles.active}`}>
                  <ul className={`${styles.culture_list} ${styles.flex_start}`}>
                    {/* {CardType()} */}
                    {/* {cultureList && detailDataList && (<CardType cultureList={cultureList} detailDataList={detailDataList} />)} */}
                    {filteredList && detailDataList && cardData && (<CardType cultureList={cardData} detailDataList={detailDataList} earlyCheck={isEarly}/>)}
                  </ul>
                  {/* <span className={styles.view_more_btn}>더보기</span> */}
                  <Pagination
                    items={filteredList?.perforList}
                    itemsPerPage={cardItemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
                {/* //카드 형식 */}

                { /* 테이블 형식 */}
                <div className={styles.culture_table}>
                  {filteredList && detailDataList && tableData && <TableType cultureList={tableData} detailDataList={detailDataList} earlyCheck={isEarly}/>}
                  <Pagination
                    items={filteredList?.perforList}
                    itemsPerPage={tableItemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>}
              {/*//테이블 형식 */}
          </div>
        </div>
        {/* //공연/전시 둘러보기 */}

      </div>
      {/* //contents */}
    </>
  );
}
