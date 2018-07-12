import React from 'react';
import { lifecycle } from 'recompose';
import List from '../../components/list';
import './home.css';
import Loader from '../../components/loader';
import Heading from '../../components/heading';

const withInitData = lifecycle({
  componentDidMount() {
    this.props.fetchLatest();
  }
});

const Home = props => (
  <div className="home_container">
    <Heading title="Latest" />
    <List list={props.latestList} />
    <Heading title="Popular" />
    <List list={props.popularList} />
    {props.showLoader && <Loader />}
  </div>
);

export default withInitData(Home);
