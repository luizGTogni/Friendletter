import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUpP1 from '../pages/SignUpP1';
// import SignUpP2 from '../pages/SignUpP2';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUpP1} />
  </Switch>
);

export default Routes;
