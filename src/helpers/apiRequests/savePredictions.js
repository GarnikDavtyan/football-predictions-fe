import createAxiosInstance from '../api';

const savePredictions = (leagueId, round, predictions, x2Fixture) => {
    return createAxiosInstance().post(`fixtures/${leagueId}/${round}`, {
        predictions: predictions,
        x2_fixture_id: x2Fixture
    });
}

export default savePredictions;
