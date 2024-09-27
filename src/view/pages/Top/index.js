import React, { useEffect, useState } from 'react';
import top1Image from './../../images/top/top1.png';
import top2Image from './../../images/top/top2.png';
import top3Image from './../../images/top/top3.png';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    useMediaQuery
} from "@mui/material";
import getTop from '../../../helpers/apiRequests/getTop';
import { getCurrentUser } from '../../../helpers/auth';
import Loading from '../../components/Loading';
import TopUser from './TopUser';
import RestTopRow from './RestTopRow';
import { StyledPaper, Top3users, RootDiv } from './styledComponents';
export default function Top() {
    const [usersTop, setUsersTop] = useState([]);
    const [user, setUser] = useState(null);
    const [authUserName, setAuthUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const isMobile = useMediaQuery('(max-width:600px)');

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
        <>
            <RootDiv>
                <h1>Top Users</h1>
                <Top3users>
                    {isMobile && usersTop[0] &&
                        <TopUser
                            whichTop='top1'
                            image={top1Image}
                            topUser={usersTop[0]}
                            authUserName={authUserName}
                            shadowColor='gold'
                        />
                    }
                    {usersTop[1] &&
                        <TopUser
                            whichTop='top2'
                            image={top2Image}
                            topUser={usersTop[1]}
                            authUserName={authUserName}
                            shadowColor='silver'
                        />
                    }
                    {!isMobile && usersTop[0] &&
                        <TopUser
                            whichTop='top1'
                            image={top1Image}
                            topUser={usersTop[0]}
                            authUserName={authUserName}
                            shadowColor='gold'
                        />
                    }
                    {usersTop[2] &&
                        <TopUser
                            whichTop='top3'
                            image={top3Image}
                            topUser={usersTop[2]}
                            authUserName={authUserName}
                            shadowColor='#ae761e'
                        />
                    }
                </Top3users>
                <TableContainer component={StyledPaper}>
                    <Table aria-label="customized table">
                        <TableBody>
                            {usersTop.slice(3).map((user, i) => (
                                <RestTopRow
                                    key={user.user.name}
                                    user={user}
                                    authUserName={authUserName}
                                    rank={i + 4}
                                />
                            ))}
                            {user &&
                                <>
                                    <TableRow key='rest-row'>
                                        <TableCell padding="none"></TableCell>
                                        <TableCell padding="none">...</TableCell>
                                        <TableCell padding="none"></TableCell>
                                    </TableRow>
                                    <RestTopRow
                                        key={user.user.name}
                                        user={user}
                                        authUserName={authUserName}
                                        rank={user.rank}
                                    />
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </RootDiv >
            {isLoading && <Loading />}
        </>
    )
}
