import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUpP1 from '../pages/SignUpP1';
import StorageBox from '../pages/StorageBox';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUpP1} />

    <Route path="/storagebox" component={StorageBox} isPrivate />
  </Switch>
);

export default Routes;
