import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { prop } from 'ramda';
import Nav from '../../components/nav';
import Home from '../home';
import Browse from '../browse';
import Info from '../info';
import Loader from '../../components/loader';

import './layout.css';

const Layout = props => (
  <div className="main_layout">
    <Nav />
    {props.showLoader && <Loader />}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/info" component={Info} />
    </Switch>
  </div>
);

const mapStateToProps = prop('home');

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
