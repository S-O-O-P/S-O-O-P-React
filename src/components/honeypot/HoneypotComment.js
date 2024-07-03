import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HoneypotComment.css';
import HoneypotApi from '../../apis/honeypot/HoneypotApi';

function HoneypotComment({ detailHoneypot }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        honeypotCode: detailHoneypot.honeypotCode,
        content: '',
        writerInfo: {
            userCode: 11 // 로그인한 사용자 코드
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
        HoneypotApi({setComments}, detailHoneypot);
        
    }, [detailHoneypot.honeypotCode], comments);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewComment({
            ...newComment,
            [name]: value,
            writingTime: new Date()
        });
    };

    const addComment = async () => {
        if (newComment.content.trim() !== '') {
            try {
                const currentTime = new Date();
    
                const response = await axios.post('http://localhost:8081/honeypot/comment', {
                    honeypotCode: newComment.honeypotCode,
                    writerInfo: {
                        userCode: newComment.writerInfo.userCode
                    },
                    content: newComment.content,
                    writingTime: currentTime,
                    updateTime: null
                });
    
                // 새로 등록된 댓글을 받아와서 comments 상태에 추가
                const newCommentData = response.data;
                setComments([...comments, newCommentData]);
    
                setNewComment({
                    ...newComment,
                    content: ''
                });

                HoneypotApi({setComments}, detailHoneypot);

                // window.location.reload();
                // setRefreshNeeded(true); // 댓글 추가 후 한 번만 리프레시 필요 상태 업데이트
            
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
            content: value
        });
    };

    const saveEditedComment = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/honeypot/comment/${editedComment.commentCode}`, {
                commentCode: editedComment.commentCode,
                honeypotCode: editedComment.honeypotCode,
                userCode: editedComment.userCode,
                content: editedComment.content,
                updateTime: new Date().toISOString() // ISO 8601 형식으로 변환
            });
    
            const updatedComment = response.data.results.comment;
    
            // 서버에서 수정된 댓글 데이터를 받아오고 나서 UI를 업데이트
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

    return (
        <div className="detail-comment-container">
            <div className='comment-top'>
                <p>댓글</p>
                <div className='honeypot-delete'>
                    <img src={`${process.env.PUBLIC_URL}/images/commons/icon_delete_main_color.png`} alt="delete icon"/>
                    <p>삭제</p>
                </div>
            </div>
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
                                <p className='comment-regdate'>등록일: {comment.writingTime}</p>
                                {comment.updateTime && <p className='comment-editdate'>수정일: {comment.updateTime}</p>}
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
                                    <button onClick={() => startEditingComment(comment)}>수정</button>
                                    <p>|</p>
                                    <button onClick={() => deleteComment(comment.commentCode)}>삭제</button>
                                </div>
                            )}
                    </div>
                    ))
                }
                <div className='comment-write'>
                    <p>로그인한사람닉네임</p>
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
