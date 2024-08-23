import React from 'react';
import { useParams } from 'react-router-dom';
import LeagueNavTab from './LeagueNavTab';
import LeagueTablesContainer from '../../containers/LeagueTablesContainer';

export default function MainPage(props) {
    let { slug } = useParams();

    const league = props.leagues.find(league => league.slug === slug);

    const isValidId = ~props.leagues.findIndex(league => league.slug === slug);

    return (
        <section>
            <LeagueNavTab {...props} slug={slug} />

            {isValidId ? <LeagueTablesContainer {...props} league={league} leagueSlug={slug} /> : <h1 style={{color:'red', textAlign: 'center' }}>There is no such league</h1>}

        </section>
    )
}
