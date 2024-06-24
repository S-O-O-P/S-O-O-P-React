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
  const { className, onClick } = props;
  return (
    <>
      <span className={`${className} ${styles.prev_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`} alt="arrow left direction icon"/></span>
    </>
  );
}

export default function HotSlide() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite : true,
    // autoplay : true,
    // autoplaySpeed : 3000,
    speed : 800,
    pauseOnHover : true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />
  };
  return (
    <div className={`slider-container ${styles.right_shape} ${styles.common_slide}`}>
      <Slider {...settings}>
        <div className={styles.hot_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=3518&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="performance poster" />
            <div className={styles.hot_txt_box}>
              <p className={styles.hot_tit}>숲카이브 - 동숲의 습격 뮤지컬</p>
              <p className={styles.hot_date}>2024.07.10<span>(수)</span><span>17:00</span></p>
              <span className={styles.early_mark}>얼리버드 티켓 판매중</span>
            </div>
          </Link>
        </div>
        <div className={styles.hot_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=2804&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="performance poster" />
            <div className={styles.hot_txt_box}>
              <p className={styles.hot_tit}>숲카이브 - 동숲의 습격 뮤지컬</p>
              <p className={styles.hot_date}>2024.07.10<span>(수)</span><span>17:00</span></p>
            </div>
          </Link>
        </div>
        <div className={styles.hot_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://plus.unsplash.com/premium_photo-1684831693175-f9df1f106f2b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxheSUyMHBlcmZvcm1hbmNlfGVufDB8fDB8fHww" alt="performance poster" />
            <div className={styles.hot_txt_box}>
              <p className={styles.hot_tit}>숲카이브 - 동숲의 습격 뮤지컬</p>
              <p className={styles.hot_date}>2024.07.10<span>(수)</span><span>17:00</span></p>
              <span className={styles.early_mark}>얼리버드 티켓 판매중</span>
            </div>
          </Link>
        </div>
      </Slider>
    </div>
  );
}

{/*
  <span className={`${styles.prev_btn} ${styles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`} 
                  alt="previous slide button" /></span>
                
                <span className={`${styles.next_btn} ${styles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`}
                  alt="next slide button" /></span>
  <ul className={`${styles.hot_list} ${styles.flex_between}`}>
                  <li>
                    <a href="./detail.html">
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_07.gif`}  alt="performance poster" />
                      <div className={styles.hot_txt_box}>
                        <p className={styles.hot_tit}>춘식이 별빛 팝업스토어</p>
                        <p className={styles.hot_date}>2024.07.10<span>(수)</span><span>17:00</span></p>
                        <span className={styles.early_mark}>얼리버드 티켓 판매중</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_10.gif`} alt="performance poster" />
                      <div className={styles.hot_txt_box}>
                        <p className={styles.hot_tit}>춘식이 먹방 팝업스토어</p>
                        <p>2024.08.22<span>(목)</span><span>12:00</span></p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_09.gif`} alt="performance poster" />
                      <div className={styles.hot_txt_box}>
                        <p className={styles.hot_tit}>춘식이 팝업스토어</p>
                        <p>2024.10.10<span>(목)</span><span>13:00</span></p>
                        <span className={styles.early_mark}>얼리버드 티켓 판매중</span>
                      </div>
                    </a>
                  </li>
                </ul> */}
