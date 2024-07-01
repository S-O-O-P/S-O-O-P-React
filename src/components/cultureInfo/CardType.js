import { Link } from 'react-router-dom';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';
import LoadingSpinner from '../commons/Loading';

export default function CardType({cultureList, detailDataList}){
  console.log('Culture List:', cultureList);
  console.log('Detail Data List:', detailDataList);

  // 데이터가 로딩 중일 때 처리
  // if (!cultureList || !cultureList.perforList || !detailDataList) {
  //   return <LoadingSpinner />;
  // }

  // console.log("detailList from CardType.js : "+ JSON.stringify(detailDataList));

  const today = new Date();
  return(
      <>
        {cultureList ? cultureList.map((item, index) => {
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

            // seq에 해당하는 detailData 가져오기
            const detailData = detailDataList[item.seq];
            // console.log("Detail data for seq ", item.seq, ": ", detailData);

            // detailData가 존재하고 price 속성이 있을 때 가격 표시
            const price = detailData && detailData.price ? detailData.price : "가격 정보 없음";
            // const detailData = detailDataList[item.seq]; // seq(공연/전시 코드)에 따른 상세 정보
            // console.log("price from cardtype : " + JSON.stringify(detailData));
            const earlyCheck = false; // 얼리버드 여부 - false로 초기화
            
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
                    <p className={styles.culture_price}>
                      { earlyCheck ? <span className={styles.sale_rate}>30%</span> : null} {price}
                    </p>
                  </div>
                </Link>
              </li>
            );          
          }) : <div>로딩 중입니다.</div>}
      </>
  );
}
{/* <LoadingSpinner/> */}