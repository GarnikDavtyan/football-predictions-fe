import createAxiosInstance from '../api';

const getFixturesByLeagueId = (leagueId, round, userToWatch = '') => {
    let url = `fixtures/${leagueId}/${round}`;

    if (userToWatch) {
        url += `?user=${userToWatch}`
    }

    return createAxiosInstance().get(url)
}

export default getFixturesByLeagueId;
