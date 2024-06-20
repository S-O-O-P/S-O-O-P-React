import './MainCategory.css'

function MainCategory(
    {
        tempList,
        setCopyList,
        setIsChange,
        categoryStatus,
        setCategoryStatus,
        setSearchVal,
        setPage,
        setExhibitionCnt,
        setPerformanceCnt,
        setMusicalCnt,
        setFestivalCnt,
        setPopupCnt }) {

    function todayHandler(){
        setCategoryStatus(1)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
        setSearchVal('')
    }

    function genreHandler(){
        setCategoryStatus(2)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)

        let exhibitionCount = 0;
        let performanceCount = 0;
        let musicalCount = 0;
        let festivalCount = 0;
        let popupCount = 0;
    
        // tempList를 순회하며 각 honeyGenre 값에 따라 카운터 증가
        tempList.forEach(item => {
          switch (item.honeyGenre) {
            case '전시회':
              exhibitionCount++;
              break;
            case '공연':
              performanceCount++;
              break;
            case '뮤지컬':
              musicalCount++;
              break;
            case '행사_축제':
              festivalCount++;
              break;
            case '팝업':
              popupCount++;
              break;
            default:
              break;
          }
        });
    
        // 각 카운터 상태 업데이트
        setExhibitionCnt(exhibitionCount);
        setPerformanceCnt(performanceCount);
        setMusicalCnt(musicalCount);
        setFestivalCnt(festivalCount);
        setPopupCnt(popupCount);
      }

    function dateHandler(){
        setCategoryStatus(3)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
        setSearchVal('')
    }


    return (
        <>
            <div className='main-category-box'>
                <div className={categoryStatus === 1 ? 'selected-category' : 'main-category'} onClick={todayHandler}>
                    투데이
                </div>
                <div className={categoryStatus === 2 ? 'selected-category' : 'main-category'} onClick={genreHandler}>
                    장르별
                </div>
                <div className={categoryStatus === 3 ? 'selected-category' : 'main-category'} onClick={dateHandler}>
                    일정별
                </div>
            </div>
        </>
    )
}

export default MainCategory;