// import { useEffect } from "react";

export default function CultureApi({ setData }) {
  const serviceKey = '8/QFvrhFxUkbFccDXVjo2OKIiDWufUA8v2jGrIaDSWRqL499Gznzk7NYdHxvIoOvbJes6wYSeXMEgXHhyUxS9g==';
    const xhr = new XMLHttpRequest();
    const url = '/api/openapi/rest/publicperformancedisplays/realm';
    const queryParams = new URLSearchParams({
      serviceKey: serviceKey,
      keyword: '',
      sortStdr: '3',
      ComMsgHeader: '',
      RequestTime: '20240701:23003422',
      CallBackURI: '',
      MsgBody: '',
      cPage: '1',
      rows: '500',
      from: '20240701',
      to: '20241201'
    });

    xhr.open('GET', `${url}?${queryParams.toString()}`, true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const xmlText = xhr.responseText;
        const parser = new DOMParser();
        const xmlDom = parser.parseFromString(xmlText, 'application/xml');
        const jsonData = xmlToJson(xmlDom);
        setData(jsonData); // App.js에서 전달받은 setData 함수를 호출하여 데이터 설정
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

// export default CultureApi;
