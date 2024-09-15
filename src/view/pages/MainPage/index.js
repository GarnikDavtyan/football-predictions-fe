import React from 'react';
import { useParams } from 'react-router-dom';
import LeagueNavTab from './LeagueNavTab';
import LeagueTablesContainer from '../../containers/LeagueTablesContainer';
import NotFound from '../NotFound';

export default function MainPage(props) {
    const { slug } = useParams();

    let leagues = props.leagues;

    const league = leagues.find(league => league.slug === slug);

    return (
        <section>
            <LeagueNavTab leagues={leagues} slug={slug} />

            {league ?
                <LeagueTablesContainer {...props} league={league} leagueSlug={slug} />
                :
                <NotFound />}
        </section>
    )
}
