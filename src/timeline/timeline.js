import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardHeader, CardActions, CardContent, 
    Button, Typography, Avatar, IconButton, Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadTimelineThunk } from '../redux/reducks'
import classes from '*.module.css';


export default function TimelineCards() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authData = useSelector((state) => state.snsReducer.authData);
    const emailFromRedux = authData.email;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadTimeline = async() => {
            setIsLoading(true);
            await dispatch(loadTimelineThunk({ email: emailFromRedux}, history));
            setIsLoading(false);
        };

        loadTimeline();
    }, [dispatch]);

    const userTimeline = useSelector((state) => state.snsReducer.timeline);

    if(isLoading) return (
        <div><p>loading...</p></div>
    );

    return (
        <div>
            <a>start from here</a>
        </div>
    );
}

const TimelineUnit = (timeline, key) => {
    return (
        <React.Fragment>
            <Card className={classes.root}>

            </Card>
        </React.Fragment>
    );
};