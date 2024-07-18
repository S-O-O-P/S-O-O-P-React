import axios from "axios";

export default function UserProflieApi({setIsLoading, setLoggedInUser, setProfileImage, user}) {
    
    async function fetchLoggedInUser() {
        
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/mypage/${user.userCode}`);
            // console.log('로그인한 유저 정보 :', response.data)
            setLoggedInUser(response.data);
            setProfileImage(response.data.profilePic);
            

        } catch (error) {
            // console.log('로그인한 유저 정보 조회 실패:' , error);
        } finally {
            setIsLoading(false);

        }
    }
    fetchLoggedInUser();
}
