import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Paper)({
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: "auto",
    borderRadius: "10px",
    '@media (min-width: 500px)': {
        width: "450px",
    }
});

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

export {
    StyledBox,
    StyledContainer
};