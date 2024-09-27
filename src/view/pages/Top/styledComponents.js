import { Avatar, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import stringToColor from '../../../helpers/common/stringToColor';


const AvatarNameContainer = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

const Top3Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const StyledAvatar = styled(Avatar)(({ user, shadowcolor }) => ({
    marginBottom: '10px',
    backgroundColor: stringToColor(user.user.name),
    boxShadow: `0 0 5px 5px ${shadowcolor}`
}));

const RootDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    width: 'fit-content',
    color: 'white'
});

const Top3users = styled('div')({
    display: 'flex',
    '@media (max-width: 600px)': {
        flexDirection: "column"
    },
});

const StyledPaper = styled(Paper)({
    backgroundColor: "rgba(255, 255, 255, 0.52)",
});

const Img = styled('img')({
    '@media (min-width:500px) and (max-width: 1000px)': {
        width: '90%'
    },
});

export {
    AvatarNameContainer,
    Top3Container,
    StyledAvatar,
    RootDiv,
    Top3users,
    StyledPaper,
    Img
};