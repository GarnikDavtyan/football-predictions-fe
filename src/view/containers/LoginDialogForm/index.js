import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { paths } from '../../../constants';
import { login } from '../../../helpers/auth';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PasswordTextField from '../../components/PasswordTextField';
import displayErrors from '../../../helpers/common/displayErrors';

const StyledLink = styled(Link)({
    paddingBottom: '10px',
    paddingLeft: '20px',
    color: '#3f51b5',
    textDecoration: 'none',
    cursor: 'pointer'
});

export default function LoginDialogForm({ open, handleOpenClose }) {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        login(email, password)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                window.location.reload();
            })
            .catch(function (error) {
                displayErrors(error.response.data);
            })
    }

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
                    <PasswordTextField
                        variant="standard"
                        label="Password"
                        margin="dense"
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        setIsTouchedPassword={() => { }}
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
            <StyledLink onClick={handleOpenClose} to={paths.signup}>
                Don't have an account? Sign up
            </StyledLink>
        </Dialog>
    );
}
