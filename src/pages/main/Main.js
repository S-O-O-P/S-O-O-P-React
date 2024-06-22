import mainStyles from './Main.module.css';

export default function Main() {
	return (
		<>
		{/* contents */}
    <div className={mainStyles.contents_cont}>
      <div className={mainStyles.main_sec_box}>
        <div className={mainStyles.main_sec}>
          {/* banner slide */}
          <ul className={`${mainStyles.top_banner_box} ${mainStyles.flex_center}`}>
            <li>
              <a href="#">
                <img src={`${process.env.PUBLIC_URL}/images/main/detail_info_image_sample.png`} alt="top banner slide"/>
              </a>
            </li>
            <li>
              <a href="#">
                <img src={`${process.env.PUBLIC_URL}/images/main/KakaoTalk_20240524_000933916_05.png`} alt="top banner slide"/>
              </a>
            </li>
          </ul>
          <div className={mainStyles.hot_prf_sec}>
            <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
              <p className={mainStyles.sec_tit}>HOT 전시/공연 정보</p>
              <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
            </div>
            <div className={mainStyles.hot_prf_list}>
              <ul className={mainStyles.flex_between}>
                <li>
                  <a href="#">
                    <img src={`${process.env.PUBLIC_URL}/images/main/KakaoTalk_20240524_000933916_03.png`} alt="hot performance poster"/>
                    <div className={mainStyles.hot_prf_txt}>
                      <p className={mainStyles.hot_tit}>서양 미술 800년展</p>
                      <p className={mainStyles.hot_place}>더 현대 서울 ALT.1</p>
                      <p className={mainStyles.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={`${process.env.PUBLIC_URL}/images/main/detail_info_image_sample.png`} alt="hot performance poster"/>
                    <div className={mainStyles.hot_prf_txt}>
                      <p className={mainStyles.hot_tit}>서양 미술 800년展</p>
                      <p className={mainStyles.hot_place}>더 현대 서울 ALT.1</p>
                      <p className={mainStyles.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={`${process.env.PUBLIC_URL}/images/main/KakaoTalk_20240524_000933916_03.png`} alt="hot performance poster"/>
                    <div className={mainStyles.hot_prf_txt}>
                      <p className={mainStyles.hot_tit}>서양 미술 800년展</p>
                      <p className={mainStyles.hot_place}>더 현대 서울 ALT.1</p>
                      <p className={mainStyles.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={`${process.env.PUBLIC_URL}/images/main/KakaoTalk_20240524_000933916_03.png`} alt="hot performance poster"/>
                    <div className={mainStyles.hot_prf_txt}>
                      <p className={mainStyles.hot_tit}>서양 미술 800년展</p>
                      <p className={mainStyles.hot_place}>더 현대 서울 ALT.1</p>
                      <p className={mainStyles.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* 얼리버드 전시/공연 정보 */}
          <div className={mainStyles.early_sec_box}>
            <div className={mainStyles.early_sec}>
              <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
                <p className={mainStyles.sec_tit}>얼리버드</p>
                <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
              </div>
              <div className={mainStyles.early_slide_box}>
                <span className={`${mainStyles.prev_btn} ${mainStyles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`}
                  alt="arrow left direction icon"/></span>
                <ul className={`${mainStyles.flex_between} ${mainStyles.early_slide_list}`}>
                  <li>
                    <a href="#" className={mainStyles.flex_start}>
                      <div className={mainStyles.early_img}>
                        <img src={`${process.env.PUBLIC_URL}/images/main/detail_info_image_sample.png`} alt="early bird info"/>
                      </div>
                      <div className={mainStyles.early_txt_box}>
                        <p className={mainStyles.early_tit}>서양 미술 800년展</p>
                        <p className={mainStyles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                        <p className={mainStyles.early_place}>더현대서울 6층 ALT.1</p>
                        <span className={mainStyles.left_time_mark}>남은시간</span>
                        <p className={mainStyles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
                        <p className={mainStyles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#" className={mainStyles.flex_start}>
                      <div className={mainStyles.early_img}>
                        <img src={`${process.env.PUBLIC_URL}/images/main/KakaoTalk_20240524_000933916_06.gif`} alt="early bird info"/>
                      </div>
                      <div className={mainStyles.early_txt_box}>
                        <p className={mainStyles.early_tit}>서양 미술 800년展타이틀이 길어지는 경우에는</p>
                        <p className={mainStyles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                        <p className={mainStyles.early_place}>더현대서울 6층 ALT.1</p>
                        <span className={mainStyles.left_time_mark}>남은시간</span>
                        <p className={mainStyles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
                        <p className={mainStyles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
                      </div>
                    </a>
                  </li>
                </ul>
                <span className={`${mainStyles.next_btn} ${mainStyles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`}
                  alt="arrow right direction icon"/></span>
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

