import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';


export default function PublicPage() {
    const userState = useSelector((store) => store);
    console.log(userState);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h2">
                    public page
                </Typography>
            </div>
        </Container>
    );
};