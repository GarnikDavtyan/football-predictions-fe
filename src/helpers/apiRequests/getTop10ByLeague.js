import createAxiosInstance from '../api';

const getTop10ByLeague = (leagueId, round) => {
    return createAxiosInstance().get(`points/${leagueId}/${round}`)
}

export default getTop10ByLeague;
