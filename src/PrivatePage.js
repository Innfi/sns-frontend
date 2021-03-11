import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { TimelineCards } from './timeline/Timeline';


export default function PrivatePage() {
    const userState = useSelector((state) => state.snsReducer);

    if(userState.isAuthenticated !== true) {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <Typography component="h2">
                        not authenticated
                    </Typography>
                </div>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <TimelineCards />
        </Container>
    );
};