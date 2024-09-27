import { axiosInstance } from '../api';

const getTournamentTable = (leagueId) => {
    return axiosInstance.get(`leagues/${leagueId}/standings`)
}

export default getTournamentTable;
