import createAxiosInstance from '../api';

const getTop = () => {
    return createAxiosInstance().get(`points`)
}

export default getTop;
