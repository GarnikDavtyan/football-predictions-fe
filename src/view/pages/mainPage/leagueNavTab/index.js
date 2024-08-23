import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles, Paper, Tabs, Tab } from '@material-ui/core';
import LeagueLogo from '../../../components/LeagueLogo';
import { paths } from '../../../../constants';

const useStyles = makeStyles({
    root: {
        backgroundColor: "transparent",
        paddingTop: "10px",
        marginBottom: "10px"

    },
    tabBlock: {
        backgroundColor: "#fff",
        overflow: "inherit",
    },
    tabIndex: {
        minWidth: 200,
        backgroundColor: "#fff",
        borderRadius: "10px",
        margin: "10px"
    },
});

export default function LeagueNavTab({ leagues, slug }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        leagues.length && setValue(leagues.map(league => league.slug).indexOf(slug));
    }
        , [leagues]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    function handleTabClick(slug) {
        navigate(paths.main + '/' + slug);
    }

    return (
        <Paper square className={classes.root}>
            <Tabs
                className={classes.indicator}
                centered={true}
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                aria-label="leagues tab"
            >
                {leagues.map(league => (
                    <Tab
                        onClick={() => handleTabClick(league.slug)}
                        key={league.id}
                        label={league.name}
                        icon={<LeagueLogo
                            src={league.logo}
                            alt={league.slug}
                        />}
                        className={classes.tabIndex}
                    />
                ))}
            </Tabs>
        </Paper>
    )
}

