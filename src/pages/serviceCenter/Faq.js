import { useEffect, useState } from 'react';
import style from './Faq.module.css';

const faqList = [
    {
        category: "서비스",
        question: '링크비(LINKBEE)는 어떤 서비스인가요?',
        answer: '링크비는 공연 및 전시 티켓 정보를 제공하고, 이를 통해 사용자들이 다른 사람들과 모임(허니팟)을 만들어 활동할 수 있는 매칭 서비스를 제공하는 플랫폼입니다.',
    },
    {
        category: "회원",
        question: '링크비에 가입하려면 어떻게 해야 하나요?',
        answer: '링크비 웹사이트나 모바일 앱을 통해 가입할 수 있습니다. 회원가입 시 기본 정보와 관심사 등을 입력하여 맞춤형 허니팟을 찾을 수 있습니다.',
    },
    {
        category: "서비스",
        question: '링크비를 통해 어떤 공연과 전시 정보를 얻을 수 있나요?',
        answer: '링크비는 다양한 장르의 공연(공연, 뮤지컬 등)과 전시(전시회, 팝업 등)에 대한 정보를 제공합니다. 최신 정보는 웹사이트나 앱에서 확인할 수 있습니다.',
    },
    {
        category: "기능",
        question: '티켓은 어떻게 구매할 수 있나요?',
        answer: '링크비는 티켓 정보를 제공하며, 실제 티켓 구매는 링크비와 제휴된 티켓 판매처를 통해 이루어집니다. 링크비 웹사이트나 앱에서 티켓 구매 링크를 클릭하면 해당 판매처로 이동하여 구매할 수 있습니다.',
    },
    {
        category: "기능",
        question: '링크비의 매칭 서비스는 어떻게 작동하나요?',
        answer: '링크비는 사용자가 관심 있는 공연이나 전시를 선택하면, 같은 관심사를 가진 다른 사용자들과의 허니팟을 주선해줍니다. 사용자는 제안된 허니팟에 참여하거나 새로운 허니팟을 만들 수 있습니다.',
    },
    {
        category: "서비스",
        question: '허니팟에 참여하려면 비용이 드나요?',
        answer: '링크비의 기본 허니팟 참여는 무료입니다. 다만, 일부 특별 이벤트나 유료 공연/전시의 경우 티켓 비용이 발생할 수 있습니다.',
    },
    {
        category: "서비스",
        question: '안전한 허니팟 참여를 위해 어떤 조치를 취하고 있나요?',
        answer: '링크비는 사용자의 안전한 허니팟 참여를 위해 평점 시스템을 운영하고 있습니다. 허니팟에 참여한 사용자들의 평점을 확인하고 신뢰할 수 있는 허니팟을 선택할 수 있습니다.',
    },
    {
        category: "서비스",
        question: '링크비의 고객센터는 어떻게 연락할 수 있나요?',
        answer: '링크비 고객센터는 웹사이트나 앱의 \'고객센터\' > \'1:1문의하기\'를 통해 문의사항을 접수할 수 있습니다.',
    },
    {
        category: "서비스",
        question: '링크비의 취소 및 환불 정책은 어떻게 되나요?',
        answer: '티켓 취소 및 환불은 각 티켓 판매처의 정책에 따릅니다. 링크비는 이를 중개할 뿐 직접적인 환불 처리는 하지 않습니다. 티켓 구매 시 해당 판매처의 취소 및 환불 정책을 꼭 확인하시기 바랍니다.',
    },
    {
        category: "기능",
        question: '링크비 앱은 어디서 다운로드할 수 있나요?',
        answer: '링크비 앱은 구글 플레이스토어에서 \'링크비(LINKBEE)\'를 검색하여 다운로드할 수 있습니다.',
    },
    {
        category: "기능",
        question: '허니팟을 직접 주최하려면 어떻게 해야 하나요?',
        answer: '링크비 앱이나 웹사이트에서 \'허니팟 만들기\' 메뉴를 선택하여 허니팟을 생성할 수 있습니다. 허니팟 주제, 시간, 장소, 참가 인원 등을 입력하고, 생성된 허니팟은 다른 사용자들에게 노출됩니다.',
    },
    {
        category: "회원",
        question: '링크비 회원이 실수로 회원 정보를 잘못 입력했을 경우 어떻게 수정할 수 있나요?',
        answer: '링크비 회원은 마이페이지의 개인정보 수정 메뉴를 통해 회원 정보를 언제든지 수정할 수 있습니다. 이름, 이메일 주소, 비밀번호 등의 개인정보를 수정할 수 있으며, 필요한 경우 추가 정보도 업데이트할 수 있습니다.',
    },
    {
        category: "기능",
        question: '마음에 드는 허니팟을 찾지 못했을 때 어떻게 해야 하나요?',
        answer: '마음에 드는 허니팟을 찾지 못했을 경우, 링크비 앱이나 웹사이트에서 새로운 허니팟을 직접 생성할 수 있습니다. 이를 통해 관심사를 공유하는 새로운 사람들과의 만남을 주선할 수 있습니다.',
    },
    {
        category: "기능",
        question: '허니팟의 후기는 어떻게 작성하나요?',
        answer: '허니팟에 참여한 후에는 링크비 앱이나 웹사이트에서 해당 허니팟에 대한 후기를 작성할 수 있습니다. 후기는 다른 사용자들이 허니팟을 선택하는 데 큰 도움이 됩니다.',
    },
    {
        category: "회원",
        question: '링크비에 가입한 후 개인정보 변경은 어떻게 하나요?',
        answer: '링크비 웹사이트나 모바일 앱의 \'마이페이지\'에서 \'프로필 수정\' 옵션을 통해 이름, 관심사 등 개인정보를 변경할 수 있습니다.',
    },
    {
        category: "서비스",
        question: '링크비는 국제적인 공연 및 전시 정보도 제공하나요?',
        answer: '현재 링크비는 주로 국내 공연 및 전시 정보를 제공하고 있습니다. 다만, 점차적으로 서비스 영역을 확대하여 국제적인 공연 및 전시 정보도 제공할 계획입니다.',
    },
    {
        category: "서비스",
        question: '링크비의 이용 시간은 어떻게 되나요?',
        answer: '링크비는 24시간 이용 가능합니다. 다만, 고객센터 운영 시간은 평일 오전 9시부터 오후 6시까지입니다. 이 시간 외에 접수된 문의는 다음 영업일에 처리됩니다.',
    },
    {
        category: "기능",
        question: '링크비에서 참여한 허니팟 기록은 어디서 확인할 수 있나요?',
        answer: '링크비 앱이나 웹사이트의 \'마이페이지\' 메뉴에서 참여한 허니팟의 기록을 확인할 수 있습니다. 과거 참여한 허니팟과 작성한 후기를 한눈에 볼 수 있습니다.',
    },
    {
        category: "회원",
        question: '링크비의 이용 약관은 어디서 확인할 수 있나요?',
        answer: '링크비의 이용 약관은 웹사이트 하단 메뉴, 앱에서 \'이용 약관\'을 클릭하여 확인할 수 있습니다. 회원 가입 시 이용 약관에 동의해야 하며, 이후 이용 과정에서 필요할 때 언제든지 다시 확인할 수 있습니다.',
    }, {
        category: "회원",
        question: '링크비의 이용 약관은 어디서 확인할 수 있나요?',
        answer: '링크비의 이용 약관은 웹사이트 하단 메뉴, 앱에서 \'이용 약관\'을 클릭하여 확인할 수 있습니다. 회원 가입 시 이용 약관에 동의해야 하며, 이후 이용 과정에서 필요할 때 언제든지 다시 확인할 수 있습니다.',
    }
];

