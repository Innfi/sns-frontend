import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, CssBaseline, TextField, Typography, Container, Divider, IconButton } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { submitTimelineMediaThunk, submitTimelineThunk } from '../redux/reducks';


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
    alignItems: 'right'
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

    const handleSubmitMedia = (e) => {
      e.preventDefault();
        const data = new FormData();
        data.append("filename", e.target);

        dispatch(submitTimelineMediaThunk(data, history));
    };

    //<input type="file" name="file" id="file" />
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    type your moments
                </Typography>
                <form className={classes.form} noValidate encType="multipart/form-data">
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
                    <Button type="submit" variant="contained" color="primary" 
                      className={classes.submit} onClick={handleSubmit}>Submit</Button>
                </form>
                <Divider />
                <form className={classes.form} noValidate encType="multipart/form-data">
                    <Button variant="contained" component="label" 
                      className={classes.submit}>
                      Upload Image 
                      <input type="file" hidden />
                    </Button>
                    <Button type="submit" variant="contained" color="primary" 
                      className={classes.submit} onClick={handleSubmitMedia}>Submit</Button>
                </form>
            </div>
        </Container>
    );
};
