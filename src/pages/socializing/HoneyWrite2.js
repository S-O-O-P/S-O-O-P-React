import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import './HoneyWrite2.css'

function HoneyWrite2() {

    const [ selectedTicket, setSelectedTicket ] = useState(null)
    const [ showMannerDeniedModal, setShowMannerDeniedModal ] = useState(false);
    // BE 작업용 실제 데이터
    // const [ ticketList, setTicketList ] = useState([]);
    // FE 작업용 임시 데이터
    const [ ticketTempList, setTicketTempList ] = useState([
        {ticketId:1,ticketPoster:'poster1.png',price: 10000},
        {ticketId:2,ticketPoster:'poster2.png',price: 15000},
        {ticketId:3,ticketPoster:'poster3.png',price: 20000},
        {ticketId:4,ticketPoster:'poster1.png',price: 25000},
    ]);

    useEffect(
        ()=>{
            // 티켓정보 목록 api 호출
        },[]
    )

    // useEffect(
    //     ()=> {
    //         setSelectedTicket(ticketList[0].ticketId)
    //     },[ticketList]
    // )

    const location = useLocation();
    const { cityName, selectedRegion, total } = location.state;

    const images = require.context('../../../public/images/socializing',false, /\.(png|jpe?g|svg)$/);
    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
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

    const ticketHandler = (ticketId) => {
        setSelectedTicket(ticketId === selectedTicket ? null : ticketId);
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

    const stepHandler = () => {
        scrollToTop();
        selectedTicket === null 
        ? setShowMannerDeniedModal(true) 
        : navigate('/write-honey/step3', { state: { cityName, selectedRegion, total, selectedTicket }});
    }

    return (
        <>
            <div className="write-body">
                <div className="write-contents">
                    <div className='write-header'>
                        <img style={{cursor:'pointer'}} onClick={backBtn} src={getImage('icon_arrow_back_main_color.png')} alt="뒤로가기아이콘" />
                        <h3> 허니팟 모집하기 </h3>
                        <div style={{ marginRight: '30px', fontSize: '20px' }}>
                            <span>2 / 3</span>
                        </div>
                    </div>
                    <div className='write-middle'>
                        <div className='write-middle-title'>
                            <p>얼리버드 선택하기</p>
                        </div>
                        <div className='write-middle-ticket'>
                            {ticketTempList.map((ticket)=>(
                                <div className={selectedTicket === ticket.ticketId ? 'selected-ticket' : ''}
                                    onClick={()=>ticketHandler(ticket.ticketId)}>
                                    <div style={{ margin: '0px', borderRadius:'10px' }}>
                                        <img style={{ borderRadius:'10px' }} src={getImage(ticket.ticketPoster)} alt='티켓 포스터' />
                                    </div>
                                    <div style={{ width:'350px', backgroundColor:'white', border:'1px solid', borderRadius:'10px', margin: '0 0px', alignItems:'center' }}>
                                        <div>{ticket.price}원</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='write-bottom' onClick={stepHandler}>
                        <div>마지막!</div>
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
                        <p style={{ fontSize:'18px' }}>얼리버드를 선택해주세요</p>
                    </div>
                    <div className='manner-modal-bottom' style={{ padding:'0px', marginTop:'10px', alignItems:'center' }}>
                        <button onClick={checkHandler} className='submit-button'>확인</button>
                    </div>
                </div>
            </div>   
        )}
        </>
    );
}

export default HoneyWrite2