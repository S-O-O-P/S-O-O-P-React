import axios from "axios";

export default function HoneypotListApi({setHoneypots}, {setFilteredHoneypots}) {
    
    async function fetchHoneypots() {
        try {
            const response = await axios.get('http://localhost:8081/honeypot/list');
            console.log("리스폰스는:", response);
            setHoneypots(response.data.results.honeypots);
            setFilteredHoneypots(response.data.results.honeypots); // 초기 필터링 설정
            
        } catch (error) {
            console.error('Error 입니다 : ', error);
        }
    }

    fetchHoneypots();

}