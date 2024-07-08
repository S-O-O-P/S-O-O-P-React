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

export default function EarlySlide({earlyBirdInfo}) {
  // 오늘 날짜 데이터
  const today = new Date();
  console.log('earlyBirdInfo:', earlyBirdInfo);

  function timer(targetDate) {
    const now = new Date();
      const endDate = new Date(targetDate);
      const timeRemaining = endDate - now;
   
      if (timeRemaining <= 0) {                
        console.log("종료");
          return "종료";
      }
   
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

      return `${days}일 ${hours}시간 ${minutes}분`;
      // const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // const timerText = document.querySelectorAll(`.${styles.time_left}`);      
        // timerText.forEach((timer) => {
        //   timer.textContent = `${days}일 ${hours}시간 ${minutes}분`;
        //   // timer.textContent = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        // })
      // console.log(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
  }
   
  // 타겟 날짜 설정 (예: 2023년 12월 31일 23:59:59)
  // const targetDate = new Date('2023-12-31T23:59:59').getTime();
   
 

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
      {earlyBirdInfo ? earlyBirdInfo.map((item, index) => {
          // 날짜 형식 변경
          function formatDate(date) {
            var writtenDate = new Date(date),
              month = '' + (writtenDate?.getMonth() + 1),
              day = '' + writtenDate?.getDate(),
              year = writtenDate?.getFullYear();

            if (month.length < 2) 
              month = '0' + month;
            if (day.length < 2) 
              day = '0' + day;

            return [year, month, day].join('.');
          }

           // 1초마다 업데이트
          // const timerSet = (time) => {
          //   setInterval(() => {
          //   timer(time);
          // }, 1000);}

          // timerSet(new Date(item.saleEndDate).getTime());
          const targetTime = new Date(item.saleEndDate).getTime();

          const title = item?.ebTitle.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'"); // 

          return(
            <div className={styles.early_slide_list} key={index}>
              <Link to={`/cultureinfo/detail/${item.earlyBirdCode}`} state={{ earlyCheck: true }} className={styles.flex_start}>
                <div className={styles.early_img}>
                  <img src={item.poster} alt="early bird info"/>
                </div>
                <div className={styles.early_txt_box}>
                  <p className={styles.early_tit}>{title}</p>
                  <p className={styles.early_date}>{formatDate(item.saleStartDate, null)}&nbsp;~&nbsp;{formatDate(item.saleEndDate, null)}</p>
                  <p className={styles.early_place}>{item.place}</p>
                  <span className={styles.left_time_mark}>남은시간</span>
                  <p className={styles.time_left}>{timer(targetTime)}</p>
                  <p className={styles.early_end_date}>얼리버드 : {formatDate(item.saleEndDate, null)}&nbsp;<span>24:00</span>까지</p>
                </div>
              </Link>
            </div>
          );          
        }) : <div>Loading중입니다.</div>}        
      </Slider>
    </div>
  );
}
