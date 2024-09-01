import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeagueNavTab from './LeagueNavTab';
import LeagueTablesContainer from '../../containers/LeagueTablesContainer';
import { axiosInstance } from '../../../helpers/api';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';

export default function MainPage(props) {
    let { slug } = useParams();

    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get('leagues')
            .then((response) => {
                setLeagues(response.data.data);
            })
            .then(() => { setIsLoading(false) })
    }, []);

    const league = leagues.find(league => league.slug === slug);

    return (
        !isLoading ?
            <section>
                <LeagueNavTab leagues={leagues} slug={slug} />

                {league ?
                    <LeagueTablesContainer {...props} league={league} leagueSlug={slug} />
                    :
                    <NotFound />}
            </section>
            :
            <Loading />
    )
}
