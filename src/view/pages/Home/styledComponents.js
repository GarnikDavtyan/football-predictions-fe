import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HomeContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const LeagueTitle = styled(Typography)({
    textAlign: 'center',
    margin: 'auto',
    color: '#fff',
    fontSize: '45px',

    '@media (max-width: 500px)': {
        fontSize: '25px',
        marginBottom: '4px'
    },
});

const BoxContainer = styled('div')({
    '@media (max-width: 500px)': {
        display: 'flex',
        flexDirection: 'column-reverse'
    },
});

const StyledBox = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: '10px',

    '@media (max-width: 1000px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    '@media (max-width: 750px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },

    '@media (max-width: 500px)': {
        gridTemplateColumns: 'repeat(1, 1fr)',
    },
});

export {
    HomeContainer,
    LeagueTitle,
    BoxContainer,
    StyledBox
};