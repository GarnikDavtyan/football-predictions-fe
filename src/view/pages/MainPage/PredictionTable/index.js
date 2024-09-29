import React, { useState } from 'react';
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Grid2 as Grid,
    Select,
    MenuItem,
    useMediaQuery,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FixtureRow from '../../../components/FixtureRow';
import { useSnackbar } from 'notistack';
import savePredictions from '../../../../helpers/apiRequests/savePredictions';
import Loading from '../../../components/Loading';
import displayErrors from '../../../../helpers/common/displayErrors';
import {
    StyledPaper,
    StyledTable,
    RoundCaption,
    RootDiv,
    Info
} from './styledComponents';

export default function PredictionTable(props) {
    const {
        user,
        leagueId,
        round,
        setRound,
        fixtures,
        roundsCount,
        userToWatch,
        flickityRef
    } = props;

    const [x2FixtureId, setX2FixtureId] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const areAllStarted = fixtures.every(fix => fix.status !== 'NS');
    const x2Sealed = Boolean(x2FixtureId && fixtures.find(fix => fix.id === x2FixtureId).status !== 'NS');

    const handleRoundChangeClick = dif => round + dif > 0 && round + dif <= roundsCount && setRound(round + dif);

    const isMobile = useMediaQuery('(max-width:500px)');

    const handleSubmit = e => {
        e.preventDefault();
        try {
            if (!predictions.length) {
                throw new Error("EMPTY");
            }

            for (const prediction of predictions) {
                if ((prediction.score_home === '' && prediction.score_away !== '')
                    || (prediction.score_home !== '' && prediction.score_away === '')) {
                    throw new Error("PREDICTION_MISSING");
                }
            }

            if ((fixtures.filter(fix => fix.status === 'NS').length <= predictions.length) && !x2FixtureId) {
                throw new Error("X2_MISSING");
            }

            let x2 = x2FixtureId;
            if (x2Sealed) {
                x2 = null;
            }

            setIsLoading(true);
            savePredictions(leagueId, round, predictions, x2)
                .then(() => enqueueSnackbar("Predictions Saved", { variant: "success" }))
                .catch((error) => {
                    displayErrors(error.response.data)
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            if (error.message === 'PREDICTION_MISSING') {
                enqueueSnackbar("Check the predictions, missing fields", { variant: "error" });
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
                {userToWatch && isMobile &&
                    <Info container
                        justifyContent='center'
                        component='h1'
                        sx={{ mb: 1 }}
                    >
                        {userToWatch}'s predictions
                    </Info>
                }
                <RoundCaption>
                    <Grid container justifyContent="space-between" alignItems='center'>
                        <Grid onClick={() => handleRoundChangeClick(-1)}>
                            <Button
                                disabled={round === 1}
                                component='span'
                                color="primary"
                                size="small"
                                startIcon={<NavigateBeforeIcon />}
                            >
                                Previous
                            </Button>
                        </Grid>
                        <Grid>
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
                        <Grid onClick={() => handleRoundChangeClick(1)}>
                            <Button
                                disabled={round === roundsCount}
                                component='span'
                                color="primary"
                                size="small"
                                endIcon={<NavigateNextIcon />}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </RoundCaption>
                {fixtures.length ?
                    <form onSubmit={handleSubmit}>
                        <TableContainer component={StyledPaper} sx={{ mb: 1 }}>
                            <StyledTable aria-label="simple table" size='small'>
                                {!isMobile ?
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="right">Home</TableCell>
                                            <TableCell align="center" sx={{ p: 0.5 }}>
                                                Result
                                            </TableCell>
                                            <TableCell align="left">Away</TableCell>
                                            <TableCell align="center" sx={{ p: 0.5 }}>
                                                x2
                                            </TableCell>
                                            <TableCell align="center" sx={{ p: 0.5 }}>
                                                Prediction
                                            </TableCell>
                                            <TableCell align="center" sx={{ p: 0.5 }}>
                                                Points
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    :
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align='center' padding='none'>
                                                R
                                            </TableCell>
                                            <TableCell align='center' colSpan={2} padding='none'>
                                                Match
                                            </TableCell>
                                            <TableCell align='center' padding='none' sx={{ pr: 1 }}>
                                                P
                                            </TableCell>
                                            <TableCell align="center" padding='none'>
                                                x2
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                }
                                <TableBody>
                                    {fixtures.map(fixture => (
                                        <FixtureRow
                                            key={fixture.id}
                                            fixture={fixture}
                                            x2Sealed={x2Sealed}
                                            x2FixtureId={x2FixtureId}
                                            setX2FixtureId={setX2FixtureId}
                                            user={user}
                                            setPredictions={setPredictions}
                                            flickityRef={flickityRef}
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
                                        Save Predictions
                                    </Button>
                                </Grid>
                                : <Info container
                                    justifyContent='center'
                                    component='h1'
                                >
                                    Please Verify Your Email Address To Predict
                                </Info>
                            : <Info container
                                justifyContent='center'
                                component='h1'
                            >
                                Please Log In To Predict
                            </Info>
                        }
                    </form>
                    :
                    <Info container
                        justifyContent='center'
                        component='h1'
                        sx={{ mt: 5 }}
                    >
                        Matches are not available for this round yet
                    </Info>
                }
            </RootDiv >
            {isLoading && <Loading />
            }
        </>
    );
}
