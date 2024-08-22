import {getAxiosInstanceType} from '../api';

const getFixturesByLeagueId = (leagueId, round) => {
    return getAxiosInstanceType().get(`fixtures/${leagueId}/${round}`)
}

export default getFixturesByLeagueId;
