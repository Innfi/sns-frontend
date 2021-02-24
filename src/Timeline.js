import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardHeader, CardActions, CardContent, 
    Button, Typography, Avatar, IconButton, Snackbar } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch, useSelector } from 'react-redux';
import { loadTimelineThunk } from './redux/reducks';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    root: { maxWidth: 345 },
    avatar: { backgroundColor: red[500] }
});


export default function TimelineCard() {
    const classes = useStyles();
    const [tmData, setTmData] = useState({
        userId: 'testId',
        url: 'test_url',
        nickname: 'nick',
        text: 'dummy text',
    }); //temporary

    const [sbOpen, setSbOpen] = useState(false);
    const dispatch = useDispatch();
    const userState =  useSelector((state) => state.accountReducer);
    const history = useHistory();

    const handleMoreVertClicked = () => {
        setSbOpen(true);
    };

    const handleSnackbarClose = (event) => {
        setSbOpen(false);
    };

    useEffect(() => {
        dispatch(loadTimelineThunk({ userId: 'dummy', }, history));
    }, [dispatch]);

    return (
        <React.Fragment>

        <Card className={classes.root}>
            <CardHeader 
                avatar={
                    <Avatar aria-label="cardAvatar" className={classes.avatar}>
                        {tmData.nickname}
                    </Avatar>
                } 
                action={
                    <IconButton aria-label="settings" onClick={handleMoreVertClicked}>
                        <MoreVertIcon/>
                    </IconButton>
                } 
                title={tmData.userId}
                subheader="this is subheader"
                />
            <CardActionArea>
                <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                    {tmData.text} 
                </Typography>
            </CardActionArea>
        </Card>
        <div>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
                open={sbOpen} autoHideDuration={2000} 
                message="snackbar opened" 
                action={
                <React.Fragment>
                  <Button color="secondary" size="small" 
                    onClick={handleSnackbarClose}>
                      close
                  </Button>  
                  <IconButton size="small" aria-label="close" color="inherit" 
                    onClick={handleSnackbarClose}>
                    <CloseIcon fontSize="small" />
                   </IconButton>
                </React.Fragment>
                } 
            />
        </div>
        </React.Fragment>
    );
}