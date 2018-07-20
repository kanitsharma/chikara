import React from 'react';
import { lifecycle } from 'recompose';
import './info.css';

const withInitData = lifecycle({});

const Info = _props => <div className="info_container" />;

export default withInitData(Info);
