import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import {
    Link,
    useLocation,
} from 'react-router-dom';
import { Typography } from "@material-ui/core";
import { paths } from '../../../../constants';
import LoginDialogForm from '../../loginDialog';
import auth from '../../../../helpers/auth';

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
    justifyContent: "space-evenly",
    alignItems: "center"
};



export default ({ user, ...props }) => {
    const location = useLocation();

    const handleLogout = () => {
        auth.logout().then(() => props.setUser(null));
    };

    return (
        <div style={blockStyle}>
            <Link to={paths.top} style={linkStyle}>
                <Typography variant="body2">Top Users</Typography>
            </Link>
            <Link to={paths.rules} style={linkStyle}>
                <Typography variant="body2">Rules</Typography>
            </Link>
            {!user ?
                location.pathname === paths.signup || <>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={props.handleOpen}>
                        Log In
                    </Button>
                    <LoginDialogForm {...props} />
                </> :
                <Button
                    onClick={handleLogout}
                    style={buttonStyle}

                >Log Out</Button>}
        </div>
    )
}
