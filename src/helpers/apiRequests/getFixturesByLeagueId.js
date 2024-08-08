import api from '../api';

export default (leagueId, round) => {
    return api.axiosInstance.get(`fixtures/${leagueId}/${round}`)
}