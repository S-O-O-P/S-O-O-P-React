import React, { useState } from 'react';
import './HoneypotComment.css';

function HoneypotComment() {
    const [comments, setComments] = useState([
        {
            id: 1,
            profilepic: `${process.env.PUBLIC_URL}/images/honeypot/jeonsomin.PNG`,
            nickname: '전소민',
            comment: '시간은 언제로 생각하고 계시나요?',
            regdate: '2024.06.27 10:59',
            editdate: ''
        },
        {
            id: 2,
            profilepic: `${process.env.PUBLIC_URL}/images/honeypot/neogoolman.jpg`,
            nickname: '너굴너굴너굴맨',
            comment: '너굴너굴 너어어굴??',
            regdate: '2024.06.27 12:33',
            editdate: ''
        },
    ]);

    const [newComment, setNewComment] = useState({
        profilepic: `${process.env.PUBLIC_URL}/images/honeypot/jeonsomin.PNG`,
        nickname: '전소민',
        comment: '',
        regdate: ''
    });

    const [editedComment, setEditedComment] = useState({
        id: null,
        comment: '',
        profilepic: '',
        nickname: '',
        regdate: '',
        editdate: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewComment({
            ...newComment,
            [name]: value,
            regdate: getCurrentDateTime() // 댓글 작성 시 현재 시간으로 설정
        });
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;

        return `${year}.${month}.${day} ${hour}:${minute}`;
    };

    const addComment = () => {
        if (newComment.comment.trim() !== '') {
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    ...newComment,
                    editdate: ''
                }
            ]);
            setNewComment({
                ...newComment,
                comment: ''
            });
        }
    };

    const deleteComment = (id) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    };

    const editComment = () => {
        const updatedComments = comments.map(comment =>
            comment.id === editedComment.id ? { ...comment, comment: editedComment.comment, editdate: getCurrentDateTime() } : comment
        );
        setComments(updatedComments);
        setEditedComment({
            id: null,
            comment: '',
            profilepic: '',
            nickname: '',
            regdate: '',
            editdate: ''
        });
    };

    return (
        <div className="detail-comment-container">
            <div className='comment-top'>
                <p>댓글</p>
                <div className='honeypot-delete'>
                    <img src={`${process.env.PUBLIC_URL}/images/commons/icon_delete_main_color.png`}/>
                    <p>삭제</p>
                </div>
            </div>
            <div className='comment-main'>
                {comments.map((comment) => (
                    <div className='one-comment-index' key={comment.id}>
                        <img src={comment.profilepic} alt="프로필"/>
                        <div>
                            <p className='comment-nickname'>{comment.nickname}</p>
                            {editedComment.id === comment.id ? (
                                <textarea
                                    className='edit-textarea'
                                    value={editedComment.comment}
                                    onChange={(e) => setEditedComment({ ...editedComment, comment: e.target.value })}
                                />
                            ) : (
                                <p className='comment-content'>{comment.comment}</p>
                            )}
                            <div className='date-wrapper'>
                                <p className='comment-regdate'>등록일: {comment.regdate}</p>
                                {comment.editdate && <p className='comment-editdate'>수정일: {comment.editdate}</p>}
                            </div>
                        </div>
                        <div className='modify-delete'>
                            {editedComment.id === comment.id ? (
                                <button onClick={editComment}>저장</button>
                            ) : (
                                <button onClick={() => setEditedComment(comment)}>수정</button>
                            )}
                            <p>|</p>
                            <button onClick={() => deleteComment(comment.id)}>삭제</button>
                        </div>
                    </div>
                ))}
                <div className='comment-write'>
                    <p>{newComment.nickname}</p>
                    <textarea
                        className='write-textarea'
                        name='comment'
                        value={newComment.comment}
                        onChange={handleInputChange}
                        placeholder='댓글을 남겨보세요.'
                    />
                    <div className='comment-write-bottom'>
                        <p>0 / 500</p>
                        <button onClick={addComment}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoneypotComment;
