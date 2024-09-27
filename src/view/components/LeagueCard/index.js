import React from 'react';
import { CardContent, Typography } from '@mui/material';
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
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#262626', textWrap: 'nowrap' }}>
                        {league.name}
                    </Typography>
                </CardContent>
            </StyledCard>
        </StyledLink>
    );
}
