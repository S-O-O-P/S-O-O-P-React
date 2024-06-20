import { useEffect, useState } from 'react';
import MainCategory from '../pages/socializing/MainCategory';
import Search from '../pages/socializing/Search';
import SubCategory from '../pages/socializing/SubCategory';
import Empty from '../pages/socializing/Empty';


export default function HoneyLayout(){

    const images = require.context('../../public/images/socializing',false, /\.(png|jpe?g|svg)$/)

    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
    }

    const [categoryStatus, setCategoryStatus] = useState(1);
    const [copyList,setCopyList] = useState([]);
    const [page, setPage] = useState(1);
    const [isChange,setIsChange] = useState(false);

    
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
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        }
    ]);
    
    
    
    useEffect(
        ()=>{
            setCopyList(tempList)
        }
        ,[]
    )

    useEffect(
        ()=>{
            console.log(isChange)
            console.log(copyList)
        },[copyList]
    )
    
    function getPagingPost() {
        const startIndex = (page - 1) * 10
        const endIndex = startIndex + 10
        const currentPosts = isChange? copyList.slice(startIndex, endIndex) : tempList.slice(startIndex,endIndex)
        
        return currentPosts
    }
    function pageChange(pageNumber) {
        setPage(pageNumber);
    }
    
    return(
        <>
        <div style={{width: '100%', maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <MainCategory tempList={tempList} setCopyList={setCopyList} setIsChange={setIsChange} setPage={setPage} setCategoryStatus={setCategoryStatus} />
                <div>
                    {categoryStatus === 1 && <Empty />}
                    {categoryStatus === 2 && <SubCategory setCopyList={setCopyList} tempList={tempList} setIsChange={setIsChange} setPage={setPage} />}
                </div>
                <div style={{ textAlign: 'center'}}>
                    <Search />
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', height: '600px', maxHeight: '600px', overflowY: 'auto' }}>
                {getPagingPost().map((honey) => (
                    <div key={honey.honeyId} style={{ width: '50%', boxSizing: 'border-box',display:'flex', padding: '10px' }}>
                        {honey.empty ? (
                                <div style={{ width: '139px', height: '200px', border: '1px solid', borderRadius: '10px', margin: '10px' }} />
                            ) : (
                                <>
                                    <div style={{ width: '139px', height: '200px',border:'1px solid',borderRadius:'10px',lineHeight:'360px'}}>
                                        <img src={getImage(honey.ticket.ticketPoster)}/>
                                    </div>
                                    <div style={{ width: '431px', height: '200px', display: 'inline-block', border: '1px solid', borderRadius: '10px' }}>
                                        <span>{honey.honeyGenre}</span>
                                        <span>모집일 {honey.honeyAt}</span>
                                        <br />
                                        <span>{honey.honeyTitle}</span>
                                        {honey.honeyFullStatus === 'N' ? (
                                            <span>모집중</span>
                                        ) : (
                                            <span>모집완료</span>
                                        )}
                                        <span>참여인원 {honey.participant.length}/{honey.totalPeople}</span>
                                        <br />
                                        <span>{honey.honeyContent}</span>
                                    </div>
                                </>
                            )}
                    </div>
                ))}
            </div>
            <div style={{textAlign:'center'}}>
                {Math.ceil(copyList.length / 10) > 1 ? <div style={{width:'58px',height:'43px',backgroundColor:'black',display:'inline-block'}} onClick={()=>{page > 1 ? setPage(page-1): setPage(1)}}>
                    <img src={getImage('icon_arrow_left_white.png')} style={{width:'100%',height:'100%'}}/>
                </div> : <Empty/>}
                {Array.from({ length: Math.ceil(copyList.length / 10) }, (_, index) => (
                    <div style={{width:'58px',height:'43px', display:'inline-block'}}>
                        <button
                            key={index}
                            // className={page === index + 1 ? style.buttonActive : style.pagebutton}
                            onClick={() => pageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </div>
                ))}
                {Math.ceil(copyList.length / 10) > 1 ? <div style={{width:'58px',height:'43px',backgroundColor:'black',display:'inline-block'}} onClick={()=>{page < Math.ceil(copyList.length / 10) ? setPage(page+1): setPage(Math.ceil(copyList.length / 10))}}>
                    <img src={getImage('icon_arrow_right_white.png')} style={{width:'100%',height:'100%'}}/>
                </div > : <Empty/>}
            </div>
        </div>
    </>
    );
}