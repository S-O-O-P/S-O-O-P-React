import './MainCategory.css'

function MainCategory({tempList,setCopyList,setIsChange,setPage,categoryStatus,setCategoryStatus,setSearchVal}) {

    function onclickTodayHandler(){
        setCategoryStatus(1)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
        setSearchVal('')
    }

    function onclickGenreHandler(){
        setCategoryStatus(2)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
    }

    function onclickDateHandler(){
        setCategoryStatus(3)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
        setSearchVal('')
    }

    return (
        <>
            <div className='main-category-box'>
                <div className={categoryStatus === 1 ? 'selected-category' : 'main-category'} onClick={onclickTodayHandler}>
                    투데이
                </div>
                <div className={categoryStatus === 2 ? 'selected-category' : 'main-category'} onClick={onclickGenreHandler}>
                    장르별
                </div>
                <div className={categoryStatus === 3 ? 'selected-category' : 'main-category'} onClick={onclickDateHandler}>
                    일정별
                </div>
            </div>
        </>
    )
}

export default MainCategory;