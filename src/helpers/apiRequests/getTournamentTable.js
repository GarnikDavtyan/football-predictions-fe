import createAxiosInstance from '../api';

const getTournamentTable = (leagueId) => {
    return createAxiosInstance().get(`leagues/${leagueId}/standings`)
}

export default getTournamentTable;
