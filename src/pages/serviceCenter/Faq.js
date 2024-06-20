import { useState } from 'react';
import style from './Faq.module.css';
import { Link } from 'react-router-dom';

function FaqPage() {

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }

    const [selected, setSelected] = useState("전체");
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const [isOpen, setIsOpen] = useState([false, false, false, false, false, false, false, false, false, false]);

    const toggleFAQ = (index) => {
        setIsOpen(prev => prev.map((item, i) => i === index ? !item : item));
        console.log(isOpen[index]);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.contentBox}>
                <p className={style.pageTitle}>링크비 고객센터</p>

                <div className={style.inputBox}>
                    <select className={style.customSelect} onChange={handleSelect} value={selected}>
                        <option value="전체">전체</option>
                        <option value="회원">회원</option>
                        <option value="기능">기능</option>
                        <option value="서비스">서비스</option>
                    </select>
                    <input className={style.customInput} type='text' onChange={onChange} placeholder='검색어를 입력해주세요.' value={search} />
                </div>

                <div className={style.subTitleBox}>
                    <img src="/images/commons/icon_bee.png" alt='자주 묻는 질문' width={30} />
                    <p className={style.subTitle}>자주 묻는 질문</p>
                </div>

                <div className={style.Box}>
                    <ul>
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(0)}>
                                <p className={style.faqTitle}>링크비(LINKBEE)는 어떤 서비스인가요?</p>
                                <img className={isOpen[0] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            <div className={isOpen[0] == true ? `${style.faqBody} ${style.active}` : style.faqBody}>
                                {/* <hr className={style.hrLine} /> */}
                                <p>링크비는 공연 및 전시 티켓 정보를 제공하고, 이를 통해 사용자들이 다른 사람들과 모임(허니팟)을 만들어 활동할 수 있는 매칭 서비스를 제공하는 플랫폼입니다.</p>
                            </div>
                            {/* {isOpen[0] && (
                                <div className={isOpen==true ? `${style.faqBody}.active`: style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비는 공연 및 전시 티켓 정보를 제공하고, 이를 통해 사용자들이 다른 사람들과 모임(허니팟)을 만들어 활동할 수 있는 매칭 서비스를 제공하는 플랫폼입니다.</p>
                                </div>
                            )} */}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(1)}>
                                <p className={style.faqTitle}>링크비에 가입하려면 어떻게 해야 하나요?</p>
                                <img className={isOpen[1] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[1] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비 웹사이트나 모바일 앱을 통해 가입할 수 있습니다.</p>
                                    <p>회원가입 시 기본 정보와 관심사 등을 입력하여 맞춤형 허니팟을 찾을 수 있습니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(2)}>
                                <p className={style.faqTitle}>링크비를 통해 어떤 공연과 전시 정보를 얻을 수 있나요?</p>
                                <img className={isOpen[2] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[2] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비는 다양한 장르의 공연(공연, 뮤지컬 등)과 전시(전시회, 팝업 등)에 대한 정보를 제공합니다.</p>
                                    <p>최신 정보는 웹사이트나 앱에서 확인할 수 있습니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(3)}>
                                <p className={style.faqTitle}>티켓은 어떻게 구매할 수 있나요?</p>
                                <img className={isOpen[3] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[3] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비는 티켓 정보를 제공하며, 실제 티켓 구매는 링크비와 제휴된 티켓 판매처를 통해 이루어집니다.</p>
                                    <p>링크비 웹사이트나 앱에서 티켓 구매 링크를 클릭하면 해당 판매처로 이동하여 구매할 수 있습니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(4)}>
                                <p className={style.faqTitle}>링크비의 매칭 서비스는 어떻게 작동하나요?</p>
                                <img className={isOpen[4] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[4] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비는 사용자가 관심 있는 공연이나 전시를 선택하면, 같은 관심사를 가진 다른 사용자들과의 허니팟을 주선해줍니다. 사용자는 제안된 허니팟에 참여하거나 새로운 허니팟을 만들 수 있습니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(5)}>
                                <p className={style.faqTitle}>허니팟에 참여하려면 비용이 드나요?</p>
                                <img className={isOpen[5] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[5] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비의 기본 허니팟 참여는 무료입니다.</p>
                                    <p>다만, 일부 특별 이벤트나 유료 공연/전시의 경우 티켓 비용이 발생할 수 있습니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(6)}>
                                <p className={style.faqTitle}>안전한 허니팟 참여를 위해 어떤 조치를 취하고 있나요?</p>
                                <img className={isOpen[6] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[6] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비는 사용자의 안전한 허니팟 참여를 위해 평점 시스템을 운영하고 있습니다.</p>
                                    <p>허니팟에 참여한 사용자들의 평점을 확인하고 신뢰할 수 있는 허니팟을 선택할 수 있습니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(7)}>
                                <p className={style.faqTitle}>링크비의 고객센터는 어떻게 연락할 수 있나요?</p>
                                <img className={isOpen[7] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[7] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비 고객센터는 웹사이트나 앱의 '고객센터' &gt; '1:1문의하기'를 통해 문의사항을 접수할 수 있습니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(8)}>
                                <p className={style.faqTitle}>링크비의 취소 및 환불 정책은 어떻게 되나요?</p>
                                <img className={isOpen[8] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[8] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>티켓 취소 및 환불은 각 티켓 판매처의 정책에 따릅니다.</p>
                                    <p>링크비는 이를 중개할 뿐 직접적인 환불 처리는 하지 않습니다.</p>
                                    <p>티켓 구매 시 해당 판매처의 취소 및 환불 정책을 꼭 확인하시기 바랍니다.</p>
                                </div>
                            )}
                        </li>
                        <hr className={style.hrLine} />
                        <li>
                            <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(9)}>
                                <p className={style.faqTitle}>링크비 앱은 어디서 다운로드할 수 있나요?</p>
                                <img className={isOpen[9] ? style.arrowOpen : style.arrowClosed} src='./images/serviceCenter/icon_arrow_right.png' alt="arrow" width={25} />
                            </label>
                            {isOpen[9] && (
                                <div className={style.faqBody}>
                                    <hr className={style.hrLine} />
                                    <p>링크비 앱은 구글 플레이스토어에서 '링크비(LINKBEE)'를 검색하여 다운로드할 수 있습니다.</p>
                                </div>
                            )}
                            <hr className={style.hrLine} />
                        </li>
                    </ul>
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

export default FaqPage;
