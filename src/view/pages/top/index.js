import React, {useEffect, useState} from 'react';
import top1Image from './../../images/top/top1.png';
import top2Image from './../../images/top/top2.png';
import top3Image from './../../images/top/top3.png';
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
import randomMaterialColor from 'random-material-color';
import getTop from '../../../helpers/apiRequests/getTop';
import { getCurrentUser } from '../../../helpers/auth';
import Loading from '../../components/Loading';

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
         alignItems: 'center'
    },

    bold: {
        fontWeight: 'bold'
    }
}));

function getColor(namePrefix) {
    return randomMaterialColor.getColor({text: namePrefix});
}

export default function Top() {
    const classes = useStyles();
    const [usersTop, setUsersTop] = useState([]);
    const [user, setUser] = useState(null);
    const [authUserName, setAuthUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTop().then(response => {
            let users = response.data.data;

            if (users.length > 10) {
                let authUser = users.pop();
                setUser(authUser);
            }
            setUsersTop(users);

            let authUser = getCurrentUser();
            if (authUser) {
                setAuthUserName(authUser.user.name);
            }
        }).then(() => { setIsLoading(false) });
    }, []);

    return (
        !isLoading ?
        <div className={classes.rootDiv}>
            <h1>Top Users</h1>
            <div className={classes.top3usr}>
                { usersTop[1] &&
                    <div className={classes.top3}>
                        <img src={top2Image} alt='top2'/>
                        <Avatar
                            style={{backgroundColor: getColor(usersTop[1].user.name)}}
                            alt={usersTop[1].user.name.toUpperCase()} 
                            src={usersTop[1].user.avatar || usersTop[1].user.name}
                        />
                        <Typography className={authUserName === usersTop[1].user.name ? classes.bold : ''} display="block" gutterBottom>
                            {usersTop[1].user.name}
                        </Typography>
                        <Typography className={authUserName === usersTop[1].user.name ? classes.bold : ''} display="block" gutterBottom>
                            {usersTop[1].points}
                        </Typography>
                    </div>
                }
                { usersTop[0] &&
                    <div className={classes.top3}>
                        <img src={top1Image} alt='top1'/>
                        <Avatar
                            style={{backgroundColor: getColor(usersTop[0].user.name)}}
                            alt={usersTop[0].user.name.toUpperCase()} 
                            src={usersTop[0].user.avatar || usersTop[0].user.name}
                        />
                        <Typography className={authUserName === usersTop[0].user.name ? classes.bold : ''} display="block" gutterBottom>
                            {usersTop[0].user.name}
                        </Typography>
                        <Typography className={authUserName === usersTop[0].user.name ? classes.bold : ''} display="block" gutterBottom>
                            {usersTop[0].points}
                        </Typography>
                    </div>
                }
                { usersTop[2] &&
                    <div className={classes.top3}>
                        <img src={top3Image} alt='top3'/>
                        <Avatar
                            style={{backgroundColor: getColor(usersTop[2].user.name)}}
                            alt={usersTop[2].user.name.toUpperCase()} 
                            src={usersTop[2].user.avatar || usersTop[2].user.name}
                        />
                        <Typography className={authUserName === usersTop[2].user.name ? classes.bold : ''} display="block" gutterBottom>
                            {usersTop[2].user.name}
                        </Typography>
                        <Typography className={authUserName === usersTop[2].user.name ? classes.bold : ''} display="block" gutterBottom>
                            {usersTop[2].points}
                        </Typography>
                    </div>
                }
            </div>
            <TableContainer component={Paper} className={classes.paper}>
                <Table aria-label="customized table">
                    <TableBody>
                        {usersTop.slice(3).map((user, i) => (
                            <TableRow key={user.user.name}>
                                <TableCell className={authUserName === user.user.name ? classes.bold : ''} align="center">
                                    {i + 4}
                                </TableCell>
                                <TableCell>
                                    <div className={classes.avUsr}>
                                        <Avatar
                                            style={{backgroundColor: getColor(user.user.name)}}
                                            alt={user.user.name.toUpperCase()} 
                                            src={user.user.avatar || user.user.name}
                                        />
                                        <Typography className={authUserName === user.user.name ? classes.bold : ''} display="block">
                                            &emsp;{user.user.name}
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography className={authUserName === user.user.name ? classes.bold : ''} display="block">
                                        {user.points}
                                    </Typography>
                                </TableCell>
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
                                <TableCell className={classes.bold} align="center">
                                    {user.rank}
                                </TableCell>
                                <TableCell>
                                    <div className={classes.avUsr}>
                                        <Avatar
                                            style={{backgroundColor: getColor(user.user.name)}}
                                            alt={user.user.name.toUpperCase()} 
                                            src={user.user.avatar || user.user.name}
                                        />
                                        <Typography className={classes.bold} display="block">
                                            &emsp;{user.user.name}
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography className={classes.bold} display="block">
                                        {user.points}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </>
                        }       
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        : <Loading />
    )
}