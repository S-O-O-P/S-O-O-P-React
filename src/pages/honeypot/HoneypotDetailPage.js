import HoneypotComment from '../../components/honeypot/HoneypotComment';
import RecommendHoneypot from '../../components/honeypot/RecommendHoneypot';
import './HoneypotDetailPage.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/commons/Loading';
import HostDetailPage from '../../components/honeypot/HostDetailPage';
import UserDetailPage from '../../components/honeypot/UserDetailPage';
import HoneypotDetailApi from '../../apis/honeypot/HoneypotDetailApi';
import ApplicationApi from "../../apis/honeypot/ApplicationApi";
import MyRatingApi from '../../apis/mypage/MyRatingApi';
import axios from "axios";


function HoneypotDetailPage({ cultureList, user }) {
  const { honeypotCode } = useParams();
  const [detailHoneypot, setDetailHoneypot] = useState({});
  const navigate = useNavigate();
  const parsedData = JSON.parse(cultureList);
  const allCultureList = parsedData.perforList || [];
  const [filteredCultureList, setFilteredCultureList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myRating, setMyRating] = useState({ contents: [] })
  const [showMannerStarModal, setShowMannerStarModal] = useState(false);
  const location = useLocation();
  const getValidRatingsCount = (contents) => {
    return contents.filter(content => content && content.content !== null).length;
  };
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportConfirmModal, setShowReportConfirmModal] = useState(false);
  const [earlyBird, setEarlyBird] = useState([]);


  // 공연 / 전시 start/endDate
  const convertDateFormat = (stringDate) => {
    let dateFormat = "";
    const year = stringDate?.slice(0, 4);
    const month = stringDate?.slice(4, 6);
    const day = stringDate?.slice(6);
    
    dateFormat = year + "." + month + "." + day; // 날짜 표시 형식
    return dateFormat;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [applications, setApplications] = useState([]); // 참가신청자

  useEffect(()=> {
      if (detailHoneypot && detailHoneypot.honeypotCode) {
        ApplicationApi(detailHoneypot.honeypotCode, setApplications);
      }
  }, [detailHoneypot,user]);
  
  // console.log('디테일허니팟 컬쳐리스트', allCultureList[0].seq)
  // console.log('디테일허니팟', detailHoneypot);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 새로 등록된 허니팟인 경우 추가 대기 시간 설정
        if (location.state && location.state.newHoneypotCode) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
        }
        await HoneypotDetailApi({allCultureList, setDetailHoneypot, setFilteredCultureList, honeypotCode, user, setIsLoading});
        await MyRatingApi({setIsLoading, setMyRating, user});

      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [honeypotCode, user]);

  useEffect(() => {
    const fetchInternalCultureList = async () => {
      try {
        const response = await axios.get('http://localhost:8081/cultureinfo/early');
        const matchingEarlyBird = response.data.earlyBirdList.find(earlybird => earlybird.earlyBirdCode === detailHoneypot.seqNo);
        if (matchingEarlyBird) {
          // console.log('일치하는 얼리버드:', matchingEarlyBird);
          setEarlyBird(matchingEarlyBird);
        } else {
          console.log('일치하는 얼리버드가 없습니다.');
        }
      } catch (error) {
        console.error('내부 API 호출 실패', error);
      }
    };
  
    if (detailHoneypot.seqNo) {
      fetchInternalCultureList();
    }
  }, [detailHoneypot.seqNo]);

  // console.log('얼리버드 : ', earlyBird);


  const modifyClick = () => {
    if (applications.length > 0) {
      setWarningMessage('허니팟 정보 변경이 불가합니다.')
      setShowWarningModal(true);
      return;
    }
    navigate(`/honeyqot/${honeypotCode}`, {
      state: { detailHoneypot }
    });
  };

  const handleDeleteHoneypot = () => {
      // 참가 신청자가 있는지 확인
      if (applications.length > 0) {
        setWarningMessage('허니팟 삭제 불가합니다.')
        setShowWarningModal(true);
      } else {
        setShowDeleteConfirmModal(true);
      }
    };

  const confirmDelete = async () => {
    try {
      // 삭제 API 호출
      await axios.delete(`http://localhost:8081/honeypot/delete/${detailHoneypot.honeypotCode}`);
      setShowDeleteConfirmModal(false);
      setShowDeleteSuccessModal(true);
    } catch (error) {
      console.error('허니팟 삭제 실패:', error);
    }
  };

  const handleReport = () => {
    setShowReportModal(true);
  }

  const confirmReport = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/honeypot/report/${detailHoneypot.honeypotCode}`);
      console.log('신고가되었나', response.data);
      setShowReportModal(false);
      setShowReportConfirmModal(true);
    } catch(error) {
      console.error('신고 기능 실패', error);
    }
  }

  const mannerStarClick = () => {
    setShowMannerStarModal(true);
  };

  const backBtn = () => {
      setShowMannerStarModal(false);
  };

  if (isLoading) {
    return <LoadingSpinner />; // 로딩 중일 때 보여줄 UI
  }

  const title = filteredCultureList[0]?.title.replaceAll('&lt;', `<`).replaceAll('&gt;', `>`).replaceAll("&#39;", "'"); // 제목

  return (
    <div className="main-content">
      <div className="detail-container">
        <div className='host-info-wrapper'>
          <img className='detail-poster' src={detailHoneypot.poster} draggable="false" alt='포스터이미지'/>
          <div className='host-profile-wrapper'>
            <img className='host-profile-pic' src={detailHoneypot.hostInfo?.profilePic} draggable="false" alt='프로필사진'/>
            <p className='host-nickname'>{detailHoneypot.hostInfo?.nickname}</p>
          </div>
          <div className='detail-manner-box' onClick={mannerStarClick}>
            <img src={`${process.env.PUBLIC_URL}/images/honeypot/icon_honeypot.png`} alt="유저평점아이콘" />
            <div className='detail-manner-text'>
              <p>유저Brix</p>
              <p>{myRating.averageScore > 0 ? `${myRating.averageScore.toFixed(1)} / 5` : '평가없음'}</p>
            </div>
          </div>
        </div>
        
        {user?.userCode === detailHoneypot.hostInfo?.userCode ? (
          <HostDetailPage
            detailHoneypot={detailHoneypot}
            filteredCultureList={filteredCultureList}
            title={title}
            convertDateFormat={convertDateFormat}
            navigate={navigate}
            modifyClick={modifyClick}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            allCultureList={allCultureList}
            setDetailHoneypot={setDetailHoneypot}
            setFilteredCultureList={setFilteredCultureList}
            honeypotCode={honeypotCode}
            user={user}
          />
        ) : (
          <UserDetailPage
            detailHoneypot={detailHoneypot}
            filteredCultureList={filteredCultureList}
            title={title}
            convertDateFormat={convertDateFormat}
            navigate={navigate}
            user={user}
          />
        )}
        <div className='ticket-info-container' onClick={() => {navigate(`/cultureinfo/${detailHoneypot.seqNo}`)}}>
          <div className='poster-wrapper'>
            {detailHoneypot.seqNo <= 100 ? (
              <img src={earlyBird?.poster} alt="포스터이미지" draggable="false"/>
            ) : (
              <img src={filteredCultureList[0]?.thumbnail} alt="포스터이미지" draggable="false"/>
            )}
          </div>
          <ul className='poster-cutting_line'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className='ticket-info'>
            {detailHoneypot.seqNo <= 100 ? (
              <>
                <p className='ticket-title'>{earlyBird.ebTitle}</p>
                <p>{formatDate(earlyBird.usageStartDate)} ~ {formatDate(earlyBird.usageEndDate)}</p>
                <p>{earlyBird.place}</p>
              </>
            ) : (
              <>
                <p className='ticket-title'>{title}</p>
                <p>{convertDateFormat(filteredCultureList[0]?.startDate)} ~ {convertDateFormat(filteredCultureList[0]?.endDate)}</p>
                <p>{filteredCultureList[0]?.place}</p>
              </>
            )}
          </div>
        </div>
        <hr className='honeypot-detail-hr'/>
        <RecommendHoneypot interestName={detailHoneypot.interestCategory.interestName} allCultureList={allCultureList} honeypotCode={honeypotCode}/>
        <div className='comment-top'>
                <p>댓글</p>
                {detailHoneypot.hostInfo.userCode === user.userCode ? (
              <div className='honeypot-delete'  onClick={handleDeleteHoneypot} >
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_delete_main_color.png`} alt="delete icon"/>
                <p>삭제</p>
              </div>
            ) : (
              <div className='honeypot-report' onClick={handleReport}>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_report_main_color.png`} alt="report icon"/>
                <p>신고</p>
              </div>
            )}
            </div>
        <HoneypotComment detailHoneypot={detailHoneypot} user={user}/>
      </div>
      {showMannerStarModal && (
        <div className="manner-modal-container">
          <div className="manner-modal-content">
            <div className='manner-modal-header'>
              <img onClick={backBtn} src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_back_main_color.png`} alt="뒤로가기아이콘" />
              <p>{detailHoneypot.hostInfo.nickname}</p>
            </div>

            <div className='manner-modal-middle'>
              <p className='middle-title'>유저Brix</p>
              <div className='star-point-container'>
                <img src={`${process.env.PUBLIC_URL}/images/honeypot/icon_honeypot.png`} alt="유저평점아이콘" />
                <p>{myRating.averageScore > 0 ? `${myRating.averageScore.toFixed(1)} / 5` : '평가없음'}</p>
              </div>
              <div className='people-count-container'>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_bee.png`} alt="유저평점아이콘" />
                <p>{getValidRatingsCount(myRating.contents) > 0 
                    ? `${getValidRatingsCount(myRating.contents)}명의 멤버 평가 반영` 
                    : '아직 평가한 멤버가 없습니다'}
                </p>
              </div>
            </div>

            <div className='manner-modal-bottom'>
              <p className='bottom-title'>멤버평가</p>
              <div className='bottom-review-container'>
              {getValidRatingsCount(myRating.contents) > 0 ? (
                  myRating.contents.filter(review => review && review.content !== null).map((review, index) => (
                      <div key={index} className='bottom-review-text'>
                          <p>{review.content}</p>
                      </div>
                  ))
              ) : (
                  <p>아직 받은 평가가 없습니다.</p>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showWarningModal && (
        <div className='modal-container'>
          <div className='warningmodal-content'>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_alert.png`} alt='느낌표 아이콘'/>
            <p className="warning-message">{warningMessage}</p>
            <p className='warning-normal-message'>참여한 멤버가 있는 허니팟 입니다.</p>
            <div className="warning-modal-buttons">
              <button className="warning-modal-button yes" onClick={() => setShowWarningModal(false)}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className='modal-container'>
          <div className='warningmodal-content'>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_alert.png`} alt='느낌표 아이콘'/>
            <p className="warning-message">삭제하시겠습니까?</p>
            <p className='warning-normal-message'>삭제하시면 복구가 불가능합니다.</p>
            <div className="warning-modal-buttons2">
              <button className="warning-modal-button no2" onClick={() => setShowDeleteConfirmModal(false)}>
                취소
              </button>
              <button className="warning-modal-button yes2" onClick={confirmDelete}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSuccessModal && (
        <div className='modal-container'>
          <div className='warningmodal-content3'>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`} alt='확인 아이콘'/>
            <p className="warning-message">허니팟이 삭제되었습니다.</p>
            <div className="warning-modal-buttons3">
              <button className="warning-modal-button yes" onClick={() => {
                setShowDeleteSuccessModal(false);
                navigate('/honeypot');
              }}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {showReportModal && (
        <div className='modal-container'>
          <div className='warningmodal-content2'>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_alert.png`} alt='느낌표 아이콘'/>
            <p className="warning-message">신고하시겠습니까?</p>
            <div className="warning-modal-buttons2">
              <button className="warning-modal-button no2" onClick={() => setShowReportModal(false)}>
                아니오
              </button>
              <button className="warning-modal-button yes2" onClick={confirmReport}>
                예
              </button>
            </div>
          </div>
        </div>
      )}

      {showReportConfirmModal && (
        <div className='modal-container'>
          <div className='warningmodal-content3'>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_confirm.png`} alt='확인 아이콘'/>
            <p className="warning-message">신고가 접수되었습니다.</p>
            <div className="warning-modal-buttons3">
              <button className="warning-modal-button yes" onClick={() => setShowReportConfirmModal(false)}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HoneypotDetailPage;