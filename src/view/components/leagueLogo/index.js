import React from 'react';
const leagueLogoStyle = {
    objectFit: "contain"
};
const leagueLogo = ({ src, alt }) => <img src={src} alt={alt} height={100} width={100} style={leagueLogoStyle}/>

export default leagueLogo;
