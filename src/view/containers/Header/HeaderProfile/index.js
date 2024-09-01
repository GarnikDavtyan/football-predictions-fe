import React from 'react';
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { paths } from '../../../../constants';
import stringToColor from '../../../../helpers/common/stringToColor';
import getImageFullUrl from '../../../../helpers/common/getImageFullUrl';

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

export default function HeaderProfile({ user }) {
    const bgcolor = stringToColor(user.name);

    return (
        <StyledLink to={paths.profile}>
            <StyledAvatar
                alt={user.name.toUpperCase()}
                src={getImageFullUrl(user.avatar)}
                bgcolor={bgcolor}
            />
        </StyledLink>
    );
}
