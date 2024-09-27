import { styled } from '@mui/material/styles';

export const HeaderLogoContainer = styled('div')({
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
