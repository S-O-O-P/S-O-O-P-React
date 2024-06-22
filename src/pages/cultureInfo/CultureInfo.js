import EarlySlide from "../../components/cultureInfo/EarlySlide";
import HotSlide from "../../components/cultureInfo/HotSlide";
import styles from "./CultureInfo.module.css";

export default function CultureInfo() {

  return (
    <>
      {/* contents */}
      <div className={styles.contents_cont}>
        {/* HOT 공연/전시 */}
        <div className={styles.hot_sec_box}>
          <div className={styles.hot_sec}>
            <div className={`${styles.flex_center} ${styles.ticket_shape_cont}`}>
              <div className={`${styles.left_shape} ${styles.flex_center}`}>
                <p>HOT<br />전시공연</p>
              </div>
              <ul className={styles.cutting_line}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              {HotSlide()}
            </div>
          </div>
        </div>
        {/* //hot_sec_box - Hot 공연/전시 정보 */}

        {/* 얼리버드 공연/전시 정보 */}
        <div className={styles.early_sec_box}>
          <div className={styles.early_sec}>
            <p className={styles.sec_tit}>얼리버드</p>
            <div className={styles.early_slide_box}>
              {EarlySlide()}
            </div>
          </div>
        </div>
        {/* //얼리버드 공연/전시 정보 */}

        {/* 공연/전시 둘러보기 */}
        <div className={styles.culture_sec_box}>
          <div className={styles.culture_sec}>
            <p className={styles.sec_tit}>공연/전시 둘러보기</p>
            <ul className={`${styles.filter_genre} ${styles.flex_center}`}>
              <li className={`${styles.flex_center} ${styles.active}`}>
                <p>전시/행사 전체보기</p>
                <span className={styles.filter_count}>56</span>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="arrow left direction icon" />
              </li>
              <li className={styles.flex_center}>
                <p>전시회</p>
                <span className={styles.filter_count}>18</span>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="arrow left direction icon" />
              </li>
              <li className={styles.flex_center}>
                <p>공연</p>
                <span className={styles.filter_count}>10</span>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="arrow left direction icon" />
              </li>
              <li className={styles.flex_center}>
                <p>뮤지컬</p>
                <span className={styles.filter_count}>12</span>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="arrow left direction icon" />
              </li>
              <li className={styles.flex_center}>
                <p>행사/축제</p>
                <span className={styles.filter_count}>7</span>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="arrow left direction icon" />
              </li>
              <li className={styles.flex_center}>
                <p>팝업</p>
                <span className={styles.filter_count}>9</span>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="arrow left direction icon" />
              </li>
            </ul>
            {/* // 공연/전시 필터링 버튼 리스트*/}
            <span className={styles.divide_line}></span>

            {/* 해당 공연/전시 세부 필터링 버튼 리스트 */}
            <div className={`${styles.detail_filter_list} ${styles.flex_between}`}>
              <ul className={styles.flex_start}>
                <li className={styles.left_filter}>
                  <span className={`${styles.selected_filter} ${styles.left} ${styles.flex_center}`}><span className={styles.selected_option}>최신등록순</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className={styles.filter_arrow_icon} /></span>
                  <ul>
                    <li>최신등록순</li>
                    <li>가격높은순</li>
                    <li>가격낮은순</li>
                    <li>허니팟 많은순</li>
                    <li>인기순</li>
                  </ul>
                </li>
                <li className={`${styles.right_filter} ${styles.region_filter}`}>
                  <span className={`${styles.selected_filter} ${styles.right} ${styles.flex_center}`}><span className={styles.selected_option}>전체 지역</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_bottom_main_color.png`} alt="arrow direction bottom icon" className={styles.filter_arrow_icon} /></span>
                  <ul>
                    <li>전체 지역</li>
                    <li>서울</li>
                    <li>인천</li>
                    <li>경기</li>
                    <li>부산</li>
                  </ul>
                </li>
              </ul>

              <ul className={`${styles.view_filter_list} ${styles.flex_start}`}>
                <li className={`${styles.left_filter} ${styles.active} ${styles.flex_center}`}>
                  <img src={`${process.env.PUBLIC_URL}/images/commons/icon_list_white.png`} alt="view card pattern icon" />
                </li>
                <li className={`${styles.right_filter} ${styles.flex_center}`}>
                  <img src={`${process.env.PUBLIC_URL}/images/commons/icon_list_colored.png`} alt="view table pattern icon" />
                </li>
              </ul>
            </div>
            {/* // 해당 공연/전시 세부 필터링 버튼 리스트 */}
            <p className={styles.culture_notice_txt}>* 표시 가격은 성인 1인 기준 가격입니다.</p>

            {/* 공연/전시 리스트 */}
            {/* 카드 형식 */}
            <div className={styles.culture_list_box}>
              <ul className={`${styles.culture_list} ${styles.flex_start}`}>
                <li>
                  <a href="#">
                    <div className={styles.culture_img}>
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_04.png`} alt="culture poster" />
                      <span className={styles.culture_mark}>마감임박</span>
                    </div>
                    <div className={styles.culture_item_txt}>
                      <p className={styles.culture_tit}>서양 미술 800년展</p>
                      <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
                      <p className={styles.early_end}></p>
                      <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className={styles.culture_img}>
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_07.gif`} alt="culture poster" />
                    </div>
                    <div className={styles.culture_item_txt}>
                      <p className={styles.culture_tit}>2024 윤하 소극장 콘서트［潤夏]</p>
                      <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
                      <p className={styles.early_end}></p>
                      <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className={styles.culture_img}>
                      {/* `${process.env.PUBLIC_URL} */}
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_06.gif`} alt="culture poster" />
                      <span className={styles.culture_mark}>얼리버드</span>
                    </div>
                    <div className={styles.culture_item_txt}>
                      <p className={styles.culture_tit}>뮤지컬 [어쩌면 해피엔딩]</p>
                      <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
                      <p className={styles.early_end}>얼리버드 : 07.19 24:00 까지</p>
                      <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className={styles.culture_img}>
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_02.jpg`} alt="culture poster" />
                      <span className={styles.culture_mark}>마감임박</span>
                    </div>
                    <div className={styles.culture_item_txt}>
                      <p className={styles.culture_tit}>서양 미술 800년展</p>
                      <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
                      <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className={styles.culture_img}>
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_04.png`} alt="culture poster" />
                    </div>
                    <div className={styles.culture_item_txt}>
                      <p className={styles.culture_tit}>2024 윤하 소극장 콘서트［潤夏]</p>
                      <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
                      <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className={styles.culture_img}>
                      <img src={`${process.env.PUBLIC_URL}/images/cultureInfo/KakaoTalk_20240524_000933916_06.gif`} alt="culture poster" />
                      <span className={styles.culture_mark}>얼리버드</span>
                    </div>
                    <div className={styles.culture_item_txt}>
                      <p className={styles.culture_tit}>뮤지컬 [어쩌면 해피엔딩]</p>
                      <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
                      <p className={styles.early_end}>얼리버드 : 07.19 24:00 까지</p>
                      <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
                    </div>
                  </a>
                </li>
              </ul>
              <span className={styles.view_more_btn}>더보기</span>
            </div>
            {/* //카드 형식 */}

            {/* 테이블 형식 */}
            <div className={styles.culture_table}>
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>제목</th>
                    <th>가격</th>
                    <th>일정</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>뮤지컬</td>
                    <td>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)</td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                  <tr>
                    <td>팝업스토어</td>
                    <td>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)</td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                  <tr>
                    <td>팝업스토어</td>
                    <td><p>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)asdfasdfasdfasdfasdfagdfgsdfgsdfgsdfgsdfgsdfgdfgdfgdfgsfggsf</p></td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                </tbody>
              </table>
              <div className={`${styles.pagination_box} ${styles.flex_center}`}>
                <span className={styles.start_page}></span>
                <span className={styles.prev_page}></span>
                <ul className={`${styles.pagination} ${styles.flex_center}`}>
                  <li className={styles.active}>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                </ul>
                <span className={styles.next_page}></span>
                <span className={styles.end_page}></span>
              </div>
            </div>
            {/*//테이블 형식 */}

          </div>
        </div>
        {/* //공연/전시 둘러보기 */}

      </div>
      {/* //contents */}
    </>
  );
}
