import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default function RootPage() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h2">
                    root page
                </Typography>
            </div>
        </Container>
    );   
};