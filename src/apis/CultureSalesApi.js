export default function CultureSalesApi({ setSalesData }) {
  //http://kopis.or.kr/openApi/restful/boxoffice?service={서비스키}&ststype=day&date=20171218&catecode=AAAA&area=11&srchseatscale=100
  const serviceKey = 'e23e8136b3fe40b38b8e0c20492d3a0e'; // 서비스 인증키
    const xhr = new XMLHttpRequest(); //XMLHttpRequest는 비동기로 작동
    const url = '/salesapi/openApi/restful/boxoffice'; //기간별 공연/전시 정보 목록 조회 요청 url
    const queryParams = new URLSearchParams({ // 조회시 요청 parameters
      service: serviceKey,
      ststype: 'day',
      date: '20240628', 
    });

    xhr.open('GET', `${url}?${queryParams.toString()}`, true); // get 요청

    xhr.onload = function () { // 요청이 완료되었을 때 실행될 함수
      if (xhr.status >= 200 && xhr.status < 400) { // HTTP 상태 코드 확인하여 요청 성공 여부 판단
        console.log("fetching");
        const xmlText = xhr.responseText; // response로 전달받은 xml 데이터를 텍스트 형식으로 저장
        console.log('Response XML text:', xmlText);
        const parser = new DOMParser(); // XML 문자열을 파싱하기 위해 DOMParser 객체를 생성
        const xmlDom = parser.parseFromString(xmlText, 'application/xml'); // XML 문자열을 XML DOM 객체로 변환        
        const jsonData = xmlToJson(xmlDom); // XML 데이터를 JSON 형식으로 변환
        setSalesData(jsonData); // App.js에서 전달받은 setData 함수를 호출하여 데이터 설정
        console.log("jsonData.response from CultureSalesApi : "+JSON.stringify(jsonData));
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

