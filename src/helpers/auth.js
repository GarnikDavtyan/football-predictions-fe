import api from './api';

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const login = (email, password) => {
    return api.axiosInstance.post('/login', {
        email,
        password
    });
};
const register = (name, email, password, password_confirmation) => {
    return api.axiosInstance.post('/register', {
        name,
        email,
        password,
        password_confirmation
    });
};

const logout = () => {
    return api.createAuthAxiosInstance().post(`/logout`).then(() => {
        localStorage.removeItem('user');
    });
};

export default {
    getCurrentUser,
    login,
    register,
    logout
};