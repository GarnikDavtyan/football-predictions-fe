import { axiosInstance } from '../api';

export const sendResetLink = (email) => {
    return axiosInstance.post(`/password/email`, { email });
}

export const resetPassword = (token, email, password, password_confirmation) => {
    return axiosInstance.post(`/password/reset`, {
        token,
        email,
        password,
        password_confirmation
    });
}