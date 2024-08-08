import React, {useEffect, useState} from 'react';
import topThree from './../../images/top/top.png'
import {
    Avatar,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@material-ui/core";
import randomMaterialColor from 'random-material-color'

const useStyles = makeStyles(theme => ({
    rootDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        width:'fit-content',
        color: 'white'
    },


    top3usr: {
        display: 'flex',
    },

    top3: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    paper: {
        backgroundColor: "rgba(255, 255, 255, 0.52)",
     },

    avUsr: {
         display: 'flex',
        //  justifyContent: 'center',
         alignItems: 'center'
     },
}));

function getColor(namePrefix) {
    return randomMaterialColor.getColor({text: namePrefix});
}

export default function Top() {
    const classes = useStyles();
    const [usersTop, setUsersTop] = useState([]);


    // useEffect(() => {
    //     let userPoints = [];
    //     getUsers().then((users) => {
    //         const promises = [];
    //         Object.keys(users).forEach((userName)=> {
    //             promises.push(new Promise((resolve) => {
    //                 firebase.database().ref(`points/leaguePoints/${userName}/`).on('value', snap => {
    //                     if(snap.val()) {
    //                         const score = Object.values(snap.val()).reduce((total, current) => total + current);
    //                         userPoints.push({userName, score});
    //                     }
    //                     resolve();
    //                 })
    //             }))

    //         });
    //         Promise.all(promises).then(function () {
    //             const userPointsSorted = userPoints.sort(function(a, b){return b.score-a.score});
    //             setUsersTop(userPointsSorted);
    //         });
    //     })
    // }, []);

    return (
        <div className={classes.rootDiv}>
            <h1>Top Users</h1>
            <div className={classes.top3usr}>
                { usersTop[1] &&
                    <div className={classes.top3}>
                        <Avatar style={{color: "white", backgroundColor:randomMaterialColor.getColor({text: usersTop[1].userName})}}
                                alt={usersTop[1].userName.toUpperCase()} src={usersTop[1].avatar || usersTop[1].userName}/>
                        <Typography display="block" gutterBottom>
                            {usersTop[1].userName}
                        </Typography>
                        <Typography display="block" gutterBottom>
                            {usersTop[1].score}
                        </Typography>
                    </div>
                }
                { usersTop[0] &&
                    <div className={classes.top3}>
                        <Avatar style={{color: "white", backgroundColor:randomMaterialColor.getColor({text: usersTop[0].userName})}}
                                alt={usersTop[0].userName.toUpperCase()} src={usersTop[0].avatar || usersTop[0].userName}/>
                        <Typography display="block" gutterBottom>
                            {usersTop[0].userName}
                        </Typography>
                        <Typography display="block" gutterBottom>
                            {usersTop[0].score}
                        </Typography>
                    </div>
                }
                { usersTop[2] &&
                    <div className={classes.top3}>
                        <Avatar style={{color: "white", backgroundColor:randomMaterialColor.getColor({text: usersTop[2].userName})}}
                                alt={usersTop[2].userName.toUpperCase()} src={usersTop[2].avatar || usersTop[2].userName}/>
                        <Typography display="block" gutterBottom>
                            {usersTop[2].userName}
                        </Typography>
                        <Typography display="block" gutterBottom>
                            {usersTop[2].score}
                        </Typography>
                    </div>
                }
            </div>
            <img src={topThree} alt='top three'/>
            <TableContainer component={Paper} className={classes.paper}>
                <Table aria-label="customized table">
                    <TableBody>
                        {usersTop.slice(3).map((user, i) => (
                            <TableRow key={user.userName}>
                                <TableCell align="center">{i + 4}</TableCell>
                                <TableCell>
                                    <div className={classes.avUsr}>
                                        <Avatar style={{color: "white", backgroundColor:randomMaterialColor.getColor({text: user.userName})}}
                                                alt={user.userName.toUpperCase()} src={user.avatar || user.userName}/>
                                        <Typography display="block" gutterBottom>
                                            &emsp;{user.userName}
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="center">{user.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}