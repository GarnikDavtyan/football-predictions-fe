import React, { useEffect, useState } from 'react';
import { Typography, Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';
import LeagueCard from '../../components/LeagueCard';
import { axiosInstance } from '../../../helpers/api';
import Loading from '../../components/Loading';

const StyledBox = styled(MuiBox)({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '10px'
});

const HomeContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const LeagueTitle = styled(Typography)({
    textAlign: 'center',
    color: '#fff',
    fontSize: '45px'
});

export default function Home() {
    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('leagues')
            .then((response) => {
                setLeagues(response.data.data);
            })
            .then(() => { setIsLoading(false) })
    }, []);

    return (
        !isLoading ?
            <HomeContainer>
                <StyledBox>
                    {leagues.map(league => (
                        <LeagueCard key={league.id} league={league} />
                    ))}
                </StyledBox>
                <LeagueTitle>Leagues</LeagueTitle>
            </HomeContainer>
            :
            <Loading />
    );
}
