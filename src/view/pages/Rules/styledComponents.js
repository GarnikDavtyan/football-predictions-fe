import { styled } from '@mui/material/styles';

const Container = styled('div')({
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.61)',
    padding: '20px',
    borderRadius: '10px'
});

const Heading = styled('h1')({
    textAlign: 'center'
});

const OlLists = styled('ol')({
    marginLeft: '10px',
});

const UlLists = styled('ul')({
    marginLeft: '20px',
});

const Li = styled('li')({
    marginBottom: '20px',
});

export {
    Container,
    Heading,
    OlLists,
    UlLists,
    Li
};