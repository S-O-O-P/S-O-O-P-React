// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import ExpiredToken from '../apis/ExpiredToken';
// import useDecodeJwtResponse from '../apis/DecodeJwtResponse';

// const PrivateRoute = ({ element: Component }) => {
//   ExpiredToken();

//   const { decodedToken, accessToken } = useDecodeJwtResponse();
//   const now = new Date().getTime() / 1000; // 현재 시간을 초 단위로 가져옴

//   return accessToken && decodedToken && now < decodedToken.exp ? (
//     <Component />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;
