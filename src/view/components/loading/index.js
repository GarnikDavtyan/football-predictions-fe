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
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000
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
