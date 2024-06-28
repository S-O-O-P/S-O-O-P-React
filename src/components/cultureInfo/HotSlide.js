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

export default function HotSlide(cultureList) {
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
      {cultureList.cultureList && cultureList.cultureList.perforList ? [...Array(parseInt(10))].map((n, index) => {
          // 공연 / 전시 endDate
          const stringDate = cultureList.cultureList.perforList[index].endDate;
          const year = stringDate.slice(0, 4);
          const month = stringDate.slice(4, 6);
          const day = stringDate.slice(6);
          const endDate = new Date(year+"-"+month+"-"+day); //Date형으로 변환
          const dayName = endDate.getDay() == 0 ? '일' : endDate.getDay() == 1 ? '월' : endDate.getDay() == 2 ? '화' : endDate.getDay() == 3 ? '수' : endDate.getDay() == 4 ? '목' : endDate.getDay() == 5 ? '금' : '토'; // 요일 표시
          const endDateFormat = year+"."+month+"."+day; // 날짜 표시 형식
          const title = cultureList.cultureList.perforList[index].title.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'"); // 제목

          return(
            <div className={styles.hot_list} key={index}>
              <Link to={`/cultureinfo/detail/${cultureList.cultureList.perforList[index].seq}`}>                
                <img src={cultureList.cultureList.perforList[index].thumbnail} alt={`${cultureList.cultureList.perforList[index].title} thumbnail`}/>
                <div className={styles.hot_txt_box}>
                  <p className={styles.hot_tit}>{title}</p>
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

{/*
  <img src="https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=3518&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="performance poster" />
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
        </div> */}
