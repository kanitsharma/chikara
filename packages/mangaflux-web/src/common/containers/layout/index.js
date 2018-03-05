import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/header';
import Home from '../home';
import Popular from '../Popular'

export default () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/popular" component={Popular} />
      <Route path="/browse" component={Header} />
    </Switch>
  </div>
);
