import './MyHoneypot.css';
import {useState} from 'react';

function MyHoneypot() {

    let [자료있음, 자료변경] = useState(true);

    return (
        <>
        { 
        자료있음 == false ? (
            <div className='honeypot-null'>
                <p>내가 만든 허니팟이 없습니다.</p>
                <div className='find-honeypot-btn'>허니팟 만들기</div>
            </div>
        ) : (
            <div className='honeypot-available'>

            <div className='participation-honeypot'>
                <p>진행 중인 허니팟</p>
                <select className='select_renewal'>
                    <option>정렬1</option>
                    <option>정렬2</option>
                    <option>정렬3</option>
                </select>
                <div className='search-wrapper'>
                    <input className='text-search' type='text' value={'검색'} />
                    <button className='submit-btn' type='submit'></button>
                </div>
            </div>
            <div>
                <table className='mypage-table-container'>
                    <tr className='tr-title'>
                        <th className='th-category'>카테고리</th>
                        <th className='th-title'>제목</th>
                        <th className='th-meetday'>모임일</th>
                        <th className='th-region'>모임지역</th>
                        <th className='th-members'>참여인원</th>
                    </tr>
                    <tr className='one-honeypot-info'>
                        <td className='td-category'>팝업</td>
                        <td className='td-title'>대상혁 숭배하러 가실 분</td>
                        <td className='td-meetday'>6월 6일(목)</td>
                        <td className='td-region'>강남구</td>
                        <td className='td-members'>1/2</td>
                    </tr>
                    <tr className='one-honeypot-info'>
                        <td className='td-category'>전시</td>
                        <td className='td-title'>[더현대] 서양 전시 800년 展</td>
                        <td className='td-meetday'>6월 16일(일)</td>
                        <td className='td-region'>영등포구</td>
                        <td className='td-members'>3/5</td>
                    </tr>
                </table>
            </div>

            {/* 마이페이지 메인 - 참여중인 허니팟 O */}
        </div>
        )}
        

            {/* 마이페이지 메인 - 참여중인 허니팟 X */}

            

            {/* 마이페이지 메인 - 참여중인 허니팟 X */}

            {/* 마이페이지 메인 - 참여중인 허니팟 O */}

        </>
    );
}

export default MyHoneypot;