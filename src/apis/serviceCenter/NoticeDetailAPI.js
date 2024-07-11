import axios from 'axios';

export const noticeAPI = async (code) => {
    try {
        const response = await axios.get(`http://localhost:8081/notice/${code}`);
        return response.data.mainNoticeList;
    } catch (error) {
        console.error('공지사항 불러오기 실패', error);
        throw error;
    }
};

export const noticeFileAPI = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/notice/${id}`);
        return response.data.fileDTO;
    } catch (error) {
        console.error('공지사항 파일 불러오기 실패', error);
        throw error;
    }
};
