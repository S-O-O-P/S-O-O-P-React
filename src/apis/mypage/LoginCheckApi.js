import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function LoginCheckApi( {setCheckLoginUser, storedToken}) {

    async function fetchLoginCheck() {
        
        try {
            const response = await axios.get('http://localhost:8081/mypage/logincheck');
            console.log('리프레쉬 받아오기: ', response.data);

            const storedAccessToken = storedToken.token;
            console.log('디코딩전 액세스 토큰: ', storedAccessToken);

            const decodedAccessToken = jwtDecode(storedAccessToken);
            console.log('디코딩된 액세스 토큰: ', decodedAccessToken);

            const user = response.data.find(user => {
                const signupPlatform = user.signupPlatform;
                return decodedAccessToken.signupPlatform === signupPlatform;
            });

            if (user) {
                console.log('유저 코드: ', user.userCode);
                console.log("유저?:", user);
                setCheckLoginUser(user);
                console.log('유저코드 전송 성공');
            } else {
                console.log('일치하는 유저를 찾을 수 없습니다.');
            }

        } catch (error) {
            console.log('리프레시 API 호출 실패', error);
        }
    }
    fetchLoginCheck();
}