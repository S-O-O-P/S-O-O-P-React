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

export default function EarlySlide({earlyBirdInfo}) {
  // 오늘 날짜 데이터
  const today = new Date();
  console.log('earlyBirdInfo:', earlyBirdInfo);

  function timer(targetDate) {
    const now = new Date();
      const endDate = new Date(targetDate);
      const timeRemaining = endDate - now;
   
      if (timeRemaining <= 0) {
        const timerText = document.querySelectorAll(`.${styles.time_left}`);
        
        timerText.forEach((timer) => {
          timer.textContent = '종료';
        })
        console.log("종료");
          return;
      }
   
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
   
      // document.querySelector(`.${styles.time_left}`).textContent 
      //   = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
      const timerText = document.querySelectorAll(`.${styles.time_left}`);      
        timerText.forEach((timer) => {
          timer.textContent = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        })
      console.log(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
  }
   
  // 타겟 날짜 설정 (예: 2023년 12월 31일 23:59:59)
  // const targetDate = new Date('2023-12-31T23:59:59').getTime();
   
  // 1초마다 업데이트
  const timerSet = (time) => {
    setInterval(() => {
    timer(time);
  }, 1000);}

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
          // const { saleEndDate, poster, ebTitle, earlyBirdCode } = item;
          // if (!saleEndDate || !poster || !ebTitle) return null;
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

          timerSet(new Date(item.saleEndDate).getTime());
          // 공연 / 전시 start/endDate
          

          const title = item?.ebTitle.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'"); // 제목          
          // if(parseInt(convertDateFormat(item?.endDate, "rest") - today) < 7){
          //   console.log("남은 공연/전시 기간 : " + parseInt((convertDateFormat(item?.endDate, "rest") - today) / 86400000));              
          // }

          return(
            <div className={styles.early_slide_list} key={index}>
              <Link to={`/cultureinfo/detail/${item.earlyBirdCode}`} className={styles.flex_start}>
                <div className={styles.early_img}>
                  <img src={item.poster} alt="early bird info"/>
                </div>
                <div className={styles.early_txt_box}>
                  <p className={styles.early_tit}>{title}</p>
                  <p className={styles.early_date}>{formatDate(item.saleStartDate, null)}&nbsp;~&nbsp;{formatDate(item.saleEndDate, null)}</p>
                  <p className={styles.early_place}>{item.place}</p>
                  <span className={styles.left_time_mark}>남은시간</span>
                  <p className={styles.time_left}></p>
                  {/* <span>1일</span>&nbsp;<span>5시간</span>&nbsp;<span>36분</span>&nbsp;<span>12초</span> */}
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

{/* <div className={styles.early_slide_list}>
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
        </div> */}
