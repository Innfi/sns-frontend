import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardHeader, CardActions, CardContent, 
    Button, Typography, Avatar, IconButton, Snackbar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch, useSelector } from 'react-redux';
import { loadTimelineThunk } from '../redux/reducks';
import { useHistory } from 'react-router-dom';


export default function TimelineCards() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadTimeline = async () => {
            setIsLoading(true);
            await dispatch(loadTimelineThunk({ userId: 'innfi', }, history));
            setIsLoading(false);
        };

        loadTimeline();
    }, [dispatch]);

    const userTimeline = useSelector((state) => state.snsReducer.userTimeline); 

    if(isLoading) return (
        <div><p>loading...</p></div>
    );

    return (
        userTimeline.map((unit, index) => <TimelineUnit props={unit} key={index} />)
    );
}

const useStyles = makeStyles({
    root: { maxWidth: 345 },
    avatar: { backgroundColor: red[500] }
});

const TimelineUnit = (timeline, key) => {
    const { authorId, userId, text } = timeline.props;
    const classes = useStyles();
    const [sbOpen, setSbOpen] = useState(false);

    const handleMoreVertClicked = () => {
        setSbOpen(true);
    };

    const handleSnackbarClose = (event) => {
        setSbOpen(false);
    };

    return (
        <React.Fragment>
        <Card className={classes.root}>
            <CardHeader 
                avatar={
                    <Avatar aria-label="cardAvatar" className={classes.avatar}>
                        {authorId}
                    </Avatar>
                } 
                action={
                    <IconButton aria-label="settings" onClick={handleMoreVertClicked}>
                        <MoreVertIcon/>
                    </IconButton>
                } 
                title={userId}
                subheader="this is subheader"
                />
            <CardActionArea>
                <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                    {text} 
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
};
