import './MyComments.css';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';


function MyComments({ myCommentList }) {
    const [hasData, setHasData] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // myComments의 길이가 0일 때 데이터가 없는 것으로 처리
        if (myCommentList.length === 0) {
            setHasData(false);
        } else {
            setHasData(true);
        }
    }, [myCommentList]);

    return (
        <div className="my-comments">
            {hasData ? (
                <div className='honeypot-available'>
                    <div className='participation-honeypot'>
                        <p>내가 쓴 댓글</p>
                    </div>
                    <div className='mypage-table-container'>
                        <table>
                            <thead>
                                <tr className='tr-title'>
                                    <th className='th-comment'>댓글</th>
                                    <th className='th-registration-date'>작성일</th>
                                    <th className='th-position'>포지션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myCommentList.map(comment => (
                                    <tr key={comment.commentCode} className='comment-view' onClick={() => {navigate(`/honeypot/detail/${comment.honeypotCode}`)}}>
                                        <td className='td-comment'>
                                            <p className='comment-title'>[{comment.honeypotTitle}]</p>
                                            <p>{comment.content}</p>
                                        </td>
                                        <td className='td-registration-date'>{comment.writingTime}</td> 
                                        <td className='td-position'>{comment.userType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className='honeypot-null'>
                    <p>작성한 댓글이 없습니다.</p>
                </div>
            )}
        </div>
    );
}

export default MyComments;
