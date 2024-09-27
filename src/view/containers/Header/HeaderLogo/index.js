import React from 'react';
import { HeaderLogoContainer } from './styledComponents';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../constants';
import logo from '../../../images/logoBalls/logo.png';

export default function HeaderLogo() {
    const navigate = useNavigate();

    return (
        <HeaderLogoContainer onClick={() => navigate(paths.home)}>
            PREDICT
            <img
                style={{ margin: '0px 2px' }}
                src={logo}
                alt='O'
                height="42"
                width="42"
            />
            R
        </HeaderLogoContainer>
    );
}