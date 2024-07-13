import React from 'react';
import { useState, useEffect, useRef } from 'react'
import ParticipatingHoneypot from '../../components/mypage/ParticipatingHoneypot';
import MyHoneypot from '../../components/mypage/MyHoneypot';
import MyComments from '../../components/mypage/MyComments';
import Review from '../../components/mypage/Review';
import EditProfile from '../../components/mypage/EditProfile';
import MyInquiry from '../../components/mypage/MyInquiry';
import './MyPage.css';
import MyHoneyPotApi from '../../apis/mypage/MyHoneyPotApi';
import LoadingSpinner from '../../components/commons/Loading';
import ParticipatingHoneypotApi from '../../apis/mypage/ParticipatingHoneypotApi';
import MyCommentApi from '../../apis/mypage/MyCommentApi';
import MyInquiryApi from '../../apis/mypage/MyInquiryApi';
import FinishedHoneyPotApi from '../../apis/mypage/FinishedHoneyPotApi';
import RatingApi from '../../apis/mypage/RatingApi';
import UserProflieApi from '../../apis/mypage/UserProfile';
import MyRatingApi from '../../apis/mypage/MyRatingApi';
import axios from 'axios';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const INTERESTS = ['팝업', '공연', '행사/축제', '전시회', '뮤지컬'];

