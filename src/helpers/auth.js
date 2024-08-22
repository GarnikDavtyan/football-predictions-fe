import * as api from './api';

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const login = (email, password) => {
    return api.axiosInstance.post('/login', {
        email,
        password
    });
};
export const register = (name, email, password, password_confirmation) => {
    return api.axiosInstance.post('/register', {
        name,
        email,
        password,
        password_confirmation
    });
};

export const logout = () => {
    return api.createAuthAxiosInstance().post(`/logout`)
    .then(() => {
        localStorage.removeItem('user');
    });
};