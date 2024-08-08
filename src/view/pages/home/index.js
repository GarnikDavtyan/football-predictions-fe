import React from 'react';
import { Typography, Box} from "@material-ui/core";
import LeagueCard from "../../components/leagueCard";

import './home.css';


export default function Home({leagues}){
    return (
        <div className="home">
            <Box className="box">
                {leagues.map(liga => (
                    <LeagueCard key={liga.league_api_id} liga={liga}/>
                    )
                )}
            </Box>
            <Typography className="league-title">Leagues</Typography>
        </div>
    );
}
