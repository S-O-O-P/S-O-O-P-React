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

const MyPage = ({user}) => {

    const [selectedMenu, setSelectedMenu] = useState('participatingHoneypot');
    const [showMannerStarModal, setShowMannerStarModal] = useState(false);
    const [profileImage, setProfileImage] = useState(`${process.env.PUBLIC_URL}/images/commons/logo.png`);
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
    },[user]);

    console.log('나의 정보', myRating);

    

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const handleProfileUpdate = (updatedProfile) => {
        setLoggedInUser(prevUser => ({
            ...prevUser,
            ...updatedProfile
        }));
    };

    const mannerStarClick = () => {
        setShowMannerStarModal(true);
    };

    const mannerStarconfirmBtn = () => {
        setShowMannerStarModal(false);
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
                            <input type='file' style={{ display: 'none' }} ref={fileInput} accept='image/jpg, image/png, image/jpeg' name='profile_img' />
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
                    {selectedMenu === 'editProfile' && <EditProfile loggedInUser={loggedInUser} onProfileUpdate={handleProfileUpdate} />}
                
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
                                    <p>{myRating.averageScore > 0 ? `${myRating.averageScore} / 5` : '평가없음'}</p>
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
        </div>
);
};

export default MyPage;