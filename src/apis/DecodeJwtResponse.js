import {jwtDecode} from 'jwt-decode';
import { useEffect, useState, useCallback } from 'react';

export default function useDecodeJwtResponse() {
  const [decodedToken, setDecodedToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const refreshAccessToken = useCallback(async () => {
    if (!decodedToken || !decodedToken.userCode) {
      console.error('No decoded token or userCode found');
      console.log('Decoded Token:', decodedToken);
      return;
    }

    try {
      console.log('Attempting to refresh access token with userCode:', decodedToken.userCode);
      const response = await fetch('http://localhost:8081/reissue', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userCode: decodedToken.userCode })
      });

      if (response.ok) {
        const token = getCookie('access');
        if (token) {
          const decoded = jwtDecode(token);
          console.log('New access token received and decoded:', decoded);
          setDecodedToken(decoded);
          setAccessToken(token);
          scheduleTokenRefresh(decoded.exp - Date.now() / 1000);
        } else {
          console.error('Failed to get new access token from cookie');
        }
      } else {
        console.error('Failed to refresh access token');
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  }, [decodedToken]);

  const scheduleTokenRefresh = (expiresIn) => {
    const refreshTime = (expiresIn - 30) * 1000;
    console.log('Scheduling token refresh in milliseconds:', refreshTime);
    setTimeout(refreshAccessToken, refreshTime);
  };

  useEffect(() => {
    const token = getCookie('access');
    console.log('Access Token from Cookie:', token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded Token:', decoded);
        setDecodedToken(decoded);
        setAccessToken(token);

        const currentTime = Date.now() / 1000;
        const timeLeft = decoded.exp - currentTime;

        if (decoded.userCode) {
          console.log('Scheduling token refresh for decoded token:', decoded);
          scheduleTokenRefresh(timeLeft);
        } else {
          console.error('No userCode found in decoded token');
        }
      } catch (error) {
        console.error('Failed to decode JWT', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Decoded Token Effect:', decodedToken);
    if (decodedToken) {
      const currentTime = Date.now() / 1000;
      const timeLeft = decodedToken.exp - currentTime;
      if (timeLeft > 0) {
        scheduleTokenRefresh(timeLeft);
      }
    }
  }, [decodedToken, scheduleTokenRefresh]);

  return { decodedToken, accessToken };
}
