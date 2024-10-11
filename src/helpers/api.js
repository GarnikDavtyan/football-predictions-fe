import axios from 'axios';
import { paths } from '../constants';
import { enqueueSnackbar } from 'notistack';

const API_URL = process.env.REACT_APP_API_URL + '/api';

const createAxiosInstance = () => {
    const axiosConfig = {
        baseURL: API_URL
    }

    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser && currentUser.access_token) {
        axiosConfig.headers = {
            'Authorization': `Bearer ${currentUser.access_token}`
        };
    }

    const axiosInstance = axios.create(axiosConfig);

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest.url.includes('/refresh-token')) {
                try {
                    const response = await axiosInstance.post('/refresh-token', {
                        refresh_token: JSON.parse(localStorage.getItem('user')).refresh_token
                    });

                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.data.access_token}`;

                    return axiosInstance(originalRequest);
                } catch (err) {
                    enqueueSnackbar('Please log in', { variant: "error" });

                    setTimeout(() => {
                        localStorage.removeItem('user');
                        window.location.replace(paths.home);
                    }, 1000);

                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default createAxiosInstance;