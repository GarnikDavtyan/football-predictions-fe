import { createAuthAxiosInstance } from '../api';

export const updateProfile = (formData) => {
    formData.append('_method', 'PUT')
    return createAuthAxiosInstance().post(`profile`, formData,);
}

export const deleteAvatar = () => {
    return createAuthAxiosInstance().delete(`profile/avatar-delete`);
}

export const requestDeleteAccount = () => {
    return createAuthAxiosInstance().post(`/profile/account-delete-request`);
}

