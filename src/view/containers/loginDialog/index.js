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
    Input
} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import { paths } from '../../../constants';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import "./login.css";
import {login} from '../../../helpers/auth';

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
                enqueueSnackbar(errorMessage, { variant: "error" })
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        autoFocus
                    />
                    <FormControl
                        fullWidth
                        margin="dense">
                        <InputLabel>Password</InputLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => handleMouseDownPassword(e)}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
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
            <Link onClick={handleOpenClose} to={paths.signup} className="link">Don't have an account?  Sign up</Link>
        </Dialog>
    );
}
