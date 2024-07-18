import { useNavigate, Link } from "react-router-dom";
import "./HoneypotList.css";

function HoneypotList({ currentPage, setCurrentPage, pageGroup, setPageGroup, honeypots, user }) {
  
  const honeypotsPerPage = 10;

  // 비활성화 필터링
  const activeHoneypots = honeypots.filter(honeypot => honeypot.visibilityStatus === "활성화")

  // 진행완료 필터링
  const finishedHoney = activeHoneypots.filter(honeypot => honeypot.closureStatus !== "진행완료" )

  // 현재 페이지에 맞는 데이터 필터링
  const indexOfLastHoneypot = currentPage * honeypotsPerPage;
  const indexOfFirstHoneypot = indexOfLastHoneypot - honeypotsPerPage;
  const currentHoneypots = finishedHoney.slice(
    indexOfFirstHoneypot,
    indexOfLastHoneypot
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(finishedHoney.length / honeypotsPerPage);
  const maxPageButtons = 5;
  const totalGroups = Math.ceil(totalPages / maxPageButtons);

  const startPage = pageGroup * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  const handleCurrentPageGroupFirstPage = () => {
    const currentPageGroupStartPage = pageGroup * maxPageButtons + 1;
    setCurrentPage(currentPageGroupStartPage);
  };

  const handleCurrentPageGroupLastPage = () => {
    const currentPageGroupStartPage = pageGroup * maxPageButtons + 1;
    const currentPageGroupEndPage = Math.min(currentPageGroupStartPage + maxPageButtons - 1, totalPages);
    setCurrentPage(currentPageGroupEndPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage === startPage) {
        setPageGroup(pageGroup - 1);
      }
    } else if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage(endPage - maxPageButtons + 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (currentPage === endPage) {
        setPageGroup(pageGroup + 1);
      }
    } else if (pageGroup < totalGroups - 1) {
      setPageGroup(pageGroup + 1);
      setCurrentPage(startPage + 1);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="honeypot-list-container">
      {finishedHoney.length === 0 ? (
        <div className="honeypot-null-box">
          <img src={`${process.env.PUBLIC_URL}/images/commons/logo.png`} alt="null page" />
          <p className="honeypot-null-txt">아직 등록된 허니팟이 없어요</p>
          <p className="honeypot-null-txt">지금 바로 허니팟 호스트가 되어 주세요</p>
        </div>
      ) : (
        <>
          {currentHoneypots.map((honeypot, index) => (
            <div key={index} className="one-honeypot-index"
             onClick={ () => {navigate(`/honeypot/${honeypot.honeypotCode}`)}}>
              <div className="honeypot-index-poster">
                <img src={honeypot.poster} alt="포스터이미지" />
                <hr className="honeypot-dashed" />
              </div>
              <div className="honeypot-index-info">
                <div className="top-info">
                  <div className="region-info">{honeypot.region}</div>
                  <div className="category-info">{honeypot.interestName}</div>
                  <div className="honeypot-status">{honeypot.closureStatus}</div>
                </div>
                <p className="honeypot-title">{honeypot.honeypotTitle}</p>
                <div className="honeypot-schedule">
                  <div>일정</div>
                  <p className="honeypot-date">{honeypot.eventDate}</p>
                  <p className="total-member">
                    참여인원 {honeypot.approvedCount + 1} / {honeypot.totalMember}
                  </p>
                </div>
                <p className="end-date">{honeypot.endDate} 까지 모집해요</p>
              </div>
            </div>
          ))}
          <div className="pagination-container">
            <div className="pagination">
              <button className='first-btn' onClick={handleCurrentPageGroupFirstPage} disabled={currentPage === 1}>
                &lt;&lt;
              </button>
              <button className='prev-btn' onClick={handlePrevPage} disabled={currentPage === 1}>
                &lt;
              </button>
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <button
                  key={index}
                  className={`page-button ${startPage + index === currentPage ? 'active' : ''}`}
                  onClick={() => setCurrentPage(startPage + index)}
                >
                  {startPage + index}
                </button>
              ))}
              <button className='next-btn' onClick={handleNextPage} disabled={currentPage === totalPages}>
                &gt;
              </button>
              <button className='last-btn' onClick={handleCurrentPageGroupLastPage} disabled={currentPage === totalPages}>
                &gt;&gt;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HoneypotList;