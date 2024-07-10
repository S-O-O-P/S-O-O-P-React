import { Link } from 'react-router-dom';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';
import LoadingSpinner from '../commons/Loading';

export default function CardType({cultureList, detailDataList, earlyCheck}){
  // console.log('Culture List:', cultureList);
  // console.log('Detail Data List:', detailDataList);
  // console.log('earlyCheck:', earlyCheck);

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
              const year = stringDate?.slice(0, 4);
              const month = stringDate?.slice(4, 6);
              const day = stringDate?.slice(6);
              if(type == "rest"){
                dateFormat = new Date(year+"-"+month+"-"+day); // 날짜 표시 형식
              } else{
                dateFormat = year+"."+month+"."+day; // 날짜 표시 형식
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
              console.log("dPrice : ",dPrice);
              if (!dPrice && dPrice !== 0) { // dPrice가 유효하지 않은 경우를 처리
                return "가격 정보 업데이트중"; // 기본 값 반환
              }
              const endPrice = (dPrice?.toString()).slice(-3);
              const startPrice = (dPrice?.toString()).slice(0, -3);
              return startPrice+','+endPrice;
            }

            const title = earlyCheck ? item.ebTitle.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'") :  item.title.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'"); // 제목          
            

            // seq에 해당하는 detailData 가져오기
            const detailData = detailDataList[item.seq];

            // detailData가 존재하고 price 속성이 있을 때 가격 표시
            const price = earlyCheck ? convertPriceFormat(item?.discountPrice) : detailData && detailData.price ? detailData.price : "가격 정보 없음";
            // const detailData = detailDataList[item.seq]; // seq(공연/전시 코드)에 따른 상세 정보
            // console.log("price from cardtype : " + JSON.stringify(detailData));
            const discountRate = earlyCheck ? parseInt(item?.discountPrice / item?.regularPrice * 100) : null;
            // console.log("discount Rate : ", item);
            // console.log("discount Rate : " + typeof item?.discountPrice);
            // console.log("discount Rate : " + item?.regularPrice);
            // console.log("discount Rate : " + (item.discountPrice / item.regularPrice * 100));
            
            return(
              <li key={index}>
                <Link to={earlyCheck ? `/cultureinfo/detail/${item.earlyBirdCode}` : `/cultureinfo/detail/${item.seq}`}  state={earlyCheck ? { earlyCheck: true } : {earlyCheck : false}}>
                  <div className={styles.culture_img}>
                  <img src={earlyCheck ? item.poster : item.thumbnail} alt={`${title} thumbnail`}/>
                    {earlyCheck ? ((parseInt((new Date(item.saleEndDate) - today) / 86400000) < 7) ? <span className={styles.culture_mark}>마감임박</span> : null) : (parseInt((convertDateFormat(item.endDate, "rest") - today) / 86400000) < 7) ? <span className={styles.culture_mark}>마감임박</span> : null}
                  </div>
                  <div className={styles.culture_item_txt}>
                    <p className={styles.culture_tit}>{title}</p>
                    {earlyCheck ? <p className={styles.culture_date}>{formatDate(item.saleStartDate)} ~ {formatDate(item.saleEndDate)}</p> : <p className={styles.culture_date}>{convertDateFormat(item.startDate, null)} ~ {convertDateFormat(item.endDate, null)}</p>}
                    <p className={styles.early_end}></p>
                    <p className={styles.culture_price}>
                      { earlyCheck ? <span className={styles.sale_rate}>{discountRate}%</span> : null} {price}원
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