import React from 'react';
import { lifecycle } from 'recompose';
import List from '../../components/list';
import './home.css';
import Heading from '../../components/heading';

const withInitData = lifecycle({
  componentDidMount() {
    this.props.fetchLatest();
    console.log('loaded');
  },
});

const Home = props => (
  <div className="home_container">
    <Heading title="Latest" />
    <List list={props.latestList} setId={props.setId} />
    <Heading title="Popular" />
    <List list={props.popularList} setId={props.setId} />
  </div>
);

export default withInitData(Home);
