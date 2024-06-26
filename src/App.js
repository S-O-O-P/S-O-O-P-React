import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import CompletedPage from './pages/login/CompletedPage'
import NoticeDetailPage from './pages/serviceCenter/NoticeDetail';
import CultureDetail from './pages/cultureInfo/CultureDetail';

export default function App() {

    return (
   <>      
    <GlobalStyles/>
      <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}> {/* 레이아웃 오픈*/}
              <Route path='/main' element={<Main/>}/> {/* 메인 */}
              <Route index element={<Main/>}/> {/* 메인 */}
              <Route path='/login' element={<LoginPage/>}/> {/* 로그인 */}
              <Route path='/signup' element={<SignUpPage/>}/> {/* 추가 정보 입력 */}
              <Route path="/cultureinfo" element={<CultureInfo/>}/> {/* 전시/공연 정보 */}
              <Route path="/cultureinfo/detail" element={<CultureDetail/>}/> {/* 전시/공연 상세페이지*/}
              <Route path='/completed' element={<CompletedPage/>}/> {/* 회원 가입 완료 */}
              <Route path='/mypage' element={<MyPage/>}/> {/* 마이 페이지 */}
              <Route path='/help' element={<Cs />} /> {/* 고객 센터 */}
              <Route path='/faq' element={<Faq />} /> {/* 자주 찾는 질문 */}
              <Route path='/notice' element={<Notice />} /> {/* 공지사항 */}
              <Route path='/inquiry' element={<Inquiry />} /> {/* 1:1문의 */}
              <Route path='/noticedetail' element={<NoticeDetailPage />} /> {/*공지사항 상세페이지*/}
            </Route> 
            {/* 레이아웃 클로즈 */}              
          </Routes>
      </BrowserRouter>
     </>
    );
}