import React, {useEffect, useState} from 'react';

import {makeStyles} from '@material-ui/core';
import PredictionTable from '../../pages/mainPage/predictionTable';
import Top10UsersPerLeagueList from '../../pages/mainPage/top10UsersPerLeagueList';
import TournamentTable from '../../pages/mainPage/tournamentTable';
import getFixtures from '../../../helpers/apiRequests/getFixturesByLeagueId';
import getTournamentTable from '../../../helpers/apiRequests/getTournamentTable';
import getTop10ByLeague from '../../../helpers/apiRequests/getTop10ByLeague';
import Loading from '../../components/loading';

const useStyles = makeStyles({
    tablesContainer: {
        display: "grid",
        gridTemplateColumns: "0.75fr 1.5fr 0.75fr",
        gridGap: "20px"
    },
    td:{
        padding: 0,
    }
});

export default (props) => {

    const { user, leagueId, league } = props;

    const classes = useStyles();
    const [round, setRound] = useState(0);
    const [fixtures, setFixtures] = useState([]);
    const [standings, setStandings] = useState([]);
    const [top10, setTop10] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRound(league.current_round);
    }, [leagueId])

    useEffect(() => {
        if (round) {
            setIsLoading(true);
            Promise.all([
                getFixtures(league.id, round),
                getTournamentTable(league.id),
                getTop10ByLeague(league.id, round),
            ])
            .then(([fixturesResponse, standingsResponse, top10Response]) => {
                    setFixtures(fixturesResponse.data.data);
                    setStandings(standingsResponse.data.data);
                    setTop10(top10Response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }, [leagueId, round]);

    return (
        !isLoading ?
        <div className={classes.tablesContainer} >
            <Top10UsersPerLeagueList top10={top10} />
            <PredictionTable setRound={setRound} round={round} leagueId={leagueId} user={user} fixtures={fixtures} rounds={league.current_round}/>
            <TournamentTable standings={standings} />
        </div >
        :
        <Loading />
    )
}
