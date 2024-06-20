import { useEffect, useState } from 'react';
import MainCategory from '../../components/socializing/MainCategory';
import Search from '../../components/socializing/Search';
import SubCategory from '../../components/socializing/SubCategory';
import './Honey.css';


export default function Honey(){

    const images = require.context('../../../public/images/socializing',false, /\.(png|jpe?g|svg)$/)

    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
    }

    const [categoryStatus, setCategoryStatus] = useState(1);
    const [subCategoryStatus, setSubCategoryStatus] = useState(1);
    const [copyList,setCopyList] = useState([]);
    const [page, setPage] = useState(1);
    const [isChange,setIsChange] = useState(false);
    const [searchVal,setSearchVal] = useState('');
    const [subKeyword,setSubKeyword] = useState('전체');

    
    // BE 작업용 실제 데이터 api state
    // const [list,setList] = useState([]);
    
    // FE 작업용 임시 데이터 state
    const [tempList,setTempList] = useState([
        {
            honeyId: 1,
            member: {memberId:31,nickname:'test111'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:1}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트1',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 2,
            member: {memberId:32,nickname:'test222'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:2}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트2',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 3,
            member: {memberId:33,nickname:'test333'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:3}],
            honeyGenre: '뮤지컬',
            honeyTitle: '허니팟 테스트3',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 4,
            member: {memberId:34,nickname:'test444'},
            ticket: {ticketId:4,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:4}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트4',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 5,
            member: {memberId:35,nickname:'test555'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:5}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트5',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 6,
            member: {memberId:36,nickname:'test666'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:6}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트6',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 7,
            member: {memberId:37,nickname:'test777'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:7,member:{memberId:37,nickname:'test777'}},{participantId:13,member:{memberId:22,nickname:'test2122'}}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트7',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'Y',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 8,
            member: {memberId:38,nickname:'test888'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:8,member:{memberId:38,nickname:'test888'}},{participantId:12,member:{memberId:21,nickname:'test212'}}],
            honeyGenre: '뮤지컬',
            honeyTitle: '허니팟 테스트8',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'Y',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 9,
            member: {memberId:39,nickname:'test999'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:9}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트9',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 10,
            member: {memberId:40,nickname:'test1110'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:10}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트10',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 11,
            member: {memberId:41,nickname:'test1111'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:11}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트11',
            honeyContent: '내용입니다. 내가 가장 좋아하는 음식은 김치찌개이고',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        }
    ]);
    
    
    // mount시, 최초에 가져온 원본 데이터 보관 & 가공할 카피 데이터 setState
    useEffect(
        ()=>{
            setCopyList(tempList)
        }
        ,[]
    )

    // [state] update시, 카테고리 변경시 목록 확인 로깅
    // useEffect(
    //     ()=>{
    //         console.log(isChange)
    //         console.log(copyList)
    //     },[copyList]
    // )
    
    function getPagingPost() {
        const filteredTempList = tempList.filter(honey => honey.honeyTitle.includes(searchVal));
        const filteredCopyList = copyList.filter(honey => honey.honeyTitle.includes(searchVal));
        const startIndex = (page - 1) * 10
        const endIndex = startIndex + 10
        const currentPosts = isChange? filteredCopyList.slice(startIndex, endIndex) : filteredTempList.slice(startIndex,endIndex)
        if (currentPosts.length === 0) {
            return [];
        }
        return currentPosts
    }
    function pageChange(pageNumber) {
        setPage(pageNumber);
    }
    
    return(
        <>
        <div className='honey-body'>
            <MainCategory tempList={tempList} 
                            setCopyList={setCopyList} 
                            setIsChange={setIsChange} 
                            setPage={setPage} 
                            categoryStatus={categoryStatus} 
                            setCategoryStatus={setCategoryStatus}
                            setSearchVal={setSearchVal}/>
            <div className='sub-category-padding'>
                {categoryStatus === 2 && <SubCategory subCategoryStatus={subCategoryStatus} 
                                                        setSubCategoryStatus={setSubCategoryStatus} 
                                                        setCopyList={setCopyList} 
                                                        tempList={tempList}
                                                        setIsChange={setIsChange} 
                                                        setPage={setPage}
                                                        setSubKeyword={setSubKeyword}/>}
            </div>
            <div className='honey-body2'>
                <Search searchVal={searchVal} setSearchVal={setSearchVal}/>
                <div className='main-category-title'>
                    {categoryStatus === 1 && <h2>투데이 허니팟</h2>}
                    {categoryStatus === 2 && 
                        <>
                            <h2>장르별 허니팟</h2>
                            <h2 style={{fontWeight:'bold',margin:'0 20px'}}>|</h2>
                            {subKeyword !== '축제 및 행사' ? 
                                <span style={{fontWeight:'bold',fontSize:'18px',marginTop:'5px'}}>{subKeyword}</span> 
                                : <span style={{fontWeight:'bold',fontSize:'16px',marginTop:'5px'}}>{subKeyword}</span>}
                        </>
                    }
                    {categoryStatus === 3 && <h2>일정별 허니팟</h2>}
                </div>
                <div>
                    <select>
                        <option>정렬</option>
                        <option>최신순</option>
                        <option>지역별</option>
                        <option>모집중</option>
                        <option>모집완료</option>
                    </select>
                </div>
                <div className='main-contents'>
                    {getPagingPost().map((honey,index) => (
                        <div className='honey-list' key={honey.honeyId}>
                            {honey.empty ? 
                                    <div>
                                        게시물이 없습니다.
                                    </div>
                                 : 
                                    <>
                                        <div className='img-box'>
                                            <img src={getImage(honey.ticket.ticketPoster)}/>
                                        </div>
                                        <div className='content-box'>
                                            <div style={{paddingBottom:'0px',marginTop:'10px'}}>
                                                <span style={{height:'50px'}}>#{honey.honeyGenre}</span>
                                                <span>모집일자 &nbsp;&nbsp;{honey.honeyAt}</span>
                                            </div>
                                            <div style={{paddingTop:'0px'}}>
                                                <span>{honey.honeyTitle}</span>
                                                {honey.honeyFullStatus === 'N' ? (
                                                    <span style={{marginLeft:'-90px',backgroundColor:'green',borderRadius:'20px',width:'55px',textAlign:'center',color:'#ffffff',fontSize:'12px'}}>모집중</span>
                                                ) : (
                                                    <span style={{marginLeft:'-90px',backgroundColor:'red',borderRadius:'20px',width:'55px',textAlign:'center',color:'#ffffff',fontSize:'12px'}}>모집완료</span>
                                                )}
                                                <span>참여인원 &nbsp;{honey.participant.length}/{honey.totalPeople}</span>
                                            </div>
                                            <div style={{width:'300px',height:'30px',display:'flex',justifyContent:'start',paddingLeft:'30px',paddingTop:'0px',paddingBottom:'0px'}}>
                                                {honey.honeyContent} 
                                            </div>
                                            <div style={{width:'100px',display:'flex',justifyContent:'end',paddingRight:'30px',paddingTop:'0px',lineHeight: '30px'}}>
                                                {honey.member.nickname}
                                            </div>
                                        </div>
                                    </> 
                            }
                        </div>
                    ))}
                </div>
                <div className='pagination-box'>
                    {Math.ceil(copyList.length / 10) > 1 ? 
                    <div className='pagination' 
                        onClick={()=>{page > 1 ? setPage(page-1): setPage(1)}}>
                        <img className='arrow-left' src={getImage('icon_arrow_right.png')}/>
                    </div> 
                    : <></>}
                    {Array.from({ length: Math.ceil(copyList.length / 10) }, (_, index) => (
                        <div key={index}
                            className='pagination'
                            onClick={() => pageChange(index + 1)}>
                                <p>
                                    {index + 1}
                                </p>
                        </div>
                    ))}
                    {Math.ceil(copyList.length / 10) > 1 ? 
                    <div className='pagination' 
                        onClick={()=>{page < Math.ceil(copyList.length / 10) ? setPage(page+1): setPage(Math.ceil(copyList.length / 10))}}>
                        <img src={getImage('icon_arrow_right.png')}/>
                    </div > 
                    : <></>}
                </div>
            </div>
        </div>
    </>
    );
}