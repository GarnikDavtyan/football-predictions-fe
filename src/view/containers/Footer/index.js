import React from 'react';
import { paths } from '../../../constants';
import {
    FooterContainer,
    FooterContent,
    Text,
    StyledLink
} from './styledComponents';

const email = process.env.REACT_APP_EMAIL;

function Copyright() {
    return (
        <Text variant="body2">
            Copyright ©&nbsp;
            <StyledLink to={paths.home}>
                Predictor
            </StyledLink>&nbsp;
            {new Date().getFullYear()}
            .
        </Text>
    );
}

export default function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <Text variant="body2">
                    Contact Email Address:&nbsp;
                    <StyledLink to={'mailto:' + email}>
                        {email}
                    </StyledLink>
                </Text>
                <Copyright />
            </FooterContent>
        </FooterContainer>
    );
}