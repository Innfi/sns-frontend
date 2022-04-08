import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import EntryPage from './mainpage/entry';
import TimelineCards from './timeline/timelineCards';

export default function App() {
  return (
    <Switch>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/entry" exact component={EntryPage} />
      <Route path="/timeline" exact component={TimelineCards} />
      <Redirect to="/signin" />
    </Switch>
  );
}
