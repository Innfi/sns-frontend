import React from 'react';
import { Switch, Route, Link as RouterLink, useHistory, 
  Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import PublicPage from './PublicPage';
import PrivatePage from './PrivatePage';


export default function App() {
    return (
        <>
            <div>
              <RouterLink to="/signup">to signup</RouterLink>
            </div>
            <div>
              <RouterLink to="/public">to public</RouterLink>
            </div>
            <div>
              <RouterLink to="/private">to private</RouterLink>
            </div>
            <Switch>
              <Route path="/signup" exact={true} component={SignUp} />
              <Route path="/public" exact={true} component={PublicPage} />
              <Route path="/private" exact={true} component={PrivatePage} />
            </Switch>
        </>
    );
}