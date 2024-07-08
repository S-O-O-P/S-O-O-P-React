import axios from "axios";

export default function MyRatingApi({setIsLoading, setMyRating, user}) {
    
    async function myRating() {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/mypage/rating/${user.userCode}`);
            console.log('로그인유저 평점 정보 (원본):', response.data);
            
            // content를 배열로 처리하여 하나로 묶기
            const processedData = processRatingData(response.data);
            console.log('처리된 평점 정보:', processedData);
            
            setMyRating(processedData);

        } catch (error) {
            console.error('평점 정보 조회 실패:', error);
        } finally {
            setIsLoading(false);
        }
    }

    function processRatingData(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return null;
        }

        // 첫 번째 항목을 기본 객체로 사용
        const result = { ...data[0] };
        
        // content를 배열로 초기화
        result.contents = data.map(item => ({
            content: item.content,
            rateeNickname: item.rateeNickname,
            ratingName: item.ratingName,
            score: item.score
        }));
        
        // 기존의 content, rateeNickname, ratingName, score 속성 제거
        delete result.content;
        delete result.rateeNickname;
        delete result.ratingName;
        delete result.score;

        return result;
    }

    myRating();
}