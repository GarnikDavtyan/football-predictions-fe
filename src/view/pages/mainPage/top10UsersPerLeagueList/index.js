import React, { useState, useEffect } from "react";
import { 
    Grid,  
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow, 
    Paper, 
    Avatar, 
    Select, 
    MenuItem, 
    Typography 
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { getCurrentUser } from '../../../../helpers/auth';
import randomMaterialColor from 'random-material-color';

const StyledPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
    minWidth: '17rem',
});

const RoundPaper = styled(Paper)({
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
});

const RootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const AvatarWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    margin: '2px',
});

function getColor(namePrefix) {
    return randomMaterialColor.getColor({ text: namePrefix });
}

export default function Top10UsersPerLeagueList({ top10 }) {
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
    }, [typeOfTop]);

    return (
        <RootDiv>
            <RoundPaper square>
                <Grid container justifyContent="center">
                    <Grid item>Top 10 users of the&nbsp;
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeOfTop}
                            onChange={e => setTypeOfTop(e.target.value)}
                        >
                            <MenuItem value={'leaguePoints'}>League</MenuItem>
                            <MenuItem value={'roundPoints'}>Round</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </RoundPaper>
            <TableContainer square component={StyledPaper}>
                <Table aria-label="customized table">
                    <TableBody>
                        {users.map((user, i) => (
                            <TableRow key={user.user.name} hover>
                                <TableCell 
                                    align="center" 
                                    padding="none"
                                    style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }} 
                                >
                                    {i + 1}
                                </TableCell>
                                <TableCell align="right" padding="none">
                                    <AvatarWrapper>
                                        <Avatar
                                            variant="rounded"
                                            style={{ backgroundColor: getColor(user.user.name) }}
                                            alt={user.user.name.toUpperCase()}
                                            src={user.user.avatar || user.user.name}
                                        />
                                        &emsp;
                                        <Typography style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }}>
                                            {user.user.name}
                                        </Typography>
                                    </AvatarWrapper>
                                </TableCell>
                                <TableCell 
                                    align="center" 
                                    padding="none"
                                    style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }}
                                >
                                    {user.points}
                                </TableCell>
                            </TableRow>
                        ))}
                        {user && (
                            <>
                                <TableRow>
                                    <TableCell padding="none"></TableCell>
                                    <TableCell padding="none">...</TableCell>
                                    <TableCell padding="none"></TableCell>
                                </TableRow>
                                <TableRow key={user.user.name}>
                                    <TableCell align="center" padding="none" style={{ fontWeight: 500 }}>
                                        {user.rank}
                                    </TableCell>
                                    <TableCell align="right" padding="none">
                                        <AvatarWrapper>
                                            <Avatar
                                                variant="rounded"
                                                style={{ backgroundColor: getColor(user.user.name) }}
                                                alt={user.user.name.toUpperCase()}
                                                src={user.user.avatar || user.user.name}
                                            />
                                            &emsp;
                                            <Typography style={{ fontWeight: 500 }}>
                                                {user.user.name}
                                            </Typography>
                                        </AvatarWrapper>
                                    </TableCell>
                                    <TableCell align="center" padding="none" style={{ fontWeight: 500 }}>
                                        {user.points}
                                    </TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </RootDiv>
    );
}
