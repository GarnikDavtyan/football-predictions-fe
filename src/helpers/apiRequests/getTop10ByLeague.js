import api from '../api';

export default (leagueId, round) => {
    return api.getAxiosInstanceType().get(`points/${leagueId}/${round}`)
}