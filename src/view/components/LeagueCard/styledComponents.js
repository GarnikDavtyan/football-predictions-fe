import { Card, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)({
    maxWidth: '345px',
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.61)',
    transition: 'transform 0.3s, box-shadow 0.3s',

    '&:hover': {
        cursor: 'pointer',
        transform: 'scale(0.9)',
        boxShadow: '0 4px 10px 0 rgba(132, 138, 145, 0.77)',
    },

    '@media (min-width:1000px) and (max-width:1200px)': {
        maxWidth: '100%',
        minWidth: '170px',
    },

    '@media (max-width: 500px)': {
        maxWidth: '100%',
        minWidth: '160px',
    },
});

const StyledCardMedia = styled(CardMedia)({
    margin: '20px',
    height: '140px',
    width: '70%',
    backgroundSize: 'contain',

    '@media (min-width:1000px) and (max-width:1200px)': {
        height: '120px',
    },

    '@media (max-width: 500px)': {
        height: '100px',
    },
});

const StyledLink = styled(Link)({
    textDecoration: 'none',
});

export {
    StyledCard,
    StyledCardMedia,
    StyledLink
};