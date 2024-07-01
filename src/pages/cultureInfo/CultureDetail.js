import { useEffect, useState } from "react";
import styles from "./CultureInfo.module.css";
import { useParams } from "react-router-dom";

export default function CultureDetail(props) {
  const [detailData, setDetailData] = useState(null); //상세 정보 저장
  const { seq } = useParams({}); // seq 코드 param으로 가져오기
  const [early, setEarly] = useState(false); // 얼리버드 여부 - false로 초기화

  // useEffect(() => {
  //   if (seq) {
  //     // CultureDetailApi({ setDetailData }, seq); // 상세 정보 조회 api에 setDetailData 와 seq코드 전달
  //     console.log("detailData from CultureDetail.js: " + JSON.stringify(detailData));
  //   }
  // }, [seq]); // seq가 변경될 때마다 실행

  useEffect(() => {
    if (props.detailDataList) {
      setDetailData(props.detailDataList[seq]);
    }
    console.log("공연 / 전시 상세 정보 : " + JSON.stringify(detailData?.title));
    console.log(seq);
  }, [detailData]);

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

  return (
    <>
      {/* contents */}
      <div className={styles.contents_cont}>
        <div className={styles.detail_sec_box}>
          <div className={styles.detail_sec}>
            <p className={`${styles.sec_tit} ${styles.left}`}>{detailData?.title.replaceAll('&lt;', `<`).replaceAll('&gt;', `>`).replaceAll("&#39;", "'")}</p>
            <div className={`${styles.detail_summary} ${styles.flex_between}`}>
              <div className={styles.detail_img}><img src={detailData?.imgUrl} alt="detail page" /></div>
              <div className={styles.summary_txt_box}>
                <ul>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>장소</p><p>{detailData?.place}</p></li>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>기간</p><p>{convertDateFormat(detailData?.startDate, null)} ~ {convertDateFormat(detailData?.endDate, null)}</p></li>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>관람 연령</p><p>전체관람가</p></li>
                  <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>일반 가격</p>
                    <div className={styles.price_list}>
                      <p className={`${styles.price} ${styles.adult}`}>{detailData?.price}</p>
                      {/* <p>성인<span className={`${styles.price} ${styles.adult}`}>15,000</span>원</p> */}
                      {/* <p>청소년/어린이 <span className={`${styles.price} ${styles.adult}`}>10,000</span>원</p> */}
                    </div>
                  </li>
                  {/* <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>얼리버드 가격</p>
                    <div className={styles.price_list}>
                      <p>성인<span className={`${styles.price} ${styles.adult}`}>9,900</span>원</p>
                      <p>청소년/어린이<span className={`${styles.price} ${styles.adult}`}>7,900</span>원</p>
                    </div>
                  </li> */}
                  <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>{early ? "예매처" : "공식 홈페이지"}</p>
                    <div className={styles.price_list}>
                      <p>{detailData?.place}</p>
                      {detailData?.placeUrl !== null || detailData?.placeUrl !== "" || detailData?.placeUrl !== `[{}]` ? <a href={detailData?.placeUrl} target="_blank" className={styles.short_cut_btn}>바로가기</a> : <p>예매처 정보가 존재하지 않습니다.\n추후 업데이트 예정입니다.</p>}

                    </div>
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
                  {early ? 
                  <>
                    <p className={styles.info_tit}>전시/공연 정보</p>
                    <p className={styles.info_description}>[관람시간］</p>
                    <p className={styles.info_description}>- 월-목 10:30~20:00 금-일 10:30~20:30</p>
                    <p className={styles.info_description}>- 매표 및 입장 관람 종료 1시간 전 마감 </p>
                    <p className={styles.info_description}>*휴관일은 더현대 서울의 휴점일에 따라 변동이 있습니다.</p>
                    <p className={styles.info_tit}>얼리버드 티켓 안내</p>
                    <p className={styles.info_description}>얼리버드 할인 티켓 구매 기간 : <span>2024.07.01 ~ 2024.07.19(금)</span></p>
                    <p className={styles.info_description}>얼리버드 할인 티켓 이용 기간 : <span>2024.08.05 ~ 2024.09.06(금)</span></p>
                  </> : null}
                  <p className={styles.info_tit}>상세 정보</p>
                  <div className={styles.detail_info_img}>
                    <img src={detailData?.imgUrl} alt={`${detailData?.title} info`} />
                  </div>
                </li>

                {/* 허니팟 정보 */}
                <li>
                  {/* 등록된 허니팟이 없는 경우 - NULL */}
                  <div className={styles.detail_null_box}>
                    <img src={`${process.env.PUBLIC_URL}/images/commons/logo.png`} alt="null page" />
                    <p className={styles.null_txt}>아직 등록된 허니팟이 없어요</p>
                    <p className={styles.null_txt}>지금 바로 허니팟 호스트가 되어 주세요</p>
                    <span className={styles.hosting_btn}>허니팟 호스팅</span>
                  </div>
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