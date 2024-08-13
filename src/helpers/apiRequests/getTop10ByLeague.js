import api from '../api';
import auth from '../auth';

export default (leagueId, round) => {
    return auth.getCurrentUser() 
        ? 
        api.createAuthAxiosInstance().get(`points/${leagueId}/${round}`)
        :
        api.axiosInstance.get(`points/${leagueId}/${round}`)
}