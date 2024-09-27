import React from 'react';

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Grid,
    useMediaQuery,
} from '@mui/material';
import { getLetterColor } from '../../../../helpers/common/stringToColor';
import {
    StyledPaper,
    RoundPaper,
    RootDiv
} from './styledComponents';

export default function TournamentTable({ standings }) {
    const isMobile = useMediaQuery('(max-width:500px)');

    return (
        <RootDiv>
            <RoundPaper ismobile={+isMobile}>
                <Grid container justifyContent="center">
                    <Grid item>Tournament Table</Grid>
                </Grid>
            </RoundPaper>
            <TableContainer ismobile={+isMobile} component={StyledPaper} >
                <Table aria-label='tournament table'>
                    <TableHead>
                        <TableRow>
                            {['', 'Team', '', 'M', 'W', 'D', 'L', 'GD', 'Form', 'P'].map((str, i) => (
                                <TableCell key={i} align='center' sx={{ p: 0.25 }}>
                                    {str}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {standings.map((team, i) => (
                            <TableRow key={team.id} hover>
                                <TableCell align='center' padding="none">
                                    {i + 1}
                                </TableCell>
                                <TableCell padding="none">
                                    <Grid container alignItems="center" justifyContent="center">
                                        <img src={team.logo} height="30" alt={team.name} />
                                        &nbsp;
                                    </Grid>
                                </TableCell>
                                <TableCell padding="none">
                                    <Grid container alignItems="center">
                                        {team.name}
                                    </Grid>
                                </TableCell>
                                <TableCell align='center' padding="none">
                                    {team.games ?? 0}
                                </TableCell>
                                <TableCell align='center' padding="none">
                                    {team.win ?? 0}
                                </TableCell>
                                <TableCell align='center' padding="none">
                                    {team.draw ?? 0}
                                </TableCell>
                                <TableCell align='center' padding="none">
                                    {team.lose ?? 0}
                                </TableCell>
                                <TableCell align='center' padding="none">
                                    {team.goal_diff ?? 0}
                                </TableCell>
                                <TableCell align="center" padding="none">
                                    {team.form ? (
                                        team.form.split('').map((letter, index) => (
                                            <span key={index} style={{ color: getLetterColor(letter), fontWeight: 'bold' }}>
                                                {letter}
                                            </span>
                                        ))
                                    ) : (
                                        '-'
                                    )}
                                </TableCell>
                                <TableCell align='center' padding="none">
                                    {team.points ?? 0}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </RootDiv >
    );
}
