import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../constants';
import logo from '../../../images/logoBalls/logo.png';

const HeaderLogoContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    fontSize: 'x-large',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover img': {
        animationName: 'rotate',
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
    },
    '@keyframes rotate': {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
    },
});

export default function HeaderLogo() {
    const navigate = useNavigate();
    
    return (
        <HeaderLogoContainer onClick={() => navigate(paths.home)}>
            PREDICT
            <img 
                style={{ margin: '0px 2px' }} 
                src={logo} 
                alt='O' 
                height="42" 
                width="42" 
            />
            R
        </HeaderLogoContainer>
    );
}