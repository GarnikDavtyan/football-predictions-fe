import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    createMuiTheme,
    MuiThemeProvider,
    makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { paths } from '../../../constants';
import auth from '../../../helpers/auth';
import * as validation from '../../../helpers/validation/signupValidation';
import { SnackbarProvider, useSnackbar } from 'notistack';


const { validatePassword, validateUsername, validateEmail } = validation;

const useStyles = makeStyles(theme => ({
    container: {
        margin: 'auto',
    },

    paper: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: "20px",
        borderRadius: "15px"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: "none",
        color: "#3f51b5",
    }
}));


export default function SignUp({ handleOpen, setUser, setIsLoading }) {
    const history = useHistory();
    const classes = useStyles();

    const formLabelsTheme = createMuiTheme({
        overrides: {
            MuiFormLabel: {
                asterisk: {
                    color: '#db3131',
                }
            }
        }
    });

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

    const { enqueueSnackbar } = useSnackbar();

    let userNameRef = useRef();


    useEffect(() => userNameRef.current && userNameRef.current.focus(), []);
    
    const disabledSignUpButton = !(validateUsername(username) && validateEmail(email) && validatePassword(password) && password === repeatPassword);

    const handleChange = (e, setValue) => { setValue(e.target.value) };

    const handleClickShowPassword = (setValue) => {
        setValue(!showPassword);
    };

    const handleClickShowRepeatPassword = (setValue) => {
        setValue(!showRepeatPassword);
    };


    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    const handleSubmit = e => {
        e.preventDefault();
        auth.register(username, email, password, repeatPassword)
             .then((response) => {
                setUser(response.data.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.data));
            })
            .then(() => {
                history.push(paths.home);
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                enqueueSnackbar(errorMessage, { variant: "error" })
            })
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <MuiThemeProvider theme={formLabelsTheme}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={userNameRef}
                                    variant={"outlined"}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    size="small"
                                    error={isTouchedUsername && !validateUsername(username)}
                                    onChange={(e) => handleChange(e, setUsername)}
                                    onBlur={(e) => { setIsTouchedUsername(true) }}
                                />
                                {isTouchedUsername && !validateUsername(username) &&
                                    <FormHelperText error>Username must contain only latin letters and digits(2-20
                                    chars)</FormHelperText>}
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
                                    onBlur={() => { setIsTouchedEmail(true) }}
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
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        error={isTouchedPassword && !validatePassword(password)}
                                        onChange={(e) => handleChange(e, setPassword)}
                                        onBlur={() => { setIsTouchedPassword(true) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword(setShowPassword)}
                                                    onMouseDown={(e) => handleMouseDownPassword(e)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={83}
                                    />
                                </FormControl>
                                {isTouchedPassword && !validatePassword(password) &&
                                    <FormHelperText error>Password must contain at least 1 uppercase, 1 lowercase latin
                                    letters and 1 digit(8 or more chars)</FormHelperText>}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    error={isTouchedRepeatPassword && password !== repeatPassword}>
                                    <InputLabel>Repeat Password</InputLabel>
                                    <OutlinedInput
                                        name="repeat_password"
                                        type={showRepeatPassword ? 'text' : 'password'}
                                        id="repeat_password"
                                        autoComplete="current-password"
                                        error={isTouchedRepeatPassword && password !== repeatPassword}
                                        onChange={(e) => handleChange(e, setRepeatPassword)}
                                        onBlur={() => { setIsTouchedRepeatPassword(true) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle repeat password visibility"
                                                    onClick={() => handleClickShowRepeatPassword(setShowRepeatPassword)}
                                                    onMouseDown={(e) => handleMouseDownPassword(e)}
                                                    edge="end"
                                                >
                                                    {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={137}
                                    />
                                </FormControl>
                                {isTouchedRepeatPassword && password !== repeatPassword &&
                                    <FormHelperText error>Passwords don't match</FormHelperText>}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained"
                            className={classes.submit}
                            disabled={disabledSignUpButton}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link onClick={handleOpen} to={paths.home} className={classes.link}>
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </MuiThemeProvider>
            </div>
        </Container>
    );
}
