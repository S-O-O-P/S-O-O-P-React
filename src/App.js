import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUp';
import Cs from './pages/serviceCenter/Cs';
import Faq from './pages/serviceCenter/Faq';
import Notice from './pages/serviceCenter/Notice';
import Inquiry from './pages/serviceCenter/Inquiry';

export default function App() {

    return (

        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path='/help' element={<Cs />} />
                        <Route path='/faq' element={<Faq />} />
                        <Route path='/notice' element={<Notice />} />
                        <Route path='/inquiry' element={<Inquiry />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    );
}