import { Outlet } from 'react-router-dom';
import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import TopBtn from '../components/commons/TopBtn';
export default function Layout({user}){
    return(
        <>  
            <TopBtn/>
            <Header user={user}/>      
            <Outlet/>
            <Footer/>
        </>
    );
}