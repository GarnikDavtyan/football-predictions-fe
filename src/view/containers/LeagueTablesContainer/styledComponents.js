import { styled } from '@mui/material/styles';

const TablesContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '0.6fr 1.6fr 0.8fr',
    gridGap: '20px',
    '@media (max-width: 1000px)': {
        gridTemplateColumns: '0.8fr 1.2fr',
        gridTemplateRows: 'auto auto',
        gridGap: '10px',
        '& > *:nth-of-type(1)': {
            gridColumn: '1',
            gridRow: '2',
        },
        '& > *:nth-of-type(2)': {
            gridColumn: '1 / -1',
            gridRow: '1',
        },
        '& > *:nth-of-type(3)': {
            gridColumn: '2',
            gridRow: '2'
        },
    },
});

const SlidesContainer = styled('div')({
    overflow: 'hidden',
});

const SlideContainer = styled('div')({
    width: '100%',
    padding: '0 2.5px',
    boxSizing: 'border-box'
});

export {
    TablesContainer,
    SlidesContainer,
    SlideContainer
};