import './MyInquiry.css';
import {useState} from 'react';

function MyInquiry() {

    let [자료있음, 자료변경] = useState(true);

    return (
        <>
        { 
        자료있음 == false ? (
            <div className='inquiry-null'>
                <p>문의 내역이 없습니다.</p>
                <div className='goto-inquiry-btn'>+ 1:1 문의 하러 가기</div>
            </div>
        ) : (
            <div className='inquiry-available'>

            <div className='participation-honeypot'>
                <p>문의 내역</p>
            </div>
            <div className='mypage-table-container'>
                <table>
                    <tr className='tr-title'>
                        <th className='th-inquiry'>문의내역</th>
                        <th className='th-registration-date'>작성일</th>
                        <th className='th-responsestatus'>답변여부</th>
                        
                    </tr>
                    <tr className='inquiry-view'>
                        <td className='td-inquiry'>
                            <p className='inquiry-title'>[일이 생겨서 모임을 못갔어요]</p>
                            <p>일이 생겨서 모임에 불참했는데 활동에 불이익이 있을까요?</p>
                            </td>
                        <td className='td-registration-date'>2024.06.03</td>
                        <td className='td-responsestatus'>답변대기</td>
                    </tr>
                </table>
            </div>
        </div>
        )}
        </>
    );
}

export default MyInquiry;