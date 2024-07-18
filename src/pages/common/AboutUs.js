import { useEffect } from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

function AboutUs() {

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0,0);
    })

    return (
        <div className='abous-us-main-content'>
            <div className='about-us-container'>
                <div className="about-us-header">
                    <p className='about-us-main-title'>링크비 - 함께 즐기는 문화생활</p>
                    <p className='sub-title'>우리는 문화를 통해 사람들을 연결합니다</p>
                    <p className='header-content'>링크비는 문화생활을 즐기는 사람들이 서로 연결되고 함께 경험을 나눌 수 있는 공연/전시 기반 모임 플랫폼입니다.<br />
                        <br/>
                        전시회, 콘서트, 뮤지컬, 연극, 페스티벌 등 다양한 문화 행사를 중심으로,<br/>
                        링크비는 비슷한 문화적 취향을 가진 사람들이 만나고 교류할 수 있는 기회를 제공합니다.<br />
                        <br/>
                        혼자 가기 어려웠던 공연이나 전시도, 링크비를 통해 함께 즐길 동행을 찾을 수 있습니다.<br />
                        <br/>
                        누군가의 특별한 문화 체험을 만들고, 예술적 취향이 통하는 친구를 연결하고, 새로운 장르를 통해 문화적 시야를 넓히게 하는 것.<br />
                        링크비가 하는 일은 사람들의 문화생활을 더욱 풍성하고 의미 있게 만드는 멋진 일입니다.<br />
                        <br/>
                        링크비와 함께라면, 더 이상 혼자가 아닌 다양한 사람들과 함께 문화의 달콤한 꿀을 나누는 특별한 경험을 할 수 있습니다.<br />
                        당신의 문화생활에 새로운 동행을 더해보세요!
                    </p>
                </div>
                <img className='line-image' src={`${process.env.PUBLIC_URL}/images/aboutus/image_linkbee_line.png`} alt="만남이미지"/>
                <div className="mission-section">
                    <p className='about-us-main-title'>우리의 미션</p>
                    <p className='about-us-content'>링크비는 공통의 관심사를 가진 사람들을 연결하여 더 풍부한 문화생활을 만들어갑니다.</p>
                </div>
                <img className='image-honeypot-list' src={`${process.env.PUBLIC_URL}/images/aboutus/image_honeypot_list.png`} alt="만남이미지"/>
                <div className="vision-section">
                    <p className='about-us-main-title'>우리의 비전</p>
                    <p className='about-us-content'>모든 이가 쉽고 즐겁게 문화 활동에 참여할 수 있는 세상을 만듭니다.</p>
                </div>
                <img className='honeypot_members' src={`${process.env.PUBLIC_URL}/images/aboutus/image_honeypot_members.png`} alt="만남이미지"/>

                <div className="values-section">
                    <p className='about-us-main-title'>핵심 가치</p>
                    <ul>
                        <li>연결 - 사람과 문화를 이어줍니다</li>
                        <li>다양성 - 모든 문화와 취향을 존중합니다</li>
                        <li>혁신 - 새로운 방식으로 문화를 즐깁니다</li>
                        <li>신뢰 - 안전하고 믿을 수 있는 플랫폼을 제공합니다</li>
                    </ul>
                </div>
                <div className="story-section">
                    <p className='about-us-main-title'>링크비 이야기</p>
                    <p className='about-us-content'>2024년, 문화생활을 좋아하는 청년들이 모여 링크비를 시작했습니다.<br />
                    우리는 혼자서는 즐기기 어려웠던 문화 활동을 함께 즐길 수 있는 플랫폼을 만들고자 했습니다.</p>
                    <p className='about-us-content'>현재 허니팟은 전시, 공연, 영화 등 다양한 분야에서 수천 명의 사용자들을 연결하고 싶습니다.<br />
                    우리는 앞으로도 더 많은 사람들이 풍요로운 문화생활을 누릴 수 있도록 노력할 것입니다.</p>
                </div>
                <div className="team-section">
                    <p className='about-us-main-title'>팀 소개</p>
                    <div className="team-members">
                        <div className="member">
                            <img src={`${process.env.PUBLIC_URL}/images/aboutus/nam.png`} alt="CEO" />
                            <h3>남지혜</h3>
                            <p>프로젝트매니저</p>
                        </div>
                        <div className="member">
                            <img src={`${process.env.PUBLIC_URL}/images/aboutus/lee.png`} alt="CTO" />
                            <h3>이민국</h3>
                            <p>형상관리자</p>
                        </div>
                        <div className="member">
                            <img src={`${process.env.PUBLIC_URL}/images/aboutus/kim.png`} alt="CTO" />
                            <h3>김만호</h3>
                            <p>DB관리자</p>
                        </div>
                        <div className="member">
                            <img src={`${process.env.PUBLIC_URL}/images/aboutus/yoon.png`} alt="CTO" />
                            <h3>윤해빈</h3>
                            <p>이슈 및 테스트 관리자</p>
                        </div>
                        <div className="member">
                            <img src={`${process.env.PUBLIC_URL}/images/aboutus/jin.png`} alt="CTO" />
                            <h3>김진용</h3>
                            <p>문서관리자</p>
                        </div>
                    </div>
                </div>
                <div className="about-us-footer">
                    <p className='about-us-main-title'>함께 만들어가는 문화의 장, 링크비와 함께하세요!</p>
                    <button className="go-to-linkbee-btn" onClick={() => {navigate('/main')}}>링크비 시작하기</button>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;