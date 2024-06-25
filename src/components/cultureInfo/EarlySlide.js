import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

function NextBtn(props) {
  const { className, onClick } = props;
  return (
    <>
      <span className={`${className} ${styles.next_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
    </>
  );
}

function PrevBtn(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <span className={`${className} ${styles.prev_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`} alt="arrow left direction icon"/></span>
    </>
  );
}

export default function EarlySlide() {
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
    <div className={`slider-container ${styles.common_slide}`}>
      <Slider {...settings}>
        <div className={styles.early_slide_list}>
          <Link to="/cultureinfo/detail" className={styles.flex_start}>
            <div className={styles.early_img}>
              <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNvbmNlcnQlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D" alt="early bird info"/>
            </div>
            <div className={styles.early_txt_box}>
              <p className={styles.early_tit}>서양 미술 800년展</p>
              <p className={styles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={styles.early_place}>더현대서울 6층 ALT.1</p>
              <span className={styles.left_time_mark}>남은시간</span>
              <p className={styles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={styles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </Link>
        </div>
        <div className={styles.early_slide_list}>
          <Link to="/cultureinfo/detail" className={styles.flex_start}>
            <div className={styles.early_img}>
              <img src="https://images.unsplash.com/photo-1598387180437-80388ae0df12?q=80&w=3552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="early bird info"/>
            </div>
            <div className={styles.early_txt_box}>
              <p className={styles.early_tit}>서양 미술 800년展</p>
              <p className={styles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={styles.early_place}>더현대서울 6층 ALT.1</p>
              <span className={styles.left_time_mark}>남은시간</span>
              <p className={styles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={styles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </Link>
        </div>
        <div className={styles.early_slide_list}>
          <Link to="/cultureinfo/detail" className={styles.flex_start}>
            <div className={styles.early_img}>
              <img src="https://plus.unsplash.com/premium_photo-1695636587294-5e7eba3e3b43?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVzdGl2YWwlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D" alt="early bird info"/>
            </div>
            <div className={styles.early_txt_box}>
              <p className={styles.early_tit}>서양 미술 800년展</p>
              <p className={styles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={styles.early_place}>더현대서울 6층 ALT.1</p>
              <span className={styles.left_time_mark}>남은시간</span>
              <p className={styles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={styles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </Link>
        </div>
        <div className={styles.early_slide_list}>
          <Link to="/cultureinfo/detail" className={styles.flex_start}>
            <div className={styles.early_img}>
              <img src="https://images.unsplash.com/photo-1580130544401-347c796dceec?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXhoaWJpdGlvbiUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D" alt="early bird info"/>
            </div>
            <div className={styles.early_txt_box}>
              <p className={styles.early_tit}>서양 미술 800년展</p>
              <p className={styles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={styles.early_place}>더현대서울 6층 ALT.1</p>
              <span className={styles.left_time_mark}>남은시간</span>
              <p className={styles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={styles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </Link>
        </div>
        <div className={styles.early_slide_list}>
          <Link to="/cultureinfo/detail" className={styles.flex_start}>
            <div className={styles.early_img}>
              <img src="https://images.unsplash.com/photo-1530263131525-1c1d26feaa60?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="early bird info"/>
            </div>
            <div className={styles.early_txt_box}>
              <p className={styles.early_tit}>서양 미술 800년展</p>
              <p className={styles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
              <p className={styles.early_place}>더현대서울 6층 ALT.1</p>
              <span className={styles.left_time_mark}>남은시간</span>
              <p className={styles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
              <p className={styles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
            </div>
          </Link>
        </div>
      </Slider>
    </div>
  );
}

{/* <span className={`${styles.prev_btn} ${styles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`}
                alt="performance poster" /></span>
              <ul className={`${styles.flex_between} ${styles.early_slide_list}`}>
                <li>
                  <Link to="/cultureinfo/detail" className={styles.flex_start}>
                    <div className={styles.early_img}>
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_10.gif`} alt="early bird info" />
                    </div>
                    <div className={styles.early_txt_box}>
                      <p className={styles.early_tit}>서양 미술 800년展</p>
                      <p className={styles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                      <p className={styles.early_place}>더현대서울 6층 ALT.1</p>
                      <span className={styles.left_time_mark}>남은시간</span>
                      <p className={styles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
                      <p className={styles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/cultureinfo/detail" className={styles.flex_start}>
                    <div className={styles.early_img}>
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_06.gif`} alt="early bird info" />
                    </div>
                    <div className={styles.early_txt_box}>
                      <p className={styles.early_tit}>서양 미술 800년展타이틀이 길어지는 경우에는</p>
                      <p className={styles.early_date}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
                      <p className={styles.early_place}>더현대서울 6층 ALT.1</p>
                      <span className={styles.left_time_mark}>남은시간</span>
                      <p className={styles.time_left}><span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span></p>
                      <p className={styles.early_end_date}>얼리버드 : 07.19&nbsp;<span>24:00</span>까지</p>
                    </div>
                  </Link>
                </li>
              </ul>
              <span className={`${styles.next_btn} ${styles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`}
                alt="next btn" /></span> */}
