import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCategory from '../../components/socializing/MainCategory';
import Search from '../../components/socializing/Search';
import SubCategory from '../../components/socializing/SubCategory';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Honey.css';
import './CustomCalendar.css';


export default function Honey(){

    // state 변경시 로컬 이미지가 깨지는 현상 방지 목적 변수 & 함수
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
    const [subKeyword,setSubKeyword] = useState('전체');
    const [copyList,setCopyList] = useState([]);
    const [current,setCurrent] = useState([]);
    const [filteredTempCnt,setFilteredTempCnt] = useState(0);
    const [filteredCopyCnt,setFilteredCopyCnt] = useState(0);
    const [page, setPage] = useState(1);
    const [isChange,setIsChange] = useState(false);
    const [searchVal,setSearchVal] = useState('');
    const [exhibitionCnt,setExhibitionCnt] = useState(0);
    const [performanceCnt,setPerformanceCnt] = useState(0);
    const [musicalCnt,setMusicalCnt] = useState(0);
    const [festivalCnt,setFestivalCnt] = useState(0);
    const [popupCnt,setPopupCnt] = useState(0);
    const [select,setSelect] = useState('최신순');
    const [city,setCity] = useState('');
    const [region,setRegion] = useState('');
    
    const [date,setDate] = useState(new Date);
    const [showMannerDateModal, setShowMannerDateModal] = useState(false);

    
    // BE 작업용 실제 데이터 api state
    // const [list,setList] = useState([]);
    
    // FE 작업용 임시 데이터 state
    const [tempList,setTempList] = useState([
        {
            honeyId: 1,
            member: {memberId:31,nickname:'test111'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:1,member:{memberId:31,nickname:'test111'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트1',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
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
            participant: [{participantId:2,member:{memberId:32,nickname:'test222'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트2',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강동구',
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
            participant: [{participantId:3,member:{memberId:33,nickname:'test333'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'},{commentId:2,member:{memberId:2,nickname:'test2'},commentContents:'댓글입니다.2',commentAt:'2024-06-20'}],
            honeyGenre: '뮤지컬',
            honeyTitle: '허니팟 테스트3',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강남구',
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
            participant: [{participantId:4,member:{memberId:34,nickname:'test444'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트4',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '중구',
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
            participant: [{participantId:5,member:{memberId:35,nickname:'test555'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트5',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
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
            participant: [{participantId:6,member:{memberId:36,nickname:'test666'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트6',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '인천',
            honeyRegion: '강남구',
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
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트7',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '경기',
            honeyRegion: '강서구',
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
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '뮤지컬',
            honeyTitle: '허니팟 테스트8',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강남구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'Y',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 9,
            member: {memberId:39,nickname:'test999'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:9,member:{memberId:39,nickname:'test999'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트9',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '경기',
            honeyRegion: '중구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 10,
            member: {memberId:40,nickname:'test1110'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:10,member:{memberId:40,nickname:'test1110'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트10',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '인천',
            honeyRegion: '강서구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 11,
            member: {memberId:41,nickname:'test1111'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:11,member:{memberId:41,nickname:'test1111'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트11',
            honeyContent: '내용입니다. 내가 가장 좋아하는 음식은 김치찌개이고',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 12,
            member: {memberId:31,nickname:'test111'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:1,member:{memberId:31,nickname:'test111'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트1',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '중구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 13,
            member: {memberId:32,nickname:'test222'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:2,member:{memberId:32,nickname:'test222'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트2',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '경기',
            honeyRegion: '강동구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 14,
            member: {memberId:33,nickname:'test333'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:3,member:{memberId:33,nickname:'test333'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '뮤지컬',
            honeyTitle: '허니팟 테스트3',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '인천',
            honeyRegion: '강남구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 15,
            member: {memberId:34,nickname:'test444'},
            ticket: {ticketId:4,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:4,member:{memberId:34,nickname:'test444'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트4',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '인천',
            honeyRegion: '강남구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 16,
            member: {memberId:35,nickname:'test555'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:5,member:{memberId:35,nickname:'test555'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트5',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 17,
            member: {memberId:36,nickname:'test666'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:6,member:{memberId:36,nickname:'test666'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트6',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 18,
            member: {memberId:37,nickname:'test777'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:7,member:{memberId:37,nickname:'test777'}},{participantId:13,member:{memberId:22,nickname:'test2122'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트7',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '인천',
            honeyRegion: '강남구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'Y',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 19,
            member: {memberId:38,nickname:'test888'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:8,member:{memberId:38,nickname:'test888'}},{participantId:12,member:{memberId:21,nickname:'test212'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '뮤지컬',
            honeyTitle: '허니팟 테스트8',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '경기',
            honeyRegion: '강동구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'Y',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 20,
            member: {memberId:39,nickname:'test999'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:9,member:{memberId:39,nickname:'test999'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트9',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '중구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 21,
            member: {memberId:40,nickname:'test1110'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:10,member:{memberId:40,nickname:'test1110'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트10',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '중구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 22,
            member: {memberId:41,nickname:'test1111'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:11,member:{memberId:41,nickname:'test1111'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트11',
            honeyContent: '내용입니다. 내가 가장 좋아하는 음식은 김치찌개이고',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '중구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 23,
            member: {memberId:32,nickname:'test222'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:2,member:{memberId:32,nickname:'test222'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트2',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '인천',
            honeyRegion: '강남구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 24,
            member: {memberId:33,nickname:'test333'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:3,member:{memberId:33,nickname:'test333'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
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
            honeyId: 25,
            member: {memberId:34,nickname:'test444'},
            ticket: {ticketId:4,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:4,member:{memberId:34,nickname:'test444'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트4',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 26,
            member: {memberId:35,nickname:'test555'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:5,member:{memberId:35,nickname:'test555'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트5',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '경기',
            honeyRegion: '강동구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 27,
            member: {memberId:36,nickname:'test666'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:6,member:{memberId:36,nickname:'test666'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '전시회',
            honeyTitle: '허니팟 테스트6',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '중구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 28,
            member: {memberId:37,nickname:'test777'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:7,member:{memberId:37,nickname:'test777'}},{participantId:13,member:{memberId:22,nickname:'test2122'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '공연',
            honeyTitle: '허니팟 테스트7',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '경기',
            honeyRegion: '강동구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'Y',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },
        {
            honeyId: 29,
            member: {memberId:38,nickname:'test888'},
            ticket: {ticketId:3,ticketPoster:'poster2.png',price: 15000},
            participant: [{participantId:8,member:{memberId:38,nickname:'test888'}},{participantId:12,member:{memberId:21,nickname:'test212'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '뮤지컬',
            honeyTitle: '허니팟 테스트8',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '인천',
            honeyRegion: '강남구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'Y',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 30,
            member: {memberId:39,nickname:'test999'},
            ticket: {ticketId:3,ticketPoster:'poster3.png',price: 15000},
            participant: [{participantId:9,member:{memberId:39,nickname:'test999'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '행사_축제',
            honeyTitle: '허니팟 테스트9',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        },{
            honeyId: 31,
            member: {memberId:40,nickname:'test1110'},
            ticket: {ticketId:3,ticketPoster:'poster1.png',price: 15000},
            participant: [{participantId:10,member:{memberId:40,nickname:'test1110'}}],
            comment: [{commentId:1,member:{memberId:1,nickname:'test1'},commentContents:'댓글입니다.1',commentAt:'2024-06-20'}],
            honeyGenre: '팝업',
            honeyTitle: '허니팟 테스트10',
            honeyContent: '내용입니다.',
            totalPeople: 2,
            honeyCity: '서울',
            honeyRegion: '강서구',
            honeyAt: '2024-06-19',
            honeyUntil: '2024-06-26',
            honeyFullStatus: 'N',
            honeyExposureStatus: 'Y',
            honeyReportCount: 0,
        }
    ]);
    
    
    // 최초 mount시, 최초에 가져온 원본 데이터 보관 & 가공할 카피 데이터 state 초기화
    useEffect(
        ()=>{
            setCopyList(tempList)
            setCurrent(getPagingPosts())
            isChange ? setFilteredCopyCnt(copyList.length) : setFilteredTempCnt(tempList.length);
        }
        ,[]
    )

    // 서브카테고리 별로 state update될 때, state상태값 초기화
    useEffect(
        ()=>{
            setCurrent(getPagingPosts())
            setFilteredCopyCnt(copyList.length)
            setFilteredTempCnt(tempList.length)
        },[copyList]
    )
    
    // 정렬 기준 update시, state 초기화
    useEffect(
        ()=>{
            setPage(1);
            setCurrent(getPagingPosts());
            console.log(current);
            (select === 'Y' || select === 'N') ? setCurrent(getPagingPosts()) : (isChange ? setCurrent(copyList) : setCurrent(tempList));
            isChange ? setFilteredCopyCnt(getFilteredList().length) : setFilteredTempCnt(getFilteredList().length);
        },[select,searchVal,city,region]
    )
    
    // 메인카테고리 관련 state update될 때, state상태값 초기화
    useEffect(
        ()=>{
            setCopyList(tempList)
            setSubCategoryStatus(1)
            setIsChange(false)
            setPage(1)
            setSelect('')
            setCurrent(tempList)
            setSearchVal('')
        },[categoryStatus]
    )

    useEffect(
        ()=>{
            showMannerDateModal 
            ? document.body.style.overflow = 'hidden'
            : document.body.style.overflow = 'auto'
        },[showMannerDateModal]
    )

    // [state] update시, 카테고리 변경시 목록 확인 로깅
    // useEffect(
    //     ()=>{
    //         console.log(isChange)
    //         console.log(copyList)
    //     },[copyList]
    // )
    
    // 페이지네이션 함수
    function getPagingPosts() {
        const startIndex = (page - 1) * 10
        const endIndex = startIndex + 10
        const currentPosts = isChange? getFilteredList().slice(startIndex, endIndex) : getFilteredList().slice(startIndex,endIndex)
        if (currentPosts.length === 0) {
            return [];
        }
        
        return currentPosts
    }
    
    // 정렬 & 제목검색 결과 필터링 함수
    function getFilteredList() {
        const filteredTempList = tempList.filter(honey => 
            
            honey.honeyTitle.includes(searchVal)
            && 
            (( select === 'N' || select === 'Y' ) ? honey.honeyFullStatus.includes(select): true)
        )

        const filteredCopyList = copyList.filter(honey =>

            honey.honeyTitle.includes(searchVal)
            && 
                (( select === 'N' || select === 'Y' ) ? honey.honeyFullStatus.includes(select) : true)
        )

        return isChange ? filteredCopyList : filteredTempList
    }

    // 상세페이지 : 값과 함께 route로 이동
    const navigate = useNavigate();
    const postDetailHandler = (honey) => {
        navigate('/detail', { state: { honey } });
        scrollToTop();
    };

    // js 라이브러리 스크롤 애니메이션 함수
    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'instant' 
        });
      }

    // 페이지네이션 핸들러 함수 분리
    const leftArrowHandler = () => {
        scrollToTop()
        return page > 1 ? setPage(page-1): setPage(1)
    }
    const numberHandler = (index) => {
        scrollToTop()
        return () => setPage(index + 1)
    }
    const rightArrowHandler = () => {
        scrollToTop()
        return page < Math.ceil(copyList.length / 10) ? setPage(page+1): setPage(Math.ceil(copyList.length / 10))
    }

    // 일정 조회 모달창 뒤로가기
    const backBtn = () => {
        setShowMannerDateModal(false)
    }

    const dateHandler = (newDate) => {
        setDate(newDate)
        setShowMannerDateModal(false)
    }

    // 본문
    return(
        <>
        <div className='honey-body'>
            <MainCategory tempList={tempList} 
                            categoryStatus={categoryStatus} 
                            setCategoryStatus={setCategoryStatus}
                            setExhibitionCnt={setExhibitionCnt}
                            setPerformanceCnt={setPerformanceCnt}
                            setMusicalCnt={setMusicalCnt}
                            setFestivalCnt={setFestivalCnt}
                            setPopupCnt={setPopupCnt}
                            setDate={setDate}
                            setShowMannerDateModal={setShowMannerDateModal}
                            />
            <div className='sub-category-padding'>
                {categoryStatus === 2 && <SubCategory subCategoryStatus={subCategoryStatus} 
                                                        setSubCategoryStatus={setSubCategoryStatus} 
                                                        tempList={tempList}
                                                        setCopyList={setCopyList} 
                                                        setCurrent={setCurrent}
                                                        setIsChange={setIsChange} 
                                                        setPage={setPage}
                                                        setSubKeyword={setSubKeyword}
                                                        exhibitionCnt={exhibitionCnt}
                                                        performanceCnt={performanceCnt}
                                                        musicalCnt={musicalCnt}
                                                        festivalCnt={festivalCnt}
                                                        popupCnt={popupCnt}/>}
            </div>
            <div className='honey-body2'>
                <Search searchVal={searchVal}
                        setSearchVal={setSearchVal}/>
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
                <div className='select-box'>
                    <select value={select} onChange={(e) => setSelect(e.target.value)}>
                        <option value={'최신순'}>최신순</option>
                        <option value={'지역별'}>지역별</option>
                        <option value={'N'}>모집중</option>
                        <option value={'Y'}>모집완료</option>
                    </select>
                    {select === '지역별' ? 
                        <>
                            <select style={{marginLeft:'10px'}} value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value={''}>--</option>
                                <option value={'서울'}>서울</option>
                                <option value={'경기'}>경기</option>
                                <option value={'인천'}>인천</option>
                            </select>
                            <select style={{marginLeft:'10px'}} value={region} onChange={(e) => setRegion(e.target.value)}>
                                <option value={''}>--</option>
                                <option value={'강서구'}>강서구</option>
                                <option value={'강남구'}>강남구</option>
                                <option value={'강동구'}>강동구</option>
                                <option value={'중구'}>중구</option>
                            </select>
                        </>
                        : 
                        (<></>)}
                </div>
                <div className='main-contents'>
                    {getPagingPosts().map((honey,index) => (
                        <div className='honey-list' key={index} onClick={() => postDetailHandler(honey)}>
                        {honey.empty 
                        ? (
                            <div>게시물이 없습니다.</div>
                        ) 
                        : (
                            <>
                                <div className='img-box'>
                                    <img src={getImage(honey.ticket.ticketPoster)} alt='티켓 포스터' />
                                </div>
                                <div className='content-box'>
                                    <div style={{ paddingBottom: '0px', marginTop: '10px' }}>
                                        <span>#{honey.honeyGenre}</span>
                                        <span>모집일자 &nbsp;&nbsp;{honey.honeyAt}</span>
                                    </div>
                                    <div style={{ paddingTop: '0px',paddingBottom:'0px' }}>
                                        <span style={{fontSize:'20px'}}>{honey.honeyTitle}</span>
                                        {/* <span style={{marginTop:'30px'}}>참여인원 &nbsp;{honey.participant.length}/{honey.totalPeople}</span> */}
                                        <span>참여인원 &nbsp;{honey.participant.length}/{honey.totalPeople}</span>
                                    </div>
                                    <div style={{ paddingTop: '0px'}}>
                                        {honey.honeyFullStatus === 'N' 
                                        ? <span className='recruit-status' style={{ backgroundColor: 'green' }}>모집중</span>
                                         : <span className='recruit-status' style={{ backgroundColor: 'red' }}>모집완료</span>
                                        }
                                        {/* 참여자 프로필 사진 리스트 */}
                                        <div style={{ width:'200px',justifyContent:'end',margin:'0px',padding:'0px' }}>
                                            {honey.participant.map((user,index) => (
                                                <>
                                                {user.member.profile === null || user.member.profile === undefined 
                                                ? <div key={index} className='participant-profile-pic' style={{width:'30px',margin:'0px'}}></div>
                                                :<div key={index} className='participant-profile-pic' style={{backgroundImage:`url(${getImage(user.member.profile)})`}}></div>}
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>  
                            </>
                        )}
                    </div>
                    ))}
                </div>
            </div>
            <div className='pagination-box'>
                {Math.ceil(isChange ? filteredCopyCnt / 10 : filteredTempCnt / 10) > 1 ? 
                <div className={page === 1 ? 'arrowOff' : 'paginationOn' }
                    onClick={leftArrowHandler}>
                    <img className='arrow-left' src={getImage('icon_arrow_right.png')}/>
                </div> 
                : <></>}
                {Array.from({ length: Math.ceil(isChange ? filteredCopyCnt / 10 : filteredTempCnt / 10) }, (_, index) => (
                    <div key={index}
                        className={page === index+1 ? 'paginationOn' : 'paginationOff' }
                        onClick={numberHandler(index)}>
                            <p>
                                {index + 1}
                            </p>
                    </div>
                ))}
                {Math.ceil(isChange ? filteredCopyCnt / 10 : filteredTempCnt / 10) > 1 ? 
                <div className={page === Math.ceil(isChange ? filteredCopyCnt / 10 : filteredTempCnt / 10) ? 'arrowOff' : 'paginationOn' }
                    onClick={rightArrowHandler}>
                    <img src={getImage('icon_arrow_right.png')}/>
                </div > 
                : <></>}
            </div>
        </div>
        
        {/* 일정 조회 모달창 */}
        {showMannerDateModal && (
            <div className='manner-modal-container' onClick={()=>{setShowMannerDateModal(false)}}>
                <div className='manner-modal-content' style={{ height:'480px',backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundImage: `url(${getImage('Background_Effect.png')})`}}>
                    <div className='manner-modal-header' style={{backgroundColor:'white'}}>
                        <img onClick={ backBtn } src={'images/commons/icon_arrow_back_main_color.png'} alt="뒤로가기아이콘" />
                        <p> 일정 조회 </p>
                    </div>
                    <div className='manner-modal-middle' style={{ height:'380px',marginTop:'20px',borderBottom:'0px'}}>
                        <Calendar onChange={dateHandler} value={date} className='custom-calendar'/>
                    </div>
                </div>
            </div>    
        )}
    </>
    );
}