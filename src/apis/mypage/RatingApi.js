import axios from "axios";

export default function RatingApi({setIsLoading, setRatingCategory}) {
    
    async function fetchRatingList() {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/mypage/rating');
            console.log('유저평가 항목 :', response.data)
            setRatingCategory(response.data);

        } catch (error) {
            // console.log('유저평가항목 조회 실패:' , error);
        } finally {
            setIsLoading(false);

        }
    }
    fetchRatingList();
}
