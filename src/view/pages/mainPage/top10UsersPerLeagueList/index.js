import React, { useState, useEffect } from "react";
import { Grid, 
        makeStyles, 
        Table, 
        TableBody, 
        TableCell, 
        TableContainer, 
        TableRow, 
        Paper, 
        Avatar, 
        Select, 
        MenuItem, 
        Typography } from "@material-ui/core";
import {getCurrentUser} from '../../../../helpers/auth';
import randomMaterialColor from 'random-material-color';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: "rgba(255, 255, 255, 0.52)",
        minWidth: '17rem',

    },

    roundPaper: {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
    },

    rootDiv: {
        display: 'flex',
        flexDirection: 'column',
    },

    avatar: {
        display: 'flex',
        alignItems: 'center',
        margin: '2px'
    },

    bold: {
        fontWeight: 500
    }
}));

function getColor(namePrefix) {
    return randomMaterialColor.getColor({text: namePrefix});
}

export default function Top10UsersPerLeagueList({ top10 }) {
    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [authUserName, setAuthUserName] = useState('');

    const [typeOfTop, setTypeOfTop] = useState('leaguePoints');

    useEffect(() => {
        setUser(null);
        const updatedUsers = [...top10[typeOfTop]];
        if (updatedUsers.length > 10) {
            let authUser = updatedUsers.pop();
            setUser(authUser);
        }
        setUsers(updatedUsers);

        let authUser = getCurrentUser();
        if (authUser) {
            setAuthUserName(authUser.user.name);
        }
    },  [typeOfTop])

    return (
        <div className={classes.rootDiv}>
            <Paper square className={classes.roundPaper}>
                <Grid container justifyContent="center" className={classes.prevNextDiv}>
                    <Grid item>Top 10 users of the&nbsp;
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeOfTop}
                            onChange={e => setTypeOfTop(e.target.value)}
                        >
                            <MenuItem value={'leaguePoints'}>league</MenuItem>
                            <MenuItem value={'roundPoints'}>round</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Paper>
            <TableContainer square component={Paper} className={classes.paper}>
                <Table aria-label="customized table">
                    <TableBody>
                        {users.map((user, i) => (
                            <TableRow key={user.user.name}>
                                <TableCell 
                                    className={authUserName === user.user.name ? classes.bold : ''} 
                                    align="center" 
                                    padding="none"
                                >
                                    {i + 1}
                                </TableCell>
                                <TableCell align="right" padding="none">
                                    <div className={classes.avatar}>
                                         <Avatar
                                            variant="rounded"
                                            style={{backgroundColor: getColor(user.user.name)}}
                                            alt={user.user.name.toUpperCase()}
                                            src={user.user.avatar  || user.user.name}
                                        />
                                        &emsp;
                                        <Typography className={authUserName === user.user.name ? classes.bold : ''} >
                                            {user.user.name}
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell className={authUserName === user.user.name ? classes.bold : ''}  align="center" padding="none">{user.points}</TableCell>
                            </TableRow>
                        ))}
                        {user &&
                        <>
                            <TableRow>
                                <TableCell padding="none"></TableCell>
                                <TableCell padding="none">...</TableCell>
                                <TableCell padding="none"></TableCell>
                            </TableRow>
                            <TableRow key={user.user.name}>
                                <TableCell className={classes.bold} align="center" padding="none">{user.rank}</TableCell>
                                <TableCell align="right" padding="none">
                                    <div className={classes.avatar}>
                                        <Avatar
                                            variant="rounded"
                                            style={{backgroundColor: getColor(user.user.name)}}
                                            alt={user.user.name.toUpperCase()}
                                            src={user.user.avatar  || user.user.name}
                                        />
                                        &emsp;
                                        <Typography className={classes.bold}>
                                            {user.user.name}
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell className={classes.bold} align="center" padding="none">{user.points}</TableCell>
                            </TableRow>
                        </>
                        }        
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

