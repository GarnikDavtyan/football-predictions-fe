import React, { useState } from 'react';
import { Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../../constants';
import LoginDialogForm from '../../LoginDialogForm';
import { logout } from '../../../../helpers/auth';
import { useMediaQuery } from '@mui/material';
import { ButtonContainer, StyledLink, StyledButton } from './styledComponents';
import ArticleIcon from '@mui/icons-material/Article';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function HeaderButtonsContainer(props) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:700px)');
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
                        <WorkspacePremiumIcon />
                        <Typography variant="body2">Top Users</Typography>

                    </StyledLink>
                    <StyledLink to={paths.rules}>
                        <ArticleIcon />
                        <Typography variant="body2">Rules</Typography>

                    </StyledLink>
                    {!props.user ?
                        <>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={props.handleOpenClose}
                                endIcon={<LoginIcon />}
                            >
                                Log In
                            </Button>
                            <LoginDialogForm {...props} />
                        </>
                        :
                        <StyledButton
                            onClick={handleLogout}
                            endIcon={<LogoutIcon />}
                        >
                            Log Out
                        </StyledButton>
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
                                <WorkspacePremiumIcon />
                            </StyledLink>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <StyledLink to={paths.rules}>
                                <Typography variant="body2">Rules</Typography>
                                <ArticleIcon />
                            </StyledLink>
                        </MenuItem>
                        {!props.user ?
                            <MenuItem onClick={handleMenuClose}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={props.handleOpenClose}
                                    endIcon={<LoginIcon />}
                                >
                                    Log In
                                </Button>
                            </MenuItem>
                            :
                            <MenuItem onClick={handleLogout}>
                                <StyledButton endIcon={<LogoutIcon />}>Log Out</StyledButton>
                            </MenuItem>
                        }
                    </Menu>
                </>
            }
        </>
    );
}
