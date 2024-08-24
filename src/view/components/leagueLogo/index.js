import React from 'react';
import { styled } from '@mui/material/styles';

const StyledImg = styled('img')({
  objectFit: 'contain',
  height: 100,
  width: 100
});

const LeagueLogo = ({ src, alt }) => <StyledImg src={src} alt={alt} />;

export default LeagueLogo;