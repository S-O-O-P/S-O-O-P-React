import axios from "axios";

export default async function UserInterestApi({setUserInterest}, userCode) {
  try {
    // 로그인한 회원의 관심사 조회
    const response = await axios.get(`http://localhost:8081/main/interest/${userCode}`);
    console.log('API Response from userInterestApi in Main.js:', response.data); // 디버깅을 위한 로그
    console.log("userInterestApiList", response.data.interestList);

    const changeInteredCodeToString = response.data.interestList.map(item => {
      switch (item.interestCode) {
        case 1:
          item.interestCode = "팝업";
          break;
        case 2:
          item.interestCode = "공연";
          break;
        case 3:
          item.interestCode = "축제";
          break;
        case 4:
          item.interestCode = "전시회";
          break;
        case 5:
          item.interestCode = "뮤지컬";
          break;
        default:
          break;
      }

      return {
        interestCode: item.interestCode
      };
    });

    console.log("changeInteredCodeToString : ", changeInteredCodeToString);
    setUserInterest(changeInteredCodeToString || []); // 회원 관심사 정보가 null일 경우 빈 배열로 설정
  } catch (error) {
    console.error('ERROR OCCURS!', error);
  }
}