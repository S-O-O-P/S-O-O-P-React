import mainStyles from './Main.module.css';
import TopBanner from '../../components/main/TopBanner';
import HotBanner from '../../components/main/HotBanner';
import EarlyBanner from '../../components/main/EarlyBanner';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Main(props) {
  const [cultureList, setCultureList] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //app.js에서 전달받은 api정보 state 저장
  useEffect(
    ()=>{
      if (props.cultureList) { // api정보 정상적으로 불러오면
        setCultureList(JSON.parse(props.cultureList)); // JSON형태로 cultureList 저장
        setLoading(false);
        // setLoading(false); // 로딩 화면 종료
        // console.log("props.cultureList in Main.js from useEffect : " + JSON.parse(props.cultureList)); // props.cultureList 출력       
        // console.log("props.cultureList in Main.js from useEffect : " + props.cultureList); // props.cultureList 출력       
        // console.log("JSON.parse : " + JSON.parse(props.cultureList).totalCount) ;
        // console.log("JSON.parse perforList : " + JSON.stringify(cultureList.perforList[10].title)) ;
        // console.log("JSON.parse title : " + cultureList) ;
      }
    },[props.cultureList]
  );

  //app.js에서 전달받은 api정보 state 저장
  // useEffect(
  //   ()=>{
  //     if (props.cultureList) { // api정보 정상적으로 불러오면
  //       setLoading(false); // 로딩 화면 종료
  //     }
  //   },[]
  // );

  // 스크롤시 Header 색상 변경 
  useEffect(
    () => {
      window.scrollTo(0,0); //페이지 이동시, 최상단으로 스크롤 위치
      
      const header = document.querySelector(".header");
      header.classList.add("main");
      document.querySelector(".header-logo").setAttribute('src', 'images/commons/logo_white.png');
      const changeHeaderBgColor = () => {
        if (window.scrollY > 80) {
          header.classList.remove("main");
          document.querySelector(".header-logo").setAttribute('src', 'images/commons/logo.png');
        } else {
          header.classList.add("main");
          document.querySelector(".header-logo").setAttribute('src', 'images/commons/logo_white.png');
        }
      };
      
      window.addEventListener("scroll", changeHeaderBgColor);

      return () => {
        window.removeEventListener("scroll", changeHeaderBgColor);
        header.classList.remove("main"); // 컴포넌트가 언마운트될 때 클래스 제거
        document.querySelector(".header-logo").setAttribute('src', `${process.env.PUBLIC_URL}/images/commons/logo.png`);
      };
    },[]
  );

	return (
		<>
		{/* contents */}
    <div className={mainStyles.contents_cont}>
      <div className={mainStyles.main_sec_box}>
        <div className={mainStyles.main_sec}>
          <div className={`${mainStyles.main_tit} ${mainStyles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/logo_white.png`} alt="Link bee logo white"/><p className={`${mainStyles.sec_tit} ${mainStyles.white}`}>링크비 Picks</p></div>
          {/* Top Banner */}          
          {!loading && cultureList && <TopBanner cultureList={cultureList} />}
          
          <div className={mainStyles.hot_prf_sec}>
            <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
              <p className={mainStyles.sec_tit}>HOT 전시/공연 정보</p>
              <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`} onClick={() => navigate("/cultureinfo")}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
            </div>
            {HotBanner()}
          </div>
  
          {/* 얼리버드 전시/공연 정보 */}
          <div className={mainStyles.early_sec_box}>
            <div className={mainStyles.early_sec}>
              <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
                <p className={mainStyles.sec_tit}>얼리버드</p>
                <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`} onClick={() => navigate("/cultureinfo")}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
              </div>
              <div className={mainStyles.early_slide_box}>
                {EarlyBanner()}
              </div>
            </div>
          </div>
          {/* // 얼리버드 전시/공연 정보 */}
  
          {/* 허니팟 리스트 영역 */}
          <div className={mainStyles.honeypot_sec_box}>
            <div className={mainStyles.honeypot_sec}>
              <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
                <p className={mainStyles.sec_tit}>허니팟</p>
                <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`} onClick={() => navigate("/honey")}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow right direction icon"/></span>
              </div>
            </div>
          </div>
          {/* //허니팟 리스트 영역 */}
        </div>
      </div>
    </div>
    {/* //contents */}
		</>
	)
}

