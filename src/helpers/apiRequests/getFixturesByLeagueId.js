import api from '../api';

export default (leagueId, round) => {
    return api.getAxiosInstanceType().get(`fixtures/${leagueId}/${round}`)
}