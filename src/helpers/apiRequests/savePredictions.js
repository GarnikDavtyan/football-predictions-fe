import api from '../api';

export default (leagueId, round, predictions) => {
    return api.createAuthAxiosInstance().post(`fixtures/${leagueId}/${round}`, {predictions : predictions})
}