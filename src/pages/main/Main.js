import mainStyles from './Main.module.css';
import TopBanner from '../../components/main/TopBanner';
import HotBanner from '../../components/main/HotBanner';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import EarlyBirdInfoApi from '../../apis/cultureInfo/EarlyBirdApi';
import EarlyBanner from '../../components/main/EarlyBanner';
import HoneypotByMainApi from '../../apis/main/honeypotByMainApi';
import UserInterestApi from '../../apis/main/UserInterestApi';



export default function Main(props) {
  const [cultureList, setCultureList] = useState([]);
  const [earlyBirdInfo, setEarlyBirdInfo] = useState([]); // 얼리버드 리스트
  const [hotList, setHotList] = useState([]) // HOT 공연/전시 정보
  const [honeypots, setHoneypots] = useState([]);
  const [filteredHoneypots, setFilteredHoneypots] = useState([]); // 필터링된 허니팟 데이터
  const [loading, setLoading] = useState(true);
  const [userInterest, setUserInterest] = useState([]); // 로그인한 회원의 관심사 등록
  const [pickList, setPickList] = useState([]); // 로그인한 회원의 관심사 기준으로 필터링된 링크비 Pick 공연/전시 리스트
  const [filteredEarlyBird, setFilteredEarlyBird] = useState([]);
  const navigate = useNavigate();

  console.log("메인페이지유저정보", props.user);


  //app.js에서 전달받은 api정보 state 저장
  useEffect(
    ()=>{
      if (props.cultureList) { // api정보 정상적으로 불러오면
        setCultureList(JSON.parse(props.cultureList)); // JSON형태로 cultureList 저장
        setHotList(JSON.parse(props.cultureList));
        setPickList(JSON.parse(props.cultureList));
        setLoading(false);
      }
    },[props.cultureList]
  );

  useEffect(
    () => {
      if(earlyBirdInfo){
         //얼리버드 공연/전시 리스트 전체 조회 api 호출
          EarlyBirdInfoApi({setEarlyBirdInfo}, "all");           
      }         
    },[]
  );

  useEffect(() => {
    if(honeypots){
      HoneypotByMainApi({setHoneypots},{setFilteredHoneypots}); 
      console.log("honeypots",honeypots);
    }
  }, []);

  useEffect(() => {
    if(props.user){
      //{"category":"access","signupPlatform":"kakao:3613081929","role":"ROLE_USER","userCode":6,"iat":1720854970,"exp":1720855270}
      console.log("로그인한 user info : ",JSON.stringify(props.user.userCode));
      UserInterestApi({setUserInterest}, props.user.userCode);
      console.log("userInterest.length : "+userInterest.length);
      console.log("userInterest : ", userInterest);
    }
  }, []);

  useEffect(() => {
    console.log("userInterest.length : "+userInterest.length);
    console.log("userInterest.length : ",userInterest);
    const filteredEb = earlyBirdInfo.map((item, index) => {
      return {
        seq: item.earlyBirdCode, // List내 객체 구분에 필요한 key
        title: item.ebTitle, // 제목
        realmName: item.interestCode === 1 ? "팝업" : item.interestCode === 2 ? "공연" : item.interestCode === 3 ? "축제" : item.interestCode === 4 ? "전시회" : "뮤지컬", // 장르
        price: item.discountPrice, // 할인 가격  
        regularPrice: item.regularPrice, // 일반 가격
        place: item.place,
        startDate: item.saleStartDate,
        endDate: item.saleEndDate,
        area: item.region,
        thumbnail: item.poster,
      }
    });
    const cultureList = JSON.parse(props.cultureList);
    const addedCultureListObj = cultureList.perforList.concat(filteredEb);    
    console.log("addedCultureListObj after concat from main : ",addedCultureListObj);

    if(userInterest.length > 0){ // 관심사가 등록되어있다면
      const filteredByInterest = addedCultureListObj.filter(item => {
        for (let i = 0; i < userInterest.length; i++) {
          switch (userInterest[i].interestCode) {
            case "전시회":
              if (item.realmName.match("미술") || item.title.match("전시")) {
                return true;
              }
              break;
            case "팝업":
              if (item.title.match("팝업")) {
                return true;
              }
              break;
            case "공연":
              if (["음악", "무용", "연극", "국악"].includes(item.realmName) &&
              !item.title.match(/페스티벌|축제/)) {
                return true;
              }
              break;
            case "축제":
              if (item.title.match("축제") || item.title.match("페스티벌")) {
                return true;
              }
              break;
            case "뮤지컬":
              if (item.realmName.match("뮤지컬") || item.title.match("뮤지컬")) {
                return true;
              }
              break;
            default:
              break;
          }
        }
        return false;
      })

      
      console.log("filteredByInterest from main: ",filteredByInterest);
      console.log("filteredEb from main : ",filteredEb);
      if(filteredByInterest.length === 0){        
        setPickList(JSON.parse(props.cultureList));
      }else{
        const sortedFilteredByInterest = filteredByInterest.sort((a, b) => a.title.localeCompare(b.title, 'ko', { sensitivity: 'base' }))
        setPickList({...pickList , perforList : sortedFilteredByInterest});
      }      
      console.log("pickList after filtered : ", pickList);
    }else{
      setPickList(JSON.parse(props.cultureList));
    }
  }, [userInterest, props.cultureList, earlyBirdInfo]);

  // 스크롤시 Header 색상 변경 
  useEffect(
    () => {
      window.scrollTo(0,0); //페이지 이동시, 최상단으로 스크롤 위치
      
      const header = document.querySelector(".header");
      header.classList.add("main");
      document.querySelector(".header-logo").setAttribute('src', 'images/commons/logo_white.png');
      if(document.querySelector(".mypage-btn")){
        //mypage-btn
        document.querySelector(".mypage-btn").setAttribute('src', props.user.profilePic || 'images/commons/icon_mypage_white.png');
        document.querySelector(".logout-btn").setAttribute('src', 'images/commons/icon_logout_white.png');
        document.querySelector(".nickName").style.color = '#ffffff';
      }
      const changeHeaderBgColor = () => {
        if (window.scrollY > 80) {
          header.classList.remove("main");
          document.querySelector(".header-logo").setAttribute('src', 'images/commons/logo.png');
          if(document.querySelector(".mypage-btn")){
            //mypage-btn
            document.querySelector(".mypage-btn").setAttribute('src', props.user.profilePic || 'images/commons/icon_mypage_colored.png');
            document.querySelector(".logout-btn").setAttribute('src', 'images/commons/icon_logout_colored.png');
            document.querySelector(".nickName").style.color = '#282A29';
          }
        } else {
          header.classList.add("main");
          document.querySelector(".header-logo").setAttribute('src', 'images/commons/logo_white.png');
          if(document.querySelector(".mypage-btn")){
            //mypage-btn
            document.querySelector(".mypage-btn").setAttribute('src', props.user.profilePic || 'images/commons/icon_mypage_white.png');
            document.querySelector(".logout-btn").setAttribute('src', 'images/commons/icon_logout_white.png');
            document.querySelector(".nickName").style.color = '#ffffff';
          }
        }
      };
      
      window.addEventListener("scroll", changeHeaderBgColor);

      return () => {
        window.removeEventListener("scroll", changeHeaderBgColor);
        header.classList.remove("main"); // 컴포넌트가 언마운트될 때 클래스 제거
        document.querySelector(".header-logo").setAttribute('src', `${process.env.PUBLIC_URL}/images/commons/logo.png`);
        if(document.querySelector(".logout-btn")){
          //mypage-btn
          document.querySelector(".mypage-btn").setAttribute('src', props.user.profilePic || `${process.env.PUBLIC_URL}/images/commons/icon_mypage_colored.png`);
          document.querySelector(".logout-btn").setAttribute('src', `${process.env.PUBLIC_URL}/images/commons/icon_logout_colored.png`);
          document.querySelector(".nickName").style.color = '#282A29';
        }
      };
    },[]
  );

	return (
		<>
		{/* contents */}
    <div className={mainStyles.contents_cont}>
      <div className={mainStyles.main_sec_box}>
        <div className={mainStyles.main_sec}>
          <div className={`${mainStyles.main_tit} ${mainStyles.flex_center}`}><img src={`${process.env.PUBLIC_URL}/images/commons/logo_white.png`} alt="Link bee logo white"/><p className={`${mainStyles.sec_tit} ${mainStyles.white}`}>링크비 Picks</p></div>
          {/* Top Banner */}          
          {!loading && pickList && <TopBanner pickList={pickList} />}
          
          <div className={mainStyles.hot_prf_sec}>
            <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
              <p className={mainStyles.sec_tit}>HOT 공연/전시 정보</p>
              <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`} onClick={() => navigate("/cultureinfo")}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
            </div>
            {!loading && hotList && <HotBanner hotList={hotList}/>}
          </div>
  
          {/* 얼리버드 전시/공연 정보 */}
          <div className={mainStyles.early_sec_box}>
            <div className={mainStyles.early_sec}>
              <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
                <p className={mainStyles.sec_tit}>얼리버드</p>
                <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`} onClick={() => navigate("/cultureinfo")}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow left direction icon"/></span>
              </div>
              <div className={mainStyles.early_slide_box}>
                {!loading && earlyBirdInfo && <EarlyBanner earlyBirdInfo={earlyBirdInfo}/>}
              </div>
            </div>
          </div>
          {/* // 얼리버드 전시/공연 정보 */}
  
          {/* 허니팟 리스트 영역 */}
          <div className={mainStyles.honeypot_sec_box}>
            <div className={mainStyles.honeypot_sec}>
              <div className={`${mainStyles.tit_view_more} ${mainStyles.flex_center}`}>
                <p className={mainStyles.sec_tit}>허니팟</p>
                <span className={`${mainStyles.view_more_btn} ${mainStyles.flex_center}`} onClick={() => navigate("/honey")}>더보기 <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_white.png`} alt="arrow right direction icon"/></span>
              </div>
              <div className={`${mainStyles.honeypotCont} honeypot-list-container`}>
                {honeypots.length > 10 ? [...Array(parseInt(10))].map((honeypot, index) => (
                <Link to={`/honeypot/detail/${filteredHoneypots[index]?.honeypotCode}`} key={index} className="one-honeypot-index"
                  onClick={ () => {navigate(`/honeypot/detail/${filteredHoneypots[index]?.honeypotCode}`)}}>
                    <div className="honeypot-index-poster">
                      <img src={filteredHoneypots[index]?.poster} alt="포스터이미지" />
                      <hr className="honeypot-dashed" />
                    </div>
                    <div className="honeypot-index-info">
                      <div className="top-info">
                        <div className="region-info">{filteredHoneypots[index]?.region}</div>
                        <div className="category-info">{filteredHoneypots[index]?.interestName}</div>
                        <div className="honeypot-status">{filteredHoneypots[index]?.closureStatus}</div>
                      </div>
                      <p className="honeypot-title">{filteredHoneypots[index]?.honeypotTitle}</p>
                      <div className="honeypot-schedule">
                        <div>일정</div>
                        <p className="honeypot-date">{filteredHoneypots[index]?.eventDate}</p>
                        <p className="total-member">
                          참여인원 {filteredHoneypots[index]?.approvedCount + 1} / {filteredHoneypots[index]?.totalMember}
                        </p>
                      </div>
                      <p className="end-date">{filteredHoneypots[index]?.endDate} 까지 모집해요</p>
                    </div>
                  </Link>
                )) : honeypots.map((honeypot, index) => (
                  <Link to={`/honeypot/detail/${filteredHoneypots[index]?.honeypotCode}`} key={index} className="one-honeypot-index"
                    onClick={ () => {navigate(`/honeypot/detail/${filteredHoneypots[index]?.honeypotCode}`)}}>
                      <div className="honeypot-index-poster">
                        <img src={filteredHoneypots[index]?.poster} alt="포스터이미지" />
                        <hr className="honeypot-dashed" />
                      </div>
                      <div className="honeypot-index-info">
                        <div className="top-info">
                          <div className="region-info">{filteredHoneypots[index]?.region}</div>
                          <div className="category-info">{filteredHoneypots[index]?.interestName}</div>
                          <div className="honeypot-status">{filteredHoneypots[index]?.closureStatus}</div>
                        </div>
                        <p className="honeypot-title">{filteredHoneypots[index]?.honeypotTitle}</p>
                        <div className="honeypot-schedule">
                          <div>일정</div>
                          <p className="honeypot-date">{filteredHoneypots[index]?.eventDate}</p>
                          <p className="total-member">
                            참여인원 {filteredHoneypots[index]?.approvedCount + 1} / {filteredHoneypots[index]?.totalMember}
                          </p>
                        </div>
                        <p className="end-date">{filteredHoneypots[index]?.endDate} 까지 모집해요</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          {/* //허니팟 리스트 영역 */}
        </div>
      </div>
    </div>
    {/* //contents */}
		</>
	)
}

