import './Search.css'

function Search({
            searchVal,
            setSearchVal,
            }) {

    function searchHandler(e){
        setSearchVal(e.target.value);
    }
    return(
        <>
            <div className='search-box'>
                <input type="text" placeholder="제목으로 검색하기" value={searchVal} onChange={searchHandler}></input>
            </div>
        </>
    )
}

export default Search;