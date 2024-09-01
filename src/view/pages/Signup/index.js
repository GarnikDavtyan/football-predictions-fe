import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Button,
    TextField,
    FormHelperText,
    Grid,
    Typography,
    Container,
    styled,
    ThemeProvider,
    createTheme
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { paths } from '../../../constants';
import { register, getCurrentUser } from '../../../helpers/auth';
import { validatePassword, validateUsername, validateEmail } from '../../../helpers/validation/signupValidation';
import Loading from '../../components/Loading';
import PasswordTextField from '../../components/PasswordTextField';
import displayErrors from '../../../helpers/common/displayErrors';

const ContainerStyled = styled(Container)({
    margin: 'auto',
});

const PaperStyled = styled('div')(({ theme }) => ({
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px'
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
}));

const FormStyled = styled('form')({
    width: '100%',
    marginTop: '16px'
});

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const LinkStyled = styled(Link)({
    textDecoration: 'none',
    color: '#3f51b5',
});

const FormLabelTheme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: '#db3131',
                }
            }
        }
    }
});

export default function SignUp({ handleOpenClose, setUser }) {
    const navigate = useNavigate();
    const formLabelsTheme = FormLabelTheme;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const [isTouchedUsername, setIsTouchedUsername] = useState(false);
    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isTouchedPassword, setIsTouchedPassword] = useState(false);
    const [isTouchedRepeatPassword, setIsTouchedRepeatPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const userNameRef = useRef();

    useEffect(() => {
        if (getCurrentUser()) {
            navigate(paths.home);
        }

        userNameRef.current && userNameRef.current.focus();
    }, []);

    const isErrorPassword = isTouchedPassword && !validatePassword(password);
    const isErrorRepeatPassword = isTouchedRepeatPassword && password !== repeatPassword;
    const disabledSignUpButton = !(validateUsername(username) && validateEmail(email) && validatePassword(password) && password === repeatPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        register(username, email, password, repeatPassword)
            .then((response) => {
                setUser(response.data.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.data));
            })
            .then(() => navigate(paths.home))
            .catch((error) => {
                displayErrors(error.response.data);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <ContainerStyled component="main" maxWidth="xs">
                <PaperStyled>
                    <AvatarStyled>
                        <LockOutlinedIcon />
                    </AvatarStyled>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <ThemeProvider theme={formLabelsTheme}>
                        <FormStyled noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={userNameRef}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        error={isTouchedUsername && !validateUsername(username)}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={() => setIsTouchedUsername(true)}
                                    />
                                    {isTouchedUsername && !validateUsername(username) &&
                                        <FormHelperText error>Username must contain only latin letters and digits (2-20 chars)</FormHelperText>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        error={isTouchedEmail && !validateEmail(email)}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => setIsTouchedEmail(true)}
                                    />
                                    {isTouchedEmail && !validateEmail(email) &&
                                        <FormHelperText error>Email is not valid</FormHelperText>}
                                </Grid>
                                <Grid item xs={12}>
                                    <PasswordTextField
                                        label="Password"
                                        password={password}
                                        setPassword={setPassword}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                        setIsTouchedPassword={setIsTouchedPassword}
                                        isErrorPassword={isErrorPassword}
                                        isRequired={true}
                                        passwordErrorMessage="Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit (8 or more chars)"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PasswordTextField
                                        label="Repeat Password"
                                        password={repeatPassword}
                                        setPassword={setRepeatPassword}
                                        showPassword={showRepeatPassword}
                                        setShowPassword={setShowRepeatPassword}
                                        setIsTouchedPassword={setIsTouchedRepeatPassword}
                                        isErrorPassword={isErrorRepeatPassword}
                                        isRequired={true}
                                        passwordErrorMessage="The password confirmation field must match password"
                                    />
                                </Grid>
                            </Grid>
                            <SubmitButton
                                type="submit"
                                fullWidth
                                color="primary"
                                variant="contained"
                                disabled={disabledSignUpButton}
                            >
                                Sign Up
                            </SubmitButton>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <LinkStyled onClick={handleOpenClose} to={paths.home}>
                                        Already have an account? Log in
                                    </LinkStyled>
                                </Grid>
                            </Grid>
                        </FormStyled>
                    </ThemeProvider>
                </PaperStyled>
            </ContainerStyled>
            {isLoading && <Loading />}
        </>
    );
}
