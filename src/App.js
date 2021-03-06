import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RootPage from './rootPage';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import { EntryPage } from './entryPage';

export default function App() {
    return (
        <>
            <Switch>
                <Route path='/' exact={true} component={RootPage} />
                <Route path='/signup' exact={true} component={SignUp} />
                <Route path='/signin' exact={true} component={SignIn} />
                <Route path='/entry' exact={true} component={EntryPage} />
                <Redirect to="/signin" />
            </Switch>
        </>
    );
};
