import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './HoneyWrite3.css'

function HoneyWrite3() {

    const [message,setMassage] = useState('');

    // 게시물 정보 state
    const [createTitle,setCreateTitle] = useState('');
    const [createContent,setCreateContent] = useState('');

    const [titleStatus,setTitleStatus] = useState(false);
    const [contentStatus,setContentStatus] = useState(false);
    const [showMannerDeniedModal,setShowMannerDeniedModal] = useState(false);
     // 로그인 정보 임시 데이터
     const [loginInfo,setLoginInfo] = useState({
        memberId:33,
        nickname:'test333'
    });

    const location = useLocation();

    // step1 : 도시명, 지역구, 모집인원 / step2: 티켓번호
    const { cityName, selectedRegion, total, selectedTicket } = location.state;

    const images = require.context('../../../public/images/socializing',false, /\.(png|jpe?g|svg)$/);
    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
    }

    const modalOverlayHandler = (e) => {
        // Modal 바깥쪽을 클릭했을 때만 모달창 닫기
        if (e.target.className === 'manner-modal-container') {
          setShowMannerDeniedModal(false);
        }
    };
    const checkHandler = () => {
        setShowMannerDeniedModal(false)
    }

    const navigate = useNavigate();
    function backBtn() {
        navigate(-1);
    }

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'instant' 
        });
    }

    const allDoneHandler = () => {
        scrollToTop();
        if(titleStatus && contentStatus) {

            navigate('/result', { state: {action:'모집글이 등록'}});

        } else if(!titleStatus){
            setMassage('제목을 입력하세요');
            setShowMannerDeniedModal(true);
        } else if(!contentStatus) {
            setMassage('내용을 입력하세요');
            setShowMannerDeniedModal(true);
        }

        // step마다 전달된 state값들을 한번에 객체에 담아 post로 http 전송

    }

    const titleHandler = (e) => {
        e.target.value !== '' 
        ? setTitleStatus(true)
        : setTitleStatus(false)
        setCreateTitle(e.target.value);
    }

    const contentHandler = (e) => {
        e.target.value !== ''
        ? setContentStatus(true)
        : setContentStatus(false)
        setCreateContent(e.target.value);
    }
    
    useEffect(
        ()=>{
            setMassage('')
        },[]
    )

    // useEffect(
    //     ()=>{
    //         console.log(createTitle)
    //         console.log(titleStatus)
    //         console.log(createContent)
    //         console.log(contentStatus)
    //     },[createTitle,createContent]
    // )

    return(
        <>
            <div className="write-body">
                <div className="write-contents">
                    <div className='write-header'>
                        <img style={{cursor:'pointer'}} onClick={backBtn} src={getImage('icon_arrow_back_main_color.png')} alt="뒤로가기아이콘" />
                        <h3> 허니팟 모집하기 </h3>
                        <div style={{ marginRight: '30px', fontSize: '20px' }}>
                            <span>3 / 3</span>
                        </div>
                    </div>
                    <div className='write-middle-create'>
                        <input type='text' onChange={titleHandler} placeholder='제목을 입력하세요'/>
                        <textarea onChange={contentHandler} className='write-middle-create-content' placeholder='내용을 입력하세요'></textarea>
                    </div>
                    <div className='write-bottom-create' onClick={allDoneHandler}>
                        <div>모집하기</div>
                    </div>
                </div>
            </div>
            {showMannerDeniedModal && (
            <div className='manner-modal-container' onClick={modalOverlayHandler}>
                <div className='manner-modal-content' style={{ height:'280px' }}>
                    <div className='manner-modal-header' style={{ backgroundColor:'white', borderTopLeftRadius:'10px', borderTopRightRadius:'10px'}}>
                        <p style={{ marginRight:'0px' }}> 허니팟 모집 </p>
                    </div>
                    <div className='manner-modal-middle' style={{ height:'130px', marginTop:'20px', borderBottom:'0px', justifyContent:'center', alignItems:'center' }}>
                        <p style={{ fontSize:'18px' }}>{message}</p>
                    </div>
                    <div className='manner-modal-bottom' style={{ padding:'0px', marginTop:'10px', alignItems:'center' }}>
                        <button onClick={checkHandler} className='submit-button'>확인</button>
                    </div>
                </div>
            </div>
            )}        
        </>
    )
}
export default HoneyWrite3