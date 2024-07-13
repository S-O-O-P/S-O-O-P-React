import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import mainStyle from '../../pages/main/Main.module.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function TopBanner({pickList}) {
  // if (cultureList) {
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList?.perforList);
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList?.perforList[0].thumbnail);
  // }
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 1000,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <div className={`slider-container ${mainStyle.top_banner_box}`}>
      <Slider {...settings}>        
        {pickList && pickList.perforList ? [...Array(parseInt(10))].map((n, index) => {
          return(
            <div className={mainStyle.centerList} key={index}>
              <Link to={`/cultureinfo/detail/${pickList.perforList[index]?.seq}`}>  
                <img src={pickList.perforList[index]?.thumbnail} alt={`${pickList.perforList[index]?.title} thumbnail`}/>            
              </Link>
            </div>
          );          
        }) : <div>Loading중입니다.</div>}
      </Slider>
    </div>
  );
}
