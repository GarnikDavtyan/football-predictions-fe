import React from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderButtonsContainer from './HeaderButtonsContainer';
import HeaderProfile from './HeaderProfile';
import { Typography } from '@mui/material';
import { HeaderContainer, ProfileContainer } from './styledComponents';

export default function Header({ user, ...restProps }) {
    return (
        <HeaderContainer>
            <HeaderLogo />
            <ProfileContainer>
                {user ? <HeaderProfile user={user} /> : <Typography>Guest</Typography>}
            </ProfileContainer>
            <HeaderButtonsContainer user={user} {...restProps} />
        </HeaderContainer>
    );
}