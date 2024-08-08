import api from '../api';

export default (leagueId) => {
    return api.axiosInstance.get(`leagues/${leagueId}/standings`)
}