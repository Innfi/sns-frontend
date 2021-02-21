import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, 
    Button, Typography } from '@material-ui/core';


const useStyles = makeStyles({
    root: { maxWidth: 345 },
});

export default function TimelineCard() {
    const classes = useStyles();
    const [text, setText] = useState('');

    return (
        <Card className={classes.root}>
            <CardActionArea>
                //test 
                <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                    {text} 
                </Typography>
            </CardActionArea>
        </Card>
    );
}