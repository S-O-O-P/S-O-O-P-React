/** ❗ 최종으로 써야할 API ?❗*/

export default function CultureApi({ setData }) {
    
  // 카운터 관련 함수들
  const getApiCallCount = () => {
   return parseInt(localStorage.getItem('apiCallCount') || '0');
 };

 const incrementApiCallCount = () => {
   const count = getApiCallCount() + 1;
   localStorage.setItem('apiCallCount', count.toString());
   return count;
 };

 const resetCounterIfNewDay = () => {
   const lastResetDate = localStorage.getItem('lastResetDate');
   const today = new Date().toDateString();
   if (lastResetDate !== today) {
     localStorage.setItem('apiCallCount', '0');
     localStorage.setItem('lastResetDate', today);
   }
 };
 
 const serviceKey = '8/QFvrhFxUkbFccDXVjo2OKIiDWufUA8v2jGrIaDSWRqL499Gznzk7NYdHxvIoOvbJes6wYSeXMEgXHhyUxS9g=='; // 서비스 인증키
   const xhr = new XMLHttpRequest(); //XMLHttpRequest는 비동기로 작동
   const url = '/api/openapi/rest/publicperformancedisplays/realm'; //기간별 공연/전시 정보 목록 조회 요청 url
   const queryParams = new URLSearchParams({ // 조회시 요청 parameters
     serviceKey: serviceKey,
     keyword: '',
     //sortStdr: '3', // 1 : 등록일 / 2 :   / 3 : 지역
     ComMsgHeader: '',
     RequestTime: '20240701:23003422', // 요청 기간 
     CallBackURI: '',
     MsgBody: '',
     cPage: '1',
     rows: '150', // 1페이지에 불러올 데이터 갯수
     from: '20240718', // 시작일
     to: '20240731' // 종료일
   });

   xhr.open('GET', `${url}?${queryParams.toString()}`, true); // get 요청

   // API 호출 전 카운터 체크 및 증가
   resetCounterIfNewDay();
   const currentCount = incrementApiCallCount();
  //  console.log(`API Call Start: ${url}, Count: ${currentCount}`);

   xhr.onload = function () { // 요청이 완료되었을 때 실행될 함수
    //  console.log(`API Call End: ${url}, Status: ${xhr.status}, Count: ${currentCount}`);

     if (xhr.status >= 200 && xhr.status < 300) { // HTTP 상태 코드 확인하여 요청 성공 여부 판단
       const xmlText = xhr.responseText; // response로 전달받은 xml 데이터를 텍스트 형식으로 저장
       const parser = new DOMParser(); // XML 문자열을 파싱하기 위해 DOMParser 객체를 생성
       const xmlDom = parser.parseFromString(xmlText, 'application/xml'); // XML 문자열을 XML DOM 객체로 변환
       const jsonData = xmlToJson(xmlDom); // XML 데이터를 JSON 형식으로 변환
       setData(jsonData.response.msgBody[0]); // App.js에서 전달받은 setData 함수를 호출하여 데이터 설정
      //  console.log("from CultureApi : "+jsonData.response.msgBody[0]);
     } else {
       // 오류 처리
       console.error('Network response was not ok ' + xhr.statusText);
     }
   };
   xhr.onerror = function () {
     // 네트워크 오류 처리
     console.error('XMLHttpRequest failed');
   };
   xhr.send();
 const xmlToJson = (xml) => {
   const result = {};
   const root = xml.documentElement;
   const parseNode = (node) => {
     const obj = {};
     if (node.nodeType === Node.ELEMENT_NODE && node.attributes.length > 0) {
       for (const attr of node.attributes) {
         obj[attr.nodeName] = attr.nodeValue;
       }
     }
     if (node.hasChildNodes()) {
       for (const child of node.childNodes) {
         if (child.nodeType === Node.ELEMENT_NODE) {
           if (child.childNodes.length === 1 && child.firstChild.nodeType === Node.TEXT_NODE) {
             obj[child.nodeName] = child.textContent.trim();
           } else {
             if (!obj[child.nodeName]) {
               obj[child.nodeName] = [];
             }
             obj[child.nodeName].push(parseNode(child));
           }
         }
       }
     }
     return obj;
   };
   result[root.nodeName] = parseNode(root);
   return result;
 };
 return null; // JSX를 반환하지 않음
};
