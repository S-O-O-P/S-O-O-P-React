import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function useDecodeJwtResponse() {
  const [decodedToken, setDecodedToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    console.log('쿠키' , document.cookie);

    const token = getCookie('access');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        setAccessToken(token);
      } catch (error) {
        console.error('Failed to decode JWT', error);
      }
    } 
  }, []);

  return {decodedToken,accessToken};
}
