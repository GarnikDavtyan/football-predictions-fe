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
import displayErrors from '../../../helpers/common/displayErrors';
import { sendResetLink } from '../../../helpers/apiRequests/passwordReset';
import { enqueueSnackbar } from 'notistack';
import { validateEmail } from '../../../helpers/validation/signupValidation';
import Loading from '../../components/Loading';

export default function ForgotPasswordForm({ open, handleOpenClose, isLoading, setIsLoading }) {

    const [email, setEmail] = useState('');
    const [isTouchedEmail, setIsTouchedEmail] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        sendResetLink(email)
            .then((response) => {
                enqueueSnackbar(response.data.message, { variant: "success" });
                handleOpenClose();
            })
            .catch((error) => {
                displayErrors(error.response.data);
                handleOpenClose();
            }).finally(() => setIsLoading(false));
    }

    return (
        <>
            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle
                    id="form-dialog-reset-password"
                    className="title"
                >
                    Request Password Reset
                </DialogTitle>
                <form onSubmit={handleSubmit}>
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
                            error={isTouchedEmail && !validateEmail(email)}
                            onBlur={() => setIsTouchedEmail(true)}
                        />
                        {isTouchedEmail && !validateEmail(email) &&
                            <FormHelperText error>Email is not valid</FormHelperText>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleOpenClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={!validateEmail(email)}>
                            Request
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {isLoading && <Loading />}
        </>
    );
}
