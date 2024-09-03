import React from 'react';

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getLetterColor } from '../../../../helpers/common/stringToColor';

const StyledPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
    minWidth: '17rem',
    borderRadius: 0
});

const RoundPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
});

const RootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export default function TournamentTable({ standings }) {
    return (
        <RootDiv>
            <RoundPaper square>
                <Grid container justifyContent="center">
                    <Grid item>Tournament Table</Grid>
                </Grid>
            </RoundPaper>
            <TableContainer component={StyledPaper}>
                <Table aria-label='tournament table'>
                    <TableHead>
                        <TableRow>
                            {['', 'Team', 'M', 'W', 'D', 'L', 'GD', 'Form', 'P'].map((str, i) => (
                                <TableCell key={i} align={i - 1 ? 'center' : 'left'} padding="none">
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
                                    <Grid container alignItems="center">
                                        <img src={team.logo} height="30" alt={team.name} />
                                        &nbsp;
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
        </RootDiv>
    );
}
