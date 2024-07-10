import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import mainStyle from '../../pages/main/Main.module.css';
import Slider from "react-slick";
import EarlyBannerItem from './EarlyBannerItem';
import LoadingSpinner from '../commons/Loading';

function NextBtn(props) {
  const { className, onClick } = props;
  return (
    <>
      <span className={`${className} ${mainStyle.next_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
    </>
  );
}

function PrevBtn(props) {
  const { className, onClick } = props;
  return (
    <>
      <span className={`${className} ${mainStyle.prev_btn}`} onClick={onClick}><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_left_white.png`} alt="arrow left direction icon"/></span>
    </>
  );
}

export default function EarlyBanner({earlyBirdInfo}) {

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
        {earlyBirdInfo ? earlyBirdInfo.map((item, index) => (
        <EarlyBannerItem key={index} item={item} /> )): <LoadingSpinner/>}        
      </Slider>
    </div>
  );
}
