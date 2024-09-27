import { Grid, Paper, Table } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
    marginBottom: '20px',
    borderRadius: '0 0 5px 5px'
});

const RoundCaption = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: '5px 5px 0 0'
});

const RootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const StyledTable = styled(Table)({
    whiteSpace: 'noWrap',
});

const Info = styled(Grid)({
    color: 'gold',
    textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    textAlign: 'center'
});

export {
    StyledPaper,
    StyledTable,
    RoundCaption,
    RootDiv,
    Info
};