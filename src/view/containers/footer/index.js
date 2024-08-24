import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { paths } from '../../../constants';

const FooterContainer = styled('footer')({
  marginTop: 'auto',
  backgroundColor: 'rgba(28, 38, 23, 0.56)',
});

const FooterContent = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '45px',
});

const CopyrightText = styled(Typography)({
  color: '#fff',
  fontSize: '16px',
});

const LinkStyled = styled(Link)({
  color: 'rgba(252, 252, 252, 0.55)',
});

function Copyright() {
  return (
    <CopyrightText variant="body2">
      {'Copyright © '}
      <LinkStyled to={paths.home}>
        Predictor
      </LinkStyled>{' '}
      {new Date().getFullYear()}
      {'.'}
    </CopyrightText>
  );
}

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright />
      </FooterContent>
    </FooterContainer>
  );
}
