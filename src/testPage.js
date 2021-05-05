import React from 'react';
import { useSelector } from 'react-redux';


export default function testPage() {
    const userState = useSelector((state) => state.snsReducer);

    if(userState.authdata.token === '') {
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
        <div>
            <h2>test page</h2>
        </div>
    );
};