import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Typography
} from "@mui/material";
import { paths } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import {
    validateEmail,
    validatePassword
} from "../../../helpers/validation/signupValidation";
import { enqueueSnackbar } from "notistack";
import Loading from "../../components/Loading";
import { getCurrentUser } from "../../../helpers/auth";
import PasswordTextField from "../../components/PasswordTextField";
import displayErrors from "../../../helpers/common/displayErrors";
import { resetPassword } from "../../../helpers/apiRequests/passwordReset";
import { StyledBox, StyledContainer } from "./styledComponents";

export default function PasswordReset() {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isTouchedPassword, setIsTouchedPassword] = useState(false);
    const [isTouchedRepeatPassword, setIsTouchedRepeatPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isErrorEmail = isTouchedEmail && !validateEmail(email);
    const isErrorPassword = Boolean(
        isTouchedPassword && password && !validatePassword(password)
    );
    const isErrorRepeatPassword = Boolean(
        isTouchedRepeatPassword && password && password !== repeatPassword
    );

    const disabledSubmitButton =
        !validateEmail(email) ||
        !validatePassword(password) ||
        password !== repeatPassword;

    useEffect(() => {
        if (getCurrentUser()) {
            navigate(paths.home);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        resetPassword(token, email, password, repeatPassword).then((response) => {
            enqueueSnackbar(response.data.message, { variant: "success" });
            navigate(paths.home);
        }).catch((error) => {
            displayErrors(error.response.data);
        }).finally(() => setIsLoading(false));
    };

    return (
        <>
            <StyledContainer>
                <Typography variant="h4" mb={5}>
                    Reset Password
                </Typography>
                <StyledBox>
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
                        label="Password"
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        setIsTouchedPassword={setIsTouchedPassword}
                        isErrorPassword={isErrorPassword}
                        passwordErrorMessage=
                        {isErrorPassword &&
                            "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit (8 or more chars)"
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={disabledSubmitButton}
                    >
                        Submit
                    </Button>

                </StyledBox>
            </StyledContainer>
            {isLoading && <Loading />}
        </>
    );
}
