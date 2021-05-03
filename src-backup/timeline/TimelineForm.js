import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const TimelineForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [newTm, setNewTm] = useState({
        text: '' //TODO: other types of media
    });

    const handleChange = (e) => {
        setNewTm({...newTm, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitTimelineThunk(newTm, history));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    type your moments
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="text"
                      label="timeline texts"
                      name="text"
                      autoComplete="timeline texts"
                      autoFocus
                      onChange={(e) => handleChange(e)}
                    />
                </form>
            </div>
        </Container>
    );
};

export default TimelineForm;