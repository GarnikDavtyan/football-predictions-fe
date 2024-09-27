import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const LinksContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

const StyledLink = styled(Link)({
    padding: '20px 20px 10px 20px',
    color: '#3f51b5',
    textDecoration: 'none',
    cursor: 'pointer'
});


export {
    LinksContainer,
    StyledLink
};