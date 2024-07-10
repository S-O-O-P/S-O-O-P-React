export default function CultureApi({ setData }) {
  var xhr = new XMLHttpRequest();
  var url = 'http://api.kcisa.kr/openapi/API_CCA_145/request'; /*URL*/
  //a52bbe88-abbf-4e02-8d3b-bd5ce6775c54
  var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'fd506ee2-a511-45ff-97b2-3d6d8ea4482a'; /*서비스키*/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /*세션당 요청레코드수*/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지수*/
  //35304

  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log('status: ' + this.status);

      if (this.status == 200) {
        var parser = new DOMParser(); // XML 문자열을 파싱하기 위해 DOMParser 객체를 생성
        var xmlDoc = parser.parseFromString(this.responseText, "text/xml"); // XML 문자열을 XML DOM 객체로 변환
        console.log(xmlDoc);

        // JSON으로 변환하여 데이터를 설정하는 부분
        const jsonData = xmlToJson(xmlDoc);
        console.log(jsonData);
        const list = jsonData.response.body[0].items[0].item;
        const filtered = list.filter(item => {
          (item.PERIOD).includes("2024-07") || (item.PERIOD).includes("~2024-07") || (item.PERIOD).includes("2024-08") || (item.PERIOD).includes("202407") || (item.PERIOD).includes("202408");
        })
        console.log("filtered list", filtered);
        //(item.PERIOD).includes("2024-07") || (item.PERIOD).includes("~2024-07") || (item.PERIOD).includes("2024-08") || (item.PERIOD).includes("202407") || (item.PERIOD).includes("202408");

        // list.forEach((item) => {
        //   console.log("TITLE: ",item.TITLE);
        //   console.log("CNTC_INSTT_NM: ", item.CNTC_INSTT_NM);
        //   console.log("DESCRIPTION: ", item.DESCRIPTION);
        //   console.log("IMAGE_OBJECT: ", item.IMAGE_OBJECT);
        //   console.log("LOCAL_ID: ", item.LOCAL_ID);
        //   console.log("URL: ", item.URL);
        //   console.log("VIEW_COUNT: ", item.VIEW_COUNT);
        //   console.log("SUB_DESCRIPTION: ", item.SUB_DESCRIPTION);
        //   console.log("SPATIAL_COVERAGE: ", item.SPATIAL_COVERAGE);
        //   console.log("EVENT_SITE: ", item.EVENT_SITE);
        //   console.log("GENRE: ", item.GENRE);
        //   console.log("DURATION: ", item.DURATION); // 관람시간
        //   console.log("AUTHOR: ", item.AUTHOR);
        //   console.log("CONTACT_POINT: ", item.CONTACT_POINT);
        //   console.log("ACTOR: ", item.ACTOR);
        //   console.log("CONTRIBUTOR: ", item.CONTRIBUTOR);
        //   console.log("AUDIENCE: ", item.AUDIENCE);
        //   console.log("CHARGE: ", item.CHARGE);
        //   console.log("PERIOD: ", item.PERIOD); // 기간
        //   console.log("EVENT_PERIOD: ", item.EVENT_PERIOD); // 시간
        // });
      
        const newApiList = list.map((item, index) => {
          const getRandomInt = (Math.floor(Math.random() * 5) + 1);
          const randomDay = (Math.floor(Math.random() * 15) + 1);
          console.log(typeof item.CHARGE);
          console.log(typeof item.CHARGE[0]);
          console.log(item.CHARGE[0]);
           {
            return {
              seq: index + 1, // List내 객체 구분에 필요한 key
              title: item.TITLE, // 제목
              realmName: getRandomInt === 1 ? "미술" : getRandomInt === 2 ? "음악" : getRandomInt === 3 ? "기타" : getRandomInt === 4 ? "축제" : getRandomInt === 5 ? "팝업" : "연극", // 장르
              price: typeof item.CHARGE[0] === "object" ? "가격정보 없음" : item.CHARGE, // 가격  
              place: typeof item.EVENT_SITE[0] === "object" ?  "장소정보 없음" : item.EVENT_SITE,
              startDate: `202407${randomDay < 10 ? "0"+randomDay : randomDay}`,
              endDate: `202408${randomDay < 10 ? "0"+randomDay : randomDay}`,
              area: getRandomInt === 1 ? "서울" : getRandomInt === 2 ? "부산" : getRandomInt === 3 ? "경기" : getRandomInt === 4 ? "대전" : getRandomInt === 5 ? "인천" : "제주",
              thumbnail: typeof item.IMAGE_OBJECT[0] === "object" ? "이미지 없음" : item.IMAGE_OBJECT,
              url: typeof item.URL[0] === "object" ? "공식 홈페이지 정보 없음" : item.URL,
            }
          }

        })

        const resultObject = {
          perforList: newApiList
        };

        console.log("resultObject", resultObject);
        setData(resultObject);

      } else {
        console.error('Failed to fetch data: ' + this.status);
        console.error('Response: ' + this.responseText);
      }
    }
  };
  xhr.send('');

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

// export default function CultureApi({ setData }) {
//   const url = 'https://raw.githubusercontent.com/S-O-O-P/S-O-O-P-DB/master/dummy.json'; // JSON 데이터 파일 URL

//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);

//   xhr.onload = function () {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       const jsonData = JSON.parse(xhr.responseText); // JSON 데이터를 파싱
//       setData(jsonData.response.msgBody); // msgBody 안에 있는 데이터 설정
//       // console.log("from CultureApi : " + JSON.stringify(jsonData.response.msgBody)); // 데이터 확인 로그
//     } else {
//       console.error('Network response was not ok ' + xhr.statusText);
//     }
//   };

//   xhr.onerror = function () {
//     console.error('XMLHttpRequest failed');
//   };

//   xhr.send();

//   return null;
// }