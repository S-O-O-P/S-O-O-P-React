import axios from "axios";

export default function HoneypotByMainApi({setHoneypots}, {setFilteredHoneypots}) {
    
    async function fetchHoneypots() {
        try {
            const response = await axios.get('http://localhost:8081/honeypot/listandapproved');
            console.log("리스폰스는:", response);
            setHoneypots(response.data);       
            const filteredHoneypot = response.data.filter(item => (item.closureStatus).match("모집중")).sort((a,b) => {return Number(a.endDate) - Number(b.endDate)});
            setFilteredHoneypots(filteredHoneypot); // 초기 필터링 설정 
        } catch (error) {
            console.error('Error 입니다 : ', error);
        }
    }
    fetchHoneypots();
}