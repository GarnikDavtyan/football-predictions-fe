import { enqueueSnackbar } from "notistack";

export default function displayErrors(errorData) {
    if ('errors' in errorData) {
        for (const field in errorData.errors) {
            const message = errorData.errors[field];
            enqueueSnackbar(message[0], { variant: "error" });
        };
    } else {
        enqueueSnackbar(errorData.message, { variant: "error" });
    }
}