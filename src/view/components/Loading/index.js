import React from 'react';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1000
});

const ProgressWrapper = styled('div')({
  width: '100%'
});

export default function Loading() {
  return (
    <Background>
      <ProgressWrapper>
        <LinearProgress variant="query" color="secondary" />
      </ProgressWrapper>
    </Background>
  );
}