import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUp';
import Main from './pages/main/samaple';
import HoneyLayout from './layouts/HoneyLayout';
import Today from './pages/socializing/Today';
import Genre from './pages/socializing/Genre';
import Date from './pages/socializing/Date';
import CultureInfo from './pages/cultureInfo/CultureInfo';
import CompletedPage from './pages/login/CompletedPage'



export default function App() {

    return (

    <>      
    <GlobalStyles/>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
               <Route path='/main' element={<Main/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/signup' element={<SignUpPage/>}/>
              <Route path="/cultureinfo" element={<CultureInfo/>}/> {/* 전시/공연 정보 */}
              <Route path='/completed' element={<CompletedPage/>}/>
              <Route path='/honey' element={<HoneyLayout/>}>
                <Route index element={<Today/>}/>
                <Route path='genre' element={<Genre/>}/>
                <Route path='date' element={<Date/>}/>
               </Route>
            </Route>                
          </Routes>
      </BrowserRouter>

    </>    
    );
}