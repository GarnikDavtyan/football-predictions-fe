import React from 'react';
import { styled } from '@mui/material/styles';
import HeaderLogo from './HeaderLogo';
import HeaderButtonsContainer from './HeaderButtonsContainer';

const HeaderContainer = styled('header')({
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: '#fff',
    padding: '10px',
});

export default function Header({ user, ...restProps }) {
    return (
        <HeaderContainer>
            <HeaderLogo />
            <span>{user ? user.name : 'Guest'}</span>
            <HeaderButtonsContainer user={user} {...restProps} />
        </HeaderContainer>
    );
}