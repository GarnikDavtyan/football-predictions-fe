import React from 'react';
import { styled } from '@mui/material/styles';

const InputNum = styled('input')({
  width: '2em',
  textAlign: 'center',
  WebkitAppearance: 'none',
  outline: 'none',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

export default function PredictionInput({ prediction, setPrediction, which, disabled, setPredictions }) {
  const updatePredictions = (newPrediction) => {
    setPredictions(prevPredictions => {
      const index = prevPredictions.findIndex(p => p.fixture_id === newPrediction.fixture_id);
      if (index === -1) {
        return [...prevPredictions, newPrediction];
      } else {
        const updatedPredictions = [...prevPredictions];
        updatedPredictions[index] = newPrediction;
        return updatedPredictions;
      }
    });
  };

  return (
    <InputNum
      disabled={disabled}
      type='number'
      min='0'
      value={prediction[which]}
      onChange={(e) => {
        const newPrediction = { ...prediction };
        newPrediction[which] = e.target.value;
        setPrediction(newPrediction);
        updatePredictions(newPrediction);
      }}
    />
  );
}
