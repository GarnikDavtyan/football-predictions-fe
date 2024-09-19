import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import LeagueNavTab from './LeagueNavTab';
import LeagueTablesContainer from '../../containers/LeagueTablesContainer';
import NotFound from '../NotFound';

export default function MainPage(props) {
    const { slug } = useParams();
    const userToWatch = useSearchParams()[0].get('user')

    let leagues = props.leagues;

    const league = leagues.find(league => league.slug === slug);

    return (
        <section>
            <LeagueNavTab leagues={leagues} slug={slug} />

            {league ?
                <LeagueTablesContainer
                    {...props}
                    league={league}
                    leagueSlug={slug}
                    userToWatch={userToWatch}
                />
                :
                <NotFound />}
        </section>
    )
}
