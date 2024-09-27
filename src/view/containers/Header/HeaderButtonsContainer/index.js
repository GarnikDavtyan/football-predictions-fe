import React, { useState } from 'react';
import { Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../constants';
import LoginDialogForm from '../../LoginDialogForm';
import { logout } from '../../../../helpers/auth';
import { useMediaQuery } from '@mui/material';
import { ButtonContainer, StyledLink, StyledButton } from './styledComponents';

export default function HeaderButtonsContainer(props) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        handleMenuClose();
        props.setUser(null);
        navigate(paths.home, { replace: true });
        logout();
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {!isMobile ?
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
                        <StyledButton onClick={handleLogout}>Log Out</StyledButton>
                    }
                </ButtonContainer>
                :
                <>
                    {!props.user && <LoginDialogForm {...props} />}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>
                            <StyledLink to={paths.top}>
                                <Typography variant="body2">Top Users</Typography>
                            </StyledLink>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <StyledLink to={paths.rules}>
                                <Typography variant="body2">Rules</Typography>
                            </StyledLink>
                        </MenuItem>
                        {!props.user ?
                            <MenuItem onClick={handleMenuClose}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={props.handleOpenClose}
                                >
                                    Log In
                                </Button>
                            </MenuItem>
                            :
                            <MenuItem onClick={handleLogout}>
                                <StyledButton>Log Out</StyledButton>
                            </MenuItem>
                        }
                    </Menu>
                </>
            }
        </>
    );
}
