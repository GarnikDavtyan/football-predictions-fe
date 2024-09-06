import { createAuthAxiosInstance } from '../api';

const getUser = () => {
    return createAuthAxiosInstance().get(`user`);
}

export default getUser;