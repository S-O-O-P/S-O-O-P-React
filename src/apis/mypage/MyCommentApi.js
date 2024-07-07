import axios from "axios";

export default function MyCommentApi({setIsLoading, setMyCommentList, user}) {
    
    async function fetchMyCommentList() {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/mypage/mycomment');
            // console.log('내가 쓴 댓글 정보 :', response.data)
            const myComments = response.data.filter(data => data.userCode == user.userCode);
            setMyCommentList(myComments);
            // console.log('내가 쓴 댓글 정보 전송', myComments);

        } catch (error) {
            // console.log('내가 쓴 댓글 조회 실패:' , error);
        } finally {
            setIsLoading(false);

        }
    }
    fetchMyCommentList();
}
