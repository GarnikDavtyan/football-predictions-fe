import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    textDecoration: 'none',
    color: '#fff',
    '@media (max-width: 700px)': {
        color: '#4e5569',
        textAlign: 'right',
        width: '100%'
    },
});

const StyledButton = styled(Button)({
    color: '#4e5569',
    backgroundColor: '#f6f7fb',
    '@media (max-width: 700px)': {
        color: '#f6f7fb',
        backgroundColor: '#4e5569'
    },
});

const ButtonContainer = styled('div')({
    display: 'flex',
    minWidth: '300px',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export {
    StyledLink,
    StyledButton,
    ButtonContainer
};