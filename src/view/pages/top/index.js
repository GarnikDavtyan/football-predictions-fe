import React, { useEffect, useState } from 'react';
import top1Image from './../../images/top/top1.png';
import top2Image from './../../images/top/top2.png';
import top3Image from './../../images/top/top3.png';
import {
    Avatar,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    styled
} from "@mui/material";
import randomColor from 'random-material-color';
import getTop from '../../../helpers/apiRequests/getTop';
import { getCurrentUser } from '../../../helpers/auth';
import Loading from '../../components/Loading';

const RootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    width: 'fit-content',
    color: 'white'
});

const Top3usr = styled('div')({
    display: 'flex',
});

const Top3 = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const PaperStyled = styled(Paper)({
    backgroundColor: "rgba(255, 255, 255, 0.52)",
});

const AvUsr = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

function getColor(namePrefix) {
    return randomColor.getColor({text: namePrefix});
}

export default function Top() {
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
        <RootDiv>
            <h1>Top Users</h1>
            <Top3usr>
                { usersTop[1] &&
                    <Top3>
                        <img src={top2Image} alt='top2'/>
                        <Avatar
                            style={{backgroundColor: getColor(usersTop[1].user.name)}}
                            alt={usersTop[1].user.name.toUpperCase()} 
                            src={usersTop[1].user.avatar || usersTop[1].user.name}
                        />
                        <Typography style={{ fontWeight: authUserName === usersTop[1].user.name ? 'bold' : 'normal' }} display="block" gutterBottom>
                            {usersTop[1].user.name}
                        </Typography>
                        <Typography style={{ fontWeight: authUserName === usersTop[1].user.name ? 'bold' : 'normal' }} display="block" gutterBottom>
                            {usersTop[1].points}
                        </Typography>
                    </Top3>
                }
                { usersTop[0] &&
                    <Top3>
                        <img src={top1Image} alt='top1'/>
                        <Avatar
                            style={{backgroundColor: getColor(usersTop[0].user.name)}}
                            alt={usersTop[0].user.name.toUpperCase()} 
                            src={usersTop[0].user.avatar || usersTop[0].user.name}
                        />
                        <Typography style={{ fontWeight: authUserName === usersTop[0].user.name ? 'bold' : 'normal' }} display="block" gutterBottom>
                            {usersTop[0].user.name}
                        </Typography>
                        <Typography style={{ fontWeight: authUserName === usersTop[0].user.name ? 'bold' : 'normal' }} display="block" gutterBottom>
                            {usersTop[0].points}
                        </Typography>
                    </Top3>
                }
                { usersTop[2] &&
                    <Top3>
                        <img src={top3Image} alt='top3'/>
                        <Avatar
                            style={{backgroundColor: getColor(usersTop[2].user.name)}}
                            alt={usersTop[2].user.name.toUpperCase()} 
                            src={usersTop[2].user.avatar || usersTop[2].user.name}
                        />
                        <Typography style={{ fontWeight: authUserName === usersTop[2].user.name ? 'bold' : 'normal' }} display="block" gutterBottom>
                            {usersTop[2].user.name}
                        </Typography>
                        <Typography style={{ fontWeight: authUserName === usersTop[2].user.name ? 'bold' : 'normal' }} display="block" gutterBottom>
                            {usersTop[2].points}
                        </Typography>
                    </Top3>
                }
            </Top3usr>
            <TableContainer component={PaperStyled}>
                <Table aria-label="customized table">
                    <TableBody>
                        {usersTop.slice(3).map((user, i) => (
                            <TableRow key={user.user.name}>
                                <TableCell style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }} align="center">
                                    {i + 4}
                                </TableCell>
                                <TableCell>
                                    <AvUsr>
                                        <Avatar
                                            style={{backgroundColor: getColor(user.user.name)}}
                                            alt={user.user.name.toUpperCase()} 
                                            src={user.user.avatar || user.user.name}
                                        />
                                        <Typography style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }} display="block">
                                            &emsp;{user.user.name}
                                        </Typography>
                                    </AvUsr>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }} display="block">
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
                                <TableCell style={{ fontWeight: 500 }} align="center">
                                    {user.rank}
                                </TableCell>
                                <TableCell>
                                    <AvUsr>
                                        <Avatar
                                            style={{backgroundColor: getColor(user.user.name)}}
                                            alt={user.user.name.toUpperCase()} 
                                            src={user.user.avatar || user.user.name}
                                        />
                                        <Typography style={{ fontWeight: 500 }} display="block">
                                            &emsp;{user.user.name}
                                        </Typography>
                                    </AvUsr>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography style={{ fontWeight: 500 }} display="block">
                                        {user.points}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </>
                        }       
                    </TableBody>
                </Table>
            </TableContainer>
        </RootDiv>
        : <Loading />
    )
}
