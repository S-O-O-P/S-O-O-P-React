import { useEffect } from "react";
import CardType from "../../components/cultureInfo/CardType";
import EarlySlide from "../../components/cultureInfo/EarlySlide";
import HotSlide from "../../components/cultureInfo/HotSlide";
import styles from "./CultureInfo.module.css";
import "../honeypot/HoneypotPage.css";
import { useState } from "react";
import TableType from "../../components/cultureInfo/TableType";
import EarlyBirdInfoApi from "../../apis/cultureInfo/EarlyBirdApi";

export default function CultureInfo(props) {

  //State 설정
  const [cultureList, setCultureList] = useState(null); // 공연/전시 전체 목록 
  const [filteredList, setFilteredList] = useState(null) // 필터 리스트
  const [earlyBirdInfo, setEarlyBirdInfo] = useState([]); // 얼리버드 리스트
  const [hotList, setHotList] = useState([]); // HOT 공연/전시 정보
  const { detailDataList } = props;  // detailDataList를 props에서 가져옴
  const [category, setCategory] = useState('all'); // 선택한 카테고리 - 초기값은 전체
  const [totalCount, setTotalCount] = useState(0); // 공연/전시 총 갯수
  const [publicCount, setPublicCount] = useState(0); // 공연/전시 공공 api 총 갯수
  const [exhibitCount, setExhibitCount] = useState(0); // 전시회 갯수
  const [concertCount, setConcertCount] = useState(0); // 공연 갯수
  const [musicalCount, setMusicalCount] = useState(0); // 뮤지컬 갯수
  const [festivalCount, setFestivalCount] = useState(0); // 행사/축제 갯수
  const [popCount, setPopCount] = useState(0); // 팝업스토어 갯수
  const [earlyCount, setEarlyCount] = useState(0); // 얼리버드 갯수
  const [isEarly, setIsEarly] = useState(false); // 얼리버드 선택 여부
  const [searchValue, setSearchValue] = useState(''); // 검색어
  const [subFilter, setSubFilter] = useState("마감임박순"); // 최신 등록순 필터로 초기화
  const [areaFilter, setAreaFilter] = useState("전체 지역"); // 지역 필터 - 전체 지역으로 초기화
  const [nullText, setNullText] = useState("현재 해당 정보가 존재하지 않습니다."); // null 데이터일 경우, 안내 문구
  const [viewControl, setViewControl] = useState("card"); // view 방식
  const [filteredEarlyBird, setFilteredEarlyBird] = useState([]);

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
      if (props.cultureList && filteredEarlyBird) { // api정보 정상적으로 불러오면   
        const cultureListObj = JSON.parse(props.cultureList); // cultureList를 JavaScript 객체로 변환
        cultureListObj.perforList.sort((a,b) => {return Number(a.endDate) - Number(b.endDate)}) // 마감임박순으로 초기화
        const filteredEb = earlyBirdInfo.map((item, index) => {
          return {
            seq: item.earlyBirdCode, // List내 객체 구분에 필요한 key
            title: item.ebTitle, // 제목
            realmName: item.interestCode === 1 ? "팝업" : item.interestCode === 2 ? "공연" : item.interestCode === 3 ? "축제" : item.interestCode === 4 ? "전시" : "뮤지컬", // 장르
            price: item.discountPrice, // 할인 가격  
            regularPrice: item.regularPrice, // 일반 가격
            place: item.place,
            startDate: item.saleStartDate,
            endDate: item.saleEndDate,
            area: item.region,
            thumbnail: item.poster,
          }
        });
        setEarlyCount(earlyBirdInfo.length);
        console.log("filteredEb : ", filteredEb);
        setFilteredEarlyBird(filteredEb);

        const addedCultureListObj = cultureListObj.perforList.concat(filteredEb);
        console.log("filteredEarlyBird : ",filteredEarlyBird);
        console.log("concat : ",addedCultureListObj);

        const totalCount = addedCultureListObj.length; // totalCount 값 가져오기
        console.log("totalCount from public api: ", totalCount);    
        setTotalCount(totalCount);
        
        // realmName 값에 따른 갯수 확인
        const realmCounts = {"전시" : 0 , "공연" : 0 , "뮤지컬" : 0, "축제" : 0, "팝업" : 0, "얼리버드" : 0};
        addedCultureListObj.forEach(item => {
          const realmName = item.realmName;
          const titName = item.title;
          if (realmName.match("미술") || realmName.match("전시") || titName.match("전시")) {
            realmCounts["전시"]++;
          } else if(titName.match("뮤지컬") || realmName.match("기타") || realmName.match("뮤지컬")){
            realmCounts["뮤지컬"]++;
          } else if(realmName.match("음악") || titName.match("콘서트") || realmName === "연극"|| titName.match("영화") || realmName.match("공연") || titName.match("주회") || titName.match("공연")){
            realmCounts["공연"]++;
          } else if(titName.match("행사") || titName.match("축제") || titName.match("페스티벌") || realmName.match("축제") || titName.includes("페스티벌") || titName.includes("축제")){
            realmCounts["축제"]++;
          } else if(realmName.match("팝업")){
            realmCounts["팝업"]++;
          }
        });

        setExhibitCount(realmCounts["전시"]);
        setConcertCount(realmCounts["공연"]);
        setMusicalCount(realmCounts["뮤지컬"]);
        setFestivalCount(realmCounts["축제"]);
        setPopCount(realmCounts["팝업"]);        
        console.log("realmName 별 갯수: ", realmCounts);
        
        // setCultureList(JSON.parse(props.cultureList)); // JSON형태로 cultureList 저장 
        setCultureList({...cultureListObj , perforList : addedCultureListObj}); // JSON형태로 cultureList 저장 
        setFilteredList({...cultureListObj , perforList : addedCultureListObj.sort((a,b) => {return Number(a.endDate) - Number(b.endDate)})})
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
            setSearchValue("");            
            
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
              filteredList = addedCultureListObj.filter(item => item.realmName === genre || item.title.match("전시") || item.realmName.match("전시")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "음악"){ // 공연
              filteredList = addedCultureListObj.filter(item => item.realmName === genre || item.realmName === "연극" || item.title.match("음악") || item.title.match("영화") || item.realmName.match("공연") || item.title.match("콘서트") || item.title.match("연주") || item.title.match("주회")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "뮤지컬"){ // 뮤지컬
              filteredList = addedCultureListObj.filter(item => item.title.match("뮤지컬") || item.realmName.match("기타") || item.realmName.match("뮤지컬")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "축제"){ // 행사 / 축제
              filteredList = addedCultureListObj.filter(item => item.title.match("축제") || item.title.match("페스티벌") || item.realmName.match("축제")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
              setIsEarly(false);
            } else if(genre === "팝업"){ // 행사 / 축제
              filteredList = addedCultureListObj.filter(item => item.title.match("팝업") || item.title.match("팝업") || item.realmName.match("팝업")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
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
      setEarlyCount(earlyCount);
      setEarlyCount(earlyCount);
    },[earlyCount, publicCount]
  );
  
  // useEffect(() => {
  //   console.log("cultureList : ", cultureList);
  // }, [cultureList]);
  
  
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
      const cultureListObj = cultureList;
      // const cultureListObj = JSON.parse(props.cultureList);
      console.log("현재 클릭한 필터 : " + e.currentTarget.innerText);
      console.log("현재 선택한 카테고리 : " + category);

      let filteredListCategory = [];
      let filteredListAfterSubFiltered = [];

      if (category === "all") { // 전체
        filteredListCategory = cultureListObj.perforList.sort((a, b) => Number(a.endDate) - Number(b.endDate)); // 전체보기일 경우 전체 리스트 반환
      } else if(category === "미술"){ // 전시
        filteredListCategory = cultureListObj.perforList.filter(item => item.realmName === category || item.title.match("전시") || item.realmName.match("전시")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
      } else if(category === "음악"){ // 공연
        filteredListCategory = cultureListObj.perforList.filter(item => item.realmName === category || item.realmName === "연극" || item.title.match("음악") || item.title.match("영화") || item.realmName.match("공연")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
      } else if(category === "뮤지컬"){ // 뮤지컬
        filteredListCategory = cultureListObj.perforList.filter(item => item.title.match("뮤지") || item.title.match("뮤지컬") || item.realmName.match("기타") || item.realmName.match("뮤지컬")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
      } else if(category === "축제"){ // 행사 / 축제
        filteredListCategory = cultureListObj.perforList.filter(item => item.title.match("축제") || item.title.match("페스티벌") || item.realmName.match("축제")).sort((a, b) => Number(a.endDate) - Number(b.endDate));
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
      setCultureList({ ...cultureListObj, perforList: filteredListAfterSubFiltered });
      setCurrentPage(1);
    };

  // select view
  // 공연/전시 카드/테이블 타입 보기 필터
  const selectViewHandler =  (e) => { // 클릭 이벤트 추가
    if (e.currentTarget.classList.contains(`${styles.active}`)) { //클릭한 버튼이 이미 활성화된 상태라면
      return false;
    } else { // 클릭한 버튼이 비활성화된 상태라면
      e.currentTarget.classList.add(`${styles.active}`); // 활성화 상태로 전환
      console.log('현재 클릭한 버튼 :' + e.currentTarget.classList);
      if (e.currentTarget.classList.contains(`${styles.left_filter}`)) { // 카드 형식 버튼이 활성화라면  
        setViewControl("card");
        e.currentTarget.nextElementSibling.classList.remove(`${styles.active}`);
        e.currentTarget.childNodes[0].setAttribute('src', `/images/cultureInfo/icon_home_white.png`);// 버튼 아이콘 활성화 이미지 변경
        e.currentTarget.nextElementSibling.childNodes[0].setAttribute('src', `/images/commons/icon_list_colored.png`);// 버튼 아이콘 비활성화 이미지 변경
        e.currentTarget.classList.add(`${styles.active}`);
        e.currentTarget.nextElementSibling.classList.remove(`${styles.active}`);
      } else { // 테이블 형식 버튼이 활성화라면
        setViewControl("table");
        e.currentTarget.previousElementSibling.classList.remove(`${styles.active}`);
        e.currentTarget.childNodes[0].setAttribute('src', `/images/commons/icon_list_white.png`);// 버튼 아이콘 활성화 이미지 변경
        e.currentTarget.previousElementSibling.childNodes[0].setAttribute('src', `/images/cultureInfo/icon_home_colored.png`);// 버튼 아이콘 비활성화 이미지 변경
        e.currentTarget.classList.add(`${styles.active}`);
        e.currentTarget.previousElementSibling.classList.remove(`${styles.active}`);
      }
    }
  }

  // 검색어 입력 & 검색 결과 필터링
  const onClickSearchHandler = () => {
    console.log("입력한 검색어 : "+searchValue);
    console.log("검색할 때 참조하는 filtered리스트 : ",filteredList?.perforList);
    console.log("검색할 때 참조하는 culture리스트 : ",cultureList?.perforList);
    // console.log("현재 filteredList : ", filteredList?.perforList);
    console.log("검색한 결과 : ", cultureList?.perforList.filter(item => (item.title.toLowerCase()).includes(searchValue.toLowerCase())))
    const searchedListNow = cultureList?.perforList.filter(item => (item.title.toLowerCase()).match(searchValue.toLowerCase()));
    // setSearchedList(searchedListNow);
    setFilteredList({...cultureList, perforList : searchedListNow});
    if(searchedListNow.length === 0){ // 검색어가 없는 경우
      setNullText(`[${searchValue}] 검색 결과가 존재하지 않습니다.`);
    }else{
      setNullText("현재 해당 정보가 존재하지 않습니다.");
    }
    
    setSearchValue('') // 검색 후 검색 결과 초기화 
  }
 

  // 현재 페이지에 따른 데이터를 슬라이싱하는 함수
  const getCurrentPageData = (items, itemsPerPage, page) => {
    if (!items) return [];
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };
  
  // 페이지 변경 함수
  const handlePageChange = (newPage, setCurrentPage) => {
    setCurrentPage(newPage);
  };
  
  const Pagination = ({ items, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(items?.length / itemsPerPage);
    const pagesPerGroup = 5; // 한 그룹당 페이지 수
    const [currentGroup, setCurrentGroup] = useState(Math.floor((currentPage - 1) / pagesPerGroup));
  
    const handlePageClick = (page) => {
      if (page > 0 && page <= totalPages) {
        onPageChange(page);
        setCurrentGroup(Math.floor((page - 1) / pagesPerGroup));
      }
    };
  
    const handleNextGroupClick = () => {
      const newPage = currentPage + 1;
      if (newPage <= totalPages) {
        onPageChange(newPage);
        setCurrentGroup(Math.floor((newPage - 1) / pagesPerGroup));
      }
    };
  
    const handlePrevGroupClick = () => {
      const newPage = currentPage - 1;
      if (newPage > 0) {
        onPageChange(newPage);
        setCurrentGroup(Math.floor((newPage - 1) / pagesPerGroup));
      }
    };
  
    const handleFirstPageClick = () => {
      setCurrentGroup(0);
      onPageChange(1);
    };
  
    const handleLastPageClick = () => {
      const newGroup = Math.floor((totalPages - 1) / pagesPerGroup);
      setCurrentGroup(newGroup);
      onPageChange(totalPages);
    };
  
    const renderPageNumbers = () => {
      const startPage = currentGroup * pagesPerGroup + 1;
      const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
      let pageNumbers = [];
      for (let i = startPage; i <= endPage; i++) {
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
        <span
          className={`${styles.start_page} ${currentPage === 1 ? styles.disabled : ""}`}
          onClick={handleFirstPageClick}
        >
          {/* 처음 페이지로 */}
        </span>
        <span
          className={`${styles.prev_page} ${currentPage === 1 ? styles.disabled : ""}`}
          onClick={handlePrevGroupClick}
        >
          {/* 이전 페이지로 */}
        </span>
        <ul className={`${styles.pagination} ${styles.flex_center}`}>
          {renderPageNumbers()}
        </ul>
        <span
          className={`${styles.next_page} ${currentPage === totalPages ? styles.disabled : ""}`}
          onClick={handleNextGroupClick}
        >
          {/* 다음 페이지로 */}
        </span>
        <span
          className={`${styles.end_page} ${currentPage === totalPages ? styles.disabled : ""}`}
          onClick={handleLastPageClick}
        >
          {/* 마지막 페이지로 */}
        </span>
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
                <input className='text-search' type='text' placeholder="검색어를 입력하세요." onChange={e => setSearchValue(e.target.value)} value={searchValue} onKeyDown={e => e.key === "Enter" ? onClickSearchHandler() : null }/>
                <button onClick={onClickSearchHandler} className='submit-btn' type='button'></button>
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
            <p className={styles.culture_notice_txt}>*공연/전시 정보의 카테고리 결과는 제목 또는 장르 기준으로 구분되며,<br/> 중복된 결과로 조회될 수 있습니다.</p>
            <p className={styles.culture_notice_txt}>*얼리버드 공연/전시 정보 표시 가격은 성인 1인 기준 가격입니다.</p>

            {/* 공연/전시 리스트 */}
            {filteredList?.perforList.length === 0 ?
            <div className={styles.cultureList_null}>
              <img src={`${process.env.PUBLIC_URL}/images/commons/logo.png`} alt="logo" />
              {/* <p>현재 해당 정보가 존재하지 않습니다.</p> */}
              <p>{nullText}</p>
              <p>빠른 정보 업데이트로 찾아뵙겠습니다.</p>
            </div>
            :
              /* 카드 형식 */
              <>
                <div className={`${styles.culture_list_box} ${viewControl === "card" ? styles.active : null}`}>
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
                    onPageChange={setCurrentPage}
                  />
                </div>
                {/* //카드 형식 */}

                { /* 테이블 형식 */}
                <div className={`${styles.culture_table} ${viewControl === "table" ? styles.active : null}`}>
                  {filteredList && detailDataList && tableData && <TableType cultureList={tableData} detailDataList={detailDataList} earlyCheck={isEarly}/>}
                  <Pagination
                    items={filteredList?.perforList}
                    itemsPerPage={cardItemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
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
