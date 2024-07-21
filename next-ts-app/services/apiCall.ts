import axios, { Method } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

interface ApiCallParams {
    method: Method;
    url: string;
    data?: any;
    params?: any;
    headers?: any;
}

const apiCall = async ({ method, url, data, params, headers }: ApiCallParams) => {
    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}${url}`,
            data,
            params,
            headers
        });
        return response.data;
    }catch(error) {
        console.error(`API call error: ${error}`);
        throw error;
    }
}

export default apiCall;