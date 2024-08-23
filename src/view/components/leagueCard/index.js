import React from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, CardMedia, makeStyles, Typography} from "@material-ui/core";
import {paths} from '../../../constants'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.61)",
        '&:hover':{
            cursor:'pointer',
        }
    },

    media: {
        margin:"20px",
        height: 140,
        width: "70%",
        backgroundSize: "contain"
    },
    link: {
        textDecoration: 'none',
        '&:hover':{
            transform: "scale(0.9)",
            transition: ".3s linear",
            boxShadow: "0 4px 10px 0 rgba(132, 138, 145, 0.77)",
            position: "relative"
        }
    }


});

export default function LeagueCard({league}) {
    const classes = useStyles();

    return (
        <Link to={paths.main + '/' + league.slug} className={classes.link}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={league.logo}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {league.name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

