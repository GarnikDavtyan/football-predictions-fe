import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const FooterContainer = styled('footer')({
    marginTop: 'auto',
    backgroundColor: 'rgba(28, 38, 23, 0.56)',
    width: '100%',
    '@media (max-width: 500px)': {
        padding: '5px',
    },
});

const FooterContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px',
    '@media (max-width: 500px)': {
        flexDirection: 'column',
        height: '45px',
        justifyContent: 'center',
    },
});

const Text = styled(Typography)({
    color: '#fff',
    fontSize: '16px',
    marginLeft: '10px',
    marginRight: '10px',

    '@media (max-width: 700px)': {
        fontSize: '12px',
        textAlign: 'center',
        margin: '2px',
    },
});

const StyledLink = styled(Link)({
    color: 'rgba(252, 252, 252, 0.55)',
});

export {
    FooterContainer,
    FooterContent,
    Text,
    StyledLink
};