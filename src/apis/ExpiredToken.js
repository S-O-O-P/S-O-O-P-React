import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpiredToken = () => {
    const navigate = useNavigate();

    const refreshAccessToken = async () => {
        try {
            console.log('액세스 토큰 갱신 요청 중...');
            const response = await axios.post('http://localhost:8081/reissue', {}, {
                withCredentials: true // 쿠키를 포함하여 요청
            });

            const accessToken = response.headers.authorization.split(' ')[1];
            const expiresAt = new Date().getTime() + (10 * 60 * 1000); // 10분 후 만료
            localStorage.setItem('accessToken', JSON.stringify({ token: accessToken, expiresAt }));
            console.log('액세스 토큰 갱신 성공', { accessToken, expiresAt });
            return accessToken;
        } catch (error) {
            console.error('액세스 토큰 갱신 실패', error);
            localStorage.removeItem('accessToken');
            document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate('/login');
        }
    };

    useEffect(() => {
        const checkTokenExpiration = async () => {
            const storedToken = JSON.parse(localStorage.getItem('accessToken'));
            if (storedToken) {
                const now = new Date().getTime();
                console.log('토큰 만료 여부 확인 중...', { now, expiresAt: storedToken.expiresAt });
                if (now >= storedToken.expiresAt) {
                    console.log('액세스 토큰이 만료되었습니다. 갱신을 시도 중...');
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        console.log('토큰 갱신 완료, 계속 진행 중...');
                    }
                } else {
                    console.log('액세스 토큰이 아직 유효합니다.');
                }
            } else {
                console.log('저장된 액세스 토큰이 없습니다.');
            }
        };

        checkTokenExpiration();
    }, [navigate]);

    return null;
};

export default ExpiredToken;
