// import React from 'react';
// import { withStyles } from '@material-ui/core/styles'
//

//
// function Footer({classes}) {
//     return (
//         <footer className={classes.footer}>
//             Footer
//         </footer>
//     )
// }
//
// export default withStyles(styles)(Footer)

import React from 'react';
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {paths} from '../../../constants'


function Copyright() {
    const classes = useStyles();
    return (
        <Typography variant="body2" className={classes.copyright}>
            {'Copyright © '}
            <Link to={paths.home} className={classes.link}>
                Predictor
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: 'auto',
        backgroundColor:  "rgba(28, 38, 23, 0.56)",


    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "45px"
    },
    copyright:{
        color: "#fff",
        fontSize: "16px",
    },
    // typography: {
    //     color: "#fff",
    //     fontSize: "16px"
    // },
    link: {
        color: "rgba(252, 252, 252, 0.55)"
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
            <footer className={classes.footer}>
                <Container className={classes.container}>
                    <Copyright className = {classes.copyright} />
                </Container>
            </footer>
    );
}
