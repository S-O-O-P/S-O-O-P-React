import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import mainStyle from '../../pages/main/Main.module.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

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

export default function HotBanner({hotList}) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite : true,
    autoplay : true,
    autoplaySpeed : 3000,
    speed : 1000,
    pauseOnHover : true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />
  };
  return (
    <div className={`slider-container ${mainStyle.hot_prf_box} ${mainStyle.common_slide}`}>
      <Slider {...settings}>
      {hotList ? hotList.perforList.map((item, index) => {
        // 공연 / 전시 start/endDate
        const convertDateFormat = (stringDate, type) => {
          let dateFormat = "";
          const year = stringDate?.slice(0, 4);
          const month = stringDate?.slice(4, 6);
          const day = stringDate?.slice(6);
          if(type == "rest"){
            dateFormat = new Date(year+"-"+month+"-"+day); // 날짜 표시 형식
          } else{
            dateFormat = year+"."+month+"."+day; // 날짜 표시 형식
          }              
          return dateFormat;
        }

        const title = item?.title.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'");

        return(<div className={mainStyle.hot_prf_list} key={index}>
          <Link to={`/cultureinfo/detail/${item.seq}`}>
            <img src={item.thumbnail} alt={`${title} poster`}/>
            <div className={mainStyle.hot_prf_txt}>
              <p className={mainStyle.hot_tit}>{title}</p>
              <p className={mainStyle.hot_place}>{item.place}</p>
              <p className={mainStyle.hot_period}>{convertDateFormat(item.startDate, null)} ~ {convertDateFormat(item.endDate, null)}</p>
            </div>
          </Link>
        </div>);}) : null}
      </Slider>
    </div>
  );
}