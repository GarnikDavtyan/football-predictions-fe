import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import HeaderLogo from './logo';
import HeaderButtonsContainer from './buttonsContainer'

const styles = () => ({
    header: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "-webkit-fill-available",
        color: "#fff",
        padding: '10px'
    },
    MuiDialogTitle: {
        color: "#fff",

    }
});

function Header({classes, user, ...restProps}) {
    return (
        <header className={classes.header}>
            <HeaderLogo />

            <span>{user ? user.name : 'Guest' }</span>

            <HeaderButtonsContainer user={user} {...restProps}/>
        </header>
    )
}

export default withStyles(styles)(Header)
