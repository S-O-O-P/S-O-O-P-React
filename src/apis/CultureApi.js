import { useEffect, useState } from "react";

export default function CultureApi(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    ()=>{
      const fetchData = async () => {
        const url = 'http://www.culture.go.kr/openapi/rest/publicperformancedisplays/realm';
        const queryParams = new URLSearchParams({
          serviceKey: '8%2FQFvrhFxUkbFccDXVjo2OKIiDWufUA8v2jGrIaDSWRqL499Gznzk7NYdHxvIoOvbJes6wYSeXMEgXHhyUxS9g%3D%3D',
          // sido: '서울',
          // gugun: '동작구',
          // place: '1',
          // gpsxfrom: '129.101',
          // gpsyfrom: '35.142',
          // gpsxto: '129.101',
          // gpsyto: '35.142',
          keyword: '',
          sortStdr: '3',
          ComMsgHeader: '',
          RequestTime: '20240701:23003422',
          CallBackURI: '',
          MsgBody: '',
          // realmCode: 'A000',
          cPage: '1',
          rows: '500',
          from: '20240701',
          to: '20241201'
        });
  
        try {
          const response = await fetch(`${url}?${queryParams.toString()}`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const result = await response.json();
          setData(result);
          console.log(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  
    },[]
  );
  return(
    <>
      <h1>Api 호출 test</h1>
    </>
  );
}