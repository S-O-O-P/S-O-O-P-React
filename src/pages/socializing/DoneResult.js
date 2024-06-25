import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './DoneResult.css'

function DoneResult() {

    const location = useLocation()
    const { action } = location.state

    const images = require.context('../../../public/images/socializing',false, /\.(png|jpe?g|svg)$/);
    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
    }

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'instant' 
        });
    }

    useEffect(
        ()=>{
            console.log(action);
        },[]
    )

    const navigate = useNavigate();

    const gohomeHandler = () => {
        navigate('/');
    }

    const gotoHandler = () => {
        navigate('/cultureinfo');
    }

    return(
        <>
            <div className="result-body">
                <div className="result-box">
                    <div></div>
                    <div>
                        <h2>{action}되었습니다</h2>
                    </div>
                    <div>
                        <p>공연/전시 정보를 둘러보며</p>
                        <p>친구들을 기다려볼까요?</p>
                    </div>
                    <div>
                        <div onClick={gohomeHandler}>아니오</div>
                        <div onClick={gotoHandler}>바로가기</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoneResult