import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUp';
import MyPage from './pages/mypage/MyPage';


export default function App() {

    return (

    <>      
    <GlobalStyles/>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/mypage' element={<MyPage/>}/>
            </Route>                
        </Routes>
    </BrowserRouter>

    </>    
    );
}