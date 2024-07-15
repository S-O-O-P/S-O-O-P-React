import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import mainStyle from '../../pages/main/Main.module.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function TopBanner({ pickList }) {
  // if (cultureList) {
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList?.perforList);
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList?.perforList[0].thumbnail);
  // }

  const settings = {
    className: "center",
    centerMode: true,
    infinite: pickList.perforList?.length > 2,
    centerPadding: "60px",
    slidesToShow: Math.min(pickList.perforList?.length || 1, 3),
    // slidesToShow: pickList.perforList?.length >= 3 ? 3 : pickList.perforList?.length,
    speed: 1000,
    dots: pickList.perforList?.length > 1,
    autoplay: pickList.perforList?.length > 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className={`slider-container ${mainStyle.top_banner_box}`}>
      <Slider {...settings}>
        {pickList && pickList.perforList ? (
          pickList.perforList.length > 10
            ? pickList.perforList.slice(0, 10).map((item, index) => (
              <div className={mainStyle.centerList} key={index}>
                <Link to={`/cultureinfo/detail/${item.seq}`} state={item.regularPrice ? { earlyCheck: true } : { earlyCheck: false }}>
                  <img src={item.thumbnail} alt={`${item.title} thumbnail`} />
                </Link>
              </div>
            ))
            : pickList.perforList.length > 1
              ? [...Array(4)].map((_, index) => {
                const item = pickList.perforList[index % pickList.perforList.length];
                return (
                  <div className={mainStyle.centerList} key={index}>
                    <Link to={`/cultureinfo/detail/${item.seq}`} state={item.regularPrice ? { earlyCheck: true } : { earlyCheck: false }}>
                      <img src={item.thumbnail} alt={`${item.title} thumbnail`} />
                    </Link>
                  </div>
                );
              })
              : pickList.perforList.map((item, index) => (
                <div className={mainStyle.centerList} key={index}>
                  <Link to={`/cultureinfo/detail/${item.seq}`} state={item.regularPrice ? { earlyCheck: true } : { earlyCheck: false }}>
                    <img src={item.thumbnail} alt={`${item.title} thumbnail`} />
                  </Link>
                </div>
              ))
        ) : (
          <div>Loading...</div>
        )}
      </Slider>
    </div>
  );
}