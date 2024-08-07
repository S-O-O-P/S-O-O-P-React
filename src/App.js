import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUp';
import MyPage from './pages/mypage/MyPage';
import Cs from './pages/serviceCenter/Cs';
import Faq from './pages/serviceCenter/Faq';
import Notice from './pages/serviceCenter/Notice';
import Inquiry from './pages/serviceCenter/Inquiry';
import Main from './pages/main/Main';
import CultureInfo from './pages/cultureInfo/CultureInfo';
import CompletedPage from './pages/login/CompletedPage';
import NoticeDetailPage from './pages/serviceCenter/NoticeDetail';
import CultureDetail from './pages/cultureInfo/CultureDetail';
import HoneypotPage from './pages/honeypot/HoneypotPage';
import CultureApi from './apis/CultureApi';
import { useEffect, useState } from 'react';
import LoadingSpinner from './components/commons/Loading';
import CultureDetailApi from './apis/CultureDetailApi';
// import PrivateRoute from './components/PrivateRoute';
// import PublicRoute from './components/PublicRoute';
import ExpiredToken from './apis/ExpiredToken';
import RegistHoneypotPage from './pages/honeypot/RegistHoneypotPage';
import HoneypotDetailPage from './pages/honeypot/HoneypotDetailPage';
import ModifyHoneypotPage from './pages/honeypot/ModifyHoneypotPage';
import useDecodeJwtResponse from './apis/DecodeJwtResponse';
// import LoginCheckApi from './apis/mypage/LoginCheckApi';
import ErrorBoundaryWithNavigate from './components/admin/ErrorBoundary';
import Error404 from './pages/Error/Error404';
import Error500 from './pages/Error/Error500';
import Error400 from './pages/Error/Error400';
import Error403 from './pages/Error/Error403';
import AboutUs from './pages/common/AboutUs';
import Privacy from './pages/common/Privacy';
import Terms from './pages/common/Terms';


