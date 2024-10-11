import { styled } from '@mui/material/styles';

const HeaderContainer = styled('header')({
    backgroundColor: 'rgba(28, 38, 23, 0.46)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    color: '#fff',
    height: '60px',
    paddingLeft: '10px',
    paddingRight: '10px',
    '@media (max-width: 500px)': {
        paddingLeft: '5px',
        paddingRight: '5px',
        height: '55px',
    }
});

const ProfileContainer = styled('div')({
    '@media (min-width: 700px)': {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    }
});

export {
    HeaderContainer,
    ProfileContainer
};