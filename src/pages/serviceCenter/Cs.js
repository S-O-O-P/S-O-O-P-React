import style from './Cs.module.css';
import { Link } from "react-router-dom";

function CsPage() {

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
                        <div className={style.listBox}>
                            <div className={style.faq}>
                                <img className={style.faqBeeImg} src="/images/commons/icon_bee.png" alt="자주 묻는 질문 아이콘"></img>
                                <Link to="/faq" className={style.faqContent}>링크비(LINKBEE)는 어떤 서비스인가요?</Link>
                            </div>
                            <hr className={style.hrLine} />
                            <div className={style.faq}>
                                <img className={style.faqBeeImg} src="/images/commons/icon_bee.png" alt="자주 묻는 질문 아이콘"></img>
                                <Link to="#" className={style.faqContent}>링크비에 가입하려면 어떻게 해야 하나요?</Link>
                            </div>
                            <hr className={style.hrLine} />
                            <div className={style.faq}>
                                <img className={style.faqBeeImg} src="/images/commons/icon_bee.png" alt="자주 묻는 질문 아이콘"></img>
                                <Link to="#" className={style.faqContent}>링크비를 통해 어떤 공연과 전시 정보를 얻을 수 있나요?</Link>
                            </div>
                            <hr className={style.hrLine} />
                            <div className={style.faq}>
                                <img className={style.faqBeeImg} src="/images/commons/icon_bee.png" alt="자주 묻는 질문 아이콘"></img>
                                <Link to="#" className={style.faqContent}>티켓은 어떻게 구매할 수 있나요?</Link>
                            </div>
                            <hr className={style.hrLine} />
                            <div className={style.faq}>
                                <img className={style.faqBeeImg} src="/images/commons/icon_bee.png" alt="자주 묻는 질문 아이콘"></img>
                                <Link to="#" className={style.faqContent}>링크비의 매칭 서비스는 어떻게 작동하나요?</Link>
                            </div>
                        </div>
                    </div>

                    <div className={style.box}>
                        <div className={style.subTitleBox}>
                            <span className={style.subTitle}>공지사항</span>
                            <Link to="/notice" className={style.linkButton}>더보기&gt;</Link>
                        </div>
                        <div className={style.listBox}>
                            <Link to="#" className={style.faqContent}>링크비(LINKBEE)는 어떤 서비스인가요?</Link>
                            <hr className={style.hrLine} />
                            <Link to="#" className={style.faqContent}>링크비에 가입하려면 어떻게 해야 하나요?</Link>
                            <hr className={style.hrLine} />
                            <Link to="#" className={style.faqContent}>링크비를 통해 어떤 공연과 전시 정보를 얻을 수 있나요?</Link>
                            <hr className={style.hrLine} />
                            <Link to="#" className={style.faqContent}>티켓은 어떻게 구매할 수 있나요?</Link>
                            <hr className={style.hrLine} />
                            <Link to="#" className={style.faqContent}>링크비의 매칭 서비스는 어떻게 작동하나요?</Link>
                        </div>
                    </div>
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
                        <img className={style.inquiryIcon} src="./images/commons/icon_inquiry_main_color.png" alt="1:1문의하기"></img>
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
    )
}

export default CsPage