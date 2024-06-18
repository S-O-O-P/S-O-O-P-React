import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import GlobalStyles from './styles/GlobalStyles';


export default function App() {

    return (

    <>      
    <GlobalStyles/>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
            <Route path='/login' element={<Login/>}/>
            </Route>                
        </Routes>
    </BrowserRouter>

    </>    
    );
}