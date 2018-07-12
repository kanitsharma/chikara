import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from '../../components/nav';
import Home from '../home';
import Browse from '../browse';

import './layout.css';

export default props => (
  <div className="main_layout">
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/browse" component={Browse} />
    </Switch>
  </div>
);
