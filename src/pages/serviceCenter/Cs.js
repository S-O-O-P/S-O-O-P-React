import { useState } from "react"
import style from './Cs.module.css';
import { Link } from "react-router-dom";

function CsPage() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.contentBox}>
                <p className={style.pageTitle}>링크비 고객센터</p>
                <div className={style.listBoxAll}>
                    <div className={style.box}>
                        <div className={style.subTitleBox}>
                            <span>
                                <img className={style.beeImg} src="/images/commons/icon_bee.png" alt="자주 묻는 질문" />
                                <span className={style.subTitle}>자주 묻는 질문</span>
                            </span>
                            <Link to="/faq" className={style.linkButton}>더보기&gt;</Link>
                        </div>
                        <div className={style.listBox}></div>
                    </div>

                    <div className={style.box}>
                        <div className={style.subTitleBox}>
                            <span className={style.subTitle}>공지사항</span>
                            <Link to="/notice" className={style.linkButton}>더보기&gt;</Link>
                        </div>
                        <div className={style.listBox}></div>
                    </div>
                </div>
                <p className={style.helpMessage}>찾는 내용이 없을 경우 전화나 1:1문의 바랍니다.</p>

                <div className={style.inquiryBoxAll}>
                    <div className={style.call}>
                        <img className={style.callIcon} src="./images/commons/icon_phone_main_color.png"></img>
                        <div>
                            <p className={style.iquiryTitle}>전화상담</p>
                            <p className={style.number}>1588-1599</p>
                            <p className={style.iquiryText}>평일 9:00 ~ 18:00 | 주말 및 공휴일 휴무</p>
                        </div>
                    </div>
                    <div className={style.inquiry}>
                        <img className={style.callIcon} src="./images/commons/icon_inquiry_main_color.png"></img>
                        <div>
                            <p className={style.iquiryTitle}>1:1 문의하기</p>
                            <img src="./images/commons/icon_arrow.png"></img>
                            <p className={style.iquiryText}>얼리벗에 궁금한 사항을 문의해 주세요.</p>
                            <p className={style.iquiryText}>최대한 빠른 시일 내에 답변해드리겠습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CsPage