import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';
import Slider from "react-slick";
import EarlySlideItem from './EarlySlideItem';
import LoadingSpinner from '../commons/Loading';

function NextBtn(props) {
  const { className, onClick } = props;
  return (
    <>
      <span className={`${className} ${styles.next_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon" /></span>
    </>
  );
}

function PrevBtn(props) {
  const { className, onClick } = props;
  return (
    <>
      <span className={`${className} ${styles.prev_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`} alt="arrow left direction icon" /></span>
    </>
  );
}

export default function EarlySlide({ earlyBirdInfo }) {
 
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    // autoplay : true,
    // autoplaySpeed : 3000,
    speed: 1000,
    pauseOnHover: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />
  };
  
  return (
    <div className={`slider-container ${styles.common_slide}`}>
      <Slider {...settings}>
        {earlyBirdInfo ? earlyBirdInfo.map((item, index) => (
          <EarlySlideItem key={index} item={item} /> )): <LoadingSpinner/>}
      </Slider>
    </div>
  );
}

// const targetTime = new Date(item.saleEndDate).getTime();
//           const title = item?.ebTitle.replaceAll('&lt;', `<`).replaceAll('&gt;', `>`).replaceAll("&#39;", "'");

//           const [timeLeft, setTimeLeft] = useState(timer(targetTime));

//           useEffect(() => {
//             const interval = setInterval(() => {
//               const newTimeLeft = timer(targetTime);
//               setTimeLeft(newTimeLeft);

//               // 타이머가 종료되면 interval을 정리합니다.
//               if (newTimeLeft === "얼리버드 마감") {
//                 clearInterval(interval);
//               }
//             }, 1000);

//             return () => clearInterval(interval);
//           }, [targetTime]);

//           return (
//             <div className={styles.early_slide_list} key={index}>
//               <Link to={`/cultureinfo/detail/${item.earlyBirdCode}`} state={{ earlyCheck: true }} className={styles.flex_start}>
//                 <div className={styles.early_img}>
//                   <img src={item.poster} alt="early bird info" />
//                 </div>
//                 <div className={styles.early_txt_box}>
//                   <p className={styles.early_tit}>{title}</p>
//                   <p className={styles.early_date}>{formatDate(item.saleStartDate, null)}&nbsp;~&nbsp;{formatDate(item.saleEndDate, null)}</p>
//                   <p className={styles.early_place}>{item.place}</p>
//                   <span className={styles.left_time_mark}>남은시간</span>
//                   <p className={styles.time_left}>{timer(targetTime)}</p>
//                   <p className={styles.early_end_date}>얼리버드 : {formatDate(item.saleEndDate, null)}&nbsp;<span>24:00</span>까지</p>
//                 </div>
//               </Link>
//             </div>
//           );
//         }) : <div>Loading중입니다.</div>}
