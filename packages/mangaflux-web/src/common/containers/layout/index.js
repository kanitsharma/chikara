import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/header';
import Home from '../home';

export default () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/browse" component={Header} />
    </Switch>
  </div>
);
