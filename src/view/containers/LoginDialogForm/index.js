import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
} from '@mui/material';
import { paths } from '../../../constants';
import { login } from '../../../helpers/auth';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PasswordTextField from '../../components/PasswordTextField';
import displayErrors from '../../../helpers/common/displayErrors';
import ForgotPasswordForm from '../ForgotPasswordForm';
import { validateEmail, validatePassword } from '../../../helpers/validation/signupValidation';

const LinksContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

const StyledLink = styled(Link)({
    padding: '20px 20px 10px 20px',
    color: '#3f51b5',
    textDecoration: 'none',
    cursor: 'pointer'
});

export default function LoginDialogForm({ open, handleOpenClose, ...restProps }) {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openResetPassword, setOpenResetPassword] = useState(false);

    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isTouchedPassword, setIsTouchedPassword] = useState(false);

    const isErrorEmail = isTouchedEmail && !validateEmail(email);
    const isErrorPassword = isTouchedPassword && !validatePassword(password);
    const disabledLoginButton =
        !(validateEmail(email) &&
            validatePassword(password));

    function handleLogin(e) {
        e.preventDefault();
        login(email, password)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                window.location.reload();
            })
            .catch((error) => {
                displayErrors(error.response.data);
            })
    }

    function handleForgotPasswordClick() {
        setOpenResetPassword(!openResetPassword);
        handleOpenClose();
    }

    return (
        <>
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
                            required
                            error={isErrorEmail}
                            onBlur={() => setIsTouchedEmail(true)}
                        />
                        {isErrorEmail &&
                            <FormHelperText error>Email is not valid</FormHelperText>}
                        <PasswordTextField
                            variant="standard"
                            label="Password"
                            margin="dense"
                            password={password}
                            setPassword={setPassword}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            setIsTouchedPassword={setIsTouchedPassword}
                            isErrorPassword={isErrorPassword}
                            isRequired={true}
                            passwordErrorMessage="Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit (8 or more chars)"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleOpenClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={disabledLoginButton}>
                            Login
                        </Button>
                    </DialogActions>
                </form>
                <LinksContainer>
                    <StyledLink onClick={handleOpenClose} to={paths.signup}>
                        Don't have an account? Sign up
                    </StyledLink>
                    <StyledLink onClick={handleForgotPasswordClick}>Forgot password?</StyledLink>
                </LinksContainer>
            </Dialog>

            <ForgotPasswordForm
                open={openResetPassword}
                handleOpenClose={handleForgotPasswordClick}
                {...restProps}
            />
        </>
    );
}
