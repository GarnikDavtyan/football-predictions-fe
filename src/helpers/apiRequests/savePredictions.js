import { createAuthAxiosInstance } from '../api';

const savePredictions = (leagueId, round, predictions) => {
    return createAuthAxiosInstance().post(`fixtures/${leagueId}/${round}`, { predictions: predictions });
}

export default savePredictions;
