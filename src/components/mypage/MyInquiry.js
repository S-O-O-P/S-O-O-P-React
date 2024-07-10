import './MyInquiry.css';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

function MyInquiry({myInquiryList}) {

    const [hasData, setHasData] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // myInquiryList의 길이가 0일 때 데이터가 없는 것으로 처리
        if (myInquiryList.length === 0) {
            setHasData(false);
        } else {
            setHasData(true);
        }
    }, [myInquiryList]);

    return (
        <>
        {!hasData ? ( // hasData가 false일 때
                <div className='inquiry-null'>
                    <p>문의 내역이 없습니다.</p>
                    <div className='goto-inquiry-btn' onClick={() => {navigate('/inquiry')}}>
                        + 1:1 문의 하러 가기
                    </div>
                </div>
            ) : ( // hasData가 true일 때
                <div className='inquiry-available'>
                    <div className='participation-honeypot'>
                        <p>문의 내역</p>
                    </div>
                    <div className='mypage-table-container'>
                        <table>
                            <thead>
                                <tr className='tr-title'>
                                    <th className='th-inquiry'>문의내역</th>
                                    <th className='th-registration-date'>작성일</th>
                                    <th className='th-responsestatus'>답변여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myInquiryList.map((inquiry, index) => (
                                    <tr key={index} className='inquiry-view'>
                                        <td className='td-inquiry'>
                                            <p className='inquiry-title'>[{inquiry.category}]</p>
                                            <p>{inquiry.content}</p>
                                        </td>
                                        <td className='td-registration-date'>{inquiry.inquiryDate}</td>
                                        <td className='td-responsestatus'>{inquiry.answerStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyInquiry;