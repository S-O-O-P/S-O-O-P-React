import { useState,useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Detail.css'

const Detail = () => {

    // 비동기로 가져올 댓글 목록 : 댓글 실시간 반영
    const [comment,setComment] = useState([])
    const [showMannerJoinModal, setShowMannerJoinModal] = useState(false);
    const [joinStatus,setJoinStatus] = useState(false);
    const [joinText,setJoinText] = useState('');

    // 로그인 정보 임시 데이터
    const [loginInfo,setLoginInfo] = useState({
        memberId:33,
        nickname:'test333'
    });

    const location = useLocation()
    const { honey,isJoined } = location.state

    useEffect(
        ()=>{
            setJoinStatus(isJoined)
            console.log(isJoined)
            setJoinText('호스트는 신청할 수 없습니다')
        },[]
    )

    useEffect(
        ()=>{
            setJoinText('호스트는 신청할 수 없습니다')
        },[setShowMannerJoinModal]
    )
    
    const images = require.context('../../../public/images/socializing',false, /\.(png|jpe?g|svg)$/)
    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
    }
    

    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1);
    }

    const userInfoHandler = () => {
        // 참가자 프로필 클릭 시, 해당 유저정보창으로
    }

    const hostInfoHandler = () => {
        // 호스트 프로필 클릭 시, 해당 유저정보창으로
    }

    const joinHandler = () => {
        // 같이봐요 클릭 시, 참여자 정보와 참가 요청자 정보 비교 후 처리
        honey.participant.map((user)=>{
            user.member.memberId === loginInfo.memberId && user.member.memberId === honey.member.memberId 
            ? setShowMannerJoinModal(true)
            : setShowMannerJoinModal(false)
        })

        // 후에 로그인한 유저가 참여 시도시, 참여자상태도 아니면서 호스트도 아니면 완료창으로 이동
    }

    const cancelHandler = () => {
        // 취소 api 호출로 참여자정보 데이터 삭제
        setShowMannerJoinModal(true)
        setJoinText('참가신청이 취소되었습니다')
    }

    const getWidth = () => {
        if (honey.honeyFullStatus === 'N') {
          return '450px';
        } else {
          return joinStatus ? '450px' : '200px';
        }
      };

    // 모달
    const backBtn = () => {
        setShowMannerJoinModal(false)
    }
    const modalOverlayHandler = (e) => {
        // Modal 바깥쪽을 클릭했을 때만 모달창 닫기
        if (e.target.className === 'manner-modal-container') {
          setShowMannerJoinModal(false);
        }
    };
    const checkHandler = () => {
        setShowMannerJoinModal(false)
    }

    const ticketInfoHandler = () => {
        // 티켓 정보 클릭 시, 티켓정보창으로
    }

    const commentHandler = () => {
        // 댓글 등록 시, api 호출해서 댓글 내용 등록
    }

    return (
        // <div className='honey-detail-body' style={{backgroundImage:`url(${getImage(honey.ticket.ticketPoster)})`}}>
        <div className='honey-detail-body'>
            <div className='detail-content-box'>
                <div style={{ flexDirection:'column',justifyContent:'center', marginTop:'-250px', position:'relative' }}>
                    <div className='writer-profile-border' style={{ width:'170px' }}></div>
                    {honey.member.profile === null || honey.member.profile === undefined 
                    ? <div className='writer-profile-pic' onClick={hostInfoHandler} style={{ width:'170px' }}></div>
                    :<div className='writer-profile-pic' onClick={hostInfoHandler} style={{ width:'170px', backgroundImage:`url(${getImage(honey.member.profile)})` }}></div>}
                    <span style={{ marginTop:'200px' }}>{honey.member.nickname}</span>
                </div>
                <div style={{ justifyContent:'end', gap:'5px', padding:'0 20px' }}>
                    <img src={'images/commons/icon_star.png'} alt="유저평점아이콘" style={{ width:'30px' }}/>
                    {honey.member.hostCnt > 1
                    ? <>
                    {honey.member.reviewScore === 0
                        ? <span>아직 평점이 없습니다</span> 
                        : <>
                            <span style={{ marginLeft:'-5px', marginRight:'8px' }}>호스트평점</span>
                            <span>{honey.member.reviewScore.toFixed(1)}</span>
                          </>}
                    </>
                    : <>
                        <span>신규 호스트</span>
                        {honey.member.reviewScore === 0 
                        ? <></> 
                        : <span>{honey.member.reviewScore.toFixed(1)}</span>}
                    </>
                    }
                </div>
                <div style={{ height:'390px', flexDirection:'column', marginTop:'-10px' }}>
                    <div style={{ justifyContent:'space-between' }}>
                        <span>#{honey.honeyGenre}</span>
                        <span>모집일자 &nbsp;&nbsp;{honey.honeyAt}</span>
                    </div>
                    <div style={{ padding:'10px 20px' }}>
                        <h3>{honey.honeyTitle}asdfasdfasdfasdf</h3>
                        <span>{honey.honeyCity} {honey.honeyRegion}</span>
                    </div>
                    <div style={{ paddingBottom:'0px', justifyContent:'end' }}>
                        {/* <span>참여인원 &nbsp;{honey.participant.length}/{honey.totalPeople}</span> */}
                        <span>참가자목록</span>
                    </div>
                    <div style={{ padding:'0 20px' }}>
                        {honey.honeyFullStatus === 'N' ? (
                            <span className='detail-recruit-status' style={{ backgroundColor:'green' }}>
                            모집중
                            </span>
                        ) : (
                            <span className='detail-recruit-status' style={{ backgroundColor:'red' }}>
                            모집완료
                            </span>
                        )}
                        {/* 참여자 프로필 사진 리스트 */}
                        <div style={{ width:'200px', justifyContent:'end', padding:'0px' }}>
                            {honey.participant.map((user,index) => (
                                <>
                                {( user.member.profile === null || user.member.profile === undefined )
                                ? <div key={index} className='participant-profile-pic' onClick={userInfoHandler} style={{ width:'30px', margin:'0px', cursor:'pointer' }}></div>
                                :<div key={index} className='participant-profile-pic' onClick={userInfoHandler} style={{ backgroundImage:`url(${getImage(user.member.profile)})`, width:'30px', margin:'0px', cursor:'pointer' }}></div>}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className='content-box-detail'>
                        {honey.honeyContent}asdf aasdf asdfasdfasdfasdfasdfasdfsdfkasdhflkasdaasdf;ajsdf;adf;asdijf;alsdifja;sdlfhalsdkfughaskldfugahsldkfuhasdlfkuahlsdkfhasdlasdfadsfasdfasdfsadfadfasdfasdfasdfasdfasdffk uahsdflasdhflakdsufhalsdkfhasldkfhasdlfkhasdflkashdflaksdfhasdfadsflaisdhfklasdfhlasdkfuhadfslkh
                    </div>
                </div>
                <div style={{
                        width: honey.honeyFullStatus === 'N' ? '450px' : (joinStatus ? '450px' : '200px'),
                        marginBottom: '30px'
                    }}>
                    <div className='decide-button' onClick={goBackHandler}>
                        <p>목록으로</p>
                    </div>
                    {honey.honeyFullStatus === 'N' ? 
                    <>
                        {/* {honey.participant.map((user) => (
                            user.member.memberId === loginInfo.memberId
                            ? setJoinStatus(true) : setJoinStatus(false)
                        ))} */}
                        {joinStatus
                        ? <div onClick={cancelHandler} className='decide-button' style={{ backgroundColor:'red', marginLeft:'80px' }}><p style={{color:'white'}}>참가 취소</p></div>
                        : <div onClick={joinHandler} className='decide-button' style={{ backgroundColor:'var(--main-color)', marginLeft:'80px' }}><p>같이봐요</p></div> 
                        }
                    </> 
                    : <>
                        {joinStatus
                        ? <div onClick={cancelHandler} className='decide-button' style={{ backgroundColor:'red', marginLeft:'80px' }}><p style={{color:'white'}}>참가 취소</p></div>
                        : <></>
                    }
                    </>}
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
                            <div>{honey.ticket.price}원</div>
                        </div>
                    {/* </a> */}
                </div>
                <div style={{ padding:'10px 20px',marginTop:'40px', justifyContent:'flex-start' }}>
                    <h3>댓글&nbsp;</h3>
                    <h5>({honey.comment.length})</h5>
                </div>
                <div style={{ padding:'0 20px', flexDirection:'column', marginBottom:'20px' }}>
                    <textarea className='comment-textarea' placeholder='댓글 내용을 입력해주세요.'></textarea>
                    <div style={{ padding:'5px 20px', justifyContent:'end' }}>
                        <button onClick={commentHandler} className='submit-button'>등록</button>
                    </div>
                </div>
                {honey.comment.map((comments)=> (
                    <div key={comments.member.memberId} className='comment-box'>
                        <div style={{ width:'115px', padding:'0px' }}>
                            <span style={{ fontSize:'15px' }}>{comments.member.nickname}</span>
                            {comments.member.nickname === honey.member.nickname 
                            ? <span style={{fontSize:'12px'}}>(호스트)</span> 
                            : <></>}
                        </div>
                        <span className='comment-contents' style={{ width:'100%' }}>{comments.commentContents}</span>
                    </div>
                ))}
            </div>
            {showMannerJoinModal && (
            <div className='manner-modal-container' onClick={modalOverlayHandler}>
                <div className='manner-modal-content' style={{ height:'280px' }}>
                    <div className='manner-modal-header' style={{ backgroundColor:'white', borderTopLeftRadius:'10px', borderTopRightRadius:'10px'}}>
                        <img onClick={ backBtn } src={'images/commons/icon_arrow_back_main_color.png'} alt="뒤로가기아이콘" />
                        <p> 참가 신청 </p>
                    </div>
                    <div className='manner-modal-middle' style={{ height:'130px', marginTop:'20px', borderBottom:'0px', justifyContent:'center', alignItems:'center' }}>
                        <p style={{ fontSize:'18px' }}>{joinText}</p>
                    </div>
                    <div className='manner-modal-bottom' style={{ padding:'0px', marginTop:'10px', alignItems:'center' }}>
                        <button onClick={checkHandler} className='submit-button'>확인</button>
                    </div>
                </div>
            </div>    
        )}
        </div>
    );
};

export default Detail;