function Pagination({paginationList}) {
    return(
        <>
            <div>
                {paginationList.map((pageNum)=>{
                    return <span>{pageNum}</span>
                })}
            </div>
        </>
    )
}

export default Pagination;