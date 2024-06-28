import { Link } from 'react-router-dom';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';

export default function CardType(cultureList){
  // if (cultureList) {
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList.perforList);
  //   console.log("cultureList from TopBanner : " + cultureList.cultureList.perforList[0].thumbnail);
  // }
  const today = new Date();
  return(
      <>
        {cultureList.cultureList && cultureList.cultureList.perforList ? cultureList.cultureList.perforList.map((item, index) => {
            // 공연 / 전시 start/endDate
            const convertDateFormat = (stringDate, type) => {
              let dateFormat = "";
              const year = stringDate.slice(0, 4);
              const month = stringDate.slice(4, 6);
              const day = stringDate.slice(6);
              if(type == "rest"){
                dateFormat = new Date(year+"-"+month+"-"+day); // 날짜 표시 형식
              } else{
                dateFormat = year+"."+month+"."+day; // 날짜 표시 형식
              }              
              return dateFormat;
            }

            const title = item.title.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'"); // 제목          
            if(parseInt(convertDateFormat(item.endDate, "rest") - today) < 7){
              console.log("남은 공연/전시 기간 : " + parseInt((convertDateFormat(item.endDate, "rest") - today) / 86400000));
              
            }
            
            return(
              <li key={index}>
                <Link to={`/cultureinfo/detail/${item.seq}`}>
                  <div className={styles.culture_img}>
                  <img src={item.thumbnail} alt={`${title} thumbnail`}/>
                    {(parseInt((convertDateFormat(item.endDate, "rest") - today) / 86400000) < 7) ? <span className={styles.culture_mark}>마감임박</span> : null}
                  </div>
                  <div className={styles.culture_item_txt}>
                    <p className={styles.culture_tit}>{title}</p>
                    <p className={styles.culture_date}>{convertDateFormat(item.startDate, null)} ~ {convertDateFormat(item.endDate, null)}</p>
                    <p className={styles.early_end}></p>
                    <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
                  </div>
                </Link>
              </li>
            );          
          }) : <div>Loading중입니다.</div>}
      </>
  );
}
{/* <li>
        <Link to="/cultureinfo/detail">
          <div className={styles.culture_img}>
            <img src="https://images.pexels.com/photos/26076858/pexels-photo-26076858.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="culture poster" />
            <span className={styles.culture_mark}>마감임박</span>
          </div>
          <div className={styles.culture_item_txt}>
            <p className={styles.culture_tit}>서양 미술 800년展</p>
            <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
            <p className={styles.early_end}></p>
            <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/cultureinfo/detail">
          <div className={styles.culture_img}>
            <img src="https://images.pexels.com/photos/6899772/pexels-photo-6899772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="culture poster" />
            <span className={styles.culture_mark}>마감임박</span>
          </div>
          <div className={styles.culture_item_txt}>
            <p className={styles.culture_tit}>서양 미술 800년展</p>
            <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
            <p className={styles.early_end}></p>
            <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/cultureinfo/detail">
          <div className={styles.culture_img}>
            <img src="https://images.pexels.com/photos/4722568/pexels-photo-4722568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="culture poster" />
            <span className={styles.culture_mark}>마감임박</span>
          </div>
          <div className={styles.culture_item_txt}>
            <p className={styles.culture_tit}>서양 미술 800년展</p>
            <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
            <p className={styles.early_end}></p>
            <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/cultureinfo/detail">
          <div className={styles.culture_img}>
            <img src="https://images.pexels.com/photos/6896326/pexels-photo-6896326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="culture poster" />
            <span className={styles.culture_mark}>마감임박</span>
          </div>
          <div className={styles.culture_item_txt}>
            <p className={styles.culture_tit}>서양 미술 800년展</p>
            <p className={styles.culture_date}>2024.08.05 ~ 2024.10.31</p>
            <p className={styles.early_end}></p>
            <p className={styles.culture_price}><span className={styles.sale_rate}>30%</span> 84,700원</p>
          </div>
        </Link>
      </li> */}