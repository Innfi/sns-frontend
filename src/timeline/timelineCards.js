import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { loadTimelineThunk } from '../redux/reducks'
import { TimelineForm } from './timelineForm';
import { TimelineUnit } from './timelineUnit';


export function TimelineCards() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authData = useSelector((state) => state.snsReducer.authData);
    const emailFromRedux = authData.email;
    const [isLoading, setIsLoading] = useState(false);    
    const userTimeline = useSelector((state) => state.snsReducer.timeline);

    // useEffect(() => {
    //     const loadTimeline = async() => {
    //         setIsLoading(true);
    //         await dispatch(loadTimelineThunk({ email: emailFromRedux}, history));
    //         setIsLoading(false);
    //     };

    //     loadTimeline();
    // }, [dispatch]);

    if(isLoading) return (
        <div><p>loading...</p></div>
    );

    //<TimelineForm />

    return (
        userTimeline.map((unit, index) => <TimelineUnit props={unit} key={index} />)
    );
}
