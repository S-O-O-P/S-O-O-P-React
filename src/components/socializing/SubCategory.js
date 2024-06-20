
import { useEffect, useState } from 'react'
import './SubCategory.css'

function SubCategory({subCategoryStatus,setSubCategoryStatus,setCopyList,tempList,setIsChange,setPage,setSubKeyword}){

    function totalHandler() {
        setSubCategoryStatus(1)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
        setSubKeyword('전 체')
    }

    function exhibitionHandler() {
        setCopyList(tempList)
        const process = tempList.filter(honey => 
            honey.honeyGenre === '전시회'
        )
        setSubCategoryStatus(2)
        setCopyList(process)
        setIsChange(true)
        setPage(1)
        setSubKeyword('전시회')
    }

    function performanceHandler() {
        setCopyList(tempList)
        const process = tempList.filter(honey => 
            honey.honeyGenre === '공연'
        )
        setSubCategoryStatus(3)
        setCopyList(process)
        setIsChange(true)
        setPage(1)
        setSubKeyword('공 연')
    }

    function musicalHandler() {
        setCopyList(tempList)
        const process = tempList.filter(honey => 
            honey.honeyGenre === '뮤지컬'
        )
        setSubCategoryStatus(4)
        setCopyList(process)
        setIsChange(true)
        setPage(1)
        setSubKeyword('뮤지컬')
    }

    function festivalHandler() {
        setCopyList(tempList)
        const process = tempList.filter(honey => 
            honey.honeyGenre === '행사_축제'
        )
        setSubCategoryStatus(5)
        setCopyList(process)
        setIsChange(true)
        setPage(1)
        setSubKeyword('축제 및 행사')
    }

    function popupHandler() {
        setCopyList(tempList)
        const process = tempList.filter(honey => 
            honey.honeyGenre === '팝업'
        )
        setSubCategoryStatus(6)
        setCopyList(process)
        setIsChange(true)
        setPage(1)
        setSubKeyword('팝 업')
    }

    return(
        <>
            <div className='sub-category-box'>
                {/* 각 서브카테고리 클릭 시, filter() 함수 이용해 장르 키워드를 비교한다 */}
                <div className={subCategoryStatus === 1 ? 'selected-sub': 'sub-category'} onClick={totalHandler}>
                    전체보기<span className={subCategoryStatus === 1? 'selected-count':'list-count'}>{tempList.length}</span>
                </div>
                <div className={subCategoryStatus === 2 ? 'selected-sub': 'sub-category'} onClick={exhibitionHandler}>
                    전시회<span className={subCategoryStatus === 2? 'selected-count':'list-count'}>{tempList.length}</span>
                </div>
                <div className={subCategoryStatus === 3 ? 'selected-sub': 'sub-category'} onClick={performanceHandler}>
                    공 연<span className={subCategoryStatus === 3? 'selected-count':'list-count'}>{tempList.length}</span>
                </div>
                <div className={subCategoryStatus === 4 ? 'selected-sub': 'sub-category'} onClick={musicalHandler}>
                    뮤지컬<span className={subCategoryStatus === 4? 'selected-count':'list-count'}>{tempList.length}</span>
                </div>
                <div className={subCategoryStatus === 5 ? 'selected-sub': 'sub-category'} onClick={festivalHandler}>
                    행사/축제<span className={subCategoryStatus === 5? 'selected-count':'list-count'}>{tempList.length}</span>
                </div>
                <div className={subCategoryStatus === 6 ? 'selected-sub': 'sub-category'} onClick={popupHandler}>
                    팝 업<span className={subCategoryStatus === 6? 'selected-count':'list-count'}>{tempList.length}</span>
                </div>

                
            </div>
        </>
    )
}

export default SubCategory