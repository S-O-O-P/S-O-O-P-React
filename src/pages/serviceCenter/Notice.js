import { useState } from 'react';
import style from './Notice.module.css';
import { Link } from 'react-router-dom';

function NoticePage() {

    const currentNotices = [
        { title: "notice 제목 1", writer: "관리자 1", date: "2024-01-01", category: "notice" },
        { title: "notice 제목 2", writer: "관리자 2", date: "2024-02-01", category: "event" },
        { title: "notice 제목 3", writer: "관리자 3", date: "2024-03-01", category: "notice" },
        { title: "notice 제목 4", writer: "관리자 4", date: "2024-04-01", category: "event" },
        { title: "notice 제목 5", writer: "관리자 5", date: "2024-05-01", category: "notice" },
        { title: "notice 제목 6", writer: "관리자 6", date: "2024-05-01", category: "event" },
        { title: "notice 제목 7", writer: "관리자 7", date: "2024-05-01", category: "notice" },
        { title: "notice 제목 8", writer: "관리자 8", date: "2024-05-01", category: "event" },
        { title: "notice 제목 9", writer: "관리자 9", date: "2024-05-01", category: "notice" },
        { title: "notice 제목 10", writer: "관리자 10", date: "2024-05-01", category: "event" },
        { title: "notice 제목 11", writer: "관리자 11", date: "2024-05-01", category: "notice" },
        { title: "notice 제목 12", writer: "관리자 12", date: "2024-05-01", category: "event" },
        { title: "notice 제목 13", writer: "관리자 13", date: "2024-05-01", category: "notice" }
    ];

    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("all");
    const [filterednotices, setFilterednotices] = useState(currentNotices);
    const [currentPage, setCurrentPage] = useState(1);
    const noticesPerPage = 10;
    const totalPages = Math.ceil(filterednotices.length / noticesPerPage);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = () => {
        const filtered = currentNotices.filter(notice => {
            const matchCategory = selected === "all" || notice.category === selected;
            const matchSearch = search === "" || notice.title.includes(search);
            return matchCategory && matchSearch;
        });
        setFilterednotices(filtered);
        setCurrentPage(1);
    };

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const indexOfLastnotice = currentPage * noticesPerPage;
    const indexOfFirstnotice = indexOfLastnotice - noticesPerPage;
    const currentNotice = filterednotices.slice(indexOfFirstnotice, indexOfLastnotice);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
        pagination.push(
            <li key={i} className={currentPage === i ? style.activePage : null}>
                <button onClick={() => handlePageClick(i)}>{i}</button>
            </li>
        );
    }

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

                    <p className={style.notice}>공지사항</p>

                    <table className={style.table}>
                        <tbody>
                            {currentNotice.map((notice, index) => (
                                <tr key={index}>
                                    <td className={style.noticeTitle}><a href="/noticedetail">{notice.title}</a></td>
                                    <td>{notice.writer}</td>
                                    <td>{notice.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={style.pagination}>
                        <ul className={style.paginationList}>{pagination}</ul>
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
