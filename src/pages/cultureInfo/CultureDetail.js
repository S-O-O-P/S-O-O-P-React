import { useEffect, useState } from "react";
import styles from "./CultureInfo.module.css";
import "../../components/honeypot/HoneypotList.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import EarlyBirdInfoApi from "../../apis/cultureInfo/EarlyBirdApi";
import HoneypotListApi from "../../apis/honeypot/HoneypotListApi";

export default function CultureDetail(props) {
  const {isEarly} = props;
  const [detailData, setDetailData] = useState(null); //상세 정보 저장
  const [earlyBirdInfo, setEarlyBirdInfo] = useState(null); // 얼리버드 상세 정보 저장
  const [honeypots, setHoneypots] = useState([]);
  const [filteredHoneypots, setFilteredHoneypots] = useState([]); // 필터링된 허니팟 데이터
  const { seq } = useParams({}); // seq 코드 param으로 가져오기
  const [early, setEarly] = useState(false); // 얼리버드 여부 - false로 초기화
  const [detailInfo, setDetailInfo] = useState(""); // 상세 내용
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(
    () => {
      if(location.state && seq){
        const {earlyCheck} = location.state;
        //얼리버드 공연/전시 상세 조회 api 호출
        EarlyBirdInfoApi({setEarlyBirdInfo}, "detail", seq);
        console.log("events detail : ",earlyBirdInfo);
        if(earlyCheck === true){
          setEarly(true);
        }        
      }
    },[seq]
  );

  useEffect(
    () => {
      if (earlyBirdInfo && Object.keys(earlyBirdInfo).length > 0) { // 얼리버드 공연/전시 정보가 존재한다면
        // setDetailInfo(events?.ebContent);
        setDetailInfo((earlyBirdInfo?.ebContent).replaceAll("<br>", `\n`)); // 상세 정보 줄바꿈 변경
      }
    },[earlyBirdInfo]
  );

  useEffect(() => {
    if (props.detailDataList) { // 공연/전시 상세 데이터 리스트가 정상적으로 전달되었다면
      setDetailData(props.detailDataList[seq]); // seq번호에 해당하는 상세 정보 state 설정
    }
    console.log("공연 / 전시 상세 정보 : " + JSON.stringify(detailData?.title));
    console.log(seq);
  }, [detailData]);

  useEffect(() => {
    if(seq){
      HoneypotListApi({setHoneypots}, {setFilteredHoneypots});
      console.log("honeypots",honeypots);
    }
  }, [seq]);

  useEffect(
    () => {
      window.scrollTo(0,0); //페이지 이동시, 최상단으로 스크롤 위치
      
      // 이용 및 상세 정보 / 허니팟 정보 탭 버튼
      const tabBtn = document.querySelectorAll(`.${styles.detail_tab_list} li`);

      // 탭 내용 영역
      const tabCont = document.querySelector(`.${styles.detail_info_list}`);

      tabBtn.forEach(tab => {
        tab.addEventListener('click', (e) => {
          if (e.currentTarget.classList.contains(`${styles.active}`)) { // 활성화된 탭이라면
            return false;
          } else { // 비활성화된 탭이라면
            e.currentTarget.classList.add(`${styles.active}`);
            console.log(e.currentTarget.classList);
            if (e.currentTarget.classList.contains(`${styles.left}`)) { // 이용 및 상세 정보 탭 활성화라면
              e.currentTarget.nextElementSibling.classList.remove(`${styles.active}`);
              tabCont.classList.remove(`${styles.active}`);
            } else { // 허니팟 정보 탭 활성화라면
              e.currentTarget.previousElementSibling.classList.remove(`${styles.active}`);
              tabCont.classList.add(`${styles.active}`);
            }
          }
        })
      });

      return () => {
      }
    },
    []
  );

  // 공연 / 전시 start/endDate
  const convertDateFormat = (stringDate, type) => {
    let dateFormat = "";
    const year = stringDate?.slice(0, 4);
    const month = stringDate?.slice(4, 6);
    const day = stringDate?.slice(6);
    if (type == "rest") {
      dateFormat = new Date(year + "-" + month + "-" + day); // 날짜 표시 형식
    } else {
      dateFormat = year + "." + month + "." + day; // 날짜 표시 형식
    }
    return dateFormat;
  }

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
  
  // 얼리버드 공연/전시 가격 1000단위 ,
  const convertPriceFormat = (dPrice) => {
    if (!dPrice && dPrice !== 0) { // dPrice가 유효하지 않은 경우를 처리
      return "가격 정보를 업데이트중입니다.\n잠시만 기다려주세요."; // 기본 값 반환
    }
    const endPrice = (dPrice?.toString()).slice(-3);
    const startPirce = (dPrice?.toString()).slice(0, -3);
    return startPirce+','+endPrice;
  }

  return (
    <>
      {/* contents */}
      <div className={styles.contents_cont}>
        <div className={styles.detail_sec_box}>
          <div className={styles.detail_sec}>
            <p className={`${styles.sec_tit} ${styles.left}`}>{early == false ? detailData?.title.replaceAll('&lt;', `<`).replaceAll('&gt;', `>`).replaceAll("&#39;", "'") : earlyBirdInfo?.ebTitle}</p>
            <div className={`${styles.detail_summary} ${styles.flex_between}`}>
              <div className={styles.detail_img}><img src={early == false ? detailData?.imgUrl : earlyBirdInfo?.poster} alt="detail page" /></div>
              <div className={styles.summary_txt_box}>
                <ul>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>장소</p><p>{early == false ? detailData?.place : earlyBirdInfo?.place}</p></li>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>{early == false ? "기간" : "예매 기간"}</p><p>{early == false ? convertDateFormat(detailData?.startDate, null) : formatDate(earlyBirdInfo?.usageStartDate)} ~ {early == false ? convertDateFormat(detailData?.endDate, null) : formatDate(earlyBirdInfo?.usageEndDate)}</p></li>
                  {early != false ? <li className={styles.flex_start}><p className={styles.detail_item_tit}>사용 기한</p><p>{early == false ? convertDateFormat(detailData?.startDate, null) : formatDate(earlyBirdInfo?.usageStartDate)} ~ {early == false ? convertDateFormat(detailData?.endDate, null) : formatDate(earlyBirdInfo?.usageEndDate)}</p></li> : null}
                  {early != false ? <li className={styles.flex_start}><p className={styles.detail_item_tit}>관람 연령</p><p>{earlyBirdInfo?.ageLimit}</p></li> : null}
                  {early != false ? <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>얼리버드 가격</p>
                    <div className={`${styles.price_list}  ${styles.earlyPrice}`}>
                    <p className={`${styles.price} ${styles.adult}`}>{convertPriceFormat(earlyBirdInfo?.discountPrice)}원</p>
                    </div>
                  </li> : null}
                  <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>일반 가격</p>
                    <div className={styles.price_list}>
                      {early == false ? <p className={`${styles.price} ${styles.adult}`}>{detailData?.price }</p> : <p className={`${styles.price} ${styles.adult}`}>{convertPriceFormat(earlyBirdInfo?.regularPrice)}원</p>}
                      {/* <p>성인<span className={`${styles.price} ${styles.adult}`}>15,000</span>원</p> */}
                      {/* <p>청소년/어린이 <span className={`${styles.price} ${styles.adult}`}>10,000</span>원</p> */}
                    </div>
                  </li>                  
                  <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>{early != false ? "예매처" : "공식 홈페이지"}</p>

                    {early == false ? <div className={styles.price_list}>
                      <p>{detailData?.place}</p>
                      {detailData?.placeUrl != null || detailData?.placeUrl != "" ? <Link to={detailData?.placeUrl} target="_blank" className={styles.short_cut_btn}>바로가기</Link> : <p>공식 홈페이지 정보가 존재하지 않습니다.\n추후 업데이트 예정입니다.</p>}

                    </div> 
                    : 
                    <div className={styles.price_list}>
                      <p>{earlyBirdInfo?.place}</p>
                      {earlyBirdInfo?.sellerLink != null || earlyBirdInfo?.sellerLink != "" ? <Link to={earlyBirdInfo?.sellerLink} target="_blank" className={styles.short_cut_btn}>바로가기</Link> : <p>예매처 정보가 존재하지 않습니다.\n추후 업데이트 예정입니다.</p>}
                    </div>
                    }
                  </li>
                </ul>
              </div>
            </div>
            {/* detail 요약 영역 */}

            {/* detail 정보 영역 */}
            <div className={styles.detail_info_box}>
              {/* 이용 및 상세 정보 / 허니팟 정보 탭 */}
              <ul className={`${styles.detail_tab_list} ${styles.flex_between}`}>
                <li className={`${styles.left} ${styles.active}`}>이용 및 상세 정보</li>
                <li className={styles.right}>허니팟 정보</li>
              </ul>

              {/* 탭에 따른 내용 영역 */}
              <ul className={`${styles.detail_info_list} ${styles.flex_start}`}>
                {/* 이용 및 상세 정보 */}
                <li>                  
                  <p className={styles.info_tit}>상세 정보</p>
                  {early == false ? <div className={styles.detail_info_img}>
                    <img src={detailData?.imgUrl} alt={`${detailData?.title} info`} />
                  </div>
                  :
                  <>
                    <div className={styles.detailInfoText}>{detailInfo}</div>
                    <div className={styles.detail_info_img}>
                      <img src={earlyBirdInfo?.poster} alt={`${earlyBirdInfo?.ebTitle} info`} />
                    </div>
                  </>
                  }
                </li>

                {/* 허니팟 정보 */}
                <li>
                  {/* 등록된 허니팟이 없는 경우 - NULL */}
                  { !honeypots ? <div className={styles.detail_null_box}>
                    <img src={`${process.env.PUBLIC_URL}/images/commons/logo.png`} alt="null page" />
                    <p className={styles.null_txt}>아직 등록된 허니팟이 없어요</p>
                    <p className={styles.null_txt}>지금 바로 허니팟 호스트가 되어 주세요</p>
                    <span className={styles.hosting_btn}>허니팟 호스팅</span>
                  </div> 
                  : 
                  <div className="honeypot-list-container">
                    {filteredHoneypots.map((honeypot, index) => (
                    <div key={index} className="one-honeypot-index"
                      onClick={ () => {navigate(`/honeypot/detail/${honeypot?.honeypotCode}`)}}>
                        <div className="honeypot-index-poster">
                          <img src={honeypot.poster} alt="포스터이미지" />
                          <hr className="honeypot-dashed" />
                        </div>
                        <div className="honeypot-index-info">
                          <div className="top-info">
                            <div className="region-info">{honeypot.region}</div>
                            <div className="category-info">{honeypot.interestName}</div>
                            <div className="honeypot-status">{honeypot.closureStatus}</div>
                          </div>
                          <p className="honeypot-title">{honeypot.honeypotTitle}</p>
                          <div className="honeypot-schedule">
                            <div>일정</div>
                            <p className="honeypot-date">{honeypot.eventDate}</p>
                            <p className="total-member">
                              참여인원 {honeypot.approvedCount + 1} / {honeypot.totalMember}
                            </p>
                          </div>
                          <p className="end-date">{honeypot.endDate} 까지 모집해요</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* //contents */}
    </>
  );
}