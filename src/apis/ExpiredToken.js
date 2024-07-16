import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // 중괄호 추가

const ExpiredToken = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getCookies = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const refreshAccessToken = async () => {
        try {
            console.log('액세스 토큰 갱신 요청 중...');
            const response = await axios.post('http://localhost:8081/reissue', {}, {
                withCredentials: true // 쿠키를 포함하여 요청
            });

            const accessToken = response.headers.authorization.split(' ')[1];
            document.cookie = `access=${accessToken}; Max-Age=600; Path=/; SameSite=None; Secure`;
            console.log('액세스 토큰 갱신 성공', { accessToken });
            return accessToken;
        } catch (error) {
            console.error('액세스 토큰 갱신 실패', error);
            document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            if (location.pathname !== '/main' && location.pathname !== '/login') {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        const checkTokenExpiration = async () => {
            const accessToken = getCookies('access');
            if (accessToken) {
                try {
                    const tokenPayload = jwtDecode(accessToken);  // jwt-decode 사용
                    const expiresAt = tokenPayload.exp * 1000;
                    const now = new Date().getTime();
                    console.log('토큰 만료 여부 확인 중...', { now, expiresAt });
                    
                    if (now >= expiresAt) {
                        console.log('액세스 토큰이 만료되었습니다. 갱신을 시도 중...');
                        const newAccessToken = await refreshAccessToken();
                        if (newAccessToken) {
                            console.log('토큰 갱신 완료, 계속 진행 중...');
                        }
                    } else {
                        console.log('액세스 토큰이 아직 유효합니다.');
                    }
                } catch (error) {
                    console.error('토큰 디코딩 중 오류 발생:', error);
                    // 토큰이 유효하지 않은 경우 처리
                    document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    if (!['/main', '/login', '/help', '/faq', '/honeypot', '/aboutus', '/privacy', '/terms'].includes(location.pathname) && 
                        !location.pathname.startsWith('/notice') &&
                        !location.pathname.startsWith('/cultureinfo')) {
                        navigate('/login');
                    }
                }
            } else {
                console.log('저장된 액세스 토큰이 없습니다.');
                if (!['/main', '/login', '/help', '/faq', '/honeypot', '/aboutus', '/privacy', '/terms'].includes(location.pathname) && 
                    !location.pathname.startsWith('/notice') &&
                    !location.pathname.startsWith('/cultureinfo')) {
                    navigate('/login');
                }
            }
        };

        checkTokenExpiration();
    }, [navigate, location]);

    return null;
};

export default ExpiredToken;