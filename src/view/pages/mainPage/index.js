import React from 'react';
import { useParams } from 'react-router-dom';
import LeagueNavTab from './leagueNavTab';
import LeagueTablesContainer from '../../containers/leagueTablesContainer';

export default function MainPage(props) {
    let { id } = useParams();
    id = +id;

    const league = props.leagues.find(league => league.league_api_id === id);

    const isValidId = ~props.leagues.findIndex(league => league.league_api_id === id);

    return (
        <section>
            <LeagueNavTab {...props} leagueId={id} />

            {isValidId ? <LeagueTablesContainer {...props} league={league} leagueId={id} /> : <h1 style={{color:'red', textAlign: 'center' }}>There is no such league id</h1>}

        </section>
    )
}
