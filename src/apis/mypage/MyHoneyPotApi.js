import axios from "axios";

export default function MyHoneyPotApi({setIsLoading, setMyHoneypotList, user}) {
    
    async function fetchMyHoneypotList() {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/mypage/myhoneypots');
            // console.log('내가만든 허니팟 정보 :', response.data)
            const myHoneypots = response.data.filter(data => data.hostCode === user.userCode && data.closureStatus !== '진행완료' && data.honeypotCode !== 0);
            setMyHoneypotList(myHoneypots);
            // console.log('내가만든 허니팟 정보 전송');

        } catch (error) {
            // console.log('내가만든 허니팟 조회 실패:' , error);
        } finally {
            setIsLoading(false);

        }
    }
    fetchMyHoneypotList();
}
