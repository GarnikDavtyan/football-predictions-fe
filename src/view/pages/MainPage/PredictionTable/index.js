import React, { useState } from 'react';
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
    Select,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FixtureRow from '../../../components/FixtureRow';
import { useSnackbar } from 'notistack';
import savePredictions from '../../../../helpers/apiRequests/savePredictions';
import Loading from '../../../components/Loading';
import displayErrors from '../../../../helpers/common/displayErrors';

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

const Info = styled(Grid)({
    color: 'gold',
    textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
});

export default function PredictionTable({ user, leagueId, round, setRound, fixtures, roundsCount }) {
    const [x2FixtureId, setX2FixtureId] = useState(null);
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

            predictions.map((prediction) => {
                if (prediction.score_home === '' || prediction.score_away === '') {
                    throw new Error("PREDICTION_MISSING");
                }
            });

            if (fixtures.filter(fix => fix.status === 'NS').length === predictions.length && !x2FixtureId) {
                throw new Error("X2_MISSING");
            }

            setIsLoading(true);

            savePredictions(leagueId, round, predictions, x2FixtureId)
                .then(() => enqueueSnackbar("Predictions Saved", { variant: "success" }))
                .catch((error) => {
                    displayErrors(error.response.data)
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            if (error.message === 'PREDICTION_MISSING') {
                enqueueSnackbar("Check predictions, not all the fields filled for some of the matches", { variant: "error" });
            } else if (error.message === 'X2_MISSING') {
                enqueueSnackbar("Select the double point match", { variant: "warning" });
            } else if (error.message === 'EMPTY') {
                enqueueSnackbar("Nothing to save", { variant: "warning" });
            }
        }
    };

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
                        <Grid item>
                            Round&nbsp;
                            <Select
                                variant="standard"
                                labelId="round-label"
                                id="round"
                                value={round > 0 && round <= roundsCount ? round : ''}
                                onChange={e => setRound(e.target.value)}
                            >
                                {[...Array(roundsCount)].map((_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
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
                {fixtures.length ?
                    <form onSubmit={handleSubmit}>
                        <TableContainer square component={StyledPaper}>
                            <StyledTable aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell align="right">Home</TableCell>
                                        <TableCell align="center" sx={{ p: 0.5 }}>Result</TableCell>
                                        <TableCell align="left">Away</TableCell>
                                        <TableCell align="center" sx={{ p: 0.5 }}>x2</TableCell>
                                        <TableCell align="center" sx={{ p: 0.5 }}>Prediction</TableCell>
                                        <TableCell align="center" sx={{ p: 0.5 }}>Points</TableCell>
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
                        {user
                            ?
                            user.email_verified_at
                                ?
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
                                : <Info container justifyContent='center' component='h1'> Please Verify Your Email Address To Predict </Info>
                            : <Info container justifyContent='center' component='h1'> Please Log In To Predict </Info>
                        }
                    </form>
                    :
                    <Info container justifyContent='center' component='h1' mt={5}> Matches are not available for this round yet</Info>}
            </RootDiv >
            {isLoading && <Loading />
            }
        </>
    );
}
