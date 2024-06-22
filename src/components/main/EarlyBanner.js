import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import mainStyle from '../../pages/main/Main.module.css';
import Slider from "react-slick";

function NextBtn(props) {
  const { className, onClick } = props;
  return (
    <>
      <span className={`${className} ${mainStyle.next_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
    </>
  );
}

function PrevBtn(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <span className={`${className} ${mainStyle.prev_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`} alt="arrow left direction icon"/></span>
    </>
  );
}

export default function EarlyBanner() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite : true,
    // autoplay : true,
    // autoplaySpeed : 3000,
    speed : 1000,
    pauseOnHover : true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />
  };
  return (
    <div className={`slider-container ${mainStyle.common_slide}`}>
      <Slider {...settings}>
        <div className={mainStyle.early_slide_list}>
          <a href="#" className={mainStyle.flex_start}>
            <div className={mainStyle.early_img}>
              <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNvbmNlcnQlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D" alt="early bird info"/>
            </div>
            <div className={mainStyle.early_txt_box}>
              <p className={mainStyle.early_tit}>서양 미술 800년展</p>
              <p className={mainStyle.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={mainStyle.early_place}>더현대서울 6층 ALT.1</p>
              <span className={mainStyle.left_time_mark}>남은시간</span>
              <p className={mainStyle.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={mainStyle.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </a>
        </div>
        <div className={mainStyle.early_slide_list}>
          <a href="#" className={mainStyle.flex_start}>
            <div className={mainStyle.early_img}>
              <img src="https://images.unsplash.com/photo-1598387180437-80388ae0df12?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="early bird info"/>
            </div>
            <div className={mainStyle.early_txt_box}>
              <p className={mainStyle.early_tit}>서양 미술 800년展</p>
              <p className={mainStyle.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={mainStyle.early_place}>더현대서울 6층 ALT.1</p>
              <span className={mainStyle.left_time_mark}>남은시간</span>
              <p className={mainStyle.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={mainStyle.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </a>
        </div>
        <div className={mainStyle.early_slide_list}>
          <a href="#" className={mainStyle.flex_start}>
            <div className={mainStyle.early_img}>
              <img src="https://plus.unsplash.com/premium_photo-1695636587294-5e7eba3e3b43?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVzdGl2YWwlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D" alt="early bird info"/>
            </div>
            <div className={mainStyle.early_txt_box}>
              <p className={mainStyle.early_tit}>서양 미술 800년展</p>
              <p className={mainStyle.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={mainStyle.early_place}>더현대서울 6층 ALT.1</p>
              <span className={mainStyle.left_time_mark}>남은시간</span>
              <p className={mainStyle.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={mainStyle.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </a>
        </div>
        <div className={mainStyle.early_slide_list}>
          <a href="#" className={mainStyle.flex_start}>
            <div className={mainStyle.early_img}>
              <img src="https://images.unsplash.com/photo-1580130544401-347c796dceec?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXhoaWJpdGlvbiUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D" alt="early bird info"/>
            </div>
            <div className={mainStyle.early_txt_box}>
              <p className={mainStyle.early_tit}>서양 미술 800년展</p>
              <p className={mainStyle.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={mainStyle.early_place}>더현대서울 6층 ALT.1</p>
              <span className={mainStyle.left_time_mark}>남은시간</span>
              <p className={mainStyle.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={mainStyle.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </a>
        </div>
        <div className={mainStyle.early_slide_list}>
          <a href="#" className={mainStyle.flex_start}>
            <div className={mainStyle.early_img}>
              <img src="https://images.unsplash.com/photo-1530263131525-1c1d26feaa60?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="early bird info"/>
            </div>
            <div className={mainStyle.early_txt_box}>
              <p className={mainStyle.early_tit}>서양 미술 800년展</p>
              <p className={mainStyle.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={mainStyle.early_place}>더현대서울 6층 ALT.1</p>
              <span className={mainStyle.left_time_mark}>남은시간</span>
              <p className={mainStyle.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={mainStyle.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </a>
        </div>
      </Slider>
    </div>
  );
}

{/* <div className={mainStyles.early_slide_box}>
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
              </div> */}
