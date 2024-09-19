import { getAxiosInstanceType } from '../api';

const getFixturesByLeagueId = (leagueId, round, userToWatch = '') => {
    let url = `fixtures/${leagueId}/${round}`;

    if (userToWatch) {
        url += `?user=${userToWatch}`
    }

    return getAxiosInstanceType().get(url)
}

export default getFixturesByLeagueId;
