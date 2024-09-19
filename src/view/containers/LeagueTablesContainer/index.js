import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import PredictionTable from '../../pages/MainPage/PredictionTable';
import Top10UsersPerLeagueList from '../../pages/MainPage/Top10UsersPerLeagueList';
import TournamentTable from '../../pages/MainPage/TournamentTable';
import getFixtures from '../../../helpers/apiRequests/getFixturesByLeagueId';
import getTournamentTable from '../../../helpers/apiRequests/getTournamentTable';
import getTop10ByLeague from '../../../helpers/apiRequests/getTop10ByLeague';
import Loading from '../../components/Loading';
import { enqueueSnackbar } from 'notistack';
import NotFound from '../../pages/NotFound';

const TablesContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '0.6fr 1.6fr 0.8fr',
    gridGap: '20px'
});

export default function LeagueTablesContainer(props) {
    const { user, leagueSlug, league, userToWatch } = props;

    const [round, setRound] = useState(0);
    const [fixtures, setFixtures] = useState([]);
    const [standings, setStandings] = useState([]);
    const [top10, setTop10] = useState({
        leaguePoints: [],
        roundPoints: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    const prevLeagueSlugRef = useRef();

    useEffect(() => {
        const leagueChanged = prevLeagueSlugRef.current !== leagueSlug;
        const roundIsSameAsLeagueCurrent = round === league.current_round;

        if (leagueChanged) {
            setRound(league.current_round);
        }

        if (round && (!leagueChanged || roundIsSameAsLeagueCurrent)) {
            setIsLoading(true);

            const promises = [
                getTop10ByLeague(league.id, round),
                getFixtures(league.id, round, userToWatch),
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
                    if (error.status === 404) {
                        setIsNotFound(true);
                    } else {
                        enqueueSnackbar('Something went wrong', { variant: "error" });
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });

            prevLeagueSlugRef.current = leagueSlug;
        }
    }, [round, leagueSlug, userToWatch]);

    return (
        !isLoading ?
            !isNotFound ?
                <TablesContainer>
                    <Top10UsersPerLeagueList
                        top10={top10}
                        league={league.slug}
                        userToWatch={userToWatch}
                    />
                    <PredictionTable
                        setRound={setRound}
                        round={round}
                        leagueId={league.id}
                        user={user}
                        fixtures={fixtures}
                        roundsCount={league.rounds}
                    />
                    <TournamentTable standings={standings} />
                </TablesContainer>
                :
                <NotFound />
            :
            <Loading />
    );
}