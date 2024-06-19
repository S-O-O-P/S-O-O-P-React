import { useState } from 'react';
import style from './Inquiry.module.css';

function InquiryPage() {

    const [selected, setSelected] = useState("전체");
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const [inquiryTitle, setInquiryTitle] = useState('');

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
                    <div className={style.inqyiryCategoryBox}>
                        <div className={style.inqyiryCategory}>
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
                        <div className={style.inqyiryCategory}>
                            <p>제목</p>
                            <p className={style.point}>*</p>
                        </div>
                        <input className={style.customInput} type='text' placeholder='제목을 입력해주세요.'></input>
                    </div>
                    <div className={style.inqyiryContentBox}>
                        <div className={style.inqyiryCategoryContent}>
                            <p>내용</p>
                            <p className={style.point}>*</p>
                        </div>
                        <textarea className={style.customContentInput} type='text' placeholder='내용을 입력해주세요.'></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InquiryPage;