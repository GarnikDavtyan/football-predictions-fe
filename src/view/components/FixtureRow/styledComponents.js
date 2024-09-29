import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const InputsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
});

const DivRight = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

const DivLeft = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
});

const LogoContainer = styled('div')({
    width: '50px',
    display: 'flex',
    justifyContent: 'center'
});

const DateText = styled(Typography)({
    textAlign: 'center',
});

const TopUserPredictionsText = styled(Typography)({
    fontSize: '0.9rem'
});

const MobileColumnContainer = styled('div')({
    '@media (max-width: 500px)': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        minHeight: '85px',
        alignItems: 'center'
    },
});

const InputNum = styled('input')({
    width: '2em',
    textAlign: 'center',
    WebkitAppearance: 'none',
    outline: 'none',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
});

export {
    InputsContainer,
    DivRight,
    DivLeft,
    LogoContainer,
    DateText,
    MobileColumnContainer,
    InputNum,
    TopUserPredictionsText
};