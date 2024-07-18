import axios from "axios";

export default function HoneypotDetailApi({ allCultureList, setDetailHoneypot, setFilteredCultureList, honeypotCode, user , setIsLoading}) {

  async function fetchHoneypotDetail() {
    
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:8081/honeypot/detail/${honeypotCode}`);
      // console.log('로그인한 유저(디테일페이지): ', user);
      // console.log('호출한 리스펀스 데이타', response.data);
      
      // seqNo 값과 일치하는 데이터만 필터링
      const seqNoFromResponse = response.data.results.honeypot.seqNo;
      const filteredList = allCultureList.filter(item => item.seq === seqNoFromResponse.toString()); // 7.10일 변경데이터는 .toString()삭제
      // console.log('filteredCultureList:', filteredList);
      setDetailHoneypot(response.data.results.honeypot); // DB 정보 담기
      setFilteredCultureList(filteredList);
      // console.log('담긴 결과 : ',response.data.results.honeypot)
    } catch (error) {
      console.error('디테일페이지 호출 실패 :', error);
    } finally {
        setIsLoading(false);
    }
  }

    fetchHoneypotDetail();

}