import React from 'react';
import { styled } from '@mui/material/styles';

const ErrorText = styled('h1')({
    margin: 'auto',
    color: 'white',
    textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
});

export default function NotFound() {
    return <ErrorText>Error 404 : Not Found</ErrorText>;
}