const MyPage = ({user}) => {

    const [selectedMenu, setSelectedMenu] = useState('participatingHoneypot');
    const [showMannerStarModal, setShowMannerStarModal] = useState(false);
    const fileInput = useRef(null);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [myHoneypotList, setMyHoneypotList] = useState([]);
    const [participatingHoneypotList, setParticipatingHoneypotList] = useState([]);
    const [myCommentList, setMyCommentList] = useState([]);
    const [myInquiryList, setMyInquiryList] = useState([]);
    const [finishedHoneyPotList, setFinishedHoneyPotList] = useState([]);
    const [particiMember, setParticiMember] = useState([]);
    const [ratingCategory, setRatingCategory] = useState([]);
    const [myRating, setMyRating] = useState({ contents: [] });
    // API 호출
    useEffect(() => {
        UserProflieApi({setIsLoading, setLoggedInUser, user})
        MyHoneyPotApi({setIsLoading, setMyHoneypotList, user})  // 내가만든 허니팟
        ParticipatingHoneypotApi({setIsLoading, setParticipatingHoneypotList, user}) // 참여중인 허니팟
        MyCommentApi({setIsLoading, setMyCommentList, user}) // 내가 쓴 댓글
        MyInquiryApi({setIsLoading, setMyInquiryList, user}) // 나의 문의 내역
        FinishedHoneyPotApi({setIsLoading, setFinishedHoneyPotList, setParticiMember, user}) // 진행완료 된 허니팟
        RatingApi({setIsLoading, setRatingCategory});
        MyRatingApi({setIsLoading, setMyRating, user})
    },[user, loggedInUser.nickname]);

    // console.log('나의 정보', myRating);
    // console.log('유저', user);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const getValidRatingsCount = (contents) => {
        return contents.filter(content => content && content.content !== null).length;
    };

    const handleProfileUpdate = (updatedProfile) => {
        // console.log("Received updated profile:", updatedProfile);
        setLoggedInUser(prevUser => {
            if (!updatedProfile || !updatedProfile.interests) {
                console.error("Updated profile or interests are missing", updatedProfile);
                return prevUser;
            }
    
            const newUser = {
                ...prevUser,
                ...updatedProfile,
                interests: Array.isArray(updatedProfile.interests)
                    ? updatedProfile.interests.map(interest => ({
                        interestCode: interest.interestCode || interest,
                        interestName: interest.interestName || ''
                      }))
                    : []
            };
            // console.log("New user state:", newUser);
            return newUser;
        });
    };

    // getCookie 함수 정의
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
  
  // 토큰 갱신
    const refreshToken = async () => {
        try {
        const refreshResponse = await axios.post('http://localhost:8081/reissue', {
            userCode: loggedInUser.userCode
        }, {
            withCredentials: true
        });
    
        if (refreshResponse.status === 200) {
            console.log('토큰 갱신 성공');
            // 쿠키에서 새 액세스 토큰을 확인
            const newAccessToken = getCookie('access');

            if (newAccessToken) {
            console.log('새 액세스 토큰이 설정되었습니다');
            } else {
            console.log('새 액세스 토큰을 찾을 수 없습니다');
            }

            window.location.reload();

        } else {
            console.log('토큰 갱신 실패');
            console.log('응답 정보:', refreshResponse);
        }
        } catch (error) {
        console.error('토큰 갱신 중 오류 발생:', error);
        }
    };

    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                // Firebase Storage에 파일 업로드
                const storageRef = ref(storage, `profile_pictures/${user.userCode}_${file.name}`);
                await uploadBytes(storageRef, file);
                
                // 업로드된 파일의 다운로드 URL 가져오기
                const downloadURL = await getDownloadURL(storageRef);

                // 백엔드 API 호출하여 프로필 사진 URL 업데이트
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/mypage/profile-pic/${loggedInUser.userCode}`, 
                    { profilePicUrl: downloadURL },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                console.log(`API URL: ${process.env.REACT_APP_API_URL}/mypage/profile-pic/${loggedInUser.userCode}`);
                console.log('프로필수정 응답:', response);
                
                setLoggedInUser(prevUser => ({
                    ...prevUser,
                    profilePic: downloadURL
                }));
                await refreshToken();

            } catch (error) {
                console.error('프로필사진 변경 실패:', error);
                if (error.response) {
                    // 서버 응답이 2xx 범위를 벗어난 경우
                    console.error('응답 데이터:', error.response.data);
                    console.error('응답 상태:', error.response.status);
                    console.error('응답 헤더:', error.response.headers);
                    console.log(`API URL: ${process.env.REACT_APP_API_URL}/mypage/profile-pic/${loggedInUser.userCode}`);

                  } else if (error.request) {
                    // 요청이 이루어졌으나 응답을 받지 못한 경우
                    console.error('요청:', error.request);
                  } else {
                    // 요청을 설정하는 중에 오류가 발생한 경우
                    console.error('오류 메시지:', error.message);
                  }
            }
        }
    };
    
    const mannerStarClick = () => {
        setShowMannerStarModal(true);
    };

    const backBtn = () => {
        setShowMannerStarModal(false);
    };

    return (
        <div className='main-content'>
            <div className='mypage-container'>
                
                <div className="title">
                    마이페이지
                </div>
                
                <div className="profile-top">
                    <div className="profile-box">
                        <img src={loggedInUser.profilePic} className="profile-pic" alt="프로필사진" />
                        <div className="profile-pic-update-btn" onClick={() => fileInput.current.click()}>
                            <img src={`${process.env.PUBLIC_URL}/images/commons/icon_edit_profile.png`} alt="사진변경아이콘" />
                            <input 
                                type='file' 
                                style={{ display: 'none' }} 
                                ref={fileInput} 
                                accept='image/jpg, image/png, image/jpeg' 
                                name='profile_img'
                                onChange={handleProfilePicChange}
                            />
                        </div>
                    </div>

                    <div className='profile-text'>
                        <div className='profile-nickname'>{loggedInUser.nickname}</div>
                        <div className='profile-intro'>{loggedInUser.aboutme}</div>
                    </div>
                    
                    <div className='manner-box' onClick={mannerStarClick}>
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_star.png`} alt="유저평점아이콘" />
                        <div className='manner-text'>
                            <p>유저평점</p>
                            <p>{myRating.averageScore > 0 ? `${myRating.averageScore} / 5` : '평가없음'}</p>
                        </div>
                    </div>
                </div>

                <div className='mypage-main-container'>
                    <div className='mypage-category'>
                        <p onClick={() => setSelectedMenu('participatingHoneypot')} className='category-main'>허니팟</p>
                        <p onClick={() => setSelectedMenu('participatingHoneypot')} className='category-sub'>참여중인 허니팟</p>
                        <p onClick={() => setSelectedMenu('myHoneypot')} className='category-sub'>내가 만든 허니팟</p>
                        <p onClick={() => setSelectedMenu('myComments')} className='category-sub'>내가 쓴 댓글</p>
                        <p onClick={() => setSelectedMenu('review')} className='category-main'>멤버 평가</p>
                        <p onClick={() => setSelectedMenu('myInquiry')} className='category-main'>문의 내역</p>
                        <p onClick={() => setSelectedMenu('editProfile')} className='category-main'>프로필 수정</p>
                    </div>

                    {selectedMenu === 'participatingHoneypot' && <ParticipatingHoneypot participatingHoneypotList={participatingHoneypotList}/>}
                    {selectedMenu === 'myHoneypot' && <MyHoneypot myHoneypotList={myHoneypotList}/>}
                    {selectedMenu === 'myComments' && <MyComments myCommentList={myCommentList}/>}
                    {selectedMenu === 'review' && <Review finishedHoneyPotList={finishedHoneyPotList} particiMember={particiMember} user={user} ratingCategory={ratingCategory}/>}
                    {selectedMenu === 'myInquiry' && <MyInquiry myInquiryList={myInquiryList}/>}
                    {selectedMenu === 'editProfile' && <EditProfile key={loggedInUser.nickname + loggedInUser.aboutme} loggedInUser={loggedInUser} onProfileUpdate={handleProfileUpdate} />}
                
                </div>

                {showMannerStarModal && (
                    <div className="manner-modal-container">
                        <div className="manner-modal-content">
                            
                            <div className='manner-modal-header'>
                                <img onClick={backBtn} src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_back_main_color.png`} alt="뒤로가기아이콘" />
                                <p>{myRating.nickname}</p>
                            </div>

                            <div className='manner-modal-middle'>
                                <p className='middle-title'>유저평점</p>
                                <div className='star-point-container'>
                                    <img src={`${process.env.PUBLIC_URL}/images/commons/icon_star.png`} alt="유저평점아이콘" />
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
            </div>
        </div>
);
};

export default MyPage;