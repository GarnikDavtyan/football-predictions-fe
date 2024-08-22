import React from 'react';
import { Button } from '@material-ui/core';
import {
    Link,
    useLocation,
} from 'react-router-dom';
import { Typography } from "@material-ui/core";
import { paths } from '../../../../constants';
import LoginDialogForm from '../../LoginDialog';
import {logout} from '../../../../helpers/auth';

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

export default function HeaderButtonsContainer(props) {
    const location = useLocation();

    const handleLogout = () => {
        logout().then(() => {
            props.setUser(null);
            window.location.reload();
        });
    };

    return (
        <div style={blockStyle}>
            <Link to={paths.top} style={linkStyle}>
                <Typography variant="body2">Top Users</Typography>
            </Link>
            <Link to={paths.rules} style={linkStyle}>
                <Typography variant="body2">Rules</Typography>
            </Link>
            {!props.user ?
                location.pathname === paths.signup || <>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={props.handleOpenClose}>
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
