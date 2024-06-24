import { useEffect } from "react";
import styles from "./CultureInfo.module.css";

export default function CultureDetail() {

  useEffect(
    () => {
      // 이용 및 상세 정보 / 허니팟 정보 탭 버튼
      const tabBtn = document.querySelectorAll(`.${styles.detail_tab_list} li`);

      // 탭 내용 영역
      const tabCont = document.querySelector(`.${styles.detail_info_list}`);

      tabBtn.forEach(tab => {
        tab.addEventListener('click', (e) => {          
          if(e.currentTarget.classList.contains(`${styles.active}`)){ // 활성화된 탭이라면
            return false;
          }else{ // 비활성화된 탭이라면
            e.currentTarget.classList.add(`${styles.active}`);
            console.log(e.currentTarget.classList);
            if(e.currentTarget.classList.contains(`${styles.left}`)){ // 이용 및 상세 정보 탭 활성화라면
              e.currentTarget.nextElementSibling.classList.remove(`${styles.active}`);  
              tabCont.classList.remove(`${styles.active}`);            
            }else{ // 허니팟 정보 탭 활성화라면
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

  return (
    <>
      {/* contents */}
      <div className={styles.contents_cont}>
        <div className={styles.detail_sec_box}>
          <div className={styles.detail_sec}>
            <p className={`${styles.sec_tit} ${styles.left}`}>서양 미술 800년展</p>
            <div className={`${styles.detail_summary} ${styles.flex_between}`}>
              <div className={styles.detail_img}><img src="https://images.pexels.com/photos/6899764/pexels-photo-6899764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="detail page"/></div>
              <div className={styles.summary_txt_box}>
                <ul>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>장소</p><p>더 현대 서울 ALT.1</p></li>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>기간</p><p>2024.08.05 ~ 2024.10.31</p></li>
                  <li className={styles.flex_start}><p className={styles.detail_item_tit}>관람 연령</p><p>전체관람가</p></li>
                  <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>일반 가격</p>
                    <div className={styles.price_list}>
                      <p>성인<span className={`${styles.price} ${styles.adult}`}>15,000</span>원</p>
                      <p>청소년/어린이 <span className={`${styles.price} ${styles.adult}`}>10,000</span>원</p>
                    </div>
                  </li>
                  <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>얼리버드 가격</p>
                    <div className={styles.price_list}>
                      <p>성인<span className={`${styles.price} ${styles.adult}`}>9,900</span>원</p>
                      <p>청소년/어린이<span className={`${styles.price} ${styles.adult}`}>7,900</span>원</p>
                    </div>
                  </li>
                  <li className={styles.flex_start}>
                    <p className={styles.detail_item_tit}>예매처</p>
                    <div className={styles.price_list}>
                      <p>인터파크 티켓</p>
                      <a href="https://tickets.interpark.com/goods/24007240" target="_blank" className={styles.short_cut_btn}>바로가기</a>
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
                  <p className={styles.info_tit}>전시/공연 정보</p>
                  <p className={styles.info_description}>[관람시간］</p>
                  <p className={styles.info_description}>- 월-목 10:30~20:00 금-일 10:30~20:30</p>
                  <p className={styles.info_description}>- 매표 및 입장 관람 종료 1시간 전 마감 </p>
                  <p className={styles.info_description}>*휴관일은 더현대 서울의 휴점일에 따라 변동이 있습니다.</p>
                  <p className={styles.info_tit}>얼리버드 티켓 안내</p>
                  <p className={styles.info_description}>얼리버드 할인 티켓 구매 기간 : <span>2024.07.01 ~ 2024.07.19(금)</span></p>
                  <p className={styles.info_description}>얼리버드 할인 티켓 이용 기간 : <span>2024.08.05 ~ 2024.09.06(금)</span></p>
                  <p className={styles.info_tit}>상세 정보</p>
                  <div className={styles.detail_info_img}>
                    <img src="https://images.pexels.com/photos/6899764/pexels-photo-6899764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="detail info"/>
                  </div>
                    </li>

                    {/* 허니팟 정보 */}
                    <li>
                      {/* 등록된 허니팟이 없는 경우 - NULL */}
                      <div className={styles.detail_null_box}>
                        <img src={`${process.env.PUBLIC_URL}/images/commons/logo.png`} alt="null page"/>
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