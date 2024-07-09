import axios from "axios";

export default function ParticipatingHoneypotApi({setIsLoading, setParticipatingHoneypotList, user}) {
    
    async function fetchParticipatingHoneypotList() {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/mypage/participated');
            // console.log('참여중인 허니팟 정보 :', response.data)
            const myHoneypots = response.data.filter(data => data.userCode === user && data.closureStatus !== '진행완료' && data.decisionStatus === '승인');
            setParticipatingHoneypotList(myHoneypots);
            // console.log('참여중인 허니팟 전송완료');

        } catch (error) {
            // console.log('참여중인 허니팟 조회 실패:' , error);
        } finally {
            setIsLoading(false);

        }
    }
    fetchParticipatingHoneypotList();
}
