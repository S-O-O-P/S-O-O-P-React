import { useEffect, useState } from 'react';
import style from './Notice.module.css';
import { noticesAPI } from '../../apis/serviceCenter/Notice';
import { NavLink, useNavigate } from 'react-router-dom';

function NoticePage() {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [search, setSearch] = useState('');
    const [select, setSelect] = useState('all');
    const [filterNotice, setFilterNotice] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const noticePerPage = 10;
    const maxPageNumbers = 5;

    useEffect(() => {
        async function fetchNoticeData() {
            try {
                const noticeList = await noticesAPI();
                setNotices(noticeList);
                setFilterNotice(noticeList);
            } catch (error) {
                console.error('공지사항 불러오기 실패', error);
            }
        }
        fetchNoticeData();
    }, []);

    const inquiryBtn = () => {
        navigate("/inquiry");
    }

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = () => {
        const filtered = notices.filter(notice => {
            const matchCategory = select === '전체' || notice.category === select;
            const matchSearch = search === '' || notice.title.includes(search);
            return matchCategory && matchSearch;
        });
        setFilterNotice(filtered);
        setCurrentPage(1);
    };

    const enterKey = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSelect = (e) => {
        setSelect(e.target.value);
    };

    const totalPages = Math.ceil(filterNotice.length / noticePerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevGroup = () => {
        const firstGroup = Math.max(1, startPage - maxPageNumbers);
        setCurrentPage(firstGroup);
    };

    const handleNextGroup = () => {
        const nextGroup = Math.min(totalPages, endPage + 1);
        setCurrentPage(nextGroup);
    };

    const lastNotice = currentPage * noticePerPage;
    const firstNotice = lastNotice - noticePerPage;
    const currentNotice = filterNotice.slice(firstNotice, lastNotice);

    const startPage = Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    const pagination = [];
    for (let i = startPage; i <= endPage; i++) {
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
                        <select className={style.customSelect} onChange={handleSelect} value={select}>
                            <option value="전체">전체</option>
                            <option value="공지사항">공지사항</option>
                            <option value="이벤트">이벤트</option>
                        </select>
                        <input className={style.customInput} type="text" onChange={onChange} onKeyPress={enterKey} placeholder="검색어를 입력해주세요." />
                        <button className={style.submitBtn} onClick={handleSubmit}>
                            <img src='/images/serviceCenter/search.png' alt='검색' />
                        </button>
                    </div>

                    <p className={style.notice}>공지사항</p>

                    <table className={style.table}>
                        <tbody>
                            {currentNotice.map((notice) => (
                                <tr key={notice.noticeCode}>
                                    <td className={style.faqContent}>
                                        <NavLink to={`/notice/${notice.noticeCode}`} className={style.noticeTitle}>{notice.title}</NavLink>
                                    </td>
                                    <td className={style.faqContent}>{notice.regDate}</td>
                                    <td className={style.faqContent}>{notice.memberDTO.nickname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={style.pagination}>
                        <ul className={style.paginationList}>
                            <li>
                                <button onClick={handlePrevGroup} disabled={startPage === 1} className={startPage === 1 ? style.disabled : ''}>&lt;</button>
                            </li>
                            {pagination}
                            <li>
                                <button onClick={handleNextGroup} disabled={endPage >= totalPages} className={endPage >= totalPages ? style.disabled : ''}>&gt;</button>
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
                        <div className={style.inquiry} onClick={inquiryBtn}>
                            <img className={style.inquiryIcon} src="./images/commons/icon_inquiry_main_color.png" alt="1:1문의하기" />
                            <div>
                                <p className={style.inquiryIinkButton}>
                                    <p className={style.inquiryTitle}>1:1 문의하기</p>
                                    <img className={style.arrowIcon} src="./images/commons/icon_arrow.png" alt="화살표"></img>
                                </p>
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
