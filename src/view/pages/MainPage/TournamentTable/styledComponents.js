import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ ismobile }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
    minWidth: '17rem',
    borderRadius: ismobile ? '0 0 5px 5px' : '0 0 0 5px'
}));

const RoundPaper = styled(Paper)(({ ismobile }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: ismobile ? '5px 5px 0 0' : '5px 0 0 0'
}));

const RootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export {
    StyledPaper,
    RoundPaper,
    RootDiv
};