import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { paths } from '../../../../constants';
import LoginDialogForm from '../../LoginDialog';
import { logout } from '../../../../helpers/auth';

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#fff',
});

const StyledButton = styled(Button)({
    color: '#4e5569',
    backgroundColor: '#f6f7fb',
});

const ButtonContainer = styled('div')({
    display: 'flex',
    minWidth: '300px',
    justifyContent: 'space-evenly',
    alignItems: 'center',
});

export default function HeaderButtonsContainer(props) {
    const location = useLocation();

    const handleLogout = () => {
        logout().then(() => {
            props.setUser(null);
            window.location.reload();
        });
    };

    return (
        <ButtonContainer>
            <StyledLink to={paths.top}>
                <Typography variant="body2">Top Users</Typography>
            </StyledLink>
            <StyledLink to={paths.rules}>
                <Typography variant="body2">Rules</Typography>
            </StyledLink>
            {!props.user ? (
                location.pathname === paths.signup || (
                    <>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={props.handleOpenClose}
                        >
                            Log In
                        </Button>
                        <LoginDialogForm {...props} />
                    </>
                )
            ) : (
                <StyledButton onClick={handleLogout}>
                    Log Out
                </StyledButton>
            )}
        </ButtonContainer>
    );
}