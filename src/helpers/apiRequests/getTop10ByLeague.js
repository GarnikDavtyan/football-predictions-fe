import {getAxiosInstanceType} from '../api';

const getTop10ByLeague = (leagueId, round) => {
    return getAxiosInstanceType().get(`points/${leagueId}/${round}`)
}

export default getTop10ByLeague;
