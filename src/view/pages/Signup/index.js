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
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    IconButton,
    styled,
    ThemeProvider,
    createTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { paths } from '../../../constants';
import { register } from '../../../helpers/auth';
import { validatePassword, validateUsername, validateEmail } from '../../../helpers/validation/signupValidation';
import { useSnackbar } from 'notistack';
import Loading from '../../components/Loading';

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

    const { enqueueSnackbar } = useSnackbar();

    const userNameRef = useRef();

    useEffect(() => {
        userNameRef.current && userNameRef.current.focus();
    }, []);

    const disabledSignUpButton = !(validateUsername(username) && validateEmail(email) && validatePassword(password) && password === repeatPassword);

    const handleChange = (e, setValue) => setValue(e.target.value);

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleClickShowRepeatPassword = () => setShowRepeatPassword(prev => !prev);
    const handleMouseDownPassword = (e) => e.preventDefault();

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
                enqueueSnackbar(error.message, { variant: "error" });
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
                                        size="small"
                                        error={isTouchedUsername && !validateUsername(username)}
                                        onChange={(e) => handleChange(e, setUsername)}
                                        onBlur={() => setIsTouchedUsername(true)}
                                    />
                                    {isTouchedUsername && !validateUsername(username) &&
                                        <FormHelperText error>Username must contain only Latin letters and digits (2-20 chars)</FormHelperText>}
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
                                        size="small"
                                        error={isTouchedEmail && !validateEmail(email)}
                                        onChange={(e) => handleChange(e, setEmail)}
                                        onBlur={() => setIsTouchedEmail(true)}
                                    />
                                    {isTouchedEmail && !validateEmail(email) &&
                                        <FormHelperText error>Email is not valid</FormHelperText>}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        variant="outlined"
                                        size="small"
                                        required
                                        fullWidth
                                        error={isTouchedPassword && !validatePassword(password)}>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <OutlinedInput
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="current-password"
                                            error={isTouchedPassword && !validatePassword(password)}
                                            onChange={(e) => handleChange(e, setPassword)}
                                            onBlur={() => setIsTouchedPassword(true)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large">
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                    {isTouchedPassword && !validatePassword(password) &&
                                        <FormHelperText error>Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit (8 or more chars)</FormHelperText>}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        variant="outlined"
                                        size="small"
                                        required
                                        fullWidth
                                        error={isTouchedRepeatPassword && password !== repeatPassword}>
                                        <InputLabel htmlFor="repeat_password">Repeat Password</InputLabel>
                                        <OutlinedInput
                                            name="repeat_password"
                                            type={showRepeatPassword ? 'text' : 'password'}
                                            id="repeat_password"
                                            autoComplete="current-password"
                                            error={isTouchedRepeatPassword && password !== repeatPassword}
                                            onChange={(e) => handleChange(e, setRepeatPassword)}
                                            onBlur={() => setIsTouchedRepeatPassword(true)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle repeat password visibility"
                                                        onClick={handleClickShowRepeatPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large">
                                                        {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Repeat Password"
                                        />
                                    </FormControl>
                                    {isTouchedRepeatPassword && password !== repeatPassword &&
                                        <FormHelperText error>Passwords don't match</FormHelperText>}
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
