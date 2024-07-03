import axios from "axios";

export default function HoneypotApi( {setComments}, detailHoneypot ) {
    
    const fetchComments = async () => {
        try {
            console.log("detailHoneypot in api :",detailHoneypot);
            const response = await axios.get(`http://localhost:8081/honeypot/comment`);
            console.log("리스펀스?", response)
            const fetchedComments = response.data.results.comments.filter(
                comment => comment.honeypotCode === detailHoneypot.honeypotCode
            );
            console.log('받아오는 데이터 : ', fetchedComments);
            console.log('이미지 : ', fetchedComments[0].writerInfo.profilePic)
            setComments(fetchedComments);
            
            
        } catch (error) {
            console.error('댓글 조회 실패:', error);
        }
    };

    fetchComments(); // detailHoneypot.honeypotCode가 변경될 때마다 댓글을 다시 불러옴
}