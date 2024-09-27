import { Typography } from "@mui/material";
import React from "react";
import getImageFullUrl from "../../../helpers/common/getImageFullUrl";
import { Top3Container, StyledAvatar, Img } from "./styledComponents";

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
            <Img src={image} alt={whichTop} />
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