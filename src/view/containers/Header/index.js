import React from 'react';
import { styled } from '@mui/material/styles';
import HeaderLogo from './HeaderLogo';
import HeaderButtonsContainer from './HeaderButtonsContainer';
import HeaderProfile from './HeaderProfile';
import { Typography } from '@mui/material';

const HeaderContainer = styled('header')({
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    color: '#fff',
    height: '60px',
    paddingLeft: '10px',
    paddingRight: '10px'
});

const ProfileContainer = styled('div')({
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
});

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