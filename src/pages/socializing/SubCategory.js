
function SubCategory({setCopyList,tempList,setIsChange,setPage}){

    function totalHandler() {
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
    }

    function exhibitionHandler() {
        const process = tempList.filter(honey => 
            honey.honeyGenre === '전시회'
        )
        setCopyList(process)
        setIsChange(true)
        setPage(1)
    }

    function performanceHandler() {
        const process = tempList.filter(honey => 
            honey.honeyGenre === '공연'
        )
        setCopyList(process)
        setIsChange(true)
        setPage(1)
    }

    function musicalHandler() {
        const process = tempList.filter(honey => 
            honey.honeyGenre === '뮤지컬'
        )
        setCopyList(process)
        setIsChange(true)
        setPage(1)
    }

    function festivalHandler() {
        const process = tempList.filter(honey => 
            honey.honeyGenre === '행사_축제'
        )
        setCopyList(process)
        setIsChange(true)
        setPage(1)
    }

    function popupHandler() {
        const process = tempList.filter(honey => 
            honey.honeyGenre === '팝업'
        )
        setCopyList(process)
        setIsChange(true)
        setPage(1)
    }

    return(
        <>
            <div>
                {/* 각 서브카테고리 클릭 시, 장르 키워드를 넘겨 .filter() 함수 이용한다 */}
                <button onClick={totalHandler}>
                    전체보기
                </button>
                <button onClick={exhibitionHandler}>
                    전시회
                </button>
                <button onClick={performanceHandler}>
                    공연
                </button>
                <button onClick={musicalHandler}>
                    뮤지컬
                </button>
                <button onClick={festivalHandler}>
                    행사/축제
                </button>
                <button onClick={popupHandler}>
                    팝업
                </button>

                
            </div>
        </>
    )
}

export default SubCategory