import './MyInquiry.css';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import MyInquiryDetail from './MyInquiryDetail';

function MyInquiry({myInquiryList}) {

    const [hasData, setHasData] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState(null); // 기본값 null
    const [showList, setShowList] = useState(true);           // 기본값 true
    const navigate = useNavigate();

    useEffect(() => {
        setHasData(myInquiryList.length > 0);
    }, [myInquiryList]);

    const handleInquiryClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowList(false);
    };

    const closeInquiryDetail = () => {
        setSelectedInquiry(null);
        setShowList(true);
    };

    return (
        <div className='inquiry-container'>
            {showList && (
                <>
                    {!hasData ? (
                        <div className='inquiry-null'>
                            <p>문의 내역이 없습니다.</p>
                            <div className='goto-inquiry-btn' onClick={() => {navigate('/inquiry')}}>
                                + 1:1 문의 하러 가기
                            </div>
                        </div>
                    ) : (
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
                                        {myInquiryList.map((inquiry) => (
                                            <tr key={inquiry.inquiryCode} className='inquiry-view' onClick={() => handleInquiryClick(inquiry)}>
                                                <td className='td-inquiry'>
                                                    <p className='inquiry-title'>[{inquiry.category}] {inquiry.title}</p>
                                                    <p>{inquiry.content.length > 50 ? inquiry.content.substring(0, 50) + '...' : inquiry.content}</p>
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
            )}
            {selectedInquiry && (
                <MyInquiryDetail inquiry={selectedInquiry} onClose={closeInquiryDetail} />
            )}
        </div>
    );
}

export default MyInquiry;