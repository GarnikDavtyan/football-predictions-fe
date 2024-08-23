import {getAxiosInstanceType} from '../api';

const getTop = () => {
    return getAxiosInstanceType().get(`points`)
}

export default getTop;
