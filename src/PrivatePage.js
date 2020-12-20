import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';


export default function PrivatePage() {
    const userState = useSelector((state) => state.accountReducer);

    if(userState.isAuthenticated !== true || 
       userState.userTimeline.length <= 0) {
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
            <div>
                <Typography component="h2">
                    {userState.userTimeline[0].index} | {userState.userTimeline[0].date}
                    | {userState.userTimeline[0].text}
                </Typography>
            </div>
        </Container>
    );
};