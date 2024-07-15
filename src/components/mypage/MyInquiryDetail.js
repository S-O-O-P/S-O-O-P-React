import React from 'react';
import './MyInquiryDetail.css';

function MyInquiryDetail({ inquiry, onClose }) {
    return (
        <div className="inquiry-detail-overlay">
                <div className="inquiry-detail-header">
                    <p>1:1 문의 내역</p>
                </div>
                <div className="inquiry-detail-content">
                    <div className='one-inquiry-detail-index'>
                        <div className='index-detail-name'>유형</div>
                        <div className='inquiry-detail-category'>{inquiry.category}</div>
                        <div className='index-detail-name'>작성일자</div>
                        <div className='inquiry-detail-category'>{inquiry.inquiryDate}</div>
                        <div className='index-detail-name'>답변상태</div>
                        <div className='inquiry-detail-category'>{inquiry.answerStatus}</div>
                    </div>
                    <div className='one-inquiry-detail-index'>
                        <div className='index-detail-name'>제목</div>
                        <div className='inquiry-detail-title'>{inquiry.title}</div>
                    </div>
                    <div className='one-inquiry-detail-index2'>
                        <div className='index-detail-name'>내용</div>
                        <div className='inquiry-detailapi-content'>{inquiry.content}</div>
                    </div>
                    <div className='one-inquiry-detail-index2'>
                        <div className='index-detail-name'>답변</div>
                        <div className='inquiry-detailapi-answer'>{inquiry.answer}</div>
                    </div>
                </div>
                
            <button className='close-inquiry-btn' onClick={onClose}>뒤로가기</button>

        </div>
    );
}

export default MyInquiryDetail;