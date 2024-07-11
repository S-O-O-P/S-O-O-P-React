import axios from 'axios';

export const noticesAPI = async () => {
    try {
        const response = await axios.get('http://localhost:8081/notice');
        return response.data.mainNoticeList;
    } catch (error) {
        console.error('Failed to fetch notices', error);
        throw error;
    }
};
