import axios from "axios";

export default function FinishedHoneyPotApi({setIsLoading, setFinishedHoneyPotList, setParticiMember, user}) {
    
    async function fetchFinishedHoneyPotList() {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8081/mypage/finished');
            console.log('진행완료 된 허니팟 정보 :', response.data)
            
            // 허니팟 코드를 기준으로 그룹화
            const groupedHoneyPots = response.data.reduce((acc, pot) => {
                if (!acc[pot.honeypotCode]) {
                    acc[pot.honeypotCode] = {...pot, members: []};
                }
                if (pot.memberNickname && !acc[pot.honeypotCode].members.some(m => m.nickname === pot.memberNickname)) {
                    acc[pot.honeypotCode].members.push({
                        userCode: pot.memberCode,
                        nickname: pot.memberNickname,
                        profilePic: pot.memberProfilePic
                    });
                }
                return acc;
            }, {});

            const finishedHoneyPots = Object.values(groupedHoneyPots).filter(pot => 
                pot.hostCode == user.userCode || pot.members.some(m => m.userCode == user.userCode)
            );

            setFinishedHoneyPotList(finishedHoneyPots);

            // 참가자 정보 처리
            const participants = finishedHoneyPots.map(pot => ({
                honeypotCode: pot.honeypotCode,
                participants: [{
                    userCode: pot.hostCode,
                    nickname: pot.hostNickname,
                    profilePic: pot.hostProfilePic
                }, ...pot.members]
            }));

            setParticiMember(participants);
        } catch (error) {
            console.log('진행완료 된 허니팟 조회 실패:' , error);
        } finally {
            setIsLoading(false);
        }
    }
    fetchFinishedHoneyPotList();
}