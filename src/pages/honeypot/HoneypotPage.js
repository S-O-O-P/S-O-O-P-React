import HoneypotList from '../../components/honeypot/HoneypotList';
import './HoneypotPage.css'
import { useState } from 'react'

function HoneypotPage() {

    // 카테고리 용 더미카운터
    const count = [56, 18, 10, 12, 7, 9];

    return (
        <div className="main-content">
            <div className="honeypot-container">
                <div className="honeypot-title">
                    <p>허니팟</p>
                </div>
                <div className='honeypot-main'>
                    <div className="honeypot-category">
                        <button className='all-btn'>전시/행사 전체보기<span className='count'>{count[0]}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" /></button>
                        <button>팝업 <span className='count'>{count[1]}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" /></button>
                        <button>공연 <span className='count'>{count[2]}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" /></button>
                        <button>행사/축제 <span className='count'>{count[3]}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" /></button>
                        <button>전시회 <span className='count'>{count[4]}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" /></button>
                        <button>뮤지컬 <span className='count'>{count[5]}</span><img src={`${process.env.PUBLIC_URL}/images/commons/icon_arrow_right_main_color.png`} alt="오른쪽컬러화살표" /></button>
                    </div>
                    <hr className='honeypot-hr'/>
                    <div className='honeypot-sortandsearch-container'>
                        <select className='honeypot-sort'>
                            <option>등록순</option>
                        </select>
                        <select className='honeypot-sort region'>
                            <option>지역</option>
                        </select>
                        <div className='search-wrapper'>
                            <input className='text-search' type='text' placeholder="검색어를 입력하세요."/>
                            <button className='submit-btn' type='submit'></button>
                        </div>
                        <button className='create-honeypot'>허니팟<img src={`${process.env.PUBLIC_URL}/images/honeypot/icon_create_white.png`} alt="허니팟생성아이콘" /></button>
                    </div>
                    {/* 리스트 컴포넌트 */}
                    <HoneypotList/>
                </div>
                
            </div>
            
        </div>
    )
}

export default HoneypotPage;