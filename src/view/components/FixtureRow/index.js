import React, { useState, useEffect } from 'react';
import { TableRow, TableCell, Checkbox, IconButton, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import PredictionInput from './PredictionInput';
import { format } from 'date-fns';

const InputsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const DivRight = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const DivLeft = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const DateText = styled(Typography)({
  textAlign: 'center',
});

export default function FixtureRow({ user, fixture, x2FixtureId, setX2FixtureId, fixtures, setPredictions }) {
  const fixId = fixture.id;
  const [info, setInfo] = useState(false);
  const [prediction, setPrediction] = useState({
    fixture_id: fixId,
    score_home: '',
    score_away: '',
    x2: false,
    points: 0,
  });

  useEffect(() => {
    if (fixture.predictions && fixture.predictions.length) {
      setPrediction(fixture.predictions[0]);
      if (fixture.predictions[0].x2) {
        setX2FixtureId(fixId);
      }
      setPredictions(prevPredictions => [...prevPredictions, fixture.predictions[0]]);
    }
  }, [fixture, fixId, setPredictions, setX2FixtureId]);

  const isFinished = fixture.status === 'FT';
  const isNotStarted = fixture.status === 'NS';

  const handleCheckboxChange = () => {
    if (x2FixtureId && fixtures.find(fix => fix.id === x2FixtureId).status === 'FT') return;
    setX2FixtureId(fixId);
  };

  const handleInfoClick = () => {
    setInfo(!info);
  };

  return (
    <>
      <TableRow key={fixId} id={fixId}>
        <TableCell component="th" scope="row" align="center" padding="none">
          <IconButton onClick={handleInfoClick} value={fixId} size="large">
            <InfoIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right" padding="none">
          <DivRight>
            {fixture.team_home.name}
            &nbsp;
            <img src={fixture.team_home.logo} alt={fixture.team_home.name} width="30" height="30" />
          </DivRight>
        </TableCell>
        <TableCell align="center" padding="none">
          <span>
            {isFinished ? `${fixture.score_home} : ${fixture.score_away}` : '- : -'}
          </span>
        </TableCell>
        <TableCell align="left" padding="none">
          <DivLeft>
            <img src={fixture.team_away.logo} alt={fixture.team_away.name} width="30" height="30" />
            &nbsp;
            {fixture.team_away.name}
          </DivLeft>
        </TableCell>
        <TableCell align="center" padding="none">
          <Checkbox
            disabled={!user || !isNotStarted || !prediction.score_home || !prediction.score_away}
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
                disabled={!user}
                prediction={prediction}
                setPrediction={setPrediction}
                setPredictions={setPredictions}
                fixtureId={fixture.id}
                which="score_home"
              />
              {` - `}
              <PredictionInput
                disabled={!user}
                prediction={prediction}
                setPrediction={setPrediction}
                setPredictions={setPredictions}
                fixtureId={fixture.id}
                which="score_away"
              />
            </InputsContainer>
          ) : (
            `${prediction.score_home || '-'} : ${prediction.score_away || '-'}`
          )}
        </TableCell>
        <TableCell padding="none" align="center">
          {user && prediction.points ? prediction.points : '-'}
        </TableCell>
      </TableRow>
      {info && (
        <TableRow>
          <TableCell />
          <TableCell colSpan={3}>
            <Paper>
              <DateText color="textSecondary">
                {`Match start: ${format(new Date(fixture.date), 'eee, MMM d, yyyy h:mm a')}`}
              </DateText>
            </Paper>
          </TableCell>
          <TableCell colSpan={3} />
        </TableRow>
      )}
    </>
  );
}
