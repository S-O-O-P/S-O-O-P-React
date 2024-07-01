import { Link, useNavigate } from 'react-router-dom';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';
import LoadingSpinner from '../commons/Loading';

export default function TableType({cultureList, detailDataList}){
  // 데이터가 로딩 중일 때 처리
  const navigate = useNavigate();
  const today = new Date();
  if (!cultureList || !cultureList.perforList || !detailDataList) {
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
        {cultureList && cultureList.perforList ? cultureList.perforList.map((item, index) => {
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

            //item.realmName
            const category = (realName) => {
              switch(realName){
                case("미술") : return "전시회"; break;
                case("음악") : return "공연"; break;
                case("연극") : return "공연"; break;
                case("기타") : return "뮤지컬"; break;
                case("국악") : return "공연"; break;
                default : return "행사/축제"; break;
              }
            }

            // seq에 해당하는 detailData 가져오기
            const detailData = detailDataList[item.seq];
            console.log("Detail data for seq ", item.seq, ": ", detailData);

            // detailData가 존재하고 price 속성이 있을 때 가격 표시
            const price = detailData && detailData.price ? detailData.price : "가격 정보 없음";
            
            return(            
                <tr onClick={() => navigate(`/cultureinfo/detail/${item.seq}`)} key={index}>
                  <td>{category(item.realmName)}</td>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>{convertDateFormat(item.startDate, null)} ~ {convertDateFormat(item.endDate, null)}</td>
                </tr>
              
            );          
          }) : <LoadingSpinner/>}
          </tbody>
        </table>
      </>
  );
}
{/* <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>제목</th>
                    <th>가격</th>
                    <th>일정</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={() => navigate("/cultureinfo/detail")}>
                    <td>뮤지컬</td>
                    <td>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)</td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                  <tr onClick={() => navigate("/cultureinfo/detail")}>
                    <td>팝업스토어</td>
                    <td>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)</td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                  <tr onClick={() => navigate("/cultureinfo/detail")}>
                    <td>팝업스토어</td>
                    <td><p>뮤지컬 〈디어 에반 핸슨〉 - 부산 (Dear Evan Hansen)asdfasdfasdfasdfasdfagdfgsdfgsdfgsdfgsdfgsdfgdfgdfgdfgsfggsf</p></td>
                    <td>70,000 ~ 160,000원</td>
                    <td>2024.08.20~2024.08.31</td>
                  </tr>
                </tbody>
              </table> */}