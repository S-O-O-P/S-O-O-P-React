import axios from 'axios';

export const noticeAPI = async () => {
    try {
        const res = await axios.get('http://localhost:8081/help');
        return res.data.mainNoticeList;
    } catch (error) {
        console.error("error", error);
        return [];
    }
};
