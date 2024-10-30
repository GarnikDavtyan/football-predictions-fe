import { Paper, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
    backgroundColor: 'transparent',
    marginBottom: '10px',
    overflow: 'hidden',
});

const StyledTab = styled(Tab)({
    minWidth: 200,
    backgroundColor: '#fff',
    borderRadius: '10px',
    margin: '10px',
    '@media (max-width: 1400px)': {
        minWidth: 180,
    },
});

const SlideContainer = styled('div')({
    minWidth: 180,
    padding: '5px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '10px',
    margin: '10px',
});

export {
    StyledPaper,
    StyledTab,
    SlideContainer
};