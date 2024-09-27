import React from 'react';
import { InputNum } from './styledComponents';

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
