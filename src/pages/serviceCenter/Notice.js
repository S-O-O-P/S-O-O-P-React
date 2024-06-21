import { useState } from 'react';
import style from './Notice.module.css';
import { Link } from 'react-router-dom';

function NoticePage() {

    const [search, setSearch] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [selected, setSelected] = useState("전체");
    // const [filteredFaqs, setFilteredFaqs] = useState(faqList);
    const [currentPage, setCurrentPage] = useState(1);
    const faqsPerPage = 10;
    // const totalPages = Math.ceil(filteredFaqs.length / faqsPerPage);

    const onChange = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };

    const handleSubmit = () => {
        setSearchValue(search);
        // const filtered = faqList.filter(faq => {
        //     const matchCategory = selected === "전체" || faq.category === selected;
        //     const matchSearch = search === "" || faq.question.includes(search) || faq.answer.includes(search);
        //     return matchCategory && matchSearch;
        // });
        // setFilteredFaqs(filtered);
        setCurrentPage(1);
        console.log(selected);
        console.log(searchValue);
    };

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const indexOfLastFaq = currentPage * faqsPerPage;
    const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
    // const currentFaqs = filteredFaqs.slice(indexOfFirstFaq, indexOfLastFaq);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pagination = [];
    // for (let i = 1; i <= totalPages; i++) {
    //     pagination.push(
    //         <li key={i} className={currentPage === i ? style.activePage : null}>
    //             <button onClick={() => handlePageClick(i)}>{i}</button>
    //         </li>
    //     );
    // }
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.contentBox}>
                    <p className={style.pageTitle}>링크비 고객센터</p>

                    <div className={style.inputBox}>
                        <select className={style.customSelect} onChange={handleSelect} value={selected}>
                            <option value="all">전체</option>
                            <option value="notice">공지사항</option>
                            <option value="event">이벤트</option>
                        </select>
                        <input className={style.customInput} type="text" onChange={onChange} placeholder="검색어를 입력해주세요." />
                        <button className={style.submitBtn} onClick={handleSubmit}>
                            <img src='/images/serviceCenter/search.png' alt='검색' />
                        </button>
                    </div>

                    <p className={style.helpMessage}>찾는 내용이 없을 경우 전화나 1:1문의 바랍니다.</p>

                    {/* {currentFaqs.map((faq, index) => (
                        <li key={index}>
                                <hr className={style.contentLine} />
                                <p className={style.content}>{faq.answer}</p>
                            <hr className={style.hrLine} />
                        </li>
                    ))} */}

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
                            <img className={style.inquiryIcon} src="./images/commons/icon_inquiry_main_color.png" alt="1:1문의하기" />
                            <div>
                                <a href="/inquiry" className={style.inquiryIinkButton}>
                                    <p className={style.inquiryTitle}>1:1 문의하기</p>
                                    <img className={style.arrowIcon} src="./images/commons/icon_arrow.png" alt="화살표"></img>
                                </a>
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