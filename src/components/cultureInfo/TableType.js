import { Link, useNavigate } from 'react-router-dom';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';
import LoadingSpinner from '../commons/Loading';

export default function TableType({cultureList, detailDataList, earlyCheck}){
  // 데이터가 로딩 중일 때 처리
  const navigate = useNavigate();
  const today = new Date();
  if (!cultureList || !detailDataList) {
    return <LoadingSpinner />;
  }

  return(
      <>
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

            const title = earlyCheck ? item?.ebTitle.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'") :  item?.title.replaceAll('&lt;',`<`).replaceAll('&gt;',`>`).replaceAll("&#39;","'"); // 제목  

            //item.realmName
            const category = (realName) => {
              switch(realName){
                case("미술" || "전시") : return "전시회"; break;
                case("음악" || "공연") : return "공연"; break;
                case("연극") : return "공연"; break;
                case("기타" || "뮤지컬") : return "뮤지컬"; break;
                case("국악") : return "공연"; break;
                case("팝업") : return "팝업"; break;
                default : return "행사/축제"; break;
              }
            }

            // 카테고리 string으로 변환
            const categoryString = (category) => {
              let categoryString = "";
              switch(category){
                case(1) : categoryString = "팝업"; break;
                case(2) : categoryString = "공연"; break;
                case(3) : categoryString = "행사/축제"; break;
                case(4) : categoryString = "전시회"; break;
                case(5) : categoryString = "뮤지컬"; break;
              }
              return categoryString;
            }

            // 얼리버드 공연/전시 가격 1000단위 ,
            const convertPriceFormat = (dPrice) => {
              if (!dPrice && dPrice !== 0) { // dPrice가 유효하지 않은 경우를 처리
                return "가격 정보 업데이트중"; // 기본 값 반환
              }
              const endPrice = (dPrice?.toString()).slice(-3);
              const startPrice = (dPrice?.toString()).slice(0, -3);
              return startPrice+','+endPrice;
            }

            // seq에 해당하는 detailData 가져오기
            const detailData = detailDataList[item.seq];
            // console.log("Detail data for seq ", item.seq, ": ", detailData);

            // detailData가 존재하고 price 속성이 있을 때 가격 표시
            const price = earlyCheck || item?.regularPrice ? convertPriceFormat(item?.discountPrice || item?.price) : detailData && detailData.price ? detailData.price : "가격 정보 없음";
            
            return(            
                <tr onClick={() => navigate(
                  earlyCheck ? `/cultureinfo/detail/${item?.earlyBirdCode}` : `/cultureinfo/detail/${item?.seq}`,{ state: { earlyCheck: earlyCheck || item?.regularPrice ? true : false }})} key={index}>
                  <td>{earlyCheck ? categoryString(item?.interestCode) : category(item?.realmName)}</td>
                  <td>{title}</td>
                  <td>{price}{earlyCheck || item?.regularPrice ? `원` : null}</td>
                  <td>{earlyCheck || item?.regularPrice ? <p className={styles.culture_date}>{formatDate(item?.saleStartDate || item?.startDate)} ~ {formatDate(item?.saleEndDate || item?.endDate)}</p> : <p className={styles.culture_date}>{convertDateFormat(item?.startDate)} ~ {convertDateFormat(item?.endDate)}</p>}</td>
                </tr>
              
            );          
          }) : <LoadingSpinner/>}
          </tbody>
        </table>
      </>
  );
}