import { Avatar, styled, Typography } from "@mui/material";
import React from "react";
import stringToColor from "../../../helpers/common/stringToColor";
import getImageFullUrl from "../../../helpers/common/getImageFullUrl";

const Top3Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const StyledAvatar = styled(Avatar)(({ user, shadowcolor }) => ({
    marginBottom: '10px',
    backgroundColor: stringToColor(user.user.name),
    boxShadow: `0 0 5px 5px ${shadowcolor}`
}));

export default function TopUser(props) {
    const {
        whichTop,
        image,
        topUser,
        authUserName,
        shadowColor
    } = props;

    const fontWeight = authUserName === topUser.user.name ? 'bold' : 'normal';

    return (
        <Top3Container>
            <img src={image} alt={whichTop} />
            <StyledAvatar
                alt={topUser.user.name.toUpperCase()}
                src={getImageFullUrl(topUser.user.avatar)}
                user={topUser}
                shadowcolor={shadowColor}
            />
            <Typography style={{ fontWeight: fontWeight }} display="block" gutterBottom>
                {topUser.user.name}
            </Typography>
            <Typography style={{ fontWeight: fontWeight }} display="block" gutterBottom>
                {topUser.points}
            </Typography>
        </Top3Container>
    )
}