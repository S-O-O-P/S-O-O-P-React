import axios from "axios";

export default function EarlyBirdInfoApi({setEarlyBirdInfo} = null, apiName, earlyCode = null, ){

  // 얼리버드 공연/전시 정보 모두 호출
  const selectAllEarlyBirdInfo = () => {
    // axios.get('http://localhost:8080/cultureinfo/early')
    axios.get('/local-api/early')
      .then(response => {
        console.log('API Response All:', response.data); // 디버깅을 위한 로그
        setEarlyBirdInfo(response.data.earlyBirdList || []); // EarlyBirdInfo가 null일 경우 빈 배열로 설정
        // setFilteredRows(response.data.earlyBirdList || []);
        console.log('Fetched Events All:', response.data.earlyBirdList); // Log the fetched data
      })
      .catch(error => console.error('ERROR OCCURS!', error));
  } 

  // 얼리버드 공연/전시 상세 정보 호출
  const selectDetailEarlyBirdInfo = (earlyCode) => {
    axios.get('/local-api/early/'+earlyCode)
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