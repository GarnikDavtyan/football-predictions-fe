import createAxiosInstance from '../api';

export const sendResetLink = (email) => {
    return createAxiosInstance().post(`/password/email`, { email });
}

export const resetPassword = (token, email, password, password_confirmation) => {
    return createAxiosInstance().post(`/password/reset`, {
        token,
        email,
        password,
        password_confirmation
    });
}