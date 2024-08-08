import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles, Paper, Tabs, Tab } from '@material-ui/core';
import LeagueLogo from '../../../components/leagueLogo';
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

export default ({ leagues, leagueId }) => {
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        leagues.length && setValue(leagues.map(liga => liga.league_api_id).indexOf(leagueId));
    }
        , [leagues]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    function handleTabClick(id) {
        history.push(paths.main + '/' + id);
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
                {leagues.map(liga => (
                    <Tab
                        onClick={() => handleTabClick(liga.league_api_id)}
                        key={liga.league_api_id}
                        label={liga.name}
                        icon={<LeagueLogo
                            src={liga.logo}
                            alt={liga.league_api_id}
                        />}
                        className={classes.tabIndex}
                    />
                ))}
            </Tabs>
        </Paper>
    )
}

