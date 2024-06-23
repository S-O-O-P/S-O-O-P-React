import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import './HoneyWrite2.css'

function HoneyWrite2() {

    const [ selectedTicket, setSelectedTicket ] = useState(null)
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

    const doneHandler = () => {
        scrollToTop();

    }

    return (
        <>
            <div className="write-body">
                <div className="write-contents">
                    <div className='write-header'>
                        <img style={{cursor:'pointer'}} onClick={backBtn} src={getImage('icon_arrow_back_main_color.png')} alt="뒤로가기아이콘" />
                        <h3> 허니팟 모집하기 </h3>
                        <div style={{ marginRight: '30px', fontSize: '20px' }}>
                            <span>2 / 2</span>
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
                    <div className='write-bottom' onClick={doneHandler}>
                        <div>모집하기</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HoneyWrite2