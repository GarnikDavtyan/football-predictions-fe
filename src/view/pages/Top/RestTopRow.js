import { Avatar, styled, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import stringToColor from "../../../helpers/common/stringToColor";
import getImageFullUrl from "../../../helpers/common/getImageFullUrl";

const AvatarNameContainer = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

export default function RestTopRow(props) {
    const {
        user,
        authUserName,
        rank,
    } = props;

    const fontWeight = authUserName === user.user.name ? 500 : 'normal';

    return (
        <TableRow key={user.user.name}>
            <TableCell style={{ fontWeight: fontWeight }} align="center">
                {rank}
            </TableCell>
            <TableCell>
                <AvatarNameContainer>
                    <Avatar
                        style={{ backgroundColor: stringToColor(user.user.name) }}
                        alt={user.user.name.toUpperCase()}
                        src={getImageFullUrl(user.user.avatar)}
                    />
                    <Typography style={{ fontWeight: fontWeight }} display="block">
                        &emsp;{user.user.name}
                    </Typography>
                </AvatarNameContainer>
            </TableCell>
            <TableCell align="center">
                <Typography style={{ fontWeight: fontWeight }} display="block">
                    {user.points}
                </Typography>
            </TableCell>
        </TableRow>
    )
}