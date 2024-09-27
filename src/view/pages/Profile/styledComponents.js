import { Avatar, Box, Paper, Typography } from '@mui/material';
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

export {
    StyledAvatar,
    StyledBox,
    StyledContainer,
    AvatarButtonsContainer,
    Verify
};