import './MainCategory.css'

function MainCategory(
    {
        tempList,
        categoryStatus,
        setCategoryStatus,
        setExhibitionCnt,
        setPerformanceCnt,
        setMusicalCnt,
        setFestivalCnt,
        setPopupCnt,
        setDate,
        setShowMannerDateModal
      }) {

    function todayHandler(){
        setCategoryStatus(1);
        setDate(new Date);
        setShowMannerDateModal(false);
    }

    function genreHandler(){
        setCategoryStatus(2)

        let exhibitionCount = 0;
        let performanceCount = 0;
        let musicalCount = 0;
        let festivalCount = 0;
        let popupCount = 0;

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
    
        setExhibitionCnt(exhibitionCount);
        setPerformanceCnt(performanceCount);
        setMusicalCnt(musicalCount);
        setFestivalCnt(festivalCount);
        setPopupCnt(popupCount);
        setDate(new Date);
        setShowMannerDateModal(false);
      }

    function dateHandler(){
        setCategoryStatus(3);
        setShowMannerDateModal(true);
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