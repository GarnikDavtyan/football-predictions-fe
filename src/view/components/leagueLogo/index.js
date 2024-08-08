import React from 'react'
import LeagueLogo from "../../pages/mainPage/leagueNavTab";
const leagueLogo = {
    objectFit: "contain"
};
export default ({ src, alt }) => <img src={src} alt={alt} height={100} width={100} style={leagueLogo}/>
