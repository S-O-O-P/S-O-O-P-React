import React from 'react';
import { useState } from 'react'
import ParticipatingHoneypot from '../../components/mypage/ParticipatingHoneypot';
import MyHoneypot from '../../components/mypage/MyHoneypot';
import MyComments from '../../components/mypage/MyComments';
import Review from '../../components/mypage/Review';
import MyInquiry from '../../components/mypage/MyInquiry';
import './MyPage.css';


const MyPage = () => {

    const [selectedMenu, setSelectedMenu] = useState('participatingHoneypot')
    const [showMannerStarModal, setShowMannerStarModal] = useState(false);
  
    const mannerStarClick = () => {
    setShowMannerStarModal(true);
  }

  const mannerStarconfirmBtn = () => {
    setShowMannerStarModal(false);
  }

  const backBtn = () => {
    setShowMannerStarModal(false);
  }


  return (
    <div className='main-content'>
    <div className='mypage-container'>
        {/* 페이지 제목 */}
        <div className="title">
            마이페이지
        </div>
        {/* 페이지 제목 */}
        {/* 프로필 상부 */}
        <div className="profile-top">
            <div className="profile-box">
                <div className="profile-pic">IMAGE</div>
                <div className="profile-pic-update-btn">
                   <img src={`${process.env.PUBLIC_URL}/images/commons/icon_edit_profile.png`} alt="사진변경아이콘" />
                </div>
            </div>
            <div className='profile-text'>
                <div className='profile-nickname'>전소민</div>
                <div className='profile-intro'>
                    반복되는 일상을 특별하게 만들어 보고 싶어요.
                </div>
            </div>
            <div className='manner-box' onClick={mannerStarClick}>
                <img src={`${process.env.PUBLIC_URL}/images/commons/icon_star.png`} alt="유저평점아이콘" />
                <div className='manner-text'>
                    <p>유저평점</p>
                    <p>4.9 / 5</p>
                </div>
            </div>
        </div>
        {/* 프로필 상부 */}
        {/* 마이페이지 메인 - 고정 카테고리 */}
        <div className='mypage-main-container'>
            <div className='mypage-category'>
                <p onClick={() => { setSelectedMenu('participatingHoneypot')}} className='category-main'>허니팟</p>
                <p onClick={() => { setSelectedMenu('participatingHoneypot')}} className='category-sub'>참여중인 허니팟</p>
                <p onClick={() => { setSelectedMenu('myHoneypot')}} className='category-sub'>내가 만든 허니팟</p>
                <p onClick={() => { setSelectedMenu('myComments')}} className='category-sub'>내가 쓴 댓글</p>
                <p onClick={() => { setSelectedMenu('review')}} className='category-main'>멤버 평가</p>
                <p onClick={() => { setSelectedMenu('myInquiry')}} className='category-main'>문의 내역</p>
                <p className='category-main'>프로필 수정</p>
            </div>

            

            {/* 마이페이지 메인 - 고정 디테일 */}
            {/* <ParticipatingHoneypot/> */}
            {/* <MyHoneypot/> */}
            {/* <MyComments/> */}

            {selectedMenu === 'participatingHoneypot' && <ParticipatingHoneypot/>}
            {selectedMenu === 'myHoneypot' && <MyHoneypot/>}
            {selectedMenu === 'myComments' && <MyComments/>}
            {selectedMenu === 'review' && <Review />}
            {selectedMenu === 'myInquiry' && <MyInquiry />}


            {/* 마이페이지 메인 - 고정 디테일 */}
        </div>
    

    {showMannerStarModal && (
        <div className="manner-modal-container">
            <div className="manner-modal-content"> 
                <div className='manner-modal-header'>
                    <img onClick={ backBtn } src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_back_main_color.png`} alt="뒤로가기아이콘" />
                    <p> 전소민 </p>
                </div>

                <div className='manner-modal-middle'>
                    <p className='middle-title'>유저평점</p>
                    <div className='star-point-container'>
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_star.png`} alt="유저평점아이콘" />
                        <p>4.9 / 5</p>
                    </div>
                    <div className='people-count-container'>
                        <img src={`${process.env.PUBLIC_URL}/images/commons/icon_bee.png`} alt="유저평점아이콘" />
                        <p>N명의 멤버 평가 반영</p>
                    </div>
                </div>
                

                <div className='manner-modal-bottom'>
                    <p className='bottom-title'>멤버평가</p>
                    <div className='bottom-review-container'>
                        <div className='bottom-review-text'>유쾌하고 밝은 에너지로 분위기 메이커 역할을 했어요.</div>
                        <div className='bottom-review-text'>취향이 통하는 멤버를 만나 좋았어요. 다음에 또 만나고 싶어요.</div>
                        <div className='bottom-review-text'>덕분에 시간가는 줄 모르고 즐거운 경험을 했어요.</div>
                        <div className='bottom-review-text'>주도적으로 모임에 잘 참여해 주셨어요.</div>
                        <div className='bottom-review-text'>대화코드가 잘 맞아 즐겁게 대화할 수 있었어요.</div>
                        <div className='bottom-review-text'>대화코드가 잘 맞아 즐겁게 대화할 수 있었어요.</div>
                        <div className='bottom-review-text'>대화코드가 잘 맞아 즐겁게 대화할 수 있었어요.</div>
                        <div className='bottom-review-text'>대화코드가 잘 맞아 즐겁게 대화할 수 있었어요.</div>
                        <div className='bottom-review-text'>대화코드가 잘 맞아 즐겁게 대화할 수 있었어요.</div>
                        <div className='bottom-review-text'>대화코드가 잘 맞아 즐겁게 대화할 수 있었어요.</div>
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
