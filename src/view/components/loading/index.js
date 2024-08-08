import React from 'react';
import { makeStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },

    bg: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor : "rgba(0, 0, 0, 0.75)",
        minHeight: '100vh',
    }
}));

export default function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.bg}>
            <div className={classes.root}>
                <LinearProgress variant="query" color="secondary" />
            </div>
        </div>
    );
}
