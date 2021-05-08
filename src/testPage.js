import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { tempThunk } from './redux/reducks';


export default function TestPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userState = useSelector((state) => state.snsReducer, []);

    useEffect(() => {
        //console.log(`userData: ${JSON.stringify(userState.userData)}`);

        if(userState.userData === {}) {
            //console.log('in useEffect');
            dispatch(tempThunk({}, history));
        }
    });

    //console.log(`userState: ${JSON.stringify(userState)}`);

    if(userState.authdata?.token === undefined) {
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