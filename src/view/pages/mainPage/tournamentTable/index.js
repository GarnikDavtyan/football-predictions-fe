import React, { useEffect, useState } from 'react';

import {
    makeStyles,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Grid,
} from '@material-ui/core';

import getTournamentTable from '../../../../helpers/apiRequests/getTournamentTable';

const useStyles = makeStyles({
    paper: {
        backgroundColor: "rgba(255, 255, 255, 0.52)",
        minWidth: '17rem',
    },
    rootDiv: {
        display: 'flex',
        flexDirection: 'column',
    },

    roundPaper: {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
    }
});

export default function TournamentTable({ leagueId }) {
    const classes = useStyles();

    const [standings, setStandings] = useState([]);

    useEffect(() => {
        getTournamentTable(leagueId).then(standings => setStandings(standings.data.data))
        
    }, [leagueId])

    return (
        <div className={classes.rootDiv}>
            <Paper square className={classes.roundPaper}>
                <Grid container justifyContent="center" className={classes.prevNextDiv}>
                    <Grid item>Tournament Table</Grid>
                </Grid>
            </Paper>
            <TableContainer className={classes.paper}>
                <Table className={classes.table} aria-label='tournament table'>
                    <TableHead>
                        <TableRow>
                            {['', 'Team', 'M', 'W', 'D', 'L', 'GD', 'Form', 'P'].map((str, i) =>
                                <TableCell key={i} align={i - 1 ? 'center' : 'left'} padding="none">{str}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {standings.map((team, i) => (
                            <TableRow key={team.id} hover>
                                <TableCell align='center' padding="none">{i + 1}</TableCell>
                                <TableCell padding="none">
                                    <Grid container alignItems="center">
                                        <img src={team.logo} width="30" height="30" />
                                        &nbsp;
                                        {team.name}
                                    </Grid>
                                </TableCell>
                                <TableCell align='center' padding="none">{team.games ?? 0}</TableCell>
                                <TableCell align='center' padding="none">{team.win ?? 0}</TableCell>
                                <TableCell align='center' padding="none">{team.draw ?? 0}</TableCell>
                                <TableCell align='center' padding="none">{team.lose ?? 0}</TableCell>
                                <TableCell align='center' padding="none">{team.goal_diff ?? 0}</TableCell>
                                <TableCell align='center' padding="none">{team.form ?? '-'}</TableCell>
                                <TableCell align='center' padding="none">{team.points ?? 0}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
