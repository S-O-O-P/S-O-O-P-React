import './MyHoneypot.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyHoneypot({ myHoneypotList }) {
    const [searchWord, setSearchWord] = useState('');
    const [sortCriteria, setSortCriteria] = useState('빠른모임순');
    const [filteredData, setFilteredData] = useState([]);
    const [hasData, setHasData] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // myHoneypotList의 길이가 0일 때 데이터가 없는 것으로 처리
        if (myHoneypotList.length === 0) {
            console.log('마이허니팟이존재해?', myHoneypotList)
            setHasData(false);
        } else {
            setHasData(true);
            console.log('마이허니팟이존재해?', myHoneypotList)
            setFilteredData(myHoneypotList); // 초기 데이터 설정
        }
    }, [myHoneypotList]);

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
        let filtered = myHoneypotList.filter(item => item.honeypotTitle.includes(searchWord));

        if (sortCriteria === '빠른모임순') {
            filtered = filtered.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
        } else if (sortCriteria === '늦은모임순') {
            filtered = filtered.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        } else if (sortCriteria === '카테고리별') {
            filtered = filtered.sort((a, b) => a.interestName.localeCompare(b.interestName));
        } else if (sortCriteria === '지역별') {
            filtered = filtered.sort((a, b) => a.region.localeCompare(b.region));
        }

        setFilteredData(filtered);
    };

    return (
        <>
            {hasData === false ? (
                <div className='honeypot-null'>
                    <p>내가 만든 허니팟이 없습니다.</p>
                    <div className='find-honeypot-btn' onClick={() => navigate('/honeypot/c')}>허니팟 만들기</div>
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
                            <thead>
                                <tr className='tr-title'>
                                    <th className='th-category'>카테고리</th>
                                    <th className='th-title'>제목</th>
                                    <th className='th-meetday'>모임일</th>
                                    <th className='th-region'>모임지역</th>
                                    <th className='th-members'>참여인원</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr className="one-honeypot-info" key={index} onClick={() => {navigate(`/honeypot/detail/${item.honeypotCode}`)}}>
                                        <td className='td-category'>{item.interestName}</td>
                                        <td className='td-title'>{item.honeypotTitle}</td>
                                        <td className='td-meetday'>{item.eventDate}</td>
                                        <td className='td-region'>{item.region}</td>
                                        <td className='td-members'>{item.approvedCount + 1} / {item.totalMember}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyHoneypot;
