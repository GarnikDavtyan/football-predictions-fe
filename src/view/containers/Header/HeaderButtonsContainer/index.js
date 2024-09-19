import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { paths } from '../../../../constants';
import LoginDialogForm from '../../LoginDialogForm';
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
    minWidth: '250px',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export default function HeaderButtonsContainer(props) {
    const navigate = useNavigate();

    const handlelogout = () => {
        props.setUser(null);
        navigate(paths.home, { replace: true });
        logout();
    };

    return (
        <ButtonContainer>
            <StyledLink to={paths.top}>
                <Typography variant="body2">Top Users</Typography>
            </StyledLink>
            <StyledLink to={paths.rules}>
                <Typography variant="body2">Rules</Typography>
            </StyledLink>
            {!props.user ?
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
                :
                <StyledButton onClick={handlelogout}>
                    Log Out
                </StyledButton>
            }
        </ButtonContainer>
    );
}