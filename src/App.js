import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RootPage from './rootPage';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import { EntryPage } from './mainpage/entry';
import { TimelineCards } from './timeline/timelineCards';

export default function App() {
    return (
        <>
            <Switch>
                <Route path='/signup' exact={true} component={SignUp} />
                <Route path='/signin' exact={true} component={SignIn} />
                <Route path='/entry' exact={true} component={EntryPage} />
                <Route path="/timeline" exact={true} component={TimelineCards} />
                <Redirect to="/signin" />
            </Switch>
        </>
    );
};
