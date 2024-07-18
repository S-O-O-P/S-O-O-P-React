import axios from "axios";

// 댓글 호출 API
export default function CommentApi({setComments}, detailHoneypot) {
    
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/honeypot/comment`);
            const fetchedComments = response.data.results.comments.filter(
                comment => comment.honeypotCode === detailHoneypot.honeypotCode
            );
            setComments(fetchedComments);
            
            
        } catch (error) {
            console.error('댓글 조회 실패:', error);
        }
    };

    fetchComments(); // detailHoneypot.honeypotCode가 변경될 때마다 댓글을 다시 불러옴
}