import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import PredictionTable from '../../pages/MainPage/PredictionTable';
import Top10UsersPerLeagueList from '../../pages/MainPage/Top10UsersPerLeagueList';
import TournamentTable from '../../pages/MainPage/TournamentTable';
import getFixtures from '../../../helpers/apiRequests/getFixturesByLeagueId';
import getTournamentTable from '../../../helpers/apiRequests/getTournamentTable';
import getTop10ByLeague from '../../../helpers/apiRequests/getTop10ByLeague';
import Loading from '../../components/Loading';

const TablesContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '0.75fr 1.5fr 0.75fr',
    gridGap: '20px'
});

export default function LeagueTablesContainer(props) {
    const { user, leagueSlug, league } = props;

    const [round, setRound] = useState(0);
    const [fixtures, setFixtures] = useState([]);
    const [standings, setStandings] = useState([]);
    const [top10, setTop10] = useState({
        leaguePoints: [],
        roundPoints: []
    });
    const [isLoading, setIsLoading] = useState(false);

    const prevLeagueSlugRef = useRef();

    useEffect(() => {
        const leagueChanged = prevLeagueSlugRef.current !== leagueSlug;
        const roundToSet = 'postp_round' in league ? league.postp_round : league.current_round;
        const roundIsSameAsLeagueCurrent = round === roundToSet;

        if (leagueChanged) {
            setRound(roundToSet);
        }

        if (round && (!leagueChanged || roundIsSameAsLeagueCurrent)) {
            setIsLoading(true);

            const promises = [
                getTop10ByLeague(league.id, round),
                getFixtures(league.id, round),
            ];

            if (leagueChanged) {
                promises.push(getTournamentTable(league.id));
            }

            Promise.all(promises)
                .then((responses) => {
                    const [top10Response, fixturesResponse, standingsResponse] = responses;
                    setTop10({
                        leaguePoints: top10Response.data.data.leaguePoints,
                        roundPoints: top10Response.data.data.roundPoints,
                    });
                    setFixtures(fixturesResponse.data.data);

                    if (leagueChanged) {
                        setStandings(standingsResponse.data.data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });

            prevLeagueSlugRef.current = leagueSlug;
        }
    }, [round, leagueSlug]);

    return (
        !isLoading ?
            <TablesContainer>
                <Top10UsersPerLeagueList top10={top10} />
                <PredictionTable
                    setRound={setRound}
                    round={round}
                    leagueId={league.id}
                    user={user}
                    fixtures={fixtures}
                    roundsCount={league.current_round}
                />
                <TournamentTable standings={standings} />
            </TablesContainer>
            :
            <Loading />
    );
}