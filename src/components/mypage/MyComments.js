import './MyComments.css';
import {useState} from 'react';

function MyComments() {

    let [자료있음, 자료변경] = useState(true);

    return (
        <>
        { 
        자료있음 == false ? (
            <div className='honeypot-null'>
                <p>작성한 댓글이 없습니다.</p>
            </div>
        ) : (
            <div className='honeypot-available'>

            <div className='participation-honeypot'>
                <p>내가 쓴 댓글</p>
            </div>
            <div className='mypage-table-container'>
                <table>
                    <tr className='tr-title'>
                        <th className='th-comment'>댓글</th>
                        <th className='th-registration-date'>작성일</th>
                        <th className='th-position'>포지션</th>
                        
                    </tr>
                    <tr className='comment-view'>
                        <td className='td-comment'>
                            <p className='comment-title'>[대상혁 숭배하러 가실분]</p>
                            <p>젠장 또 대상혁이야!? 강남만 가려 했는데, 대상혁을 보고 말았어, 이제 나는 숭배해야만해...그것이 대상혁을 목도한 자의 사명이다. 자 숭배를 시작하겠어.</p>
                        </td>
                        <td className='td-registration-date'>2024.06.03</td>
                        <td className='td-position'>참여자</td>
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

export default MyComments;