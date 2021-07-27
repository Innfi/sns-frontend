import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardHeader, CardActions, CardContent, 
    Button, Typography, Avatar, IconButton, Snackbar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles({
    root: { maxWidth: 345 },
    avatar: { backgroundColor: red[500] }
});

export const TimelineUnit = (timeline, key) => {
    const { authorId, text } = timeline.props;
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
                title="test"
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