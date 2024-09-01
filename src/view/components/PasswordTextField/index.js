import React from 'react';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export default function PasswordTextField(props) {
    const {
        margin,
        variant,
        label,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        setIsTouchedPassword,
        isErrorPassword,
        passwordErrorMessage,
        isRequired
    } = props;

    return (
        <TextField
            fullWidth
            margin={margin}
            variant={variant}
            required={isRequired}
            label={label}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={isErrorPassword}
            onBlur={() => setIsTouchedPassword(true)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                            size="large"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            helperText={
                isErrorPassword && passwordErrorMessage
            }
        />
    )
}