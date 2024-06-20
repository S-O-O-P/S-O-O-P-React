import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUp';
import CultureInfo from './pages/cultureInfo/CultureInfo';
import CompletedPage from './pages/login/CompletedPage'



export default function App() {

    return (

    <>      
    <GlobalStyles/>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<LoginPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/signup' element={<SignUpPage/>}/>
              <Route path="/cultureinfo" element={<CultureInfo/>}/> {/* 전시/공연 정보 */}
              <Route path='/completed' element={<CompletedPage/>}/>
            </Route>                
          </Routes>
      </BrowserRouter>

    </>    
    );
}