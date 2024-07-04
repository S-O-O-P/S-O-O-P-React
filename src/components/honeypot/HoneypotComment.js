import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HoneypotComment.css';
import CommentApi from '../../apis/honeypot/CommentApi';

function HoneypotComment({ detailHoneypot, user }) {

    console.log('댓글 작성자:', user.nickname);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        honeypotCode: detailHoneypot.honeypotCode,
        content: '',
        writerInfo: {
            userCode: user.userCode
        }, 
        writingTime: '',
        updateTime: null
    });
    const [editedComment, setEditedComment] = useState({
        commentCode: detailHoneypot.commentCode,
        content: '',
        userCode: '',
        writingTime: '',
        updateTime: ''
    });

    useEffect(() => {
        CommentApi({ setComments }, detailHoneypot);
    }, [detailHoneypot.honeypotCode], comments);

    const getKoreanTime = () => {
        const date = new Date();
        const utcOffset = date.getTimezoneOffset() * 60000; // 분을 밀리초로 변환
        const kstOffset = 9 * 60 * 60000; // 9시간을 밀리초로 변환
        const kstTime = new Date(date.getTime() + utcOffset + kstOffset);
        return kstTime.toISOString(); // ISO 8601 형식으로 반환
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewComment({
            ...newComment,
            [name]: value,
            writingTime: getKoreanTime()
        });
    };

    const addComment = async () => {
        if (newComment.content.trim() !== '') {
            try {
                const currentTime = getKoreanTime();
    
                const response = await axios.post('http://localhost:8081/honeypot/comment', {
                    honeypotCode: newComment.honeypotCode,
                    writerInfo: {
                        userCode: user.userCode
                    },
                    content: newComment.content,
                    writingTime: currentTime,
                    updateTime: null
                });
    
                const newCommentData = response.data;
                setComments([...comments, newCommentData]);
    
                setNewComment({
                    ...newComment,
                    content: ''
                });

                CommentApi({ setComments }, detailHoneypot);
            
            } catch (error) {
                console.error('Failed to add comment:', error);
            }
        }
    };

    const deleteComment = async (commentCode) => {
        try {
            await axios.delete(`http://localhost:8081/honeypot/comment/${commentCode}`);
            const updatedComments = comments.filter(comment => comment.commentCode !== commentCode);
            setComments(updatedComments);
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
        }
    };

    const startEditingComment = (comment) => {
        setEditedComment(comment);
    };

    const handleEditCommentChange = (event) => {
        const { value } = event.target;
        setEditedComment({
            ...editedComment,
            content: value,
            updateTime: getKoreanTime() // 수정 시간 설정
        });
    };

    const saveEditedComment = async () => {
        try {
            const currentTime = getKoreanTime();

            const response = await axios.put(`http://localhost:8081/honeypot/comment/${editedComment.commentCode}`, {
                commentCode: editedComment.commentCode,
                honeypotCode: editedComment.honeypotCode,
                userCode: editedComment.userCode,
                content: editedComment.content,
                updateTime: currentTime
            });
    
            const updatedComment = response.data.results.comment;
    
            const updatedComments = comments.map(comment =>
                comment.commentCode === updatedComment.commentCode
                    ? { ...comment, content: updatedComment.content, updateTime: updatedComment.updateTime }
                    : comment
            );
    
            setComments(updatedComments);
            setEditedComment({
                commentCode: null,
                content: '',
                userCode: '',
                writingTime: '',
                updateTime: ''
            });

        } catch (error) {
            console.error('댓글 수정 실패:', error);
        }
    };

    const formatKoreanTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    };

    return (
        <div className="detail-comment-container">
            
            <div className='comment-main'>
                { comments.map((comment) => (
                    <div className='one-comment-index' key={comment.commentCode}>
                        <img src={comment.writerInfo?.profilePic || `${process.env.PUBLIC_URL}/images/commons/icon_mypage_colored.png`} alt="프로필"/>
                        <div>
                            <p className='comment-nickname'>{comment.writerInfo?.nickname || '사용자 닉네임'}</p>
                            {editedComment.commentCode === comment.commentCode ? (
                                <textarea
                                    className='edit-textarea'
                                    value={editedComment.content}
                                    onChange={handleEditCommentChange}
                                />
                            ) : (
                                <p className='comment-content'>{comment.content}</p>
                            )}
                            <div className='date-wrapper'>
                                <p className='comment-regdate'>등록일: {formatKoreanTime(comment.writingTime)}</p>
                                {comment.updateTime && <p className='comment-editdate'>수정일: {formatKoreanTime(comment.updateTime)}</p>}
                            </div>
                        </div>
                            {editedComment.commentCode === comment.commentCode ? (
                                <div className='modify-delete'>
                                    <button onClick={saveEditedComment}>저장</button>
                                    <p>|</p>
                                    <button onClick={() => setEditedComment({
                                        commentCode: null,
                                        content: '',
                                        userCode: '',
                                        writingTime: '',
                                        updateTime: ''
                                    })}>취소</button>
                                </div>
                            ) : (
                                <div className='modify-delete'>
                                    {comment.writerInfo.userCode === user.userCode && (
                                        <>
                                            <button onClick={() => startEditingComment(comment)}>수정</button>
                                            <p>|</p>
                                            <button onClick={() => deleteComment(comment.commentCode)}>삭제</button>
                                        </>
                                    )}
                                </div>
                            )}
                    </div>
                ))}
                <div className='comment-write'>
                    <p>{user.nickname}</p>
                    <textarea
                        className='write-textarea'
                        name='content'
                        value={newComment.content}
                        onChange={handleInputChange}
                        placeholder='댓글을 남겨보세요.'
                    />
                    <div className='comment-write-bottom'>
                        <p>{newComment.content.length} / 500</p>
                        <button onClick={addComment}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoneypotComment;
