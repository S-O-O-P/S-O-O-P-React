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
  


  // 공연 / 전시 start/endDate
  const convertDateFormat = (stringDate) => {
    let dateFormat = "";
    const year = stringDate.slice(0, 4);
    const month = stringDate.slice(4, 6);
    const day = stringDate.slice(6);
    
    dateFormat = year + "." + month + "." + day; // 날짜 표시 형식
    return dateFormat;
  }

  const [applications, setApplications] = useState([]); // 참가신청자

  useEffect(()=> {
      if (detailHoneypot && detailHoneypot.honeypotCode) {
        ApplicationApi(detailHoneypot.honeypotCode, setApplications);
      }
  }, [detailHoneypot,user]);
  
  console.log('디테일허니팟 컬쳐리스트', allCultureList[0].seq)

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


  const modifyClick = () => {
    if (applications.length > 0) {
      alert('신청자가 있어 수정할 수 없습니다.');
      return;
    }
    navigate(`/honeypot/u/${honeypotCode}`, {
      state: { detailHoneypot }
    });
  };

  const handleDeleteHoneypot = async () => {
    try {
      // 참가 신청자가 있는지 확인
      if (applications.length > 0) {
        alert('참가 신청자가 있어 허니팟을 삭제할 수 없습니다.');
        return;
      }

      // 삭제 API 호출
      await axios.delete(`http://localhost:8081/honeypot/${detailHoneypot.honeypotCode}`);
      alert('허니팟이 성공적으로 삭제되었습니다.');

      // 삭제 후 리다이렉트 또는 다른 작업 수행
      navigate('/honeypot');

    } catch (error) {
      console.error('허니팟 삭제 실패:', error);
      alert('허니팟 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const mannerStarClick = () => {
    setShowMannerStarModal(true);
  };

  const backBtn = () => {
      setShowMannerStarModal(false);
  };

  if (isLoading) {
    return <LoadingSpinner />; // 로딩 중일 때 보여줄 UI
  }

  const title = filteredCultureList[0].title.replaceAll('&lt;', `<`).replaceAll('&gt;', `>`).replaceAll("&#39;", "'"); // 제목

  return (
    <div className="main-content">
      <div className="detail-container">
        <div className='host-info-wrapper'>
          <img className='detail-poster' src={detailHoneypot.poster} draggable="false" alt='포스터이미지'/>
          <div className='host-profile-wrapper'>
            <img className='host-profile-pic' src={detailHoneypot.hostInfo.profilePic} draggable="false" alt='프로필사진'/>
            <p className='host-nickname'>{detailHoneypot.hostInfo.nickname}</p>
          </div>
          <div className='detail-manner-box' onClick={mannerStarClick}>
            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_star.png`} alt="유저평점아이콘" />
            <div className='detail-manner-text'>
              <p>유저평점</p>
              <p>{myRating.averageScore > 0 ? `${myRating.averageScore.toFixed(1)} / 5` : '평가없음'}</p>
            </div>
          </div>
        </div>
        
        {user.userCode === detailHoneypot.hostInfo.userCode ? (
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
        <div className='ticket-info-container'>
          <div className='poster-wrapper'>
            <img src={filteredCultureList[0].thumbnail} alt="포스터이미지" draggable="false"/>
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
            <p className='ticket-title'>{title}</p>
            <p>{convertDateFormat(filteredCultureList[0].startDate)} ~ {convertDateFormat(filteredCultureList[0].endDate)}</p>
            <p>{filteredCultureList[0].place}</p>
          </div>
        </div>
        <hr className='honeypot-detail-hr'/>
        <RecommendHoneypot interestName={detailHoneypot.interestCategory.interestName} allCultureList={allCultureList} honeypotCode={honeypotCode}/>
        <div className='comment-top'>
                <p>댓글</p>
                {detailHoneypot.hostInfo.userCode === user.userCode && (
              <div className='honeypot-delete' 
                  onClick={applications.length > 0 ? () => alert('참가 신청자가 있어 허니팟을 삭제할 수 없습니다.') : handleDeleteHoneypot}
                  style={{ opacity: applications.length > 0 ? 0.5 : 1, cursor: applications.length > 0 ? 'not-allowed' : 'pointer' }}>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_delete_main_color.png`} alt="delete icon"/>
                <p>삭제</p>
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
              <p className='middle-title'>유저평점</p>
              <div className='star-point-container'>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_star.png`} alt="유저평점아이콘" />
                <p>{myRating.averageScore > 0 ? `${myRating.averageScore.toFixed(1)} / 5` : '평가없음'}</p>
              </div>
              <div className='people-count-container'>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_bee.png`} alt="유저평점아이콘" />
                <p>{myRating.contents.length > 0 ? `${myRating.contents.length}명의 멤버 평가 반영` : '아직 평가한 멤버가 없습니다'}</p>
              </div>
            </div>

            <div className='manner-modal-bottom'>
              <p className='bottom-title'>멤버평가</p>
              <div className='bottom-review-container'>
                {myRating.contents.length > 0 ? (
                  <div className='bottom-review-container'>
                    {myRating.contents.map((review, index) => (
                      <div key={index} className='bottom-review-text'>
                        <p>{review.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>아직 받은 평가가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HoneypotDetailPage;