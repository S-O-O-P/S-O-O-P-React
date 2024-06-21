import { useState } from 'react';
import style from './Notice.module.css';
import { Link } from 'react-router-dom';

function NoticePage() {

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const [selected, setSelected] = useState("전체");
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.contentBox}>
                    <p className={style.pageTitle}>링크비 고객센터</p>

                    <div className={style.inputBox}>
                        <select className={style.customSelect} onChange={handleSelect} value={selected}>
                            <option value="전체">전체</option>
                            <option value="공지사항">공지사항</option>
                            <option value="이벤트">이벤트</option>
                        </select>
                        <input className={style.customInput} type='text' onChange={onChange} placeholder='검색어를 입력해주세요.' value={search} />
                    </div>

                    <p className={style.helpMessage}>찾는 내용이 없을 경우 전화나 1:1문의 바랍니다.</p>

                    <div className={style.inquiryBoxAll}>
                        <div className={style.call}>
                            <img className={style.inquiryIcon} src="./images/commons/icon_phone_main_color.png" alt="전화"></img>
                            <div>
                                <p className={style.phoneInquiryTitle}>전화상담</p>
                                <p className={style.number}>1588-1599</p>
                                <p className={style.phoneInquiryText}>평일 9:00 ~ 18:00 | 주말 및 공휴일 휴무</p>
                            </div>
                        </div>
                        <div className={style.inquiry}>
                            <img className={style.inquiryIcon} src="./images/commons/icon_inquiry_main_color.png" alt="1:1문의하기"/>
                            <div>
                                <Link to="/inquiry" className={style.inquiryIinkButton}>
                                    <p className={style.inquiryTitle}>1:1 문의하기</p>
                                    <img className={style.arrowIcon} src="./images/commons/icon_arrow.png" alt="화살표"></img>
                                </Link>
                                <p className={style.inquiryText}>얼리벗에 궁금한 사항을 문의해 주세요.</p>
                                <p className={style.inquiryText}>최대한 빠른 시일 내에 답변해드리겠습니다.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default NoticePage;