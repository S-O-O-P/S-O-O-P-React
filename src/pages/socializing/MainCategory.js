import { NavLink } from "react-router-dom";

function MainCategory({tempList,setCopyList,setIsChange,setPage,setCategoryStatus}) {

    function onclickTodayHandler(){
        setCategoryStatus(1)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
    }

    function onclickGenreHandler(){
        setCategoryStatus(2)
        setCopyList(tempList)
        setIsChange(false)
        setPage(1)
    }

    function onclickDateHandler(){
        setCategoryStatus(3)
        setPage(1)
    }

    return (
        <>
            <div style={{marginTop:'60px'}}>
                <NavLink to='../honey'>
                    <button onClick={onclickTodayHandler}>투데이</button>
                </NavLink>
                <NavLink to='genre'>
                    <button onClick={onclickGenreHandler}>장르별</button>
                </NavLink>
                <NavLink to='date'>
                    <button onClick={onclickDateHandler}>일정별</button>
                </NavLink>
            </div>
        </>
    )
}

export default MainCategory;