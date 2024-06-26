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

export default function HotBanner() {
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
        <div className={mainStyle.hot_prf_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://images.unsplash.com/photo-1545264835-3e14e4dae383?q=80&w=2548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="hot performance poster"/>
            <div className={mainStyle.hot_prf_txt}>
              <p className={mainStyle.hot_tit}>서양 미술 800년展</p>
              <p className={mainStyle.hot_place}>더 현대 서울 ALT.1</p>
              <p className={mainStyle.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
            </div>
          </Link>
        </div>
        <div className={mainStyle.hot_prf_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://images.unsplash.com/photo-1571847140471-1d7766e825ea?q=80&w=3866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="hot performance poster"/>
            <div className={mainStyle.hot_prf_txt}>
              <p className={mainStyle.hot_tit}>서양 미술 800년展</p>
              <p className={mainStyle.hot_place}>더 현대 서울 ALT.1</p>
              <p className={mainStyle.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
            </div>
          </Link>
        </div>
        <div className={mainStyle.hot_prf_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://images.unsplash.com/photo-1625062833789-b0273c8a3f58?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbmNlcnQlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D" alt="hot performance poster"/>
            <div className={mainStyle.hot_prf_txt}>
              <p className={mainStyle.hot_tit}>서양 미술 800년展</p>
              <p className={mainStyle.hot_place}>더 현대 서울 ALT.1</p>
              <p className={mainStyle.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
            </div>
          </Link>
        </div>     
        <div className={mainStyle.hot_prf_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://images.unsplash.com/photo-1569949237615-e2defbeb5d0a?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="hot performance poster"/>
            <div className={mainStyle.hot_prf_txt}>
              <p className={mainStyle.hot_tit}>서양 미술 800년展</p>
              <p className={mainStyle.hot_place}>더 현대 서울 ALT.1</p>
              <p className={mainStyle.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
            </div>
          </Link>
        </div>     
        <div className={mainStyle.hot_prf_list}>
          <Link to="/cultureinfo/detail">
            <img src="https://images.unsplash.com/photo-1497911270199-1c552ee64aa4?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNvbmNlcnQlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D" alt="hot performance poster"/>
            <div className={mainStyle.hot_prf_txt}>
              <p className={mainStyle.hot_tit}>서양 미술 800년展</p>
              <p className={mainStyle.hot_place}>더 현대 서울 ALT.1</p>
              <p className={mainStyle.hot_period}>2024.08.05&nbsp;~&nbsp;2024.10.31</p>
            </div>
          </Link>
        </div>     
      </Slider>
    </div>
  );
}