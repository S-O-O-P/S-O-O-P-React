import { NavLink, useLocation } from 'react-router-dom';
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

    return (
        // <div className='honey-detail-body' style={{backgroundImage:`url(${getImage(honey.ticket.ticketPoster)})`}}>
        <div className='honey-detail-body'>
            <div className='detail-content-box'>
                <div style={{height:'390px',flexDirection:'column'}}>
                    <div style={{justifyContent:'space-between' }}>
                        <span>#{honey.honeyGenre}</span>
                        <span>모집일자 &nbsp;&nbsp;{honey.honeyAt}</span>
                    </div>
                    <div style={{justifyContent:'end'}}>
                        {/* 참여자 프로필 사진 리스트 */}
                        {honey.participant.map((user) => (
                            <span key={user.member.memberId} style={{ width: '50px', display: 'flex', justifyContent: 'end'}}>
                                {user.member.nickname}
                            </span>
                        ))}
                    </div>
                    <div style={{justifyContent:'space-between' }}>
                        <span>{honey.honeyTitle}</span>
                        {honey.honeyFullStatus === 'N' ? (
                            <span style={{ marginLeft:'-300px', backgroundColor: 'green', borderRadius: '20px', width: '55px',height:'25px',lineHeight:'25px', textAlign: 'center', color: '#ffffff', fontSize: '12px' }}>
                            모집중
                            </span>
                        ) : (
                            <span style={{ backgroundColor: 'red', borderRadius: '20px', width: '55px', textAlign: 'center', color: '#ffffff', fontSize: '12px' }}>
                            모집완료
                            </span>
                        )}
                        <span>참여인원 &nbsp;{honey.participant.length}/{honey.totalPeople}</span>
                    </div>
                    <div className='content-box-detail'>
                        {honey.honeyContent}asdf aasdf asdfasdfasdfasdfasdfasdfsdfkasdhflkasdaasdf;ajsdf;adf;asdijf;alsdifja;sdlfhalsdkfughaskldfugahsldkfuhasdlfkuahlsdkfhasdlasdfadsfasdfasdfsadfadfasdfasdfasdfasdfasdffk uahsdflasdhflakdsufhalsdkfhasldkfhasdlfkhasdflkashdflaksdfhasdfadsflaisdhfklasdfhlasdkfuhadfslkh
                    </div>
                </div>
                <div style={{width:'450px',marginBottom:'30px'}}>
                    <div className='decide-button'>
                        <NavLink to='/honey'>
                            <p>목록으로</p>
                        </NavLink>
                    </div>
                    <div className='decide-button' style={{marginLeft:'80px'}}>같이봐요</div>
                </div>
                <div style={{height:'70px',justifyContent:'center'}}>
                    <h2>티켓정보</h2>
                </div>
                <div style={{height:'288px'}}>
                    <div style={{width:'282px',height:'288px',display:'flex',justifyContent:'center'}} >
                        <img style={{height:'100%'}} src={getImage(honey.ticket.ticketPoster)} alt='티켓 포스터' />
                    </div>
                    <div style={{border:'1px solid',width:'282px',height:'288px',display:'flex',justifyContent:'center'}}>
                        티켓정보
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default Detail;