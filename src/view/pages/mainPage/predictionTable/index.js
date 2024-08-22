import React, { useState, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
    Button,
    Grid,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FixtureRow from '../../../components/FixtureRow';
import { useSnackbar } from "notistack";
import savePredictions from '../../../../helpers/apiRequests/savePredictions';
import Loading from '../../../components/Loading';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: "rgba(255, 255, 255, 0.52)",
        marginBottom: "20px"
    },

    roundCaption: {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
    },

    clickable: {
        cursor: 'pointer',
    },

    button: {
        alignSelf: 'flex-end',
    },

    rootDiv: {
        display: 'flex',
        flexDirection: 'column',
    },

    inputsContainer: {
        display: 'flex',
    },

    table: {
        whiteSpace: 'noWrap',
    },

    plsSign: {
        color: 'yellow',
        textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    },
}));

export default function PredictionTable({ user, leagueId, round, setRound, fixtures, rounds }) {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [x2FixtureId, setX2FixtureId] = useState(0);
    const [roundsCount, setRoundsCount] = useState(0);
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const areAllStarted = fixtures.every(fix => fix.status !== 'NS')

    const handleRoundChangeCLick = dif => round + dif > 0 && round + dif <= roundsCount && setRound(round + dif);

    const handleSubmit = e => {
        e.preventDefault();
        try {
            if (!predictions.length) {
                throw new Error("EMPTY");
            }

            const updatedPredictions = predictions.map((prediction) => {
                if (!prediction.score_home || !prediction.score_away) {
                    throw new Error("PREDICTION_MISSING");
                }

                const x2Value = prediction.fixture_id === x2FixtureId ? true : false;
                return {
                    ...prediction,
                    x2: x2Value,
                };
            });

            if (fixtures.length === predictions.length && !x2FixtureId) {
                throw new Error("X2_MISSING");
            }

            setIsLoading(true);

            savePredictions(leagueId, round, updatedPredictions)
            .then(() => enqueueSnackbar("Predictions Saved", { variant: "success" }))
            .catch((error) => { 
                enqueueSnackbar(error.message, { variant: "error" });
            })
            .finally(() => {
                setIsLoading(false);
            });

            setPredictions(updatedPredictions);
        } catch (error) {
            if (error.message === 'PREDICTION_MISSING') {
                enqueueSnackbar("Check predictions, not all the fields filled for some of the matches", { variant: "error" });
            } else if (error.message === 'X2_MISSING') {
                enqueueSnackbar("Select the double point match", { variant: "error" });
            } else if (error.message === 'EMPTY') {
                enqueueSnackbar("Nothing to save", { variant: "warning" });
            }
        }
    };

    useEffect(() => {
        setRoundsCount(rounds);
    }, [leagueId]);


    return (
        <>
            <div className={classes.rootDiv}>
                <Paper square className={classes.roundCaption}>
                    <Grid container justifyContent="space-between" alignItems='center'>
                        <Grid onClick={() => handleRoundChangeCLick(-1)} item>
                            <Button
                                disabled={round === 1}
                                component='span'
                                color="primary"
                                size="small"
                                startIcon={<NavigateBeforeIcon />}
                            >
                                previous round
                            </Button>
                        </Grid>
                        <Grid item>{`Round ${round}`}</Grid>
                        <Grid onClick={() => handleRoundChangeCLick(1)} item>
                            <Button
                                disabled={round === roundsCount}
                                component='span'
                                color="primary"
                                size="small"
                                endIcon={<NavigateNextIcon />}
                            >
                                next round
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <form onSubmit={handleSubmit}>
                    <TableContainer square component={Paper} className={classes.paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>

                                    <TableCell align="center" padding="none" />
                                    <TableCell align="right">First Team</TableCell>
                                    <TableCell align="center" padding="none">Result</TableCell>
                                    <TableCell align="left" padding="none">Second Team</TableCell>
                                    <TableCell align="center" padding="none">x2</TableCell>
                                    <TableCell align="center" padding="none">Prediction</TableCell>
                                    <TableCell align="center" padding="none">Points</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fixtures.map(fixture => (
                                    <FixtureRow
                                        fixtures={fixtures}
                                        key={fixture.id}
                                        fixture={fixture}
                                        x2FixtureId={x2FixtureId}
                                        setX2FixtureId={setX2FixtureId}
                                        user={user}
                                        setPredictions={setPredictions}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {user
                        ? 
                        !areAllStarted &&
                            <Grid container justifyContent="flex-end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >Save Prediction</Button>
                            </Grid>
                        : <Grid container className={classes.plsSign} justifyContent='center' component='h3'> Please Sign In To Predict </Grid>
                    }
                </form>
            </div >
            {isLoading && <Loading />}
        </>
    );
}

