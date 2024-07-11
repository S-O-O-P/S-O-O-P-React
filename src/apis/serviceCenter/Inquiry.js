import axios from 'axios';

export const inquiryAPI = async (data) => {
    try {
        const response = await axios.post('http://localhost:8081/inquiry', data);
        return response;
    } catch (error) {
        console.error("error", error);
        throw error;
    }
};
