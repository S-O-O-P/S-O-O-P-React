import axios from "axios";

export default function HoneypotDetailApi({ allCultureList, setDetailHoneypot, setFilteredCultureList, honeypotCode, user , setIsLoading}) {

  async function fetchHoneypotDetail() {
    
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8081/honeypot/detail/${honeypotCode}`);
      console.log('로그인한 유저(디테일페이지): ', user);
      
      // seqNo 값과 일치하는 데이터만 필터링
      const seqNoFromResponse = response.data.results.honeypot.seqNo;
      const filteredList = allCultureList.filter(item => item.seq === seqNoFromResponse.toString());
      console.log('filteredCultureList:', filteredList);
      setDetailHoneypot(response.data.results.honeypot);
      setFilteredCultureList(filteredList);
      console.log('담긴 결과 : ',response.data.results.honeypot)
    } catch (error) {
      console.error('Error:', error);
    } finally {
        setIsLoading(false);
    }
  }

    fetchHoneypotDetail();

}