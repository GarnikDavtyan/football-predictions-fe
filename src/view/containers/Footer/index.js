import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { paths } from '../../../constants';

const FooterContainer = styled('footer')({
    marginTop: 'auto',
    backgroundColor: 'rgba(28, 38, 23, 0.56)',
});

const FooterContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px',
});

const Text = styled(Typography)({
    color: '#fff',
    fontSize: '16px',
    marginLeft: '10px',
    marginRight: '10px',
});

const LinkStyled = styled(Link)({
    color: 'rgba(252, 252, 252, 0.55)',
});

function Copyright() {
    return (
        <Text variant="body2">
            {'Copyright © '}
            <LinkStyled to={paths.home}>
                Predictor
            </LinkStyled>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Text>
    );
}

export default function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <Text>Contact Email Address:
                    <LinkStyled to={'mailto:predictor.football2024@gmail.com'}>
                        predictor.football2024@gmail.com
                    </LinkStyled>
                </Text>
                <Copyright />
            </FooterContent>
        </FooterContainer>
    );
}
