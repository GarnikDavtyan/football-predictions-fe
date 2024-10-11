import createAxiosInstance from './api';

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const login = (email, password) => {
    return createAxiosInstance().post('/login', {
        email,
        password
    });
};

export const register = (name, email, password, password_confirmation) => {
    return createAxiosInstance().post('/register', {
        name,
        email,
        password,
        password_confirmation
    });
};

export const logout = () => {
    return createAxiosInstance().post(`/logout`)
        .then(() => {
            localStorage.removeItem('user');
        });
};