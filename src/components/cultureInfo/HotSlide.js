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

export default function HotSlide({cultureList}) {
  // if (cultureList) {
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList.perforList);
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList.perforList[0].thumbnail);
  // }

  // 오늘 날짜 데이터
  const today = new Date();
  const dayName = today.getDay() == 0 ? '일' : today.getDay() == 1 ? '월' : today.getDay() == 2 ? '화' : today.getDay() == 3 ? '수' : today.getDay() == 4 ? '목' : today.getDay() == 5 ? '금' : '토';

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
      {cultureList && cultureList.perforList ? cultureList.perforList.slice(0, 10).map((item, index) => {
          const { endDate, thumbnail, title, seq } = item;
          if (!endDate || !thumbnail || !title) return null;
          const year = endDate.slice(0, 4);
          const month = endDate.slice(4, 6);
          const day = endDate.slice(6);
          const formattedEndDate = new Date(`${year}-${month}-${day}`);
          const dayOfWeek = formattedEndDate.getDay();
          const dayName = ['일', '월', '화', '수', '목', '금', '토'][dayOfWeek];
          const endDateFormat = `${year}.${month}.${day}`;
          const decodedTitle = title.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll("&#39;", "'");

          return(
            <div className={styles.hot_list} key={index}>
              <Link to={`/cultureinfo/detail/${seq}`}>
                <img src={thumbnail} alt={`${decodedTitle} thumbnail`} />
                <div className={styles.hot_txt_box}>
                  <p className={styles.hot_tit}>{decodedTitle}</p>
                  <p className={styles.hot_date}>~{endDateFormat}<span>({dayName})</span> 까지</p>
                  {/* <span className={styles.early_mark}>얼리버드 티켓 판매중</span> */}
                </div>
              </Link>
            </div>
          );          
        }) : <div>Loading중입니다.</div>}                
      </Slider>
    </div>
  );
}

