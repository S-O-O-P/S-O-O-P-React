import axios from 'axios';

export default function ApplicationApi(honeypotCode, setApplications) {

    async function fetchApplications() {
        try {
            const response = await axios.get(`http://localhost:8081/honeypot/application/${honeypotCode}`)
            console.log("참가신청정보 : ", response.data);
            setApplications(response.data)
            console.log('셋에 등록완료');

        } catch (error) {
            console.error('참가신청 조회 실패 : ', error);
        }
    }

    fetchApplications();
}