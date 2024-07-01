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
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import ExpiredToken from './apis/ExpiredToken';
import RegistHoneypotPage from './pages/honeypot/RegistHoneypotPage';



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
      console.log("data length : " + data.perforList.length);
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
  return (
    <>
      <GlobalStyles />
      <Router>
        <ExpiredToken />
        <Routes>
          <Route element={<Layout />}> {/* 레이아웃 오픈 */}
            <Route path='/main' element={data ? <Main cultureList={JSON.stringify(data)}/> : <LoadingSpinner />}/> {/* 메인 */}
            <Route index element={data ? <Main cultureList={JSON.stringify(data)}/> : <LoadingSpinner />}/> {/* 메인 */}
            <Route path='/login' element={<PublicRoute restricted={false} element={LoginPage} />} /> {/* 로그인 */}
            <Route path='/signup' element={<PrivateRoute element={SignUpPage} />} /> {/* 추가 정보 입력 */}
            <Route path="/cultureinfo" element={data ? <CultureInfo cultureList={JSON.stringify(data)} detailDataList={detailDataList}/> : <LoadingSpinner />}/> {/* 전시/공연 정보 */}
            <Route path="/cultureinfo/detail/:seq" element={<CultureDetail detailDataList={detailDataList}/>}/> {/* 전시/공연 상세페이지*/}
            <Route path='/completed' element={<PrivateRoute element={CompletedPage}/>} /> {/* 회원 가입 완료 */}
            <Route path='/honeypot' element={<HoneypotPage/>}/> {/* 허니팟 페이지 */}
            <Route path='/honeypot/regist' element={data ? <RegistHoneypotPage cultureList={JSON.stringify(data)}/> : <div>Loading...</div>}/> {/* 허니팟 등록 페이지 */}
            <Route path='/mypage' element={<PrivateRoute element={MyPage} />} /> {/* 마이 페이지 */}
            <Route path='/help' element={<Cs />} /> {/* 고객 센터 */}
            <Route path='/faq' element={<Faq />} /> {/* 자주 찾는 질문 */}
            <Route path='/notice' element={<Notice />} /> {/* 공지사항 */}
            <Route path='/inquiry' element={<PrivateRoute element={Inquiry}/>} /> {/* 1:1문의 */}
            <Route path='/noticedetail' element={<NoticeDetailPage />} /> {/* 공지사항 상세페이지 */}
          </Route> {/* 레이아웃 클로즈 */}
        </Routes>
      </Router>
    </>
  );
}
