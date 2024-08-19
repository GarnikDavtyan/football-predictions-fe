import React from 'react';
import { makeStyles } from '@material-ui/core';
import './predictionInput.css'

const useStyles = makeStyles({
    inputNum: {
        width: '2em',
        textAlign: 'center',
        WebkitAppearance: 'none',
        outline: "none",
    },

});

export default ({ prediction, setPrediction, which, disabled, setPredictions}) => {
    const classes = useStyles();

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
        <input
            disabled={disabled}
            type='number'
            min='0'
            className={classes.inputNum}
            value={prediction[which]}
            onChange={(e) => {
                const newPrediction = {...prediction};
                newPrediction[which] = e.target.value;
                setPrediction(newPrediction);
                updatePredictions(newPrediction);
            }}
        />
    )
}