export default function App() {
  // Api 호출시 상태 저장을 위한 설정
  const [data, setData] = useState(null); // 공공데이터 기간별 조회 목록
  const [seqList, setSeqList] = useState([]); // 상세 조회를 위한 공공데이터 seq 데이터 리스트 저장
  const [detailDataList, setDetailDataList] = useState({}); // seq 데이터 리스트에 따른 공공 데이터 상세 정보 key:value로 저장

  useEffect(() => {
    CultureApi({ setData }); // App.js의 setData함수를 객체 형태로 CultureApi 컴포넌트에 props로 전달
  }, []);

  useEffect(() => {
    console.log(data); // 데이터가 변경될 때마다 로그를 출력
    if (data?.perforList) {
      // console.log("data length : " + data.perforList.length);
      const newSeqList = data.perforList.map(perfor => perfor.seq); // seq 데이터 리스트 생성
      setSeqList(newSeqList); // seq 데이터 리스트 설정
    }
  }, [data]);

  useEffect(() => {
    // seqList가 변경될 때마다 CultureDetailApi 호출
    seqList.forEach(seq => {
      CultureDetailApi({
        setDetailData: detailData => {
          setDetailDataList(prev => ({ ...prev, [seq]: detailData }));
        }
      }, seq);
    });
  }, [seqList]);

  // PublicRoute  = access 토큰이 있는 상태로 접근 불가 (예를 들면 로그인 페이지, 회원가입 페이지 등등)
  // PrivateRoute = access 토큰이 없는 경우 접근 불가 (예를 들면 회원가입 페이지, 마이페이지, 1:1 문의 등등)
  // 아무것도 없으면 회원, 비회원 구분 없이 접속 가능.

  // 임시 로그인정보 대체(김만호 테스트용)

  // const storedToken = JSON.parse(localStorage.getItem('accessToken'));
  // const [checkLoginUser, setCheckLoginUser] = useState([]);
  // useEffect(() => {
  //   LoginCheckApi( {setCheckLoginUser, accessToken})
  // },[])



  // const lastCheck = checkLoginUser.filter(data => data.refresh === storedToken.token);
  // console.log("라스트체크:" ,lastCheck);

  // const users = [
  //   { userCode: 8, nickname: '전소민', profilePic: 'https://i.ibb.co/1Z2Zbvs/image.jpg', aboutMe: '안녕하세요. 전소민입니다.', },
  //   { userCode: 9, nickname: '이병건',  profilePic: 'https://i.ibb.co/BqqgBBp/image.jpg', aboutMe: '안녕하세요. 이병건입니다.', },
  //   { userCode: 10, nickname: '양세찬', profilePic: 'https://i.ibb.co/Yk4jBmw/image.jpg', aboutMe: '안녕하세요. 양세찬입니다.', },
  //   { userCode: 11, nickname: '코하루', profilePic: 'https://i.ibb.co/Np2j4f4/image.png', aboutMe: '안녕하세요. 코하루입니다.', },
  //   { userCode: 6, nickname: '너굴맨', profilePic: 'https://i.pinimg.com/474x/96/55/ce/9655ce874bf5e3bf92778830a864eb35.jpg', aboutMe: '안녕하세요. 너굴맨입니다.', }
  // ];
  const [loggedInUser, setLoggedInUser] = useState(null);

  // useEffect(() => {
  //   if (checkLoginUser && checkLoginUser.userCode) {
      
  //     setLoggedInUser(checkLoginUser);
  //   } else {
      
  //     setLoggedInUser(null);
  //   }
  // }, [checkLoginUser]);

  const { decodedToken, accessToken } = useDecodeJwtResponse();

  useEffect(() => {
    if (decodedToken) {
      setLoggedInUser(decodedToken);
    }
  }, [decodedToken]);

  // console.log("앱JS 유저", loggedInUser);

  return (
    <>
      <GlobalStyles />
      <Router>
        <ExpiredToken />
        <ErrorBoundaryWithNavigate>
        <Routes>

            <Route path="error/404" element={<Error404 />} />
            <Route path="error/500" element={<Error500 />} />
            <Route path="error/400" element={<Error400 />} />
            <Route path="error/403" element={<Error403 />} />
            <Route path="*" element={<Error404 />} />
          <Route element={<Layout user={loggedInUser} />}> {/* 레이아웃 오픈 */}
            <Route path='/main' element={data ? <Main cultureList={JSON.stringify(data)} user={loggedInUser}/> : <LoadingSpinner />} /> {/* 메인 */}
            <Route index element={data ? <Main cultureList={JSON.stringify(data)} user={loggedInUser}/> : <LoadingSpinner />} /> {/* 메인 */}
            <Route path='/login' element={ <LoginPage />}/> {/* 로그인 */}
            <Route path='/signup' element={<SignUpPage user={loggedInUser}/>} /> {/* 추가 정보 입력 */}
            <Route path="/cultureinfo" element={data ? <CultureInfo cultureList={JSON.stringify(data)} detailDataList={detailDataList}/> : <LoadingSpinner />}/> {/* 전시/공연 정보 */}
            <Route path="/cultureinfo/:seq" element={<CultureDetail detailDataList={detailDataList}/>}/> {/* 전시/공연 상세페이지*/}
            <Route path='/completed' element={<CompletedPage user={loggedInUser}/>} /> {/* 회원 가입 완료 */}
            <Route path='/honeypot' element={<HoneypotPage user={loggedInUser}/>}/> {/* 허니팟 페이지 */}
            <Route path='/beehive' element={data ? <RegistHoneypotPage user={loggedInUser} cultureList={JSON.stringify(data)}/> : <LoadingSpinner />}/> {/* 허니팟 등록 페이지 */}
            <Route path='/honeypot/:honeypotCode' element={data ? <HoneypotDetailPage user={loggedInUser} cultureList={JSON.stringify(data)}/> : <LoadingSpinner />}/> {/* 허니팟 상세 페이지 */}
            <Route path='/honeyqot/:honeypotCode' element={data ? <ModifyHoneypotPage user={loggedInUser} cultureList={JSON.stringify(data)}/> : <LoadingSpinner />}/> {/* 허니팟 수정 페이지 */}
            <Route path='/mypage' element={<MyPage user={loggedInUser}/>}/> {/* 마이 페이지 */}
            <Route path='/help' element={<Cs />} /> {/* 고객 센터 */}
            <Route path='/faq' element={<Faq />} /> {/* 자주 찾는 질문 */}
            <Route path='/notice' element={<Notice />} /> {/* 공지사항 */}
            <Route path='/inquiry' element={<Inquiry user={loggedInUser}/>} /> {/* 1:1문의 */}
            <Route path='/notice/:code' element={<NoticeDetailPage />} /> {/* 공지사항 상세페이지 */}
            <Route path='/aboutus' element={<AboutUs />} /> {/* About Us */}
            <Route path='/privacy' element={<Privacy />} /> {/* 개인정보처리방침 */}
            <Route path='/terms' element={<Terms />} /> {/* 이용약관 */}
          </Route> {/* 레이아웃 클로즈 */}
        </Routes>
        </ErrorBoundaryWithNavigate>
      </Router>
    </>
  );
}
