import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#fff',
    '@media (max-width: 600px)': {
        color: '#4e5569',
        textAlign: 'right',
        width: '100%'
    },
});

const StyledButton = styled(Button)({
    color: '#4e5569',
    backgroundColor: '#f6f7fb',
    '@media (max-width: 600px)': {
        color: '#f6f7fb',
        backgroundColor: '#4e5569'
    },
});

const ButtonContainer = styled('div')({
    display: 'flex',
    minWidth: '250px',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export {
    StyledLink,
    StyledButton,
    ButtonContainer
};