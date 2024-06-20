import { useState } from 'react';
import style from './Inquiry.module.css';
import { NavLink } from 'react-router-dom';

function InquiryPage() {

    const [selected, setSelected] = useState("전체");
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const [content, setContent] = useState("");
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = () => {
        console.log("유형:", selected);
        console.log("제목:", title);
        console.log("내용:", content);
    };

    return (
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
                        <input className={style.customInput} type='text' name="title" placeholder='제목을 입력해주세요.' value={title} onChange={handleTitleChange} />
                    </div>
                    <div className={style.inqyiryContentBox}>
                        <div className={style.inquiryCategoryContent}>
                            <p className={style.inquiryCategory}>내용</p>
                            <p className={style.point}>*</p>
                        </div>
                        <textarea className={style.customContentInput} name="content" placeholder='내용을 입력해주세요.' value={content} onChange={handleContentChange}></textarea>
                    </div>
                    <div className={style.buttons}>
                        <button type='button' className={style.cancelButton}>취소</button>
                        <NavLink to="/help">
                            <button type='submit' className={style.submitButton} onClick={handleSubmit}>등록</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InquiryPage;
