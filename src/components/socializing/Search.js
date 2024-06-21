import './Search.css'

function Search({searchVal,setSearchVal}) {
    return(
        <>
            <div className='search-box'>
                <input type="text" placeholder="제목으로 검색하기" value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}}></input>
            </div>
        </>
    )
}

export default Search;