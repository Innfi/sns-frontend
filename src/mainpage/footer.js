import { Container, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    footer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        padding: '80px 0',
        color: 'black',
      },
}));

export const SnsFooter = () => {
    const classes = useStyles();

    return (
        <Container component="footer" className={classes.footer}>
            <Divider variant="middle" />
            <Typography> ( footer text here ) </Typography>
        </Container>
    );
};