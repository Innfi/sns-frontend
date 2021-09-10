import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import { submitTimelineThunk } from '../redux/reducks';


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

export const TimelineForm = () => {
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
        setNewTm({ ...newTm, text: '' });
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
