import createAxiosInstance from '../api';

const getUser = () => {
    return createAxiosInstance().get(`user`);
}

export default getUser;