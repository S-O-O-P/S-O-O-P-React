import { useEffect } from "react";
import CardType from "../../components/cultureInfo/CardType";
import EarlySlide from "../../components/cultureInfo/EarlySlide";
import HotSlide from "../../components/cultureInfo/HotSlide";
import styles from "./CultureInfo.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/commons/Loading";

export default function CultureInfo(props) {

  //State 설정
  const [cultureList, setCultureList] = useState(null); // 공연/전시 전체 목록 
  const [category, setCategory] = useState('all') // 선택한 카테고리 - 초기값은 전체
  const [count, setCount] = useState('0'); // 카테고리 별 공연/전시 갯수

  const navigate = useNavigate();

  //app.js에서 전달받은 api정보 state 저장
  useEffect(
    ()=>{
      if (props.cultureList) { // api정보 정상적으로 불러오면
        setCultureList(JSON.parse(props.cultureList)); // JSON형태로 cultureList 저장
        // setLoading(false); // 로딩 화면 종료
        console.log("props.cultureList in CultureInfo.js from useEffect : " + JSON.parse(props.cultureList)); // props.cultureList 출력       
        // console.log("JSON.parse : " + JSON.parse(props.cultureList).totalCount) ;
        console.log("JSON.parse perforList : " + JSON.stringify(props.cultureList.perforList)) ;
        // console.log("JSON.parse title in CultureInfo.js : " + cultureList?.perforList[10].title) ;
      }
    },[props.cultureList]
  );


  useEffect(
    () => { 

      window.scrollTo(0,0); //페이지 이동시, 최상단으로 스크롤 위치
      
      //공연/전시 대분류 카테고리 버튼
      const genreFilterList = document.querySelectorAll(`.${styles.filter_genre_list} li`);

      genreFilterList.forEach( genreBtn => { // 공연/전시 대분류 카테고리 버튼 각각에
        genreBtn.addEventListener('click', (e)=>{ //클릭 이벤트 추가
          genreFilterList.forEach(item => {
            item.classList.remove(`${styles.active}`);
          });
          console.log(e.currentTarget.innerText);
          e.currentTarget.classList.add(`${styles.active}`);
        })
      });

      // 공연/전시 세부 필터
      const detailFilter = document.querySelectorAll(`.${styles.detail_filter_list} > li`);

      // 공연/전시 세부 필터링 리스트 아이템
      const detailFilterItem = document.querySelectorAll(`.${styles.detail_filter_list} > li > ul > li`);
      
      // 선택한 공연/전시 세부 필터링 리스트 아이템 텍스트
      // 왼쪽 필터링 리스트 선택 필터
      const selectedLeftOption = document.querySelectorAll(`.${styles.left_detail_selected}`);

      // 오른쪽 필터링 리스트 선택 필터
      const selectedRightOption = document.querySelectorAll(`.${styles.right_detail_selected}`);


      detailFilter.forEach( detailBtn => { //디테일 필터 각각에
        detailBtn.addEventListener('click', (e)=>{ // 클릭 이벤트 추가
          e.currentTarget.classList.contains(`${styles.active}`) ? e.currentTarget.classList.remove(`${styles.active}`) : e.currentTarget.classList.add(`${styles.active}`); // 클릭한 버튼의 활성화 여부에 따라 active 클래스 추가 또는 삭제
          e.currentTarget.childNodes[1].classList.contains(`${styles.active}`) ? e.currentTarget.childNodes[1].classList.remove(`${styles.active}`) : e.currentTarget.childNodes[1].classList.add(`${styles.active}`); // 클릭한 버튼 > 필터링 리스트의 active 클래스 추가 또는 삭제
        })
      });

      detailFilterItem.forEach(detailItem => { // 디테일 필터링 리스트 아이템 각각에
        detailItem.addEventListener('click', (e)=>{ // 클릭 이벤트 추가
          e.currentTarget.closest("ul").classList.remove(`.${styles.active}`); // 디테일 필터링 리스트 비활성화
          e.currentTarget.closest("ul").previousElementSibling.childNodes[0].innerText = e.currentTarget.innerText;
        })
      });

      // 공연/전시 카드/테이블 타입 보기 필터
      const viewFilter = document.querySelectorAll(`.${styles.view_filter_list} > li`);
      const viewCardType = document.querySelector(`.${styles.culture_list_box}`); // 카드 타입 영역
      const viewTableType = document.querySelector(`.${styles.culture_table}`); // 테이블 타입 영역

      viewFilter.forEach( viewBtn => { // 보기 필터 각각에 
        viewBtn.addEventListener('click',(e)=>{ // 클릭 이벤트 추가
          if(e.currentTarget.classList.contains(`${styles.active}`)){ //클릭한 버튼이 이미 활성화된 상태라면
            return false;
          }else{ // 클릭한 버튼이 비활성화된 상태라면
            e.currentTarget.classList.add(`${styles.active}`); // 활성화 상태로 전환
            console.log('현재 클릭한 버튼 :' + e.currentTarget.classList);
            if(e.currentTarget.classList.contains(`${styles.left_filter}`)){ // 카드 형식 버튼이 활성화라면              
              e.currentTarget.nextElementSibling.classList.remove(`${styles.active}`);
              e.currentTarget.childNodes[0].setAttribute('src',`/images/cultureInfo/icon_home_white.png`);// 버튼 아이콘 활성화 이미지 변경
              e.currentTarget.nextElementSibling.childNodes[0].setAttribute('src',`/images/commons/icon_list_colored.png`);// 버튼 아이콘 비활성화 이미지 변경
              viewCardType.classList.add(`${styles.active}`);
              viewTableType.classList.remove(`${styles.active}`);
            }else{ // 테이블 형식 버튼이 활성화라면
              e.currentTarget.previousElementSibling.classList.remove(`${styles.active}`);
              e.currentTarget.childNodes[0].setAttribute('src',`/images/commons/icon_list_white.png`);// 버튼 아이콘 활성화 이미지 변경
              e.currentTarget.previousElementSibling.childNodes[0].setAttribute('src',`/images/cultureInfo/icon_home_colored.png`);// 버튼 아이콘 비활성화 이미지 변경
              viewTableType.classList.add(`${styles.active}`);
              viewCardType.classList.remove(`${styles.active}`);
            }
          }
        })
      })

      return () => {
      }
    },[]
  );


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
              {cultureList ? <HotSlide cultureList={cultureList} /> : <LoadingSpinner/>}        
            </div>
          </div>
        </div>
        {/* //hot_sec_box - Hot 공연/전시 정보 */}

        {/* 얼리버드 공연/전시 정보 */}
        <div className={styles.early_sec_box}>
          <div className={styles.early_sec}>
            <p className={styles.sec_tit}>얼리버드</p>
            <div className={styles.early_slide_box}>
              {EarlySlide()}
            </div>
          </div>
        </div>
        {/* //얼리버드 공연/전시 정보 */}

        {/* 공연/전시 둘러보기 */}
        <div className={styles.culture_sec_box}>
          <div className={styles.culture_sec}>
            <p className={styles.sec_tit}>공연/전시 둘러보기</p>
            <ul className={`${styles.filter_genre_list} ${styles.flex_center}`}>
              <li className={`${styles.flex_center} ${styles.active}`}>
                <p>전시/행사 전체보기</p>
                <span className={styles.filter_count}>56</span>
              </li>
              <li className={styles.flex_center}>
                <p>전시회</p>
                <span className={styles.filter_count}>18</span>
              </li>
              <li className={styles.flex_center}>
                <p>공연</p>
                <span className={styles.filter_count}>10</span>
              </li>
              <li className={styles.flex_center}>
                <p>뮤지컬</p>
                <span className={styles.filter_count}>12</span>
              </li>
              <li className={styles.flex_center}>
                <p>행사/축제</p>
                <span className={styles.filter_count}>7</span>
              </li>
              <li className={styles.flex_center}>
                <p>팝업</p>
                <span className={styles.filter_count}>9</span>
              </li>
            </ul>
            {/* // 공연/전시 필터링 버튼 리스트*/}
            <span className={styles.divide_line}></span>

            {/* 해당 공연/전시 세부 필터링 버튼 리스트 */}
            <div className={`${styles.filter_box} ${styles.flex_between}`}>
              <ul className={`${styles.detail_filter_list} ${styles.flex_start}`}>
                <li className={styles.left_filter}>
                  <span className={`${styles.selected_filter} ${styles.left} ${styles.flex_between}`}><span className={`${styles.selected_option} ${styles.left_detail_selected}`}>최신등록순</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className={styles.filter_arrow_icon} /></span>
                  <ul>
                    <li>최신등록순</li>
                    <li>가격높은순</li>
                    <li>가격낮은순</li>
                    <li>허니팟 많은순</li>
                    <li>인기순</li>
                  </ul>
                </li>
                <li className={`${styles.right_filter} ${styles.region_filter}`}>
                  <span className={`${styles.selected_filter} ${styles.right} ${styles.flex_between}`}><span className={`${styles.selected_option} ${styles.right_detail_selected}`}>전체 지역</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className={styles.filter_arrow_icon} /></span>
                  <ul>
                    <li>전체 지역</li>
                    <li>서울</li>
                    <li>인천</li>
                    <li>경기</li>
                    <li>부산</li>
                  </ul>
                </li>
              </ul>

              <ul className={`${styles.view_filter_list} ${styles.flex_start}`}>
                <li className={`${styles.left_filter} ${styles.active} ${styles.flex_center}`}>
                  <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/icon_home_white.png`} alt="view card pattern icon" />
                </li>
                <li className={`${styles.right_filter} ${styles.flex_center}`}>
                  <img src={`${process.env.PUBLIC_URL}/images/commons/icon_list_colored.png`} alt="view table pattern icon" />
                </li>
              </ul>
            </div>
            {/* // 해당 공연/전시 세부 필터링 버튼 리스트 */}
            <p className={styles.culture_notice_txt}>* 표시 가격은 성인 1인 기준 가격입니다.</p>

            {/* 공연/전시 리스트 */}
            {/* 카드 형식 */}
            <div className={`${styles.culture_list_box} ${styles.active}`}>
              <ul className={`${styles.culture_list} ${styles.flex_start}`}>
                {/* {CardType()} */}
                {cultureList && <CardType cultureList={cultureList} />}  
              </ul>
              <span className={styles.view_more_btn}>더보기</span>
            </div>
            {/* //카드 형식 */}

            {/* 테이블 형식 */}
            <div className={styles.culture_table}>
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>제목</th>
                    <th>가격</th>
                    <th>일정</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={() => navigate("/cultureinfo/detail")}>
                    <td>뮤지컬</td>
                    <td>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)</td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                  <tr onClick={() => navigate("/cultureinfo/detail")}>
                    <td>팝업스토어</td>
                    <td>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)</td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                  <tr onClick={() => navigate("/cultureinfo/detail")}>
                    <td>팝업스토어</td>
                    <td><p>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)asdfasdfasdfasdfasdfagdfgsdfgsdfgsdfgsdfgsdfgdfgdfgdfgsfggsf</p></td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                </tbody>
              </table>
              <div className={`${styles.pagination_box} ${styles.flex_center}`}>
                <span className={styles.start_page}></span>
                <span className={styles.prev_page}></span>
                <ul className={`${styles.pagination} ${styles.flex_center}`}>
                  <li className={styles.active}>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                </ul>
                <span className={styles.next_page}></span>
                <span className={styles.end_page}></span>
              </div>
            </div>
            {/*//테이블 형식 */}

          </div>
        </div>
        {/* //공연/전시 둘러보기 */}

      </div>
      {/* //contents */}
    </>
  );
}
