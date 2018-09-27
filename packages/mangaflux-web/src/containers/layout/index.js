import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from '../../components/nav';
import Home from '../home';
import Browse from '../browse';
import Info from '../info';
import Loader from '../loader';
import Chapter from '../chapter';
import './layout.css';

const Layout = _props => (
  <div className="main_layout">
    <Nav />
    <Loader />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/info/:mangaId" component={Info} />
      <Route exact path="/chapter/:chapterId" component={Chapter} />
    </Switch>
  </div>
);

export default Layout;
