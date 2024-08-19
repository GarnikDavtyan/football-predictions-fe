import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL
});

const createAuthAxiosInstance = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.access_token) {
        return axios.create({
            baseURL: API_URL,
            headers: {
                'Authorization': `Bearer ${currentUser.access_token}`
            }
        });
    }
    return null;
};

const getAxiosInstanceType = () => {
    return localStorage.getItem('user')
        ? 
        createAuthAxiosInstance()
        :
        axiosInstance
}

export default { 
    axiosInstance,
    createAuthAxiosInstance,
    getAxiosInstanceType
};