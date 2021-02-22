import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, 
    Button, Typography, Avatar } from '@material-ui/core';
import { Person } from '@material-ui/icons';


const useStyles = makeStyles({
    root: { maxWidth: 345 },
});


export default function TimelineCard() {
    const classes = useStyles();
    const [tmData, setTmData] = useState({
        userId: 'testId',
        url: 'test_url',
        nickname: 'nick',
        text: 'dummy text',
    });

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Avatar alt={tmData.userId} src={tmData.url}>
                    <Person />
                </Avatar>
                <Typography variant="body1" color="textPrimary">
                    {tmData.nickname}
                </Typography>
                <br />
                <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                    {tmData.text} 
                </Typography>
            </CardActionArea>
        </Card>
    );
}