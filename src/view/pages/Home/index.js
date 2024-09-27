import React from 'react';
import { useMediaQuery } from '@mui/material';
import LeagueCard from '../../components/LeagueCard';
import {
    HomeContainer,
    BoxContainer,
    StyledBox,
    LeagueTitle
} from './styledComponents';

export default function Home({ leagues }) {
    const isTablet = useMediaQuery('(min-width:500px) and (max-width:1000px)');

    return (
        <HomeContainer>
            <BoxContainer>
                <StyledBox>
                    {isTablet && <LeagueTitle>Leagues</LeagueTitle>}
                    {leagues.map(league => (
                        <LeagueCard key={league.id} league={league} />
                    ))}
                </StyledBox>
                {!isTablet && <LeagueTitle>Leagues</LeagueTitle>}
            </BoxContainer>
        </HomeContainer>
    );
}