function FaqPage() {
    const [search, setSearch] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [select, setSelect] = useState("전체");
    const [filterFaqs, setFilterFaqs] = useState(faqList);
    const [isOpen, setIsOpen] = useState(Array(faqList.length).fill(false));
    const [currentPage, setCurrentPage] = useState(1);
    const faqsPerPage = 10;
    const totalPages = Math.ceil(filterFaqs.length / faqsPerPage);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = () => {
        setSearchValue(search);
        const filtered = faqList.filter(faq => {
            const matchCategory = select === "전체" || faq.category === select;
            const matchSearch = search === "" || faq.question.includes(search) || faq.answer.includes(search);
            return matchCategory && matchSearch;
        });
        setFilterFaqs(filtered);
        setCurrentPage(1);

        console.log(select);
        console.log(search);
    };

    const enterKey = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSelect = (e) => {
        setSelect(e.target.value);
    };

    const toggleFAQ = (index) => {
        setIsOpen((prev) =>
            prev.map((item, i) => (i === index ? !item : ""))
        );
    };

    useEffect(() => {
        setIsOpen(Array(faqList.length).fill(false));
    }, [currentPage]);

    const LastFaq = currentPage * faqsPerPage;
    const firstFaq = LastFaq - faqsPerPage;
    const currentFaqs = filterFaqs.slice(firstFaq, LastFaq);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevGroup = () => {
        const firstGroup = Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
        if (firstGroup > 1) {
            setCurrentPage(firstGroup - 1);
        }
    };

    const handleNextGroup = () => {
        const NextGroup = Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + maxPageNumbers + 1;
        if (NextGroup <= totalPages) {
            setCurrentPage(NextGroup);
        }
    };

    const maxPageNumbers = 5;
    const currentGroup = Math.floor((currentPage - 1) / maxPageNumbers);
    const startPage = currentGroup * maxPageNumbers + 1;
    const endPage = Math.min(totalPages, (currentGroup + 1) * maxPageNumbers);

    const pagination = [];
    for (let i = startPage; i <= endPage; i++) {
        pagination.push(
            <li key={i} className={currentPage === i ? style.activePage : null}>
                <button onClick={() => handlePageClick(i)}>{i}</button>
            </li>
        );
    }

    return (
        <div className={style.wrapper}>
            <div className={style.contentBox}>
                <p className={style.pageTitle}>링크비 고객센터</p>
                <div className={style.inputBox}>
                    <select className={style.customSelect} onChange={handleSelect} value={select}>
                        <option value="전체">전체</option>
                        <option value="회원">회원</option>
                        <option value="기능">기능</option>
                        <option value="서비스">서비스</option>
                    </select>
                    <input className={style.customInput} type="text" onChange={onChange} onKeyPress={enterKey} placeholder="검색어를 입력해주세요." />
                    <button className={style.submitBtn} onClick={() => { handleSubmit(); toggleFAQ(); }}>
                        <img src='/images/serviceCenter/search.png' alt='검색' />
                    </button>
                </div>
                <div className={style.subTitleBox}>
                    <img src="/images/commons/icon_bee.png" alt="자주 묻는 질문" width={30} />
                    <p className={style.subTitle}>자주 묻는 질문</p>
                </div>
                <div className={style.listBox}>
                    <ul>
                        {currentFaqs.map((faq, index) => (
                            <li key={index}>
                                <label type="button" className={style.faqHeader} onClick={() => toggleFAQ(index)}>
                                    <p className={style.faqTitle}>{faq.question}</p>
                                    <img className={isOpen[index] ? style.arrowOpen : style.arrowClosed} src="./images/serviceCenter/icon_arrow_right.png" alt="화살표" width={25} />
                                </label>
                                <div className={isOpen[index] ? `${style.faqBody} ${style.active}` : style.faqBody}>
                                    <hr className={style.contentLine} />
                                    <p className={style.content}>{faq.answer}</p>
                                </div>
                                <hr className={style.hrLine} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={style.pagination}>
                    <ul className={style.paginationList}>
                        <li>
                            <button onClick={handlePrevGroup} disabled={startPage === 1} className={startPage === 1 ? style.disabled : ''}>&lt;</button>
                        </li>
                        {pagination}
                        <li>
                            <button onClick={handleNextGroup} disabled={endPage === totalPages} className={endPage === totalPages ? style.disabled : ''}>&gt;</button>
                        </li>
                    </ul>
                </div>
                <p className={style.helpMessage}>찾는 내용이 없을 경우 전화나 1:1문의 바랍니다.</p>
                <div className={style.inquiryBoxAll}>
                    <div className={style.call}>
                        <img className={style.inquiryIcon} src="./images/commons/icon_phone_main_color.png" alt="전화" />
                        <div>
                            <p className={style.phoneInquiryTitle}>전화상담</p>
                            <p className={style.number}>1588-1599</p>
                            <p className={style.phoneInquiryText}>평일 9:00 ~ 18:00 | 주말 및 공휴일 휴무</p>
                        </div>
                    </div>
                    <div className={style.inquiry}>
                        <img className={style.inquiryIcon} src="./images/commons/icon_inquiry_main_color.png" alt="1:1문의하기" />
                        <div>
                            <a href="/inquiry" className={style.inquiryIinkButton}>
                                <p className={style.inquiryTitle}>1:1 문의하기</p>
                                <img className={style.arrowIcon} src="./images/commons/icon_arrow.png" alt="화살표" />
                            </a>
                            <p className={style.inquiryText}>얼리벗에 궁금한 사항을 문의해 주세요.</p>
                            <p className={style.inquiryText}>최대한 빠른 시일 내에 답변해드리겠습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FaqPage;
