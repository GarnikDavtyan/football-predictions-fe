import React from 'react';
import { paths } from '../../../constants';
import {
    StyledCard,
    StyledCardMedia,
    StyledLink
} from './styledComponents';

export default function LeagueCard({ league }) {
    return (
        <StyledLink to={paths.main + '/' + league.slug}>
            <StyledCard>
                <StyledCardMedia image={league.logo} />
            </StyledCard>
        </StyledLink>
    );
}
