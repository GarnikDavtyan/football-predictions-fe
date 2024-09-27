import { Avatar, Button, Container, createTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)({
    margin: 'auto',
});

const StyledPaper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px'
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
}));

const StyledForm = styled('form')({
    width: '100%',
    marginTop: '16px'
});

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const StyledLink = styled(Link)({
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

export {
    StyledAvatar,
    StyledContainer,
    StyledForm,
    StyledLink,
    StyledPaper,
    SubmitButton,
    FormLabelTheme
};