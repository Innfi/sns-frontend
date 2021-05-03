import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RootPage from './rootPage';
//import './env.js';

export default function App() {
    return (
        <>
            <Switch>
                <Route path='/' exact={true} component={RootPage} />
            </Switch>
        </>
    );
};

//<Route path='/signup' exact={true} component={SignUp} />