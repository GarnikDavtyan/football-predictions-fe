import React, { useState, useEffect } from "react";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Avatar,
    Select,
    MenuItem,
    Typography,
    useMediaQuery
} from "@mui/material";
import { getCurrentUser } from '../../../../helpers/auth';
import stringToColor from "../../../../helpers/common/stringToColor";
import getImageFullUrl from "../../../../helpers/common/getImageFullUrl";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../constants";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import {
    StyledPaper,
    RoundPaper,
    RootDiv,
    AvatarContainer
} from "./styledComponents";

export default function Top10UsersPerLeagueList({ top10, league, userToWatch }) {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [authUserName, setAuthUserName] = useState('');
    const [typeOfTop, setTypeOfTop] = useState('leaguePoints');

    const navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        const updatedUsers = [...top10[typeOfTop]];
        if (updatedUsers.length > 10) {
            let authUser = updatedUsers.pop();
            setUser(authUser);
        }
        setUsers(updatedUsers);

        const authUser = getCurrentUser();
        if (authUser) {
            setAuthUserName(authUser.user.name);
        }
    }, [typeOfTop]);

    const handleWatchUserClick = (user) => {
        const url = paths.main + '/' + league;

        navigate(
            userToWatch && userToWatch === user.user.name ?
                url :
                url + '?user=' + user.user.name
        );

    };

    const isMobile = useMediaQuery('(max-width:500px)');

    return (
        <RootDiv>
            <RoundPaper ismobile={+isMobile}>
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
            <TableContainer ismobile={+isMobile} component={StyledPaper}>
                <Table aria-label="customized table">
                    <TableBody>
                        {users.map((user, i) => (
                            <TableRow
                                key={user.user.name}
                                hover
                                {...(authUserName && authUserName !== user.user.name && {
                                    onClick: () => handleWatchUserClick(user),
                                    sx: { cursor: "pointer" }
                                })}

                            >
                                <TableCell
                                    align="center"
                                    padding="none"
                                    style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }}
                                >
                                    {i + 1}
                                </TableCell>
                                <TableCell align="right" padding="none">
                                    <AvatarContainer>
                                        <Avatar
                                            style={{ backgroundColor: stringToColor(user.user.name) }}
                                            alt={user.user.name.toUpperCase()}
                                            src={getImageFullUrl(user.user.avatar)}
                                        />
                                        &emsp;
                                        <Typography style={{ fontWeight: authUserName === user.user.name ? 500 : 'normal' }}>
                                            {user.user.name}
                                        </Typography>
                                        &emsp;
                                        {authUserName && authUserName !== user.user.name && userToWatch === user.user.name &&
                                            <VisibilityTwoToneIcon
                                                fontSize="large"
                                                sx={{ color: 'green' }}
                                            />
                                        }
                                    </AvatarContainer>
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
                                        <AvatarContainer>
                                            <Avatar
                                                style={{ backgroundColor: stringToColor(user.user.name) }}
                                                alt={user.user.name.toUpperCase()}
                                                src={getImageFullUrl(user.user.avatar)}
                                            />
                                            &emsp;
                                            <Typography style={{ fontWeight: 500 }}>
                                                {user.user.name}
                                            </Typography>
                                        </AvatarContainer>
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
        </RootDiv >
    );
}
