import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Detail.css'

const Detail = () => {
    
    const images = require.context('../../../public/images/socializing',false, /\.(png|jpe?g|svg)$/)
    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
    }

    const location = useLocation()
    const { honey } = location.state

    const navigate = useNavigate();

    function goBackHandler() {
        navigate(-1);
    }

    const userInfoHandler = () => {
        // 참가자 프로필 클릭 시, 해당 유저정보창으로
    }

    const ticketInfoHandler = () => {
        // 티켓 정보 클릭 시, 티켓정보창으로
    }

    return (
        // <div className='honey-detail-body' style={{backgroundImage:`url(${getImage(honey.ticket.ticketPoster)})`}}>
        <div className='honey-detail-body'>
            <div className='detail-content-box'>
                <div style={{ justifyContent:'center', marginTop:'-200px', position:'relative' }}>
                    {honey.member.profile === null || honey.member.profile === undefined 
                    ? <div className='writer-profile-pic' style={{ width:'180px' }}></div>
                    :<div className='writer-profile-pic' style={{ width:'180px', backgroundImage:`url(${getImage(honey.member.profile)})`}}></div>
                    }
                    <div className='writer-profile' style={{width:'150px'}}></div>
                </div>
                <div style={{height:'390px',flexDirection:'column'}}>
                    <div style={{justifyContent:'space-between' }}>
                        <span>#{honey.honeyGenre}</span>
                        <span>모집일자 &nbsp;&nbsp;{honey.honeyAt}</span>
                    </div>
                    <div style={{padding:'0 20px'}}>
                        <span>{honey.honeyTitle}asdfasdfasdfasdf</span>
                        <span>참여인원 &nbsp;{honey.participant.length}/{honey.totalPeople}</span>
                    </div>
                    <div>
                        {/* 참여자 프로필 사진 리스트 */}
                        {honey.honeyFullStatus === 'N' ? (
                            <span className='detail-recruit-status' style={{backgroundColor:'green'}}>
                            모집중
                            </span>
                        ) : (
                            <span className='detail-recruit-status' style={{backgroundColor:'red'}}>
                            모집완료
                            </span>
                        )}
                        {/* 참여자 프로필 사진 리스트 */}
                        <div style={{ width:'200px', justifyContent:'end', padding:'0px' }}>
                            {honey.participant.map((user,index) => (
                                <>
                                {( user.member.profile === null || user.member.profile === undefined )
                                ? <div key={index} className='participant-profile-pic' onClick={userInfoHandler} style={{ width:'30px', margin:'0px', cursor:'pointer' }}></div>
                                :<div key={index} className='participant-profile-pic' onClick={userInfoHandler} style={{ width:'30px', margin:'0px', cursor:'pointer', backgroundImage:`url(${getImage(user.member.profile)})` }}></div>}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='content-box-detail'>
                        {honey.honeyContent}asdf aasdf asdfasdfasdfasdfasdfasdfsdfkasdhflkasdaasdf;ajsdf;adf;asdijf;alsdifja;sdlfhalsdkfughaskldfugahsldkfuhasdlfkuahlsdkfhasdlasdfadsfasdfasdfsadfadfasdfasdfasdfasdfasdffk uahsdflasdhflakdsufhalsdkfhasldkfhasdlfkhasdflkashdflaksdfhasdfadsflaisdhfklasdfhlasdkfuhadfslkh
                    </div>
                </div>
                <div style={{ width: honey.honeyFullStatus === 'N' ? '450px' : '200px', marginBottom:'30px' }}>
                    <div className='decide-button' onClick={goBackHandler}>
                        <p>목록으로</p>
                    </div>
                    {honey.honeyFullStatus === 'N' 
                    ? <div className='decide-button' style={{ backgroundColor:'var(--main-color)',marginLeft:'80px' }}><p>같이봐요</p></div> 
                    : <></>}
                </div>
                <div style={{ height:'70px', justifyContent:'center' }}>
                    <h2>티켓정보</h2>
                </div>
                <div style={{ height:'288px', justifyContent:'start',cursor:'pointer' }} onClick={ticketInfoHandler}>
                    {/* 티켓 구매 링크 */}
                    {/* <a href=''> */}
                        <div className='detail-img-box' style={{ width:'200px', height:'100%', padding:'0px' }}>
                            <img src={getImage(honey.ticket.ticketPoster)} alt='티켓 포스터' />
                        </div>
                        <div className='detail-ticket-contents' style={{ width:'400px' }}>
                            티켓정보
                        </div>
                    {/* </a> */}
                </div>
            </div>  
        </div>
    );
};

export default Detail;