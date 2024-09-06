import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Paper,
    TextField,
    Button,
    Avatar,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from '@mui/icons-material/Delete';
import stringToColor from "../../../helpers/common/stringToColor";
import { paths } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from "../../../helpers/validation/signupValidation";
import { updateProfile, deleteAvatar } from "../../../helpers/apiRequests/updateProfile";
import { enqueueSnackbar } from "notistack";
import getImageFullUrl from "../../../helpers/common/getImageFullUrl";
import Loading from "../../components/Loading";
import { getCurrentUser } from "../../../helpers/auth";
import PasswordTextField from "../../components/PasswordTextField";
import displayErrors from "../../../helpers/common/displayErrors";

const StyledContainer = styled(Paper)({
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: "auto",
    marginTop: "40px",
    borderRadius: "10px",
    width: "500px",
});

const StyledAvatar = styled(Avatar)(({ bgcolor }) => ({
    width: "70px",
    height: "70px",
    marginBottom: "5px",
    backgroundColor: bgcolor,
}));

const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    "& .MuiTextField-root": {
        marginBottom: "20px",
        width: "100%",
    },
    "& .MuiButton-root": {
        marginTop: "20px",
    },
});

const AvatarButtonsContainer = styled('div')({
    display: "flex",
    alignItems: "center"
});

const Verify = styled(Typography)({
    color: "red",
    textAlign: "center"
});

export default function Profile({ user, setUser }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [avatar, setAvatar] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);

    const [isTouchedUsername, setIsTouchedUsername] = useState(false);
    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isTouchedNewPassword, setIsTouchedNewPassword] = useState(false);
    const [isTouchedRepeatPassword, setIsTouchedRepeatPassword] = useState(false);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const bgcolor = stringToColor(username);

    const isErrorUsername = isTouchedUsername && !validateUsername(username);
    const isErrorEmail = isTouchedEmail && !validateEmail(email);
    const isErrorOldPassword = Boolean(newPassword && !oldPassword);
    const isErrorNewPassword = Boolean(
        isTouchedNewPassword && newPassword && !validatePassword(newPassword)
    );
    const isErrorRepeatPassword = Boolean(
        isTouchedRepeatPassword && newPassword && newPassword !== repeatPassword
    );
    const AreNewAndOldPasswordSame = isTouchedNewPassword && newPassword && newPassword === oldPassword;

    const disabledSaveButton =
        isErrorUsername ||
        isErrorEmail ||
        isErrorOldPassword ||
        isErrorNewPassword ||
        isErrorRepeatPassword ||
        AreNewAndOldPasswordSame;

    useEffect(() => {
        if (getCurrentUser()) {
            const user = getCurrentUser().user;

            setUsername(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatar(getImageFullUrl(user.avatar));
            }
        } else {
            navigate(paths.home);
        }
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatar(URL.createObjectURL(file));
        }
    };

    const handleDeleteAvatar = () => {
        setIsLoading(true);

        deleteAvatar().then((response) => {
            setUser((prevUser) => ({
                ...prevUser,
                avatar: null,
            }));

            setAvatar('');

            const localStorageUserData = JSON.parse(localStorage.getItem('user'));
            localStorageUserData.user.avatar = null;
            localStorage.setItem('user', JSON.stringify(localStorageUserData));

            enqueueSnackbar(response.data.message, { variant: "success" });
        }).catch((error) => {
            displayErrors(error.response.data);
        }).finally(() => setIsLoading(false));
    };

    const handleSaveChanges = () => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', username);
        formData.append('email', email);
        formData.append('old_password', oldPassword);
        formData.append('new_password', newPassword);
        formData.append('password_confirmation', repeatPassword);

        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        updateProfile(formData).then((response) => {
            const user = response.data.data;

            setUser((prevUser) => ({
                ...prevUser,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            }));

            const localStorageUserData = JSON.parse(localStorage.getItem('user'));
            localStorageUserData.user = user;
            localStorage.setItem('user', JSON.stringify(localStorageUserData));

            setAvatarFile(null);
            setOldPassword('');
            setNewPassword('');
            setRepeatPassword('');

            enqueueSnackbar(response.data.message, { variant: "success" })
        }).catch((error) => {
            displayErrors(error.response.data);
        }).finally(() => setIsLoading(false));
    };

    return (
        <>
            <StyledContainer>
                <Typography variant="h4" gutterBottom>
                    Edit Profile
                </Typography>
                <StyledAvatar
                    src={avatar}
                    bgcolor={bgcolor}
                />
                <AvatarButtonsContainer>
                    <label htmlFor="upload-avatar">
                        <IconButton color="primary" component="span">
                            <PhotoCamera />
                        </IconButton>
                        <input
                            accept="image/*"
                            id="upload-avatar"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleAvatarChange}
                        />
                    </label>
                    {user && user.avatar &&
                        <IconButton color="primary" component="span" onClick={handleDeleteAvatar}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </AvatarButtonsContainer>
                <StyledBox>
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={isErrorUsername}
                        onBlur={() => setIsTouchedUsername(true)}
                        helperText={
                            isErrorUsername &&
                            "Username must contain only latin letters and digits (2-20 chars)"
                        }
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={isErrorEmail}
                        onBlur={() => setIsTouchedEmail(true)}
                        helperText={isErrorEmail && "Email is not valid"}
                    />
                    <PasswordTextField
                        label="Old Password"
                        password={oldPassword}
                        setPassword={setOldPassword}
                        showPassword={showOldPassword}
                        setShowPassword={setShowOldPassword}
                        setIsTouchedPassword={() => { }}
                        isErrorPassword={isErrorOldPassword}
                        passwordErrorMessage="Old password is required to change the password"
                    />
                    <PasswordTextField
                        label="New Password"
                        password={newPassword}
                        setPassword={setNewPassword}
                        showPassword={showNewPassword}
                        setShowPassword={setShowNewPassword}
                        setIsTouchedPassword={setIsTouchedNewPassword}
                        isErrorPassword={isErrorNewPassword || AreNewAndOldPasswordSame}
                        passwordErrorMessage=
                        {isErrorNewPassword ?
                            "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit (8 or more chars)"
                            :
                            AreNewAndOldPasswordSame ?
                                "The new password must be different from the old password"
                                : ''
                        }
                    />
                    <PasswordTextField
                        label="Repeat Password"
                        password={repeatPassword}
                        setPassword={setRepeatPassword}
                        showPassword={showRepeatPassword}
                        setShowPassword={setShowRepeatPassword}
                        setIsTouchedPassword={setIsTouchedRepeatPassword}
                        isErrorPassword={isErrorRepeatPassword}
                        passwordErrorMessage="The password confirmation field must match password"
                    />
                    {user && !user.email_verified_at
                        ?
                        <Verify style={{ color: 'red' }}>
                            Please verify your email. <br />
                            Check your inbox for the verification email.<br />
                            Click <Link to={'/verification/resend'}>here</Link> to resend the verification email.
                        </Verify>
                        :
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveChanges}
                            disabled={disabledSaveButton}
                        >
                            Save Changes
                        </Button>
                    }
                </StyledBox>
            </StyledContainer>
            {isLoading && <Loading />}
        </>
    );
}
