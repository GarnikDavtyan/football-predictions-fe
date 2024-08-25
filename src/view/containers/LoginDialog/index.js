import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    InputAdornment,
    IconButton,
    FormControl,
    Input,
    Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { paths } from '../../../constants';
import { useSnackbar } from 'notistack';
import { login } from '../../../helpers/auth';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)({
    paddingBottom: '10px',
    paddingLeft: '20px',
    color: '#3f51b5',
    textDecoration: 'none',
    cursor: 'pointer'
});

export default function LoginDialog({ open, handleOpenClose, setUser }) {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    function handleLogin(e) {
        e.preventDefault();
        login(email, password)
             .then((response) => {
                setUser(response.data.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.data));
                handleOpenClose();
                window.location.reload();
            })
            .catch(function (error) {
                let errorMessage = error.message;
                enqueueSnackbar(errorMessage, { variant: 'error' })
            })
    }

    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" className="title">Log In</DialogTitle>
            <form onSubmit={handleLogin} noValidate>
                <DialogContent>
                    <TextField
                        variant='standard'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        variant='standard'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        margin="dense"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => handleMouseDownPassword(e)}
                                        edge="end"
                                        size="large">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Login
                    </Button>
                </DialogActions>
            </form>
            <StyledLink onClick={handleOpenClose} href={paths.signup}>
                Don't have an account? Sign up
            </StyledLink>
        </Dialog>
    );
}
