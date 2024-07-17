import axios from "axios";

export default function EarlyBirdInfoApi({setEarlyBirdInfo} = null, apiName, earlyCode = null, ){

  const today = new Date();
  // 얼리버드 공연/전시 정보 모두 호출
  const selectAllEarlyBirdInfo = () => {
    axios.get('http://localhost:8081/cultureinfo/early')
      .then(response => {
        console.log('API Response All:', response.data); // 디버깅을 위한 로그
        const filteredValidList = response.data.earlyBirdList.filter(item => {
          return new Date(item.saleEndDate) > today;
        });
        filteredValidList.sort((a, b) => {
          return new Date(a.saleEndDate) - new Date(b.saleEndDate);
        });
        console.log("filteredValidList",filteredValidList);
        setEarlyBirdInfo(response.data.earlyBirdList || []); // EarlyBirdInfo가 null일 경우 빈 배열로 설정
        console.log('Fetched Events All:', response.data.earlyBirdList); // Log the fetched data
      })
      .catch(error => console.error('ERROR OCCURS!', error));
  } 

  // 얼리버드 공연/전시 상세 정보 호출
  const selectDetailEarlyBirdInfo = (earlyCode) => {
    axios.get('http://localhost:8081/cultureinfo/early/'+earlyCode)
      .then(response => {
        console.log('API Response detail:', response.data); // 디버깅을 위한 로그
        setEarlyBirdInfo(response.data.foundEarlyInfo || {}); // EarlyBirdInfo가 null일 경우 빈 객체로 설정        
        console.log('Fetched Event for detail:', response.data.foundEarlyInfo.ebTitle); // Log the fetched data
      })
      .catch(error => console.error('ERROR OCCURS! detail', error));
  }

  switch(apiName){
    case("all") : selectAllEarlyBirdInfo(); break; 
    case("detail") : selectDetailEarlyBirdInfo(earlyCode); break;
  }
}