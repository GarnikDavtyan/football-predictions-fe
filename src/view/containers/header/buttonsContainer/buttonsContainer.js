import React, { useState } from 'react';
import {
    Link,
    useLocation,
} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Menu from "@material-ui/core/Menu";
import { paths } from '../../../../constants';
import { Typography } from "@material-ui/core";
import LoginDialogForm from '../../loginDialog';
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

const linkStyle = {
    textDecoration: 'none',
    color: "#fff"
};

const buttonStyle = {
    color: "#4e5569",
    backgroundColor: "#f6f7fb"

};
const blockStyle = {
    display: "flex",
    minWidth: "300px",
    justifyContent: "space-between",
    alignItems: "center"
};

export default ({ user, ...props }) => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);



    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
    };

    return (
        <div style={blockStyle}>
            <Link to={paths.rules} style={linkStyle}>
                <Typography variant="body2">Top Users</Typography>
            </Link>
            <Link to={paths.rules} style={linkStyle}>
                <Typography variant="body2">Rules</Typography>
            </Link>
            {!user ?
                <>
                    <Button
                        style={buttonStyle}
                        disabled={location.pathname === paths.signup}
                        color="primary"
                        onClick={props.handleOpen}>
                        Log In
                    </Button>
                    <LoginDialogForm {...props} />
                    <Link to={paths.signup} style={linkStyle}>
                        <Button color="primary"
                            style={buttonStyle}
                        >
                            Sign up
                        </Button>
                    </Link>
                </> :
                <>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        style={buttonStyle}
                    >
                        <AccountCircle fontSize={"small"} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem >My Profile</MenuItem>
                        <MenuItem color="primary" onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </>
            }
        </div>
    )
}