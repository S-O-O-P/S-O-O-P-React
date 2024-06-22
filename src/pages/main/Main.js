import mainStyles from './Main.module.css';
import TopBanner from '../../components/main/TopBanner';
import HotBanner from '../../components/main/HotBanner';
import EarlyBanner from '../../components/main/EarlyBanner';
import { useEffect } from "react";

export default function Main() {

  // 스크롤시 Header 색상 변경 
  useEffect(
    () => {
      const changeHeaderBgColor = () => {
        if(window.scrollY > 80){ // 스크롤 위치가 header height 80px보다 내려갔을 경우,
          document.querySelector(".header").classList.remove("main"); // header에서 main 클래스 제거
          //src="images/commons/logo.png"          
          document.querySelector(".header-logo").setAttribute('src','images/commons/logo.png'); //유색 로고로 변경      
        } else {// 스크롤 위치가 header height 80px를 벗어나지 않은 경우,
          document.querySelector(".header").classList.add("main");  // header에서 main 클래스 추가
          document.querySelector(".header-logo").setAttribute('src','images/commons/logo_white.png'); //흰색 로고로 변경     
        }
      }
      window.addEventListener("scroll", changeHeaderBgColor);

      return () => {
        window.removeEventListener("scroll", changeHeaderBgColor);
      }
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
          {TopBanner()}
          
          <div className={mainStyles.hot_prf_sec}>
            <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
              <p className={mainStyles.sec_tit}>HOT 전시/공연 정보</p>
              <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
            </div>
            {HotBanner()}
          </div>
  
          {/* 얼리버드 전시/공연 정보 */}
          <div className={mainStyles.early_sec_box}>
            <div className={mainStyles.early_sec}>
              <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
                <p className={mainStyles.sec_tit}>얼리버드</p>
                <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
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
                <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow right direction icon"/></span>
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

