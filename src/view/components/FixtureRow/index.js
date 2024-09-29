import React, { useState, useEffect } from 'react';
import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
    Grid,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PredictionInput from './PredictionInput';
import moment from 'moment';
import 'moment/locale/en-gb';
import {
    InputsContainer,
    DivRight,
    DivLeft,
    LogoContainer,
    DateText,
    MobileColumnContainer,
    TopUserPredictionsText
} from './styledComponents';

export default function FixtureRow({ user, fixture, x2FixtureId, setX2FixtureId, x2Sealed, setPredictions }) {
    const fixId = fixture.id;
    const [info, setInfo] = useState(false);
    const [prediction, setPrediction] = useState({
        fixture_id: fixId,
        score_home: '',
        score_away: '',
        points: '-',
    });

    const isFinished = fixture.status === 'FT';
    const isNotStarted = fixture.status === 'NS';

    // Show user local datetime 
    moment.locale('en-gb');
    const userOffset = moment().utcOffset()
    const fixtureDate = moment.utc(fixture.date)
        .utcOffset(userOffset)
        .format('llll')


    useEffect(() => {
        if (fixture.prediction) {
            setPrediction(fixture.prediction);
            if (fixture.prediction.x2) {
                setX2FixtureId(fixId);
            }

            if (isNotStarted) {
                setPredictions(prevPredictions => [...prevPredictions, fixture.prediction]);
            }
        }
    }, [fixture, fixId]);

    const handleCheckboxChange = () => {
        if (x2Sealed) { return };
        setX2FixtureId(fixId);
    };

    const handleInfoClick = () => {
        setInfo(!info);
    };

    const isMobile = useMediaQuery('(max-width:500px)');

    return (
        <>
            {!isMobile ?
                <TableRow key={fixId} id={fixId}>
                    <TableCell component="th" scope="row" align="center" padding="none">
                        <IconButton onClick={handleInfoClick} value={fixId} size="large">
                            <InfoIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right" padding="none">
                        <DivRight>
                            {fixture.team_home.name}
                            <LogoContainer>
                                <img src={fixture.team_home.logo} alt={fixture.team_home.name} height="30" />
                            </LogoContainer>
                        </DivRight>
                    </TableCell>
                    <TableCell align="center" padding="none">
                        <span>
                            {isFinished && fixture.score_home !== null && fixture.score_away !== null ? `${fixture.score_home} : ${fixture.score_away}` : '- : -'}
                        </span>
                    </TableCell>
                    <TableCell align="left" padding="none">
                        <DivLeft>
                            <LogoContainer>
                                <img src={fixture.team_away.logo} alt={fixture.team_away.name} height="30" />
                            </LogoContainer>
                            {fixture.team_away.name}
                        </DivLeft>
                    </TableCell>
                    <TableCell align="center" padding="none">
                        <Checkbox
                            disabled={!user
                                || !user.email_verified_at
                                || !isNotStarted
                                || prediction.score_home === null
                                || prediction.score_home === ''
                                || prediction.score_away === null
                                || prediction.score_away === ''
                                || x2Sealed
                            }
                            checked={fixId === x2FixtureId}
                            onChange={handleCheckboxChange}
                            value={fixId}
                            color="secondary"
                        />
                    </TableCell>
                    <TableCell align="center" padding="none">
                        {isNotStarted ? (
                            <InputsContainer>
                                <PredictionInput
                                    disabled={!user || !user.email_verified_at}
                                    prediction={prediction}
                                    setPrediction={setPrediction}
                                    setPredictions={setPredictions}
                                    fixtureId={fixture.id}
                                    which="score_home"
                                />
                                {` - `}
                                <PredictionInput
                                    disabled={!user || !user.email_verified_at}
                                    prediction={prediction}
                                    setPrediction={setPrediction}
                                    setPredictions={setPredictions}
                                    fixtureId={fixture.id}
                                    which="score_away"
                                />
                            </InputsContainer>
                        ) : (
                            `${prediction.score_home.toString() || '-'} : ${prediction.score_away.toString() || '-'}`
                        )}
                    </TableCell>
                    <TableCell padding="none" align="center">
                        <p style={{ fontWeight: 500 }}>
                            {user && prediction.points !== null ? prediction.points : '-'}
                        </p>
                    </TableCell>
                </TableRow>
                :
                // Mobile view
                <TableRow key={fixId} id={fixId}>
                    <TableCell padding='none' align='center'>
                        <IconButton onClick={handleInfoClick} value={fixId} size="small">
                            <InfoIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell align="center" padding='none' sx={{ px: 1 }}>
                        <MobileColumnContainer>
                            <Typography>
                                {isFinished && fixture.score_home !== null ? `${fixture.score_home}` : '-'}
                            </Typography>
                            <Typography>
                                {isFinished && fixture.score_away !== null ? `${fixture.score_away}` : '-'}
                            </Typography>
                        </MobileColumnContainer>
                    </TableCell>
                    <TableCell padding='none' align='center'>
                        <MobileColumnContainer>
                            <LogoContainer>
                                <img src={fixture.team_home.logo} alt={fixture.team_home.name} height="30" />
                            </LogoContainer>
                            <LogoContainer>
                                <img src={fixture.team_away.logo} alt={fixture.team_away.name} height="30" />
                            </LogoContainer>
                        </MobileColumnContainer>
                    </TableCell>
                    <TableCell padding='none' align='left'>
                        <MobileColumnContainer style={{ alignItems: 'start' }}>
                            <Typography>{fixture.team_home.name}</Typography>
                            <Typography>{fixture.team_away.name}</Typography>
                        </MobileColumnContainer>
                    </TableCell>
                    <TableCell align='center' padding='none' sx={{ pr: 1 }}>
                        <MobileColumnContainer>
                            {isNotStarted ? (
                                <>
                                    <PredictionInput
                                        disabled={!user || !user.email_verified_at}
                                        prediction={prediction}
                                        setPrediction={setPrediction}
                                        setPredictions={setPredictions}
                                        fixtureId={fixture.id}
                                        which="score_home"
                                    />
                                    <PredictionInput
                                        disabled={!user || !user.email_verified_at}
                                        prediction={prediction}
                                        setPrediction={setPrediction}
                                        setPredictions={setPredictions}
                                        fixtureId={fixture.id}
                                        which="score_away"
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography>
                                        {prediction.score_home.toString() || '-'}
                                    </Typography>
                                    <Typography>
                                        {prediction.score_away.toString() || '-'}
                                    </Typography>
                                </>
                            )}
                        </MobileColumnContainer>
                    </TableCell>
                    <TableCell align="center" padding='none'>
                        <MobileColumnContainer>
                            <Checkbox
                                disabled={!user
                                    || !user.email_verified_at
                                    || !isNotStarted
                                    || prediction.score_home === null
                                    || prediction.score_home === ''
                                    || prediction.score_away === null
                                    || prediction.score_away === ''
                                    || x2Sealed
                                }
                                checked={fixId === x2FixtureId}
                                onChange={handleCheckboxChange}
                                value={fixId}
                                color="secondary"
                            />
                            <Typography sx={{ fontWeight: 500 }}>
                                {user && prediction.points !== null ? prediction.points : '-'}
                            </Typography>
                        </MobileColumnContainer>
                    </TableCell>
                </TableRow >
            }
            {info &&
                <TableRow>
                    <TableCell />
                    <TableCell colSpan={isMobile ? 4 : 3} sx={{ px: 0 }}>
                        <Paper>
                            <DateText color="textSecondary">
                                {fixtureDate}
                            </DateText>
                            {fixture.top10_predictions && fixture.top10_predictions.length > 0 &&
                                <>
                                    <hr />
                                    <Grid container mt={1}>
                                        <Grid item xs={5} textAlign={'end'} mb={0.5}>
                                            <Typography color="textSecondary">
                                                Top 10
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} mb={0.5} />
                                        <Grid item xs={5} textAlign={'start'} mb={0.5}>
                                            <Typography color="textSecondary">
                                                Points
                                            </Typography>
                                        </Grid>
                                        {fixture.top10_predictions.map(prediction => (
                                            <React.Fragment key={prediction.user_id}>
                                                <Grid item xs={5} textAlign={'end'}>
                                                    <TopUserPredictionsText color="textSecondary">
                                                        {prediction.user.name}
                                                    </TopUserPredictionsText>
                                                </Grid>
                                                <Grid item xs={2} textAlign={'center'}>
                                                    <TopUserPredictionsText color="textSecondary">
                                                        {prediction.score_home + ':' + prediction.score_away}
                                                    </TopUserPredictionsText>
                                                </Grid>
                                                <Grid item xs={5} textAlign={'start'}>
                                                    <TopUserPredictionsText color="textSecondary">
                                                        {prediction.points ?? '-'}
                                                    </TopUserPredictionsText>
                                                </Grid>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </>
                            }
                        </Paper>
                    </TableCell>
                    <TableCell colSpan={isMobile ? 0 : 3} />
                </TableRow >
            }
        </>
    );
}
