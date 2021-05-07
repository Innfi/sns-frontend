import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function testPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userState = useSelector((state) => state.snsReducer);

    useEffect(() => {
        if(userState.userData === {}) {
            console.log('in useEffect');
            dispatch(tempThunk({}, history));
        }
    });

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