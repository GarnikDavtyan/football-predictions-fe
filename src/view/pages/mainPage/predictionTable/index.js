import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FixtureRow from '../../../components/FixtureRow';
import { useSnackbar } from 'notistack';
import savePredictions from '../../../../helpers/apiRequests/savePredictions';
import Loading from '../../../components/Loading';

const StyledPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
    marginBottom: '20px',
});

const RoundCaption = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
});

const RootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const StyledTable = styled(Table)({
    whiteSpace: 'noWrap',
});

const PleaseSign = styled(Grid)({
    color: 'yellow',
    textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
});

export default function PredictionTable({ user, leagueId, round, setRound, fixtures, rounds }) {
    const [x2FixtureId, setX2FixtureId] = useState(0);
    const [roundsCount, setRoundsCount] = useState(0);
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const areAllStarted = fixtures.every(fix => fix.status !== 'NS');

    const handleRoundChangeClick = dif => round + dif > 0 && round + dif <= roundsCount && setRound(round + dif);

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
            <RootDiv>
                <RoundCaption square>
                    <Grid container justifyContent="space-between" alignItems='center'>
                        <Grid onClick={() => handleRoundChangeClick(-1)} item>
                            <Button
                                disabled={round === 1}
                                component='span'
                                color="primary"
                                size="small"
                                startIcon={<NavigateBeforeIcon />}
                            >
                                Previous Round
                            </Button>
                        </Grid>
                        <Grid item>{`Round ${round}`}</Grid>
                        <Grid onClick={() => handleRoundChangeClick(1)} item>
                            <Button
                                disabled={round === roundsCount}
                                component='span'
                                color="primary"
                                size="small"
                                endIcon={<NavigateNextIcon />}
                            >
                                Next Round
                            </Button>
                        </Grid>
                    </Grid>
                </RoundCaption>
                <form onSubmit={handleSubmit}>
                    <TableContainer square component={StyledPaper}>
                        <StyledTable aria-label="simple table">
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
                        </StyledTable>
                    </TableContainer>
                    {user ?
                        !areAllStarted &&
                        <Grid container justifyContent="flex-end">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Save Prediction
                            </Button>
                        </Grid>
                        : <PleaseSign container justifyContent='center' component='h1'> Please Sign In To Predict </PleaseSign>
                    }
                </form>
            </RootDiv>
            {isLoading && <Loading />}
        </>
    );
}
