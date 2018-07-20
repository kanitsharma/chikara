import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from '../../components/nav';
import Home from '../home';
import Browse from '../browse';
import Info from '../info';
import Loader from '../loader';
import './layout.css';

const Layout = _props => (
  <div className="main_layout">
    <Nav />
    <Loader />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/info" component={Info} />
    </Switch>
  </div>
);

export default Layout;
