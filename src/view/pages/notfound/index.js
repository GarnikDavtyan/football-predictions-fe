import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        color: 'white',
        textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
    }
});
export default function NotFound(){
    const classes = useStyles();

    return  <h1 className={classes.root}>Error 404 : Not Found</h1>
}