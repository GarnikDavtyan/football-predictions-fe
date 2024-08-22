import React from 'react';
import { Typography, Box} from "@material-ui/core";
import LeagueCard from "../../components/LeagueCard";

import './home.css';


export default function Home({leagues}){
    return (
        <div className="home">
            <Box className="box">
                {leagues.map(league => (
                    <LeagueCard key={league.league_api_id} league={league}/>
                    )
                )}
            </Box>
            <Typography className="league-title">Leagues</Typography>
        </div>
    );
}
