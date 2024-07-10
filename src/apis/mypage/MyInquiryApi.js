import axios from "axios";

export default function MyInquiryApi({setIsLoading, setMyInquiryList, user}) {
    
    async function fetchMyInquiryList() {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/mypage/myinquiry/${user.userCode}`);
            console.log('나의 문의 정보 :', response.data)
            setMyInquiryList(response.data);
            // console.log('나의 문의 정보 전송', myComments);

        } catch (error) {
            // console.log('나의 문의 조회 실패:' , error);
        } finally {
            setIsLoading(false);

        }
    }
    fetchMyInquiryList();
}
