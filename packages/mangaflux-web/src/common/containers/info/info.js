import React from 'react';
import { lifecycle } from 'recompose';
import List from '../../components/list';
import './info.css';
import Loader from '../../components/loader';
import Heading from '../../components/heading';

const withInitData = lifecycle({});

const Info = props => <div className="info_container" />;

export default withInitData(Info);
