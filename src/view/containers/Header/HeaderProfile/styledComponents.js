import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const StyledAvatar = styled(Avatar)(({ bgcolor }) => ({
    backgroundColor: bgcolor,
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
    '&:hover': {
        boxShadow: `0 0 5px 3px ${bgcolor}`,
        transform: 'scale(1.05)',
    },
}));


export {
    StyledAvatar,
    StyledLink
};