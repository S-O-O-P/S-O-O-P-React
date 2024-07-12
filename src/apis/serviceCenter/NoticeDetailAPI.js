import axios from 'axios';

export const fetchNoticeData = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8081/notice/${id}`);
        return {
            notice: response.data.mainNoticeList,
            file: response.data.noticeFile
        };
    } catch (error) {
        console.error('공지사항 데이터 불러오기 실패', error);
        throw error;
    }
};
