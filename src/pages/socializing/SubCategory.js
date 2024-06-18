import { NavLink } from "react-router-dom"

function SubCategory(){
    return(
        <>
            <div>
                <NavLink to='genre'>
                    <button>
                        전체보기
                    </button>
                </NavLink>
                <NavLink to='exhibition'>
                    <button>
                        전시회
                    </button>
                </NavLink>
                <NavLink to='performance'>
                    <button>
                        공연
                    </button>
                </NavLink>
                <NavLink to='musical'>
                    <button>
                        뮤지컬
                    </button>
                </NavLink>
                <NavLink to='festival'>
                    <button>
                        행사/축제
                    </button>
                </NavLink>
                <NavLink to='popup'>
                    <button>
                        팝업
                    </button>
                </NavLink>
            </div>
        </>
    )
}

export default SubCategory