import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import mainStyle from '../../pages/main/Main.module.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default function TopBanner(cultureList) {
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
        {cultureList.cultureList && cultureList.cultureList.perforList ? [...Array(parseInt(10))].map((n, index) => {
          return(
            <div className={mainStyle.centerList} key={index}>
              <Link to={`/cultureinfo/detail/${cultureList.cultureList.perforList[index].seq}`}>  
                <img src={cultureList.cultureList.perforList[index].thumbnail} alt={`${cultureList.cultureList.perforList[index].title} thumbnail`}/>            
              </Link>
            </div>
          );          
        }) : <div>Loading중입니다.</div>}
      </Slider>
    </div>
  );
}
