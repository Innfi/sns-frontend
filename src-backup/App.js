import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import PublicPage from './PublicPage';
import PrivatePage from './PrivatePage';
import TimelineCards from './timeline/Timeline';


export default function App() {
    return (
        <>
            <Switch>
              <Route path="/signup" exact={true} component={SignUp} />
              <Route path="/signin" exact={true} component={SignIn} />
              <Route path="/public" exact={true} component={PublicPage} />
              <Route path="/private" exact={true} component={PrivatePage} />
              <Route path="/timeline" exact={true} component={TimelineCards} />
              <Redirect to="/signin" />
            </Switch>
        </>
    );
}