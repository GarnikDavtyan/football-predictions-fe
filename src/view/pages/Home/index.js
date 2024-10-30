import React from 'react';
import { useMediaQuery } from '@mui/material';
import LeagueCard from '../../components/LeagueCard';
import {
    HomeContainer,
    BoxContainer,
    StyledBox,
    LeagueTitle,
    ClContainer
} from './styledComponents';

export default function Home({ leagues }) {
    const isTablet = useMediaQuery('(min-width:500px) and (max-width:1000px)');

    const championsLeague = leagues.find(league => league.name === 'UEFA Champions League');
    const mainLeagues = leagues.filter(league => league.name !== 'UEFA Champions League');

    return (
        <HomeContainer>
            <BoxContainer>
                <StyledBox>
                    {isTablet && <LeagueTitle>Leagues</LeagueTitle>}
                    {mainLeagues.map(league => (<LeagueCard key={league.id} league={league} />))}
                </StyledBox>
                {!isTablet && <LeagueTitle>Leagues</LeagueTitle>}
                {championsLeague &&
                    <ClContainer>
                        <LeagueCard league={championsLeague} />
                    </ClContainer>
                }
            </BoxContainer>
        </HomeContainer>
    );
}
