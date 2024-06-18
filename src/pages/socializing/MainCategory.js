import { NavLink } from "react-router-dom";

function MainCategory({setCategoryStatus}) {

    function onclickTodayHandler(){
        setCategoryStatus(1)
    }

    function onclickGenreHandler(){
        setCategoryStatus(2)
    }

    function onclickDateHandler(){
        setCategoryStatus(3)
    }

    return (
        <>
            <div>
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