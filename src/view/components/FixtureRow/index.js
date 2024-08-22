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
import PredictionInput from './PredictionInput';
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
    date: {
        textAlign: 'center'
    },
});


export default function FixtureRow({ user, fixture, x2FixtureId, setX2FixtureId, fixtures, setPredictions }) {
    const classes = useStyles();
    const fixId = fixture.id;

    const [info, setInfo] = useState(false);
    const [prediction, setPrediction] = useState({
        fixture_id : fixId,
        score_home: '',
        score_away: '',
        x2: false,
        points: 0,
    });

    useEffect(() => {
        if (fixture.predictions && fixture.predictions.length) {
            setPrediction(fixture.predictions[0])
            if (fixture.predictions[0].x2) {
                setX2FixtureId(fixId);
            }
            setPredictions(prevPredictions => [...prevPredictions, fixture.predictions[0]] )
        }
    }, [])

    const isFinished = fixture.status === 'FT';
    const isNotStarted = fixture.status === 'NS';

    function handleCheckboxChange() {
        if (x2FixtureId && fixtures.find(fix => fix.id === x2FixtureId).status === 'FT') return;
        setX2FixtureId(fixId);
    }

    function handleInfoClick() {
        setInfo(!info)
    }

    return (<>
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
                    <img src={fixture.team_home.logo} alt={fixture.team_home.name} width="30" height="30" />
                </div>
            </TableCell>
            <TableCell align="center" padding="none">
                <span>
                    {isFinished ? fixture.score_home + ' : ' + fixture.score_away : '- : -'}
                </span></TableCell>
            <TableCell align="left" padding="none">
                <div className={classes.left}>
                    <img src={fixture.team_away.logo} alt={fixture.team_away.name} width="30" height="30" />
                    &nbsp;
                    {fixture.team_away.name}
                </div>
            </TableCell>
            <>
                <TableCell align="center" padding="none">
                <Checkbox
                        disabled={!user || !isNotStarted || !prediction.score_home || !prediction.score_away}
                        checked={fixId === x2FixtureId}
                        onChange={handleCheckboxChange}
                        value={fixId}
                        color='secondary'
                    />
                </TableCell>
                <TableCell align="center" padding="none">
                    {isNotStarted ?
                        <div className={classes.inputsContainer}>
                            <PredictionInput 
                                disabled={!user} 
                                prediction={prediction} 
                                setPrediction={setPrediction} 
                                setPredictions={setPredictions} 
                                fixtureId={fixture.id} 
                                which='score_home' 
                            />
                            {` - `}
                            <PredictionInput 
                                disabled={!user} 
                                prediction={prediction} 
                                setPrediction={setPrediction} 
                                setPredictions={setPredictions} 
                                fixtureId={fixture.id} 
                                which='score_away' 
                            />
                        </div>
                        : `${prediction.score_home || '-'} : ${prediction.score_away || '-'}`}
                </TableCell >
                <TableCell padding="none" align="center">{user && prediction.points ? prediction.points : '-'}</TableCell>
            </>
        </TableRow>
        {info
            &&
            <TableRow>
                <TableCell />
                <TableCell colSpan={3}>
                    <Paper>
                        <Typography color="textSecondary" className={classes.date}>
                            {`Match start: 
                                    ${new Date(fixture.date)
                                        .toLocaleString(undefined, {
                                            weekday: 'short',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hourCycle: 'h23',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}`}
                        </Typography>
                    </Paper>
                </TableCell>
                <TableCell colSpan={3}/>
            </TableRow>}
    </>
    );
}
