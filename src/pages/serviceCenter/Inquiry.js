import { useState } from 'react';
import style from './Inquiry.module.css';
import { useNavigate } from 'react-router-dom';
import { inquiryAPI } from '../../apis/serviceCenter/Inquiry';

function InquiryPage({ user }) {

    const navigate = useNavigate();
    const [selected, setSelected] = useState("전체");
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const [content, setContent] = useState("");
    const [inputCount, setInputCount] = useState(0);
    const handleContentChange = (e) => {
        setContent(e.target.value);
        setInputCount(e.target.value.length);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [writerModal, setWriterModal] = useState(false);

    const handleSubmit = async () => {
        const today = new Date();

        if (title !== "" && content !== "") {
            const data = {
                "category": selected,
                "title": title,
                "content": content,
                "userCode": user.userCode,
                "inquiryDate": today,
                "adminCode": 7
            };

            setModalOpen(true);

            try {
                const response = await inquiryAPI(data);
                console.log("response", response);
            } catch (error) {
                console.error("전송 실패", error);
            }

        } else {
            setWriterModal(true);
        }
    };

    const closeBtn = () => {
        setWriterModal(false);
    }
    const noticeBtn = () => {
        setModalOpen(false);
        navigate("/notice");
    }

    const [checkModal, setCheckModal] = useState(false);

    const handleCancel = () => {
        if (title !== "" || content !== "") {
            setCheckModal(true);
        } else {
            navigate(-1);
        }
    }

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.contentBox}>
                    <p className={style.pageTitle}>1:1 문의 접수</p>

                    <div className={style.required}>
                        <p className={style.point}>*</p>
                        <p>은 필수 작성 항목입니다.</p>
                    </div>
                    <hr className={style.hrLine} />

                    <div>
                        <div className={style.inquiryCategoryBox}>
                            <div className={style.inquiryCategory}>
                                <p>유형</p>
                                <p className={style.point}>*</p>
                            </div>
                            <select className={style.customSelect} onChange={handleSelect} value={selected}>
                                <option value="전체">전체</option>
                                <option value="회원">회원</option>
                                <option value="기능">기능</option>
                                <option value="서비스">서비스</option>
                            </select>
                        </div>
                        <div className={style.inqyiryTitleBox}>
                            <div className={style.inquiryCategory}>
                                <p>제목</p>
                                <p className={style.point}>*</p>
                            </div>
                            <input className={style.customInput} type='text' name="title" placeholder='제목을 입력해주세요.' value={title} onChange={handleTitleChange} maxLength={200} />
                        </div>
                        <div className={style.inqyiryContentBox}>
                            <div className={style.inquiryCategoryContent}>
                                <p className={style.inquiryCategory}>내용</p>
                                <p className={style.point}>*</p>
                            </div>
                            <textarea className={style.customContentInput} name="content" placeholder='내용을 입력해주세요.' value={content} onChange={handleContentChange} maxLength={500}></textarea>
                            <p className={style.inputCount}>{inputCount}/500</p>
                        </div>
                        <div className={style.buttons}>
                            <a>
                                <button type='button' className={style.cancelButton} onClick={() => { handleCancel() }}>취소</button>
                            </a>
                            <button type='submit' className={style.submitButton} onClick={() => { handleSubmit() }}>등록</button>
                        </div>
                    </div>
                </div>

                {/* 인꽈리모달 */}
                {modalOpen && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/serviceCenter/check.png' alt='확인' width={45} />
                            <p className={style.modalTitle}>1:1문의가 접수 되었습니다.</p>
                            <p className={style.modalContext}>문의 내용에 따라 답변이 늦어질 수 있습니다.</p>
                            <button className={style.modalButton} onClick={noticeBtn}>확인</button>
                        </div>
                    </div>
                )}
                {writerModal && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                            <p className={style.modalTitle}>제목과 내용을 모두 작성해주세요.</p>
                            <button className={style.modalButton} onClick={closeBtn}>확인</button>
                        </div>
                    </div>
                )}
                {checkModal && (
                    <div className={style.back}>
                        <div className={style.modal}>
                            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
                            <p className={style.modalTitle}>1:1문의 작성을 취소하시겠습니까?</p>
                            <p className={style.modalContext}>작성 취소된 내용은 되돌릴 수 없습니다.</p>
                            <div className={style.modalButtonBox}>
                                <button className={style.modalButton} onClick={() => setCheckModal(false)}>취소</button>
                                <button className={style.modalButton} onClick={() => navigate(-1)}>확인</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}

export default InquiryPage;
