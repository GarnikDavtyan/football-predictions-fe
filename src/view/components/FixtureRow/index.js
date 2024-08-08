import React, { useState, useEffect } from 'react';
import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    Paper,
    Typography,
    makeStyles,
} from "@material-ui/core";
import PredictionInput from './predictionInput';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles({
    inputsContainer: {
        display: 'flex',
        justifyContent: "center",
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    left: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    overflow: {
        maxWidth: 100,
        textOverflow: 'elipsis',
    },
});


export default ({ user, leagueId, roundId, fixture, checkboxValue, setCheckboxValue, fixtures }) => {
    const classes = useStyles();
    const fixId = fixture.id;
    const [info, setInfo] = useState(false);

    const [prediction, setPrediction] = useState({
        home: '',
        away: '',
        points: 0,
    });

    const predictionHandler = snapshot => {
        let pred = snapshot.val();
        if (pred) {
            pred.x2 && setCheckboxValue(fixId);
            setPrediction({
                home: pred.homeGoals,
                away: pred.awayGoals,
                points: pred.fixturePoints,
            })
        }
    }

    useEffect(() => {
        // let canselled = false;
        // !canselled && user && getUserPrediction(predictionHandler, user.name, leagueId, roundId, fixId)

        // return () => {
        //     canselled = true;
        //     setCheckboxValue(0);
        //     setPrediction({
        //         home: '',
        //         away: '',
        //         points: 0,
        //     })
        // }
    }, [])

    const isFinished = fixture.status === 'FT';
    const isNotStarted = fixture.status === 'NS';

    function handleCheckboxChange() {
        if (checkboxValue && fixtures.find(fix => fix.id === checkboxValue).status === 'FT') return;
        setCheckboxValue(fixId);
    }

    function handleInfoClick() {
        setInfo(!info)
    }

    return (<>
        {/* <<<<<<< table-ui */}
        {/*                 <TableRow key={row.fixture_id}>
                    <TableCell component="th" scope="row" align="center" className={classes.tableCell} padding="none">
                        <IconButton onClick={handleInfoClick} value={row.fixture_id}>
                            <InfoIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell align="right" padding="none">{row.homeTeam.team_name}</TableCell>
                    <TableCell align="center" padding="none"><span>{row.statusShort === 'FT' ? row.goalsHomeTeam + ' : ' + row.goalsAwayTeam : '- : -'}</span></TableCell>
                    <TableCell align="left" padding="none">{row.awayTeam.team_name}</TableCell>
                    <TableCell align="center" padding="none">
                        <Checkbox
                            checked={row.fixture_id == value}
                            onChange={handleCheckboxChange}
                            value={row.fixture_id}
                            color='secondary'
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /></TableCell>
                    <TableCell align="center" padding="none">
                        {row.statusShort !== 'FT' ?
                        <div className={classes.inputsContainer}>
                            <PredictionInput width={10} /> : <PredictionInput width={10} />
                        </div> : '- : -'}
                    </TableCell>
                    <TableCell align="center" padding="none">0</TableCell>
                </TableRow>
        {info.includes(row.fixture_id) &&
        <TableRow>
            <TableCell/>
            <TableCell colSpan={5} padding="none">
                        <Paper>
                            <Typography color="textSecondary">
                                Match start:
                            </Typography>
                        </Paper>
            </TableCell>
            <TableCell padding="none"/>
======= */}
        <TableRow key={fixId} id={fixId}>
            <TableCell component="th" scope="row" align="center" padding="none">
                <IconButton onClick={handleInfoClick} value={fixId}>
                    <InfoIcon />
                </IconButton>
            </TableCell>
            <TableCell align="right" padding="none">
                <div className={classes.right}>
                    {fixture.team_home.name}
                    &nbsp;
                    <img src={fixture.team_home.logo} /*alt={fixture.homeTeam.team_id}*/ width="30" height="30" />
                </div>
            </TableCell>
            <TableCell align="center" padding="none">
                <span>
                    {isFinished ? fixture.scoreHome + ' : ' + fixture.scoreAway : '- : -'}
                </span></TableCell>
            <TableCell align="left" padding="none">
                <div className={classes.left}>
                    <img src={fixture.team_away.logo} /*alt={fixture.teamAway.team_id} */ width="30" height="30" />
                    &nbsp;
                    {fixture.team_away.name}
                </div>
            </TableCell>
            <>
                <TableCell align="center" padding="none">
                <Checkbox
                        disabled={!user || !isNotStarted || !prediction.home || !prediction.away}
                        checked={fixId === checkboxValue}
                        onChange={handleCheckboxChange}
                        value={fixId}
                        color='secondary'
                        // inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </TableCell>
                <TableCell align="center" padding="none">
                    {isNotStarted ?
                        <div className={classes.inputsContainer}>
                            <PredictionInput disabled={!user} prediction={prediction} setPrediction={setPrediction} which='home' />
                            {` - `}
                            <PredictionInput disabled={!user} prediction={prediction} setPrediction={setPrediction} which='away' />
                        </div>
                        : `${prediction.home || '-'} : ${prediction.away || '-'}`}
                </TableCell >
                <TableCell padding="none" align="center">{user ? prediction.points : '-'}</TableCell>
            </>
        </TableRow>
        {info
            &&
            <TableRow>
                <TableCell />
                <TableCell colSpan={3}>
                    <Paper>
                        <Typography color="textSecondary" className={classes.overflow}>
                            {`Match start: ${new Date(fixture.date)}`}
                        </Typography>
                    </Paper>
                </TableCell>
                <TableCell colSpan={3}/>
            </TableRow>}
    </>
    );
}
