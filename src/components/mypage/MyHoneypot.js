import './MyHoneypot.css';
import {useState} from 'react';

function MyHoneypot() {

    let [자료있음, 자료변경] = useState(true);
    const [searchWord, setSearchWord] = useState('');
    const [sortCriteria, setSortCriteria] = useState('빠른모임순');
    const [data, setData] = useState([
        { category: '팝업', title: '대상혁 숭배하러 가실 분', meetday: '6월 6일(목)', region: '강남구', members: '1/2' },
        { category: '전시', title: '[더현대] 서양 전시 800년 展', meetday: '6월 16일(일)', region: '영등포구', members: '3/5' }
    ]);
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchWord(value);
        filterAndSortData(value, sortCriteria);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortCriteria(value);
        filterAndSortData(searchWord, value);
    };

    const filterAndSortData = (searchWord, sortCriteria) => {
        let filtered = data.filter(item => item.title.includes(searchWord));

        if (sortCriteria === '빠른모임순') {
            filtered = filtered.sort((a, b) => new Date(a.meetday) - new Date(b.meetday));
        } else if (sortCriteria === '늦은모임순') {
            filtered = filtered.sort((a, b) => new Date(b.meetday) - new Date(a.meetday));
        } else if (sortCriteria === '카테고리별') {
            filtered = filtered.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortCriteria === '지역별') {
            filtered = filtered.sort((a, b) => a.region.localeCompare(b.region));
        }

        setFilteredData(filtered);
    };

    return (
        <>
        { 
        자료있음 == false ? (
            <div className='honeypot-null'>
                <p>내가 만든 허니팟이 없습니다.</p>
                <div className='find-honeypot-btn'>허니팟 만들기</div>
            </div>
        ) : (
            <div className='honeypot-available'>

            <div className='participation-honeypot'>
                <p>진행 중인 허니팟</p>
                <select className='mypage_select_renewal' value={sortCriteria} onChange={handleSortChange}>
                    <option value='빠른모임순'>빠른모임순</option>
                    <option value='늦은모임순'>늦은모임순</option>
                    <option value='카테고리별'>카테고리별</option>
                    <option value='지역별'>지역별</option>
                </select>
                <div className='mypage_search-wrapper'>
                    <input className='text-search' type='text' value={searchWord} onChange={handleSearch} placeholder="제목으로 검색"/>
                    <button className='submit-btn' type='submit'></button>
                </div>
            </div>
            <div>
                <table className='mypage-table-container'>
                    <tr className='tr-title'>
                        <th className='th-category'>카테고리</th>
                        <th className='th-title'>제목</th>
                        <th className='th-meetday'>모임일</th>
                        <th className='th-region'>모임지역</th>
                        <th className='th-members'>참여인원</th>
                    </tr>
                    {filteredData.map((item, index) => (
                        <tr className="one-honeypot-info" key={index}>
                            <td className='td-category'>{item.category}</td>
                            <td className='td-title'>{item.title}</td>
                            <td className='td-meetday'>{item.meetday}</td>
                            <td className='td-region'>{item.region}</td>
                            <td className='td-members'>{item.members}</td>
                        </tr>
                    ))}
                </table>
            </div>

            {/* 마이페이지 메인 - 참여중인 허니팟 O */}
        </div>
        )}
        

            {/* 마이페이지 메인 - 참여중인 허니팟 X */}

            

            {/* 마이페이지 메인 - 참여중인 허니팟 X */}

            {/* 마이페이지 메인 - 참여중인 허니팟 O */}

        </>
    );
}

export default MyHoneypot;