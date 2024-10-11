import createAxiosInstance from '../api';

export const updateProfile = (formData) => {
    formData.append('_method', 'PUT')
    return createAxiosInstance().post(`profile`, formData,);
}

export const deleteAvatar = () => {
    return createAxiosInstance().delete(`profile/avatar-delete`);
}

export const requestDeleteAccount = () => {
    return createAxiosInstance().post(`/profile/account-delete-request`);
}